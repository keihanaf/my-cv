import { UseCaseFactory } from "@/lib/application/factories/UseCaseFactory";
import { Header } from "@/lib/presentation/components/organisms/Header";
import { AboutSection } from "@/lib/presentation/components/organisms/AboutSection";
import { SkillsSection } from "@/lib/presentation/components/organisms/SkillsSection";
import { ExperienceSection } from "@/lib/presentation/components/organisms/ExperienceSection";
import { ProjectsSection } from "@/lib/presentation/components/organisms/ProjectsSection";
import { SocialsSection } from "@/lib/presentation/components/organisms/SocialsSection";
import { ContactSection } from "@/lib/presentation/components/organisms/ContactSection";
import { EducationSection } from "@/lib/presentation/components/organisms/EducationSection";
import { CodeShowcase } from "@/lib/presentation/components/organisms/CodeShowcase";
import { SkillCategory } from "@/lib/domain/models/Profile";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const useCase = UseCaseFactory.createGetCVDataUseCase();
  const cvData = await useCase.execute(locale);

  return (
    <>
      <Header
        name={cvData.profile.name}
        title={cvData.profile.title}
        image={cvData.profile.image}
        locale={locale}
      />

      <AboutSection
        about={cvData.profile.about}
        title={locale === "fa" ? "درباره من" : "About Me"}
      />

      <SkillsSection
        skills={cvData.skills}
        title={locale === "fa" ? "مهارت‌ها" : "Skills"}
        categoryLabels={{
          [SkillCategory.FRONTEND]:
            locale === "fa" ? "فرانت‌اند" : "Frontend Core",
          [SkillCategory.REACT_ECOSYSTEM]:
            locale === "fa" ? "اکوسیستم ری‌اکت" : "React Ecosystem",
          [SkillCategory.TANSTACK]: locale === "fa" ? "تن‌استک" : "TanStack",
          [SkillCategory.UI_LIBRARIES]:
            locale === "fa" ? "کتابخانه‌های UI" : "UI Libraries",
          [SkillCategory.BACKEND]:
            locale === "fa" ? "بک‌اند" : "Backend & Runtime",
          [SkillCategory.API]:
            locale === "fa" ? "API و ارتباطات" : "API & Communication",
          [SkillCategory.DATABASE]:
            locale === "fa" ? "پایگاه داده" : "Database & ORM",
          [SkillCategory.DEVOPS]: locale === "fa" ? "دواپس" : "DevOps & CI/CD",
          [SkillCategory.TOOLS]: locale === "fa" ? "ابزارها" : "Tools",
          [SkillCategory.TESTING]: locale === "fa" ? "تست" : "Testing",
        }}
      />

      <ExperienceSection
        experiences={cvData.experiences}
        title={locale === "fa" ? "تجربیات" : "Experience"}
        currentLabel={locale === "fa" ? "فعلی" : "Current"}
      />

      <ProjectsSection
        projects={cvData.projects}
        mainTitle={locale === "fa" ? "پروژه‌های اصلی" : "Main Projects"}
        miniTitle={locale === "fa" ? "پروژه‌های کوچک" : "Mini Projects"}
        viewProjectLabel={locale === "fa" ? "مشاهده پروژه" : "View Project"}
      />

      <CodeShowcase title={locale === "fa" ? "نمونه کد" : "Code Showcase"} />

      <SocialsSection
        socials={cvData.socials}
        title={locale === "fa" ? "شبکه‌های اجتماعی" : "Social Media"}
      />

      <ContactSection
        contact={cvData.contact}
        title={locale === "fa" ? "تماس با من" : "Contact Me"}
        telegramLabel={locale === "fa" ? "تلگرام" : "Telegram"}
        phoneLabel={locale === "fa" ? "تلفن" : "Phone"}
      />

      <EducationSection
        education={cvData.education}
        title={locale === "fa" ? "تحصیلات" : "Education"}
      />
    </>
  );
}
