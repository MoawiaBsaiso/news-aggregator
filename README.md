# 🌍 News Aggregator

A modern, full-featured news aggregation web application built with React, TypeScript, and Redux Toolkit — featuring a stunning Three.js-inspired hero animation and real-time news from around the world.

🔗 **[Live Demo](https://news-aggregator-roan-kappa.vercel.app/)** | 💻 **[Source Code](https://github.com/MoawiaBsaiso/news-aggregator)**

---

## ✨ Features

- 🌐 **Real-time News** — Top headlines from trusted global sources via GNews API
- 🔍 **Search & Filter** — Search by keyword or filter by category
- 🔖 **Bookmarks** — Save articles with localStorage persistence
- 🌙 **Dark / Light Mode** — Smooth theme switching
- 📱 **Fully Responsive** — Works on all screen sizes
- ⚡ **Optimized Performance** — Loading states, error handling, pagination

---

## 🏗️ Architecture

```
src/
├── app/               # Redux store configuration
├── features/          # Feature-based slices (news, filters, bookmarks, ui)
├── services/          # API client, GNews service, DTO mapper
├── components/        # Reusable UI components
├── pages/             # Route-level page components
├── hooks/             # Custom React hooks (useNews, useFilters, useBookmarks)
└── utils/             # Constants and shared utilities
```

**Key architectural decisions:**
- **Feature-based folder structure** — each feature owns its slice, service, and types
- **DTO Mapper pattern** — raw API responses are mapped to clean internal models before entering the store
- **Custom Hooks as abstraction layer** — components never interact with Redux directly
- **Vercel Proxy** — serverless rewrites handle CORS for production API calls

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| State Management | Redux Toolkit |
| Routing | React Router v6 |
| Styling | Tailwind CSS v4 |
| HTTP Client | Axios |
| Animation | CSS Animations + Custom Hero |
| Build Tool | Vite |
| Deployment | Vercel |
| News API | GNews API |

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/MoawiaBsaiso/news-aggregator.git
cd news-aggregator

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Add your GNews API key → https://gnews.io

# 4. Start development server
npm run dev
```

### Environment Variables

```env
VITE_GNEWS_API_KEY=your_gnews_api_key_here
```

---

## 📐 Design Patterns

### DTO Mapper
Raw API responses are normalized before entering the Redux store:
```typescript
API Response → newsMapper.ts → Article Model → Redux Store → Components
```

### Custom Hooks
Components stay clean by consuming hooks instead of Redux directly:
```typescript
const { articles, status, error } = useNews();
const { toggleBookmark, isBookmarked } = useBookmarks();
```

### Vercel Proxy (CORS Solution)
```
Browser → /api/news/* (Vercel Rewrite) → gnews.io ✅
```

---

## 📸 Screenshots

> Coming soon

---

## 🗺️ Roadmap

<!-- - [ ] Three.js Globe animation -->
- [ ] User authentication
- [ ] Personalized news feed
- [ ] PWA support
- [ ] Unit & integration tests

---

## 👨‍💻 Author

**Moawia S. K. Bsaiso**
- 📧 moawia.b56@gmail.com
- 🔗 [LinkedIn](https://www.linkedin.com/in/moawia-bsaiso-1a8a58247)
- 🐙 [GitHub](https://github.com/MoawiaBsaiso)

---

## 📄 License

MIT License — feel free to use this project as a reference or template.