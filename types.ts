export interface PracticeAreaContent {
  id: string;
  title: string;
  shortDescription: string;
  slug: string;
  iconName: string; // Using string to map to lucide icons
  heroImage: string;
  intro: string;
  whatIsIt: string;
  commonCases: {
    title: string;
    description: string;
  }[];
  checklist: string[];
  howWeHelp: string;
  keywords: string[];
}

export interface Testimonial {
  name: string;
  text: string;
  location: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface NavLink {
  label: string;
  path: string;
  children?: NavLink[];
}