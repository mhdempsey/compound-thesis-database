import { notion, databaseId } from "./notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { Thesis, ThesisCategory, NotionBlock } from "@/types/thesis";

// Transform a Notion page to our Thesis type
export function transformNotionPageToThesis(page: PageObjectResponse): Thesis {
  const properties = page.properties;

  // Extract title (Name)
  const nameProperty = properties["Name"];
  const name =
    nameProperty.type === "title"
      ? nameProperty.title.map((t) => t.plain_text).join("")
      : "";

  // Extract rich_text (One-Liner)
  const oneLinerProperty = properties["One-Liner"];
  const oneLiner =
    oneLinerProperty?.type === "rich_text"
      ? oneLinerProperty.rich_text.map((t) => t.plain_text).join("")
      : "";

  // Extract multi_select (Category)
  const categoryProperty = properties["Category"];
  const categories: ThesisCategory[] =
    categoryProperty?.type === "multi_select"
      ? categoryProperty.multi_select.map((c) => c.name as ThesisCategory)
      : [];

  // Extract select (Status)
  const statusProperty = properties["Status"];
  const status =
    statusProperty?.type === "select"
      ? statusProperty.select?.name || "In Progress"
      : "In Progress";

  // Extract date (Publication Date)
  const dateProperty = properties["Publication Date"];
  const publicationDate =
    dateProperty?.type === "date" ? dateProperty.date?.start || null : null;

  // Extract url (Link)
  const linkProperty = properties["Link"];
  const link = linkProperty?.type === "url" ? linkProperty.url : null;

  // Extract person (Assign)
  const assignProperty = properties["Assign"];
  const assignedTo =
    assignProperty?.type === "people" && assignProperty.people.length > 0
      ? (assignProperty.people[0] as { name?: string }).name || null
      : null;

  // Extract cover image
  let coverImage: string | null = null;
  if (page.cover) {
    if (page.cover.type === "external") {
      coverImage = page.cover.external.url;
    } else if (page.cover.type === "file") {
      coverImage = page.cover.file.url;
    }
  }

  // Generate slug from name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return {
    id: page.id,
    slug,
    name,
    oneLiner,
    categories,
    status: status as Thesis["status"],
    publicationDate,
    link,
    assignedTo,
    coverImage,
    createdAt: page.created_time,
    lastEditedAt: page.last_edited_time,
  };
}

// Fetch all published theses from Notion
export async function getPublishedTheses(): Promise<Thesis[]> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Status",
        select: {
          equals: "Ready to Publish",
        },
      },
      sorts: [
        {
          property: "Publication Date",
          direction: "descending",
        },
      ],
    });

    return response.results
      .filter((page): page is PageObjectResponse => "properties" in page)
      .map(transformNotionPageToThesis);
  } catch (error) {
    console.error("Error fetching theses from Notion:", error);
    return [];
  }
}

// Fetch a single thesis by its slug
export async function getThesisBySlug(slug: string): Promise<Thesis | null> {
  // Since Notion doesn't support slug queries directly, fetch all and filter
  const theses = await getPublishedTheses();
  return theses.find((t) => t.slug === slug) || null;
}

// Fetch page content blocks
export async function getPageBlocks(pageId: string): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = [];
  let cursor: string | undefined;

  try {
    do {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
        page_size: 100,
      });

      for (const block of response.results) {
        if ("type" in block) {
          const blockType = block.type as string;
          const notionBlock: NotionBlock = {
            id: block.id,
            type: blockType,
            content: block[blockType as keyof typeof block] as Record<string, unknown>,
          };

          // Recursively fetch children if present
          if ("has_children" in block && block.has_children) {
            notionBlock.children = await getPageBlocks(block.id);
          }

          blocks.push(notionBlock);
        }
      }

      cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
    } while (cursor);
  } catch (error) {
    console.error("Error fetching page blocks:", error);
  }

  return blocks;
}

// Get related theses (same category, excluding current)
export async function getRelatedTheses(
  currentThesis: Thesis,
  limit: number = 3
): Promise<Thesis[]> {
  if (currentThesis.categories.length === 0) {
    // If no categories, return random theses
    const allTheses = await getPublishedTheses();
    return allTheses
      .filter((t) => t.id !== currentThesis.id)
      .slice(0, limit);
  }

  const allTheses = await getPublishedTheses();

  return allTheses
    .filter((t) => t.id !== currentThesis.id)
    .filter((t) =>
      t.categories.some((c) => currentThesis.categories.includes(c))
    )
    .slice(0, limit);
}

// Client-side search through theses
export function searchTheses(theses: Thesis[], query: string): Thesis[] {
  const lowercaseQuery = query.toLowerCase().trim();
  if (!lowercaseQuery) return theses;

  return theses.filter(
    (t) =>
      t.name.toLowerCase().includes(lowercaseQuery) ||
      t.oneLiner.toLowerCase().includes(lowercaseQuery) ||
      t.categories.some((c) => c.toLowerCase().includes(lowercaseQuery))
  );
}

// Client-side filter by categories
export function filterByCategories(
  theses: Thesis[],
  categories: ThesisCategory[]
): Thesis[] {
  if (categories.length === 0) return theses;

  return theses.filter((t) =>
    t.categories.some((c) => categories.includes(c))
  );
}

// Group theses by year for timeline view
export function groupThesesByYear(
  theses: Thesis[]
): Record<string, Record<string, Thesis[]>> {
  const grouped: Record<string, Record<string, Thesis[]>> = {};

  for (const thesis of theses) {
    if (!thesis.publicationDate) continue;

    const date = new Date(thesis.publicationDate);
    const year = date.getFullYear().toString();
    const month = date.toLocaleDateString("en-US", { month: "long" });

    if (!grouped[year]) grouped[year] = {};
    if (!grouped[year][month]) grouped[year][month] = [];
    grouped[year][month].push(thesis);
  }

  return grouped;
}
