"""UML generation agent for ArchGen AI.

This module implements an async, reusable UML generation component that can run as
an Antigravity-style managed agent.
"""

from __future__ import annotations

import asyncio
import json
import os
import re
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

try:
    from dotenv import load_dotenv
except Exception:  # pragma: no cover - optional dependency
    load_dotenv = None


if load_dotenv:
    load_dotenv()


class UMLAgentError(Exception):
    """Base exception for UML generation failures."""


@dataclass
class ToolCallTrace:
    tool: str
    input_summary: str
    output_summary: str

    def as_dict(self) -> Dict[str, str]:
        return {
            "tool": self.tool,
            "input_summary": self.input_summary,
            "output_summary": self.output_summary,
        }


@dataclass
class UMLTrace:
    workplan: List[str] = field(default_factory=list)
    reasoning_steps: List[str] = field(default_factory=list)
    tool_calls: List[ToolCallTrace] = field(default_factory=list)

    def as_dict(self) -> Dict[str, Any]:
        return {
            "workplan": self.workplan,
            "reasoning_steps": self.reasoning_steps,
            "tool_calls": [call.as_dict() for call in self.tool_calls],
        }


@dataclass
class UMLResult:
    use_case_diagram: str
    class_diagram: str
    sequence_diagram: str
    trace: UMLTrace

    def as_dict(self) -> Dict[str, Any]:
        return {
            "use_case_diagram": self.use_case_diagram,
            "class_diagram": self.class_diagram,
            "sequence_diagram": self.sequence_diagram,
            "trace": self.trace.as_dict(),
        }


