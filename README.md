# AI Trip Planner 🌍✈️

An intelligent travel planning application that helps users create personalized trip itineraries using AI. The application features a modern React frontend and an Express backend powered by Google's Generative AI.

## Features 🚀

- Interactive trip planning interface
- AI-powered itinerary generation
- Google Places integration for location search
- Real-time itinerary updates
- User authentication via Supabase

## Tech Stack 💻

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router DOM
- Supabase Auth
- Framer Motion for animations
- Google Places Autocomplete

### Backend
- Node.js with Express
- TypeScript
- Google's Generative AI
- Environment variable management with dotenv

## Getting Started 🏁

### Prerequisites
- Node.js (Latest LTS version)
- pnpm package manager
- Google Generative AI API key
- Supabase account and credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/patelalay231/AI-Trip-Planner.git
cd ai-trip-planner
```

2. Frontend Setup:
```bash
cd frontend
pnpm install
cp .env.example .env # Configure your environment variables
pnpm dev
```

3. Backend Setup:
```bash
cd backend
pnpm install
cp .env.example .env # Configure your environment variables
pnpm dev
```

## Environment Variables 🔐

### Frontend (.env)
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_BACKEND_URL=your_backend_url
```

### Backend (.env)
```
GOOGLE_API_KEY=your_google_ai_api_key
```

## Scripts 📜

### Frontend
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

### Backend
- `pnpm dev` - Start development server with hot-reload

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the ISC License.

## Acknowledgments 🙏

- Google Generative AI for powering the intelligent trip planning
- Supabase for authentication services
- All contributors and supporters of the project
