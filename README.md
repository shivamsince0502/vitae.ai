# Resume-AI-LaTeX

An AI-powered resume builder that generates professional LaTeX resumes with real-time preview and editing capabilities. The application allows users to either upload their existing resume or fill out a form, and then uses AI to generate a beautifully formatted LaTeX resume with multiple template options.

## 🌟 Features

- **Multiple Input Methods**: Upload existing resume (PDF/DOCX) or fill out a structured form
- **AI-Powered Content Generation**: Automatically converts raw resume text into professional LaTeX format
- **Multiple LaTeX Templates**: Choose from Professional, Modern, Academic, and Creative templates
- **Real-Time LaTeX Editor**: Built-in Monaco editor with LaTeX syntax highlighting
- **Live PDF Preview**: Instantly see how your resume looks as you make changes
- **ATS-Friendly Output**: Ensures your resume is readable by Applicant Tracking Systems
- **One-Click Download**: Easily download your resume as a PDF

## 🚀 Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Monaco Editor for LaTeX editing
- react-pdf for PDF preview

### Backend
- Node.js
- Express
- TypeScript
- OpenAI API for AI-powered content generation
- LaTeX compilation system

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- LaTeX distribution (TeX Live recommended)
  - For macOS: Install MacTeX
  - For Linux: Install TeX Live
  - For Windows: Install MiKTeX

## 📥 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/resume-ai-latex.git
   cd resume-ai-latex
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../server
   npm install
   ```

4. Set up environment variables:

   Frontend (.env.local):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3002
   ```

   Backend (.env):
   ```env
   PORT=3002
   OPENAI_API_KEY=your_openai_api_key
   ```

5. Create necessary directories:
   ```bash
   cd server/src
   mkdir temp
   mkdir uploads
   ```

## 🚀 Running the Application

1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```
   The server will start on http://localhost:3002

2. In a new terminal, start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will be available at http://localhost:3000

## 📁 Project Structure

```
resume-ai-latex/
├── frontend/                # Next.js frontend application
│   ├── src/
│   │   ├── app/            # Next.js app router
│   │   ├── components/     # React components
│   │   │   ├── editor/     # LaTeX editor components
│   │   │   └── preview/    # PDF preview components
│   │   └── styles/        # Global styles
│   └── public/            # Static assets
│
└── server/                # Express backend application
    ├── src/
    │   ├── controllers/   # Route controllers
    │   ├── services/      # Business logic
    │   ├── templates/     # LaTeX templates
    │   ├── temp/         # Temporary files
    │   └── uploads/      # Uploaded files
    └── dist/             # Compiled TypeScript
```

## 🔄 Workflow

1. **Input**:
   - Upload an existing resume (PDF/DOCX)
   - OR fill out the structured form

2. **Template Selection**:
   - Choose from multiple LaTeX templates
   - Preview template styles before selection

3. **AI Processing**:
   - AI analyzes and structures the resume content
   - Generates LaTeX code following the selected template

4. **Editing**:
   - Use the built-in LaTeX editor to make changes
   - See real-time PDF preview of changes
   - Syntax highlighting and auto-completion support

5. **Output**:
   - Download the final resume as a PDF
   - ATS-friendly formatting ensured

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