class GeminiClient:
    """Thin async wrapper around Gemini for structured generation."""

    def __init__(self, api_key: Optional[str] = None, model: Optional[str] = None) -> None:
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        self.model = model or os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

    async def generate_json(self, prompt: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        if not self.api_key:
            raise UMLAgentError("GEMINI_API_KEY is not configured.")

        try:
            import google.generativeai as genai
        except Exception as exc:  # pragma: no cover - depends on optional package
            raise UMLAgentError("google-generativeai dependency is not installed.") from exc

        instruction = (
            f"{prompt}\n\n"
            "Return valid JSON only with keys: use_case_diagram, class_diagram, "
            "sequence_diagram, reasoning_steps, assumptions.\n"
            f"Input requirements JSON:\n{json.dumps(payload, ensure_ascii=False)}"
        )

        def _generate() -> Dict[str, Any]:
            genai.configure(api_key=self.api_key)
            model = genai.GenerativeModel(self.model)
            response = model.generate_content(instruction)
            text = getattr(response, "text", "") or ""
            return _extract_json_object(text)

        return await asyncio.to_thread(_generate)


class UMLGenerationAgent:
    """Autonomous UML architect agent."""

    def __init__(self, gemini_client: Optional[GeminiClient] = None) -> None:
        self.gemini_client = gemini_client or GeminiClient()

    async def generate(self, requirements_json: Dict[str, Any]) -> Dict[str, Any]:
        requirements = self._validate_and_normalize(requirements_json)
        trace = UMLTrace(
            workplan=[
                "Interpret requirements and identify actors, behaviors, and constraints.",
                "Draft use case, class, and sequence design strategy.",
                "Generate Mermaid-compatible UML diagrams and return structured trace.",
            ]
        )

        trace.reasoning_steps.append(
            "Normalized requirements payload with "
            f"{len(requirements['actors'])} actors and "
            f"{len(requirements['functional_requirements'])} functional requirements."
        )

        try:
            result = await self._generate_with_gemini(requirements, trace)
        except Exception as exc:
            trace.reasoning_steps.append(
                "Gemini generation unavailable; switched to deterministic fallback UML synthesis."
            )
            trace.tool_calls.append(
                ToolCallTrace(
                    tool="gemini_api",
                    input_summary="Attempted structured UML generation from requirements_json.",
                    output_summary=f"Gemini call failed: {exc.__class__.__name__}",
                )
            )
            result = self._generate_fallback(requirements, trace)

        return result.as_dict()

    async def _generate_with_gemini(self, requirements: Dict[str, Any], trace: UMLTrace) -> UMLResult:
        prompt = (
            "You are a senior software architect. Build UML design artifacts from requirements. "
            "Ensure Mermaid syntax correctness and engineering-grade completeness."
        )
        output = await self.gemini_client.generate_json(prompt, requirements)

        trace.tool_calls.append(
            ToolCallTrace(
                tool="gemini_api",
                input_summary=(
                    f"actors={len(requirements['actors'])}, "
                    f"functional_requirements={len(requirements['functional_requirements'])}, "
                    f"constraints={len(requirements['constraints'])}"
                ),
                output_summary="Received structured UML payload from Gemini.",
            )
        )

        reasoning_steps = output.get("reasoning_steps") or output.get("assumptions") or []
        if isinstance(reasoning_steps, list):
            trace.reasoning_steps.extend(str(step) for step in reasoning_steps if step)

        return UMLResult(
            use_case_diagram=_ensure_mermaid_prefix(str(output.get("use_case_diagram", "")), "usecaseDiagram"),
            class_diagram=_ensure_mermaid_prefix(str(output.get("class_diagram", "")), "classDiagram"),
            sequence_diagram=_ensure_mermaid_prefix(str(output.get("sequence_diagram", "")), "sequenceDiagram"),
            trace=trace,
        )

    def _generate_fallback(self, requirements: Dict[str, Any], trace: UMLTrace) -> UMLResult:
        actors = requirements["actors"] or ["User"]
        func_requirements = requirements["functional_requirements"] or ["System supports core workflows"]
        constraints = requirements["constraints"]

        use_case_diagram = self._build_use_case_diagram(actors, func_requirements)
        class_diagram = self._build_class_diagram(requirements)
        sequence_diagram = self._build_sequence_diagram(actors, func_requirements)

        trace.reasoning_steps.extend(
            [
                "Mapped each functional requirement into a use case node and linked primary actors.",
                "Extracted candidate domain entities from requirements and constraints for class modeling.",
                "Selected the first critical requirement as the primary sequence scenario.",
            ]
        )
        if constraints:
            trace.reasoning_steps.append(
                f"Applied {len(constraints)} constraints as contextual design assumptions in class/sequence structure."
            )

        return UMLResult(
            use_case_diagram=use_case_diagram,
            class_diagram=class_diagram,
            sequence_diagram=sequence_diagram,
            trace=trace,
        )

    def _validate_and_normalize(self, requirements_json: Dict[str, Any]) -> Dict[str, Any]:
        if not isinstance(requirements_json, dict):
            raise UMLAgentError("requirements_json must be a dictionary.")

        normalized = {
            "actors": _as_string_list(requirements_json.get("actors")),
            "functional_requirements": _as_string_list(
                requirements_json.get("functional_requirements")
            ),
            "constraints": _as_string_list(requirements_json.get("constraints")),
            "system_description": str(requirements_json.get("system_description", "")).strip(),
        }
        return normalized

    def _build_use_case_diagram(self, actors: List[str], requirements: List[str]) -> str:
        lines = ["usecaseDiagram"]
        for actor in actors:
            alias = _id(actor)
            lines.append(f"    actor {alias} as \"{_escape(actor)}\"")

        lines.append("    rectangle System {")
        use_case_aliases: List[str] = []
        for idx, requirement in enumerate(requirements, start=1):
            uc_alias = f"UC{idx}"
            use_case_aliases.append(uc_alias)
            lines.append(f"        usecase {uc_alias} as \"{_escape(requirement)}\"")
        lines.append("    }")

        primary_actor = _id(actors[0]) if actors else "User"
        for uc_alias in use_case_aliases:
            lines.append(f"    {primary_actor} --> {uc_alias}")

        return "\n".join(lines)

    def _build_class_diagram(self, requirements: Dict[str, Any]) -> str:
        candidates = set()
        for text in (
            requirements["actors"]
            + requirements["functional_requirements"]
            + requirements["constraints"]
        ):
            candidates.update(_extract_entities(text))

        entities = sorted(candidates)[:8] or ["System", "Requirement"]

        lines = ["classDiagram"]
        lines.append("    class System {")
        lines.append("        +generateUML(requirements)")
        lines.append("    }")

        for entity in entities:
            class_name = _title_token(entity)
            lines.append(f"    class {class_name} {{")
            lines.append("        +id: String")
            lines.append("    }")
            lines.append(f"    System --> {class_name} : manages")

        return "\n".join(lines)

    def _build_sequence_diagram(self, actors: List[str], requirements: List[str]) -> str:
        actor = actors[0] if actors else "User"
        scenario = requirements[0] if requirements else "Perform core operation"
        clean_scenario = _escape(scenario)

        lines = [
            "sequenceDiagram",
            f"    actor {_id(actor)} as {_quoted(actor)}",
            "    participant App as \"Application\"",
            "    participant Core as \"Domain Core\"",
            f"    {_id(actor)}->>App: Request {clean_scenario}",
            "    App->>Core: Validate and process request",
            "    Core-->>App: Return result",
            f"    App-->>{_id(actor)}: Confirm {clean_scenario}",
        ]
        return "\n".join(lines)


class UMLManagedAgent:
    """Simple Antigravity-style managed agent wrapper."""

    def __init__(self, uml_agent: Optional[UMLGenerationAgent] = None) -> None:
        self.uml_agent = uml_agent or UMLGenerationAgent()

    async def run(self, requirements_json: Dict[str, Any]) -> Dict[str, Any]:
        return await self.uml_agent.generate(requirements_json)


async def run(requirements_json: Dict[str, Any]) -> Dict[str, Any]:
    """Entrypoint for orchestrators expecting a module-level async function."""

    agent = UMLManagedAgent()
    return await agent.run(requirements_json)


def _as_string_list(value: Any) -> List[str]:
    if value is None:
        return []
    if not isinstance(value, list):
        return [str(value).strip()] if str(value).strip() else []
    return [str(item).strip() for item in value if str(item).strip()]


def _extract_json_object(text: str) -> Dict[str, Any]:
    text = text.strip()
    if not text:
        raise UMLAgentError("Gemini returned empty output.")

    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)

    try:
        return json.loads(text)
    except json.JSONDecodeError:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if not match:
            raise UMLAgentError("Gemini output does not contain valid JSON.")
        return json.loads(match.group(0))


