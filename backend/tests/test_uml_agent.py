import unittest

from backend.agents.uml_agent import UMLGenerationAgent, UMLManagedAgent


class _FakeGeminiClient:
    async def generate_json(self, prompt, payload):
        return {
            "use_case_diagram": "usecaseDiagram\n  actor A",
            "class_diagram": "classDiagram\n  class A",
            "sequence_diagram": "sequenceDiagram\n  A->>B: hi",
            "reasoning_steps": ["Mapped actor to use case"],
        }


class _FailingGeminiClient:
    async def generate_json(self, prompt, payload):
        raise RuntimeError("gemini unavailable")


class UMLGenerationAgentTests(unittest.IsolatedAsyncioTestCase):
    async def test_generate_uses_gemini_and_returns_schema(self):
        agent = UMLGenerationAgent(gemini_client=_FakeGeminiClient())
        result = await agent.generate(
            {
                "actors": ["Customer"],
                "functional_requirements": ["Customer can place order"],
                "constraints": ["OAuth required"],
            }
        )

        self.assertEqual(set(result.keys()), {"use_case_diagram", "class_diagram", "sequence_diagram", "trace"})
        self.assertTrue(result["use_case_diagram"].startswith("usecaseDiagram"))
        self.assertTrue(result["class_diagram"].startswith("classDiagram"))
        self.assertTrue(result["sequence_diagram"].startswith("sequenceDiagram"))
        self.assertEqual(result["trace"]["tool_calls"][0]["tool"], "gemini_api")

    async def test_generate_falls_back_when_gemini_fails(self):
        agent = UMLGenerationAgent(gemini_client=_FailingGeminiClient())
        result = await agent.generate(
            {
                "actors": ["Admin"],
                "functional_requirements": ["Admin approves request"],
                "constraints": ["Audit logs mandatory"],
            }
        )

        self.assertIn("usecaseDiagram", result["use_case_diagram"])
        self.assertIn("classDiagram", result["class_diagram"])
        self.assertIn("sequenceDiagram", result["sequence_diagram"])
        self.assertGreaterEqual(len(result["trace"]["reasoning_steps"]), 3)

    async def test_managed_agent_wrapper(self):
        managed = UMLManagedAgent(uml_agent=UMLGenerationAgent(gemini_client=_FailingGeminiClient()))
        result = await managed.run({"actors": [], "functional_requirements": [], "constraints": []})
        self.assertIn("trace", result)


if __name__ == "__main__":
    unittest.main()
