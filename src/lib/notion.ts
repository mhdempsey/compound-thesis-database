import { Client } from "@notionhq/client";

// Create the client lazily to avoid errors during build time
let notionClient: Client | null = null;

export function getNotionClient(): Client {
  if (!process.env.NOTION_API_KEY) {
    throw new Error("Missing NOTION_API_KEY environment variable");
  }

  if (!notionClient) {
    notionClient = new Client({
      auth: process.env.NOTION_API_KEY,
    });
  }

  return notionClient;
}

export function getDatabaseId(): string {
  if (!process.env.NOTION_DATABASE_ID) {
    throw new Error("Missing NOTION_DATABASE_ID environment variable");
  }
  return process.env.NOTION_DATABASE_ID;
}

// Export for backwards compatibility
export const notion = {
  get databases() {
    return getNotionClient().databases;
  },
  get blocks() {
    return getNotionClient().blocks;
  },
  get pages() {
    return getNotionClient().pages;
  },
};

export const databaseId = process.env.NOTION_DATABASE_ID || "";
