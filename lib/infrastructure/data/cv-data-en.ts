import { CVData, SkillCategory } from "@/lib/domain/models/Profile";

export const cvDataEn: CVData = {
  profile: {
    name: "Keihan Jafari",
    title: "Frontend Developer",
    image: "/profile.jpg",
    about: `Creative and detail-oriented Frontend Developer with a strong passion for building exceptional digital experiences. I specialize in crafting high-performance, scalable, and visually stunning web and mobile applications using cutting-edge technologies.

With deep expertise in React ecosystem, I architect solutions that prioritize clean code, maintainability, and user experience. My approach combines modern design patterns like SOLID principles, Clean Architecture, and Domain-Driven Design to deliver production-ready applications.

I thrive on solving complex problems, optimizing performance, and creating seamless user interfaces that make a real impact. Whether it's building real-time applications, implementing sophisticated solutions, or designing responsive layouts, I bring dedication and technical excellence to every project.

Currently focused on advancing my skills in full-stack development while contributing to innovative products that push the boundaries of what's possible on the web.`,
  },
  skills: [
    // Frontend Core
    { id: "1", name: "HTML5", category: SkillCategory.FRONTEND },
    { id: "2", name: "CSS3", category: SkillCategory.FRONTEND },
    { id: "3", name: "JavaScript (ES6+)", category: SkillCategory.FRONTEND },
    { id: "4", name: "TypeScript", category: SkillCategory.FRONTEND },

    // React Ecosystem
    { id: "5", name: "React", category: SkillCategory.REACT_ECOSYSTEM },
    { id: "6", name: "Next.js", category: SkillCategory.REACT_ECOSYSTEM },
    { id: "7", name: "React Native", category: SkillCategory.REACT_ECOSYSTEM },
    { id: "8", name: "Expo", category: SkillCategory.REACT_ECOSYSTEM },
    {
      id: "9",
      name: "Redux / Redux Toolkit",
      category: SkillCategory.REACT_ECOSYSTEM,
    },

    // TanStack
    { id: "10", name: "TanStack Query", category: SkillCategory.TANSTACK },
    { id: "11", name: "TanStack Router", category: SkillCategory.TANSTACK },
    { id: "12", name: "TanStack Table", category: SkillCategory.TANSTACK },
    { id: "13", name: "TanStack Form", category: SkillCategory.TANSTACK },
    { id: "14", name: "TanStack Store", category: SkillCategory.TANSTACK },
    { id: "15", name: "TanStack DB", category: SkillCategory.TANSTACK },

    // UI Libraries
    {
      id: "16",
      name: "MUI (Material-UI)",
      category: SkillCategory.UI_LIBRARIES,
    },
    { id: "17", name: "Ant Design", category: SkillCategory.UI_LIBRARIES },
    { id: "18", name: "TailwindCSS", category: SkillCategory.UI_LIBRARIES },
    { id: "19", name: "Framer Motion", category: SkillCategory.UI_LIBRARIES },

    // Backend & Runtime
    { id: "20", name: "Node.js", category: SkillCategory.BACKEND },
    { id: "21", name: "Express.js", category: SkillCategory.BACKEND },

    // API & Communication
    { id: "22", name: "REST API", category: SkillCategory.API },
    { id: "23", name: "GraphQL", category: SkillCategory.API },
    { id: "24", name: "WebSocket", category: SkillCategory.API },

    // Database & ORM
    { id: "25", name: "PostgreSQL", category: SkillCategory.DATABASE },
    { id: "26", name: "SQLite", category: SkillCategory.DATABASE },
    { id: "27", name: "Prisma ORM", category: SkillCategory.DATABASE },
    { id: "28", name: "Redis", category: SkillCategory.DATABASE },

    // DevOps & Tools
    { id: "29", name: "Docker", category: SkillCategory.DEVOPS },
    { id: "30", name: "Git", category: SkillCategory.DEVOPS },
    { id: "31", name: "GitLab", category: SkillCategory.DEVOPS },
    { id: "32", name: "CI/CD", category: SkillCategory.DEVOPS },
    { id: "33", name: "Rancher", category: SkillCategory.DEVOPS },

    // Tools
    { id: "34", name: "RabbitMQ", category: SkillCategory.TOOLS },
    { id: "35", name: "WordPress REST API", category: SkillCategory.TOOLS },

    // Testing
    { id: "36", name: "Jest", category: SkillCategory.TESTING },
    {
      id: "37",
      name: "React Testing Library",
      category: SkillCategory.TESTING,
    },
  ],
  experiences: [
    {
      id: "1",
      company: "Treata",
      position: "Frontend Tech Lead",
      duration: "1 year",
      current: true,
      description:
        "Leading the frontend team as Tech Lead. Working across all areas including web, mobile, and full-stack development. Building scalable applications and mentoring team members.",
    },
    {
      id: "2",
      company: "Banico – Bani Ertebatat Mahan",
      position: "Frontend Developer",
      duration: "3 months",
      current: false,
      description:
        "Developed gamification systems and interactive user experiences. Worked with Rancher for container orchestration and deployment.",
    },
  ],
  projects: [
    {
      id: "1",
      title: "iLive Platform",
      description:
        "A comprehensive live streaming and content platform with real-time features, video playback, and interactive user engagement tools.",
      url: "https://app.ilive.ir",
      type: "main",
      technologies: [
        "React",
        "JavaScript",
        "Redux",
        "React Query",
        "WebSocket",
        "Microservices",
        "Micro Frontend",
      ],
    },
    {
      id: "6",
      title: "CRM Platform",
      description:
        "Personal project - A microservices-based Customer Relationship Management system built with a distributed architecture and multiple backend services.",
      url: "https://customer-relationship-management-one.vercel.app/login",
      type: "main",
      technologies: [
        "Next.js",
        "TypeScript",
        "Dart",
        "FastAPI",
        "Node.js",
        "Microservices",
      ],
    },
    {
      id: "2",
      title: "Feature Toggle Architecture",
      description:
        "Scalable feature flag system implementing clean architecture patterns for gradual feature rollouts and A/B testing.",
      url: "https://github.com/keihanaf/feature-toggle-architecture",
      type: "mini",
    },
    {
      id: "3",
      title: "Dynamic Form Builder",
      description:
        "Flexible form generation system with JSON schema validation, conditional fields, and custom validators.",
      url: "https://github.com/keihanaf/dynamic-form-builder",
      type: "mini",
    },
    {
      id: "4",
      title: "Reactive Theme System",
      description:
        "Advanced theming solution with CSS variables, real-time updates, and persistent user preferences.",
      url: "https://github.com/keihanaf/reactive-theme-system",
      type: "mini",
    },
    {
      id: "5",
      title: "Notification Center",
      description:
        "Real-time notification management system with WebSocket integration and priority queuing.",
      url: "https://github.com/keihanaf/notification-center",
      type: "mini",
    },
  ],
  socials: [
    {
      id: "1",
      platform: "GitHub",
      username: "keihanaf",
      url: "https://github.com/keihanaf",
      icon: "github",
    },
    {
      id: "2",
      platform: "Telegram",
      username: "keihanaf",
      url: "https://t.me/keihanaf",
      icon: "telegram",
    },
    {
      id: "3",
      platform: "Instagram",
      username: "keihanjafari",
      url: "https://instagram.com/keihanjafari",
      icon: "instagram",
    },
    {
      id: "4",
      platform: "LinkedIn",
      username: "keihan-jafari",
      url: "https://www.linkedin.com/in/keihan-jafari-8109ba336",
      icon: "linkedin",
    },
  ],
  education: [
    {
      id: "1",
      degree: "Bachelor's Degree",
      institution: "Islamic Azad University of Karaj",
      major: "Computer Software Engineering",
      status: "Current Student",
    },
  ],
  contact: {
    telegram: "keihanaf",
    phone: "09381385984",
  },
};
