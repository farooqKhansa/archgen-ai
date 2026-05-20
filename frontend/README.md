# ArchGen AI - Frontend

A modern React web application for AI-powered software architecture generation using Vite, Tailwind CSS, and Mermaid.js.

## Features

- **Upload Zone**: Drag-and-drop support for PDF, TXT, and DOCX files
- **Agent Progress Tracker**: Real-time display of 7 analysis agents with streaming simulation
- **Artifacts Panel**: Tabbed interface showing requirements, architecture, diagrams, database schema, and test cases
- **Diagram Rendering**: Interactive Mermaid diagrams (Use Case, Class, Sequence, ER diagrams)
- **Bootstrap Simulator**: Visual before/after state with animated log stream
- **Report Download**: Generate and download comprehensive architecture reports
- **Dark Theme**: Modern developer-tool aesthetic with electric blue accents

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS
- **Mermaid.js** - Diagram rendering
- **Axios** - HTTP client
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon library

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── UploadZone.jsx         # Drag-and-drop upload component
│   │   ├── AgentTracker.jsx       # 7-agent progress tracker
│   │   ├── ArtifactsPanel.jsx     # Tabbed artifacts interface
│   │   ├── DiagramViewer.jsx      # Mermaid diagram renderer
│   │   ├── BootstrapSimulator.jsx # Before/after with log stream
│   │   └── ReportDownload.jsx     # Report download card
│   ├── pages/
│   │   ├── HomePage.jsx           # Main upload page
│   │   └── ResultsPage.jsx        # Results and analysis page
│   ├── services/
│   │   └── api.js                 # API service layer
│   ├── data/
│   │   └── mockData.js            # Mock data for all components
│   ├── App.jsx                    # Main app with routing
│   ├── main.jsx                   # React DOM entry point
│   └── index.css                  # Global Tailwind styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
└── package.json
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env.local
```

3. Update `.env.local` if you have a backend API:
```
VITE_API_URL=http://localhost:5000/api
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

## Building

Build for production:

```bash
npm run build
```

Output will be in the `dist/` directory.

Preview the production build:

```bash
npm run preview
```

## Project Pages

### Home Page (`/`)

- Large centered upload zone with drag-and-drop support
- Upload button triggers analysis
- Feature showcase with three cards
- Supported formats display

### Results Page (`/results`)

Displays complete analysis with four sections:

#### Section A: Agent Progress Tracker
- 7 animated agent cards in vertical timeline
- Each agent activates sequentially with 1.5s delay
- Shows status badges (Pending/Running/Complete)
- Animated spinner during execution

#### Section B: Artifacts Panel
Tabbed interface with 5 tabs:

1. **Requirements**
   - Actors list
   - Functional requirements
   - System constraints

2. **Architecture**
   - Recommended pattern with reasoning
   - Component breakdown with technologies

3. **Diagrams**
   - Use Case Diagram (Mermaid)
   - Class Diagram (Mermaid)
   - Sequence Diagram (Mermaid)

4. **Database**
   - ER Diagram (Mermaid)
   - SQL Schema in code block
   - Indexes and relationships

5. **Test Cases**
   - Table view with test details
   - Priority badges (Critical/High/Medium)
   - Test type and step count

#### Section C: Bootstrap Simulator
- Side-by-side Before/After states
- Animated log stream with 6 simulation lines
- Statistics display (files, folders, tickets)
- Folder structure visualization

#### Section D: Report Download
- Card indicating report is ready
- Download button for PDF report
- File size and format information

## Mock Data

The application includes comprehensive mock data for development:

- **7 Agents** - Requirements, Architecture, UML, Database, Testing, Bootstrap, Report
- **Requirements** - 3 actors, 6 functional requirements, 5 constraints
- **Architecture** - Pattern description, 7 components with technologies
- **Diagrams** - 3 Mermaid diagrams with realistic content
- **Database** - SQL schema with 4 tables and indexes, ER diagram
- **Test Cases** - 6 test cases with priorities and steps

## Styling

### Color Scheme

- **Background**: `#0f1117` (dark-bg)
- **Cards**: `#1a1d27` (dark-card)
- **Accent**: `#4f8ef7` (accent-blue)
- **Text**: White with gray shades for secondary text

### Animations

- `animate-slideInUp` - Element slides in from bottom
- `animate-spin-slow` - Slow spinning animation for agents
- `animate-pulse-glow` - Pulsing glow effect
- `animate-fadeIn` - Fade in effect for log lines

## API Integration

The `src/services/api.js` provides three main endpoints:

```javascript
uploadDocument(file)  // POST /upload
getAnalysis()         // GET /analysis
downloadReport()      // GET /download/report
```

To use live API instead of mock data:
1. Update `VITE_API_URL` in `.env.local`
2. Toggle "Use Live API" button at top of Results page

## Component Lifecycle

### Home Page Flow
1. User lands on homepage
2. Selects file via drag-drop or click
3. File validated (PDF/TXT/DOCX)
4. Navigation to `/results` page

### Results Page Flow
1. Page loads with agents in pending state
2. Agent 1 starts immediately
3. Each subsequent agent starts 1.5s after the previous
4. All artifacts become visible after agents complete
5. Bootstrap simulator runs with log stream
6. Report download card becomes interactive

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Tailwind CSS purged in production (only used styles included)
- Mermaid diagrams lazy-loaded on demand
- Code splitting for diagram renderers
- Smooth 60fps animations with GPU acceleration

## Troubleshooting

### Diagrams not rendering
- Check browser console for Mermaid errors
- Ensure diagram syntax is valid
- Clear browser cache and reload

### Slow performance
- Reduce animation complexity if needed
- Consider lazy-loading components
- Profile with browser DevTools

### CSS not applying
- Ensure Tailwind CSS is properly installed
- Check that index.css is imported in main.jsx
- Clear build cache: `rm -rf dist/`

## Environment Variables

```env
# API Base URL (default: http://localhost:5000/api)
VITE_API_URL=http://your-api-url/api
```

## Future Enhancements

- Real API backend integration
- WebSocket support for live streaming
- Export to multiple formats (PDF, DOCX, Markdown)
- Custom architecture templates
- Team collaboration features
- Architecture history and versioning
- Integration with CI/CD pipelines

## License

© 2024 ArchGen AI. All rights reserved.

## Support

For issues, questions, or feedback, please open an issue on GitHub.
