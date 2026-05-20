# ArchGen AI Frontend - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The app will open at **http://localhost:5173/**

### Step 3: Upload a Document
1. Go to the homepage
2. Drag-and-drop a PDF, TXT, or DOCX file
3. Watch the AI agents analyze your architecture in real-time

## 📁 What's Included

### Components (6 files)
- `UploadZone` - Drag-and-drop file upload
- `AgentTracker` - 7 animated agent progress cards
- `ArtifactsPanel` - 5-tab artifact viewer
- `DiagramViewer` - Mermaid diagram renderer
- `BootstrapSimulator` - Before/after animation
- `ReportDownload` - Report download card

### Pages (2 files)
- `HomePage` - Upload interface with features
- `ResultsPage` - Complete analysis results

### Core Files
- `App.jsx` - React Router setup
- `main.jsx` - React entry point
- `index.css` - Tailwind + custom styles
- `mockData.js` - Realistic sample data
- `api.js` - API service layer

## 🎨 Design Features

✅ Dark theme (#0f1117 background)
✅ Electric blue accents (#4f8ef7)
✅ Smooth animations and transitions
✅ Responsive design (mobile, tablet, desktop)
✅ Professional developer tools aesthetic

## 📊 Agent Timeline

Agents activate sequentially with 1.5s delay:
1. Requirements Analysis (0s)
2. Architecture Advisor (1.5s)
3. UML Generation (3s)
4. Database Design (4.5s)
5. Testing (6s)
6. Project Bootstrap (7.5s)
7. Report Builder (9s)

## 📑 Artifacts Available

After agents complete, view:
- **Requirements** - Actors, functional requirements, constraints
- **Architecture** - Pattern, reasoning, components
- **Diagrams** - Use case, class, and sequence diagrams
- **Database** - ER diagram and SQL schema
- **Tests** - Test cases with priority levels

## 🔧 Configuration

### Environment Variables
Create `.env.local`:
```
VITE_API_URL=http://localhost:5000/api
```

### Build for Production
```bash
npm run build
npm run preview
```

## 📚 Mock Data Highlights

- 7 AI agents with descriptions
- 3 actor personas
- 6 functional requirements
- 5 system constraints
- 7 architecture components
- 3 Mermaid diagrams
- 4 database tables with schema
- 6 test cases with priorities

## 🐛 Troubleshooting

**Port 5173 already in use?**
```bash
npm run dev -- --port 3000
```

**Mermaid diagrams not showing?**
- Check browser console for errors
- Ensure valid diagram syntax
- Clear cache: `Ctrl+Shift+Delete`

**Tailwind styles not applying?**
- Rebuild: `npm run build`
- Check index.css is imported

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 🎯 Next Steps

1. ✅ Explore the Results page with mock data
2. ✅ Review all diagram types
3. ✅ Check test case examples
4. ✅ Try downloading the report
5. Connect to your backend API

## 🔌 API Integration

Replace mock data with live API by:
1. Setting `VITE_API_URL` to your backend
2. Clicking "Use Live API" toggle on Results page
3. Backend should respond with same data structure as mock

## 📧 Need Help?

- Check the README.md for detailed docs
- Review mockData.js for data structure
- Inspect browser console for errors

Happy architecture generating! 🎉
