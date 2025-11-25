# 🚀 Premium CV Website

A world-class, ultra-clean, premium personal CV website built with cutting-edge technologies and best practices. This project showcases modern web development with **Next.js 16**, **TypeScript**, **MUI**, **Framer Motion**, and follows **SOLID principles** with **Clean Architecture**.

## ✨ Features

### 🎨 Design & UX

- **Ultra-minimal & Premium Design** - Clean, elegant, and professional interface
- **Smooth 60fps Animations** - Powered by Framer Motion with scroll-reveal, stagger, and micro-interactions
- **Fully Responsive** - Perfect experience on all devices (mobile, tablet, desktop)
- **Dark/Light Mode** - Persistent theme with smooth transitions
- **RTL Support** - Full support for right-to-left languages

### 🌐 Internationalization

- **Bilingual Support** - English & Persian (Farsi) with seamless switching
- **next-intl Integration** - Professional i18n implementation
- **Custom Fonts** - Inter for English, Vazirmatn for Persian

### 🏗️ Architecture

- **Clean Architecture** - Separation of concerns with domain, application, infrastructure, and presentation layers
- **SOLID Principles** - Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **Design Patterns** - Repository, Factory, Use Case, HOC, Custom Hooks
- **Type Safety** - Full TypeScript coverage with strict mode

### 🎯 Sections

- **Header** - Animated name, title, and profile image
- **About Me** - Professional introduction
- **Skills** - Categorized technical skills (Frontend, React Ecosystem, TanStack, UI Libraries, Backend, API, Database, DevOps, Tools, Testing)
- **Experience** - Work history with current position indicator
- **Projects** - Main and mini projects with technologies
- **Code Showcase** - VS Code-style code viewer with file explorer
- **Social Media** - GitHub, Telegram, Instagram links
- **Contact** - Telegram and phone information
- **Education** - Academic background

## 🛠️ Tech Stack

### Core

- **Next.js 16** - App Router, Server Components, React 19
- **TypeScript** - Type-safe development
- **React 19** - Latest React features

### UI & Styling

- **MUI (Material-UI) v7** - Premium component library
- **Emotion** - CSS-in-JS with RTL support
- **Framer Motion** - Advanced animations

### Internationalization

- **next-intl** - i18n for Next.js
- **Custom Fonts** - Inter, Vazirmatn

### Code Quality

- **ESLint** - Code linting
- **TypeScript Strict Mode** - Maximum type safety

### Development

- **pnpm** - Fast, efficient package manager
- **Turbopack** - Next.js 16 bundler

## 📁 Project Structure

```
my-cv/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Locale-based routing
│   │   ├── layout.tsx           # Locale layout with i18n
│   │   └── page.tsx             # Main CV page
│   ├── fonts/                   # Custom fonts
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Root redirect
├── lib/                         # Clean Architecture layers
│   ├── domain/                  # Business logic & entities
│   │   ├── models/             # Domain models
│   │   └── repositories/       # Repository interfaces
│   ├── application/            # Use cases & business rules
│   │   ├── usecases/          # Application use cases
│   │   └── factories/         # Factory pattern for DI
│   ├── infrastructure/         # External concerns
│   │   ├── data/              # Data sources (EN/FA)
│   │   └── repositories/      # Repository implementations
│   └── presentation/           # UI layer
│       ├── components/        # React components
│       │   ├── atoms/        # Basic components
│       │   ├── molecules/    # Composite components
│       │   └── organisms/    # Complex components
│       ├── providers/        # Context providers
│       └── theme/            # Theme configuration
├── i18n/                       # Internationalization
│   ├── routing.ts             # i18n routing config
│   └── request.ts             # i18n request handler
├── messages/                   # Translation files
│   ├── en.json                # English translations
│   └── fa.json                # Persian translations
├── public/                     # Static assets
└── proxy.ts                    # Next.js 16 proxy (middleware)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd my-cv

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Build for Production

```bash
# Build the project
pnpm build

# Start production server
pnpm start
```

## 🎨 Customization

### Update Personal Information

Edit the data files with your information:

**English:** `lib/infrastructure/data/cv-data-en.ts`
**Persian:** `lib/infrastructure/data/cv-data-fa.ts`

Update:

- Profile (name, title, image, about)
- Skills (categorized by type)
- Work experiences
- Projects (main and mini)
- Social media links
- Contact information
- Education

### Replace Profile Image

Replace `/public/profile.jpg` with your profile photo (recommended: 400x400px).

### Customize Theme

Modify theme tokens in `lib/presentation/theme/theme.ts`:

- Colors (primary, secondary, background, text)
- Typography (font families, sizes, weights)
- Spacing
- Border radius
- Transitions

### Add New Sections

1. Create component in `lib/presentation/components/organisms/`
2. Import and use in `app/[locale]/page.tsx`
3. Add translations if needed in `messages/`

## 🎯 Key Features Explained

### Clean Architecture

The project follows Clean Architecture principles with clear separation:

- **Domain Layer**: Business entities and repository interfaces
- **Application Layer**: Use cases and business logic
- **Infrastructure Layer**: Data sources and external services
- **Presentation Layer**: UI components and user interactions

### SOLID Principles

- **Single Responsibility**: Each component/class has one reason to change
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Subtypes must be substitutable for their base types
- **Interface Segregation**: Clients shouldn't depend on interfaces they don't use
- **Dependency Inversion**: Depend on abstractions, not concretions

### Code Showcase

The Code Showcase section features:

- VS Code-style interface with file explorer
- 5 example files demonstrating design patterns
- Syntax highlighting with line numbers
- Copy-to-clipboard functionality
- Pattern tags for each file
- Fully responsive (drawer on mobile)

### Animations

Powered by Framer Motion:

- Staggered list animations
- Scroll-reveal effects
- Smooth page transitions
- Hover interactions
- Spring animations

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

The project can be deployed to:

- Netlify
- AWS Amplify
- Cloudflare Pages
- Any Node.js hosting platform

## 📝 Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## 🤝 Contributing

This is a personal CV project, but feel free to fork and customize for your own use!

## 📄 License

MIT License - feel free to use this project as a template for your own CV.

## 👤 Author

**Keihan Jafari**

- GitHub: [@keihanaf](https://github.com/keihanaf)
- Telegram: [@keihanaf](https://t.me/keihanaf)
- Instagram: [@keihanjafari](https://instagram.com/keihanjafari)

---

Built with ❤️ using Next.js 16, TypeScript, MUI, and Framer Motion
