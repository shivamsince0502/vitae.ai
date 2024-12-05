# LaTeXpert - AI-Powered Resume Builder

LaTeXpert is a modern, AI-powered resume builder that helps professionals create beautiful, ATS-friendly resumes using LaTeX technology. Built with Next.js 14 and TypeScript, it offers an intuitive interface while leveraging the power of AI to enhance resume content.

## 🌟 Features

- **AI-Powered Content Enhancement**: Get smart suggestions to improve your resume content
- **LaTeX-Based PDF Generation**: Professional, perfectly formatted resumes
- **Multi-Step Form Interface**: Easy-to-use, intuitive resume creation process
- **Real-Time Preview**: See your changes instantly
- **ATS-Friendly**: Ensures your resume passes Applicant Tracking Systems
- **Dark Mode Support**: Comfortable editing experience
- **Responsive Design**: Works on all devices

## 🚀 Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components

### Backend
- Node.js
- Express
- TypeScript
- Firebase Admin SDK

### Infrastructure
- Firebase Authentication
- Firebase Storage
- LaTeX Engine

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/latexpert.git
   cd latexpert
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Frontend (.env.local)
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_FIREBASE_CONFIG=your_firebase_config

   # Backend (.env)
   PORT=3001
   FIREBASE_ADMIN_CONFIG=your_firebase_admin_config
   ```

4. Run the development servers:
   ```bash
   # Frontend (http://localhost:3000)
   cd frontend
   npm run dev

   # Backend (http://localhost:3001)
   cd server
   npm run dev
   ```

## 📁 Project Structure

```
latexpert/
├── frontend/              # Next.js frontend application
│   ├── src/
│   │   ├── app/          # Next.js 14 app directory
│   │   ├── components/   # React components
│   │   ├── lib/         # Utility functions
│   │   └── styles/      # Global styles
│   └── public/          # Static assets
│
└── server/              # Express backend application
    ├── src/
    │   ├── controllers/ # Route controllers
    │   ├── services/    # Business logic
    │   ├── middleware/  # Custom middleware
    │   └── templates/   # LaTeX templates
    └── dist/           # Compiled TypeScript
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Firebase](https://firebase.google.com/)
- [LaTeX](https://www.latex-project.org/)
