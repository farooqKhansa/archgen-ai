# Component Reference Guide

## Components Overview

### 1. UploadZone Component
**Location**: `src/components/UploadZone.jsx`
**Size**: ~80 lines

**Purpose**: Main upload interface with drag-and-drop support

**Props**:
- `onUpload(file)` - Callback when file is selected

**Features**:
- Drag-and-drop file upload
- File type validation (PDF, TXT, DOCX)
- Visual feedback on drag state
- Start Analysis button
- File format indicators

**States**:
- `isDragOver` - Shows highlight when dragging
- Validated file types only

**Usage**:
```jsx
<UploadZone onUpload={(file) => handleUpload(file)} />
```

---

### 2. AgentTracker Component
**Location**: `src/components/AgentTracker.jsx`
**Size**: ~110 lines

**Purpose**: Display 7 AI agents in a vertical timeline with sequential activation

**Props**:
- `agents` - Array of agent objects with `id`, `name`, `description`, `status`

**Features**:
- Sequential agent activation (1.5s delay between each)
- Status badges (Pending/Running/Complete)
- Animated spinner for running agents
- Timeline connector lines
- Smooth slide-in animations

**States**:
- `activeAgents` - Array of activated agent IDs
- Uses `setInterval` for sequential activation

**Key Logic**:
```javascript
// Each agent activates with delay
agents.forEach((agent, index) => {
  setTimeout(() => {
    setActiveAgents(prev => [...prev, agent.id]);
  }, index * 1500);
});
```

**Usage**:
```jsx
<AgentTracker agents={mockAgents} />
```

---

### 3. ArtifactsPanel Component
**Location**: `src/components/ArtifactsPanel.jsx`
**Size**: ~280 lines

**Purpose**: Tabbed interface for viewing all analysis artifacts

**Props**: None (uses mockData directly)

**Features**:
- 5 tabs: Requirements, Architecture, Diagrams, Database, Tests
- Tab switching with smooth transitions
- Responsive grid layouts
- Icon styling with Lucide React
- Color-coded priority badges

**State**:
- `activeTab` - Current selected tab

**Tabs**:

#### Requirements Tab
- Actors list with descriptions
- Functional requirements checklist
- Constraints with warning icons
- Color-coded icons for different types

#### Architecture Tab
- Recommended pattern with reasoning
- Component cards with technologies
- Responsibility descriptions
- Hover effects on component cards

#### Diagrams Tab
- 3 Mermaid diagrams in 3-column grid
- Responsive to smaller screens
- Use Case, Class, and Sequence diagrams

#### Database Tab
- ER diagram (Mermaid)
- SQL schema in code block
- Proper formatting and syntax highlighting
- Index definitions

#### Test Cases Tab
- Scrollable table view
- Columns: ID, Name, Type, Priority, Steps
- Priority badges (Critical/High/Medium)
- Color-coded rows

**Usage**:
```jsx
<ArtifactsPanel />
```

---

### 4. DiagramViewer Component
**Location**: `src/components/DiagramViewer.jsx`
**Size**: ~35 lines

**Purpose**: Render Mermaid diagrams with dark theme

**Props**:
- `diagram` - Mermaid diagram definition (string)
- `title` - Diagram title

**Features**:
- Mermaid.js rendering
- Dark theme optimization
- Auto-layout
- Error handling
- Responsive container

**Key Setup**:
```javascript
mermaid.initialize({ 
  startOnLoad: true, 
  theme: 'dark', 
  securityLevel: 'loose' 
});
```

**Supported Diagrams**:
- Use Case diagrams
- Class diagrams
- Sequence diagrams
- ER diagrams
- And many others

**Usage**:
```jsx
<DiagramViewer 
  diagram={mockDiagrams.useCaseDiagram}
  title="Use Case Diagram"
/>
```

---

### 5. BootstrapSimulator Component
**Location**: `src/components/BootstrapSimulator.jsx`
**Size**: ~140 lines

**Purpose**: Simulate project bootstrap with before/after states and log stream

**Props**: None (uses mockData directly)

**Features**:
- Before/After side-by-side cards
- Animated log stream (800ms per line)
- Statistics display (files, folders, tickets)
- Folder structure visualization
- State transition animation

**States**:
- `displayedLogs` - Array of displayed log lines
- `isComplete` - Bootstrap completion flag

**Log Stream Sequence**:
1. Analyzing architecture recommendation...
2. Creating folder structure...
3. Generating config files...
4. Initializing mock database...
5. Creating task board tickets...
6. Bootstrap complete ✓

**Before State**:
- Gray folder icon
- "No workspace" label
- Empty state indicator

**After State** (when complete):
- Green accent color
- Folder structure list
- Statistics grid (42 files, 8 folders, 15 tickets)

**Usage**:
```jsx
<BootstrapSimulator />
```

---

### 6. ReportDownload Component
**Location**: `src/components/ReportDownload.jsx`
**Size**: ~65 lines

**Purpose**: Display report ready card and handle download

**Props**: None

**Features**:
- Ready card with description
- Download button
- Loading state with spinner
- Error handling
- File information display
- Mock download fallback

**States**:
- `isLoading` - Button loading state
- `error` - Error message display

**Download Logic**:
- Calls `downloadReport()` from api.js
- Falls back to mock blob download if API unavailable
- Triggers browser download dialog

