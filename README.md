# Glow AI - Skincare Assistant

A modern web application that uses AI to provide personalized skincare analysis and recommendations. The application combines computer vision for skin analysis with an AI-powered chat interface to help users understand and improve their skincare routine.

## 👨‍💻 Author
- **Gaurav Prakash**
  - GitHub: [gaurav241102](https://github.com/gaurav241102)
  - X (Twitter): [@bingie_brinjal](https://x.com/bingie_brinjal)
  - LinkedIn: [gaurav-prakash-97071a199](https://linkedin.com/in/gaurav-prakash-97071a199)

## 🔗 Repository
- [Glow AI Repository](https://github.com/gaurav241102/Glow-AI-)

## 🌟 Features

- **AI-Powered Skin Analysis**: Upload images of your skin to receive detailed analysis and insights
- **Interactive Chat Interface**: Get personalized skincare advice through an AI chat assistant powered by Mistral-Small-3.1-24B-Instruct-2503
- **Progress Tracking**: Monitor your skincare journey with visual progress charts
- **Personalized Recommendations**: Receive tailored product and routine suggestions
- **User Onboarding**: Guided setup process to understand your skin type and concerns
- **Modern UI/UX**: Built with React, TypeScript, and Tailwind CSS for a beautiful user experience

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios for API calls

### Backend
- FastAPI (Python)
- Hugging Face Transformers
- Mistral-Small-3.1-24B-Instruct-2503 for AI-powered chat and analysis
- Pillow for image processing
- Uvicorn ASGI server

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8 or higher
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gaurav241102/Glow-AI-
cd Glow-AI-
```

2. Install frontend dependencies:
```bash
npm install
```

3. Set up the Python virtual environment and install backend dependencies:
```bash
cd backend
python -m venv skincare_env
source skincare_env/bin/activate  # On Windows: skincare_env\Scripts\activate
pip install -r requirements.txt
```

4. Create a `.env` file in the backend directory with your Hugging Face API key:
```
HUGGINGFACE_API_KEY=your_api_key_here
```

### Running the Application

1. Start the backend server:
```bash
npm run start:backend
```

2. In a new terminal, start the frontend development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
project/
├── backend/
│   ├── main.py              # FastAPI application entry point
│   ├── models.py            # Data models and schemas
│   ├── requirements.txt     # Python dependencies
│   └── services/           # Backend services
│       ├── huggingface_service.py
│       └── image_service.py
├── src/
│   ├── components/         # React components
│   │   ├── features/      # Feature-specific components
│   │   ├── layout/        # Layout components
│   │   └── ui/            # Reusable UI components
│   ├── pages/             # Page components
│   ├── services/          # Frontend services
│   └── types/             # TypeScript type definitions
└── package.json           # Node.js dependencies and scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start the frontend development server
- `npm run build` - Build the frontend for production
- `npm run lint` - Run ESLint for code linting
- `npm run preview` - Preview the production build
- `npm run start:backend` - Start the backend server

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- Hugging Face for providing the AI models
- Mistral AI for the Mistral-Small-3.1-24B-Instruct-2503 model
- The open-source community for the amazing tools and libraries 