def _extract_entities(text: str) -> List[str]:
    tokens = re.findall(r"[A-Za-z][A-Za-z0-9_]+", text)
    stopwords = {
        "the",
        "and",
        "for",
        "with",
        "from",
        "into",
        "must",
        "should",
        "will",
        "system",
        "user",
        "users",
    }
    return [token for token in tokens if len(token) > 3 and token.lower() not in stopwords]


def _ensure_mermaid_prefix(code: str, prefix: str) -> str:
    trimmed = (code or "").strip()
    if not trimmed:
        return prefix
    if trimmed.startswith(prefix):
        return trimmed
    if trimmed.startswith("```"):
        trimmed = re.sub(r"^```(?:mermaid)?\s*", "", trimmed)
        trimmed = re.sub(r"\s*```$", "", trimmed)
        trimmed = trimmed.strip()
    if not trimmed.startswith(prefix):
        return f"{prefix}\n{trimmed}"
    return trimmed


def _id(value: str) -> str:
    identifier = re.sub(r"[^A-Za-z0-9_]", "_", value.strip())
    if not identifier:
        return "Actor"
    if identifier[0].isdigit():
        identifier = f"A_{identifier}"
    return identifier


def _title_token(value: str) -> str:
    cleaned = re.sub(r"[^A-Za-z0-9]", " ", value)
    token = "".join(part.capitalize() for part in cleaned.split())
    return token or "Entity"


def _escape(value: str) -> str:
    return value.replace('"', "'").strip()


def _quoted(value: str) -> str:
    return f'"{_escape(value)}"'


__all__ = ["UMLGenerationAgent", "UMLManagedAgent", "GeminiClient", "UMLAgentError", "run"]