**Usage**:
```jsx
<ReportDownload />
```

---

## Pages Overview

### 1. HomePage
**Location**: `src/pages/HomePage.jsx`
**Purpose**: Main landing page with upload interface

**Sections**:
1. Header with branding
2. Hero section with title and subtitle
3. UploadZone component
4. Feature showcase (3 cards)
5. Supported formats display
6. Footer

**Navigation**:
- onClick upload → navigate to `/results`

**Features**:
- Responsive grid layouts
- Hover effects on feature cards
- Professional styling
- Format indicators

---

### 2. ResultsPage
**Location**: `src/pages/ResultsPage.jsx`
**Purpose**: Display complete analysis with all sections

**Sections**:
1. Header with back button and data source toggle
2. AgentTracker component
3. ArtifactsPanel component
4. BootstrapSimulator component
5. ReportDownload component
6. Next Steps guide
7. Footer

**Features**:
- Sequential section animations (0.2s delays)
- Live API / Mock Data toggle
- Back navigation to home
- Comprehensive next steps
- Footer with links

**States**:
- `useMockData` - Toggle between mock and live API

---

## Data & Services

### mockData.js
**Location**: `src/data/mockData.js`
**Purpose**: Centralized mock data for development

**Exports**:
- `mockAgents` - 7 agent definitions
- `mockRequirements` - Requirements structure (actors, functional, constraints)
- `mockArchitecture` - Architecture pattern and components
- `mockDiagrams` - 3 Mermaid diagram definitions
- `mockDatabase` - SQL schema and ER diagram
- `mockTestCases` - 6 test case definitions
- `bootstrapLogs` - 6 log simulation lines
- `beforeState` / `afterState` - Bootstrap states

**Data Volumes**:
- 7 agents
- 3 actors
- 6 functional requirements
- 5 constraints
- 7 components
- 3 diagrams
- 4 database tables
- 6 test cases

---

### api.js
**Location**: `src/services/api.js`
**Purpose**: API communication layer

**Methods**:
1. `uploadDocument(file)` - POST /upload
2. `getAnalysis()` - GET /analysis
3. `downloadReport()` - GET /download/report

**Features**:
- Axios client setup
- Automatic blob handling for reports
- Error logging
- Environment variable configuration

**Configuration**:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
```

---

## Routing Structure

### App.jsx
**Routes**:
- `/` → HomePage
- `/results` → ResultsPage
- `*` → Redirect to `/`

**Setup**:
```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/results" element={<ResultsPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
</BrowserRouter>
```

---

## Styling System

### Tailwind Configuration
**Colors**:
- `dark-bg`: #0f1117 (main background)
- `dark-card`: #1a1d27 (card background)
- `accent-blue`: #4f8ef7 (accent color)

**Animations**:
- `slideInUp` - Slide from bottom
- `fadeIn` - Fade in effect
- `spin-slow` - Slow spin animation
- `pulse-glow` - Pulsing glow effect

### CSS Classes

**Common Utilities**:
```
bg-dark-bg        // Main background
bg-dark-card      // Card backgrounds
text-accent-blue  // Accent text color
border-accent-blue // Accent borders
hover:border-accent-blue // Hover effects
animate-slideInUp // Slide up animation
transition-all    // Smooth transitions
```

---

## Component Lifecycle & Data Flow

### Page Load Sequence
1. `App.jsx` renders
2. Router loads appropriate page
3. HomePage or ResultsPage renders
4. Components mount and initialize state

### Results Page Animation Sequence
1. Page mounts (t=0)
2. Agent 1 activates (t=0)
3. Agent 2 activates (t=1500ms)
4. ... (each 1500ms)
5. All agents complete (t=9000ms)
6. Bootstrap logs start (t=9000ms)
7. Each log displays (800ms interval)
8. Bootstrap completes (t=13800ms)

### Upload to Results Flow
1. User drags file onto UploadZone
2. UploadZone validates file type
3. onUpload callback triggers
4. Navigate to /results
5. ResultsPage renders with animations

---

## Best Practices Used

✅ Component composition
✅ Props drilling minimized
✅ State management with hooks
✅ Separation of concerns
✅ Mock data separation
✅ Service layer pattern
✅ Responsive design
✅ Accessibility considerations
✅ Error handling
✅ Loading states

---

## Testing Checklist

- [x] All components render without errors
- [x] Navigation works correctly
- [x] Animations run smoothly
- [x] File upload validates types
- [x] Mermaid diagrams render
- [x] Mock data displays correctly
- [x] Dark theme consistent
- [x] Responsive on mobile/tablet/desktop
- [x] No console errors or warnings

---

## Customization Guide

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'dark-bg': '#YOUR_BG_COLOR',
  'accent-blue': '#YOUR_ACCENT',
}
```

### Add New Tab
Edit `ArtifactsPanel.jsx`:
```javascript
const tabs = [
  // ... existing tabs
  { id: 'newTab', label: 'New Tab' },
];
```

### Add New Agent
Edit `mockData.js`:
```javascript
export const mockAgents = [
  // ... existing agents
  { id: 8, name: 'New Agent', ... }
];
```

### Change Animation Speed
Edit component files:
```javascript
setTimeout(() => {
  // Change 1500 to your desired delay
}, index * 1500);
```

