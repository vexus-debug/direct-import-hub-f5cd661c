/**
 * Tutorial framework data.
 *
 * Structure: clinic type -> section (process / flow / setup area) -> tutorials.
 * Tutorials are intentionally empty for now — add entries to `tutorials`
 * inside each section and the public pages pick them up automatically.
 */

export type TutorialStep = {
  title: string;
  body: string;
};

export type Tutorial = {
  slug: string;
  title: string;
  summary: string;
  /** Estimated reading / doing time, e.g. "5 min" */
  duration?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  steps?: TutorialStep[];
};

export type TutorialSection = {
  slug: string;
  title: string;
  description: string;
  tutorials: Tutorial[];
};

export type ClinicTutorialType = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** lucide-react icon name used by the pages */
  icon: "Smile" | "Eye";
  sections: TutorialSection[];
};

/** Sections every clinic type starts with. Duplicated per type so each can diverge. */
const baseSections = (): TutorialSection[] => [
  {
    slug: "getting-started",
    title: "Getting Started",
    description: "Create your clinic, invite your team and find your way around the dashboard.",
    tutorials: [],
  },
  {
    slug: "setup",
    title: "Setup & Configuration",
    description: "Clinic details, branding, working hours, services, pricing and roles.",
    tutorials: [],
  },
  {
    slug: "patients",
    title: "Patients & Records",
    description: "Registering patients, medical records, documents and history.",
    tutorials: [],
  },
  {
    slug: "appointments",
    title: "Appointments & Scheduling",
    description: "Booking flows, calendars, reminders and no-show handling.",
    tutorials: [],
  },
  {
    slug: "clinical-flow",
    title: "Clinical Workflow",
    description: "From check-in to consultation, treatment notes and follow-up.",
    tutorials: [],
  },
  {
    slug: "billing",
    title: "Billing & Payments",
    description: "Invoices, payments, expenses and financial reporting.",
    tutorials: [],
  },
  {
    slug: "inventory",
    title: "Inventory & Supplies",
    description: "Stock items, reorder levels, suppliers and expiry tracking.",
    tutorials: [],
  },
  {
    slug: "reports",
    title: "Reports & Insights",
    description: "Understanding your dashboard metrics and exporting reports.",
    tutorials: [],
  },
];

export const tutorialClinicTypes: ClinicTutorialType[] = [
  {
    slug: "dental-clinics",
    name: "Dental Clinics",
    tagline: "Set up charting, treatment plans and recalls.",
    description:
      "Step-by-step guides for dental practices: from first login to running multi-visit treatment plans, recalls and billing.",
    icon: "Smile",
    sections: baseSections(),
  },
  {
    slug: "eye-clinics",
    name: "Eye Care & Optometry",
    tagline: "Set up refraction records, lens inventory and referrals.",
    description:
      "Step-by-step guides for optometry and eye care practices: prescriptions, visual acuity records, lens stock and referrals.",
    icon: "Eye",
    sections: baseSections(),
  },
];

export const getClinicType = (slug?: string) =>
  tutorialClinicTypes.find((c) => c.slug === slug);

export const getSection = (clinicSlug?: string, sectionSlug?: string) =>
  getClinicType(clinicSlug)?.sections.find((s) => s.slug === sectionSlug);

export const getTutorial = (
  clinicSlug?: string,
  sectionSlug?: string,
  tutorialSlug?: string,
) => getSection(clinicSlug, sectionSlug)?.tutorials.find((t) => t.slug === tutorialSlug);

export const countTutorials = (clinic: ClinicTutorialType) =>
  clinic.sections.reduce((total, section) => total + section.tutorials.length, 0);
