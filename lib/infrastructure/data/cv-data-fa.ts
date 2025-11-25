import { CVData, SkillCategory } from "@/lib/domain/models/Profile";

export const cvDataFa: CVData = {
  profile: {
    name: "کیهان جعفری",
    title: "توسعه‌دهنده فرانت‌اند",
    image: "/profile.jpg",
    about: `توسعه‌دهنده فرانت‌اند خلاق و دقیق با اشتیاق فراوان برای ساخت تجربه‌های دیجیتال استثنایی. من در طراحی و پیاده‌سازی برنامه‌های وب و موبایل با کارایی بالا، مقیاس‌پذیر و بصری خیره‌کننده با استفاده از جدیدترین تکنولوژی‌ها تخصص دارم.

با تسلط عمیق بر اکوسیستم React، راه‌حل‌هایی معماری می‌کنم که کد تمیز، قابلیت نگهداری و تجربه کاربری را در اولویت قرار می‌دهند. رویکرد من ترکیبی از الگوهای طراحی مدرن مانند اصول SOLID، معماری تمیز و طراحی دامنه‌محور برای ارائه برنامه‌های آماده تولید است.

من از حل مسائل پیچیده، بهینه‌سازی عملکرد و ایجاد رابط‌های کاربری یکپارچه که تأثیر واقعی دارند لذت می‌برم. چه ساخت برنامه‌های بلادرنگ باشد، چه پیاده‌سازی راه‌حل‌های پیشرفته یا طراحی لایه‌های واکنش‌گرا، تعهد و تعالی فنی را به هر پروژه می‌آورم.

در حال حاضر روی پیشرفت مهارت‌هایم در توسعه فول‌استک تمرکز دارم و در عین حال به محصولات نوآورانه‌ای که مرزهای امکانات وب را جابجا می‌کنند کمک می‌کنم.`,
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
      company: "تریتا",
      position: "تک لید فرانت‌اند",
      duration: "۱ سال",
      current: true,
      description:
        "رهبری تیم فرانت‌اند به عنوان تک لید. فعالیت در تمام حوزه‌ها شامل وب، موبایل و توسعه فول‌استک. ساخت برنامه‌های مقیاس‌پذیر و منتورینگ اعضای تیم.",
    },
    {
      id: "2",
      company: "بانیکو – بنی ارتباطات ماهان",
      position: "توسعه‌دهنده فرانت‌اند",
      duration: "۳ ماه",
      current: false,
      description:
        "توسعه سیستم‌های گیمیفیکیشن و تجربه‌های کاربری تعاملی. کار با Rancher برای مدیریت کانتینرها و استقرار.",
    },
  ],
  projects: [
    {
      id: "1",
      title: "پلتفرم آی‌لایو",
      description:
        "پلتفرم جامع پخش زنده و محتوا با قابلیت‌های بلادرنگ، پخش ویدیو و ابزارهای تعامل کاربر.",
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
      title: "پلتفرم CRM",
      description:
        "پروژه شخصی - سیستم مدیریت ارتباط با مشتری مبتنی بر معماری میکروسرویس با سرویس‌های بک‌اند متعدد.",
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
      title: "معماری فیچر تاگل",
      description:
        "سیستم مقیاس‌پذیر فیچر فلگ با پیاده‌سازی الگوهای معماری تمیز برای انتشار تدریجی و تست A/B.",
      url: "https://github.com/keihanaf/feature-toggle-architecture",
      type: "mini",
    },
    {
      id: "3",
      title: "فرم‌ساز داینامیک",
      description:
        "سیستم تولید فرم انعطاف‌پذیر با اعتبارسنجی JSON schema، فیلدهای شرطی و اعتبارسنج‌های سفارشی.",
      url: "https://github.com/keihanaf/dynamic-form-builder",
      type: "mini",
    },
    {
      id: "4",
      title: "سیستم تم واکنشی",
      description:
        "راه‌حل پیشرفته تم با متغیرهای CSS، به‌روزرسانی لحظه‌ای و ذخیره ترجیحات کاربر.",
      url: "https://github.com/keihanaf/reactive-theme-system",
      type: "mini",
    },
    {
      id: "5",
      title: "مرکز اعلان",
      description:
        "سیستم مدیریت اعلان‌های لحظه‌ای با یکپارچه‌سازی WebSocket و صف‌بندی اولویت‌دار.",
      url: "https://github.com/keihanaf/notification-center",
      type: "mini",
    },
  ],
  socials: [
    {
      id: "1",
      platform: "گیت‌هاب",
      username: "keihanaf",
      url: "https://github.com/keihanaf",
      icon: "github",
    },
    {
      id: "2",
      platform: "تلگرام",
      username: "keihanaf",
      url: "https://t.me/keihanaf",
      icon: "telegram",
    },
    {
      id: "3",
      platform: "اینستاگرام",
      username: "keihanjafari",
      url: "https://instagram.com/keihanjafari",
      icon: "instagram",
    },
    {
      id: "4",
      platform: "لینکدین",
      username: "keihan-jafari",
      url: "https://www.linkedin.com/in/keihan-jafari-8109ba336",
      icon: "linkedin",
    },
  ],
  education: [
    {
      id: "1",
      degree: "کارشناسی",
      institution: "دانشگاه آزاد اسلامی کرج",
      major: "مهندسی نرم‌افزار کامپیوتر",
      status: "دانشجوی فعلی",
    },
  ],
  contact: {
    telegram: "keihanaf",
    phone: "۰۹۳۸۱۳۸۵۹۸۴۹",
  },
};
