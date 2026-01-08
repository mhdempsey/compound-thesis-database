export type ThesisCategory =
  | "Healthcare"
  | "AI/ML"
  | "Bio"
  | "Robotics"
  | "Crypto"
  | "Other";

export type ThesisStatus =
  | "Open Questions/Abstract"
  | "Idea"
  | "In Progress"
  | "Ready to Publish"
  | "Shareable Privately";

export interface Thesis {
  id: string;
  slug: string;
  name: string;
  oneLiner: string;
  categories: ThesisCategory[];
  status: ThesisStatus;
  publicationDate: string | null;
  link: string | null;
  assignedTo: string | null;
  coverImage: string | null;
  createdAt: string;
  lastEditedAt: string;
}

export interface ThesisWithContent extends Thesis {
  content: NotionBlock[];
}

export interface NotionBlock {
  id: string;
  type: string;
  content: Record<string, unknown>;
  children?: NotionBlock[];
}

export type ViewMode = "grid" | "timeline";

export interface FilterState {
  categories: ThesisCategory[];
  searchQuery: string;
  viewMode: ViewMode;
}

// Category color mappings for badges
export const categoryColors: Record<ThesisCategory, { bg: string; text: string }> = {
  Healthcare: { bg: "bg-emerald-100", text: "text-emerald-800" },
  "AI/ML": { bg: "bg-blue-100", text: "text-blue-800" },
  Bio: { bg: "bg-purple-100", text: "text-purple-800" },
  Robotics: { bg: "bg-orange-100", text: "text-orange-800" },
  Crypto: { bg: "bg-yellow-100", text: "text-yellow-800" },
  Other: { bg: "bg-gray-100", text: "text-gray-800" },
};

// All available categories
export const allCategories: ThesisCategory[] = [
  "Healthcare",
  "AI/ML",
  "Bio",
  "Robotics",
  "Crypto",
  "Other",
];
