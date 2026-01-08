"use client";

import { Fragment } from "react";
import Image from "next/image";
import { NotionBlock } from "@/types/thesis";

interface NotionRendererProps {
  blocks: NotionBlock[];
}

interface RichTextItem {
  plain_text: string;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
  };
  href: string | null;
}

export function NotionRenderer({ blocks }: NotionRendererProps) {
  // Group consecutive list items together
  const groupedBlocks = groupListItems(blocks);

  return (
    <div className="prose prose-lg max-w-none">
      {groupedBlocks.map((item, index) => (
        <Fragment key={index}>
          {Array.isArray(item) ? renderList(item) : renderBlock(item)}
        </Fragment>
      ))}
    </div>
  );
}

// Group consecutive list items together
function groupListItems(blocks: NotionBlock[]): (NotionBlock | NotionBlock[])[] {
  const result: (NotionBlock | NotionBlock[])[] = [];
  let currentList: NotionBlock[] = [];
  let currentListType: string | null = null;

  for (const block of blocks) {
    if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
      if (currentListType === block.type) {
        currentList.push(block);
      } else {
        if (currentList.length > 0) {
          result.push(currentList);
        }
        currentList = [block];
        currentListType = block.type;
      }
    } else {
      if (currentList.length > 0) {
        result.push(currentList);
        currentList = [];
        currentListType = null;
      }
      result.push(block);
    }
  }

  if (currentList.length > 0) {
    result.push(currentList);
  }

  return result;
}

function renderList(items: NotionBlock[]) {
  const isOrdered = items[0]?.type === "numbered_list_item";
  const ListTag = isOrdered ? "ol" : "ul";
  const listClass = isOrdered
    ? "list-decimal list-inside space-y-2 mb-4"
    : "list-disc list-inside space-y-2 mb-4";

  return (
    <ListTag className={listClass}>
      {items.map((item) => (
        <Fragment key={item.id}>{renderListItem(item)}</Fragment>
      ))}
    </ListTag>
  );
}

function renderListItem(block: NotionBlock) {
  const content = block.content as { rich_text?: RichTextItem[] };

  return (
    <li className="text-charcoal-light">
      {renderRichText(content.rich_text || [])}
      {block.children && block.children.length > 0 && (
        <div className="mt-2 pl-4">
          {block.children.map((child) => (
            <Fragment key={child.id}>{renderBlock(child)}</Fragment>
          ))}
        </div>
      )}
    </li>
  );
}

function renderBlock(block: NotionBlock) {
  const { type, content, children, id } = block;

  switch (type) {
    case "paragraph": {
      const paragraphContent = content as { rich_text?: RichTextItem[] };
      const text = paragraphContent.rich_text || [];
      if (text.length === 0) {
        return <div className="h-4" />; // Empty paragraph as spacer
      }
      return (
        <p className="mb-4 text-charcoal-light leading-relaxed">
          {renderRichText(text)}
        </p>
      );
    }

    case "heading_1": {
      const h1Content = content as { rich_text?: RichTextItem[] };
      return (
        <h1 className="font-serif text-3xl font-semibold text-charcoal mt-8 mb-4">
          {renderRichText(h1Content.rich_text || [])}
        </h1>
      );
    }

    case "heading_2": {
      const h2Content = content as { rich_text?: RichTextItem[] };
      return (
        <h2 className="font-serif text-2xl font-semibold text-charcoal mt-6 mb-3">
          {renderRichText(h2Content.rich_text || [])}
        </h2>
      );
    }

    case "heading_3": {
      const h3Content = content as { rich_text?: RichTextItem[] };
      return (
        <h3 className="font-serif text-xl font-semibold text-charcoal mt-5 mb-2">
          {renderRichText(h3Content.rich_text || [])}
        </h3>
      );
    }

    case "bulleted_list_item":
    case "numbered_list_item":
      // These are handled by groupListItems, but we need a fallback
      return renderListItem(block);

    case "quote": {
      const quoteContent = content as { rich_text?: RichTextItem[] };
      return (
        <blockquote className="border-l-4 border-charcoal/20 pl-4 my-6 italic text-charcoal-light">
          {renderRichText(quoteContent.rich_text || [])}
        </blockquote>
      );
    }

    case "code": {
      const codeContent = content as { rich_text?: RichTextItem[]; language?: string };
      const codeText = (codeContent.rich_text || [])
        .map((t) => t.plain_text)
        .join("");
      return (
        <pre className="bg-charcoal/5 rounded-lg p-4 overflow-x-auto my-4">
          <code className="text-sm font-mono text-charcoal">{codeText}</code>
        </pre>
      );
    }

    case "divider":
      return <hr className="my-8 border-charcoal/10" />;

    case "image": {
      const imageContent = content as {
        type: "external" | "file";
        external?: { url: string };
        file?: { url: string };
        caption?: RichTextItem[];
      };
      const imageUrl =
        imageContent.type === "external"
          ? imageContent.external?.url
          : imageContent.file?.url;
      const caption = imageContent.caption?.length
        ? imageContent.caption.map((c) => c.plain_text).join("")
        : "";

      if (!imageUrl) return null;

      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video">
            <Image
              src={imageUrl}
              alt={caption || "Thesis image"}
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {caption && (
            <figcaption className="text-center text-sm text-charcoal-light mt-2">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "callout": {
      const calloutContent = content as {
        icon?: { emoji?: string };
        rich_text?: RichTextItem[];
      };
      return (
        <div className="bg-cream-dark rounded-lg p-4 my-4 flex gap-3">
          {calloutContent.icon?.emoji && (
            <span className="text-xl">{calloutContent.icon.emoji}</span>
          )}
          <div className="text-charcoal-light">
            {renderRichText(calloutContent.rich_text || [])}
          </div>
        </div>
      );
    }

    case "toggle": {
      const toggleContent = content as { rich_text?: RichTextItem[] };
      return (
        <details className="my-4">
          <summary className="cursor-pointer font-medium text-charcoal hover:text-charcoal-light transition-colors">
            {renderRichText(toggleContent.rich_text || [])}
          </summary>
          {children && children.length > 0 && (
            <div className="mt-2 pl-4">
              {children.map((child) => (
                <Fragment key={child.id}>{renderBlock(child)}</Fragment>
              ))}
            </div>
          )}
        </details>
      );
    }

    case "bookmark": {
      const bookmarkContent = content as { url?: string; caption?: RichTextItem[] };
      if (!bookmarkContent.url) return null;
      return (
        <a
          href={bookmarkContent.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block my-4 p-4 border border-charcoal/10 rounded-lg hover:border-charcoal/20 transition-colors"
        >
          <span className="text-charcoal underline underline-offset-2">
            {bookmarkContent.url}
          </span>
        </a>
      );
    }

    case "embed":
    case "video": {
      const embedContent = content as { url?: string };
      if (!embedContent.url) return null;
      return (
        <div className="my-4">
          <a
            href={embedContent.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-charcoal underline underline-offset-2"
          >
            View embedded content
          </a>
        </div>
      );
    }

    default:
      // Unsupported block type - return null
      console.log(`Unsupported block type: ${type}`);
      return null;
  }
}

function renderRichText(richText: RichTextItem[]) {
  if (!richText || richText.length === 0) return null;

  return richText.map((text, index) => {
    const { plain_text, annotations, href } = text;

    let element: React.ReactNode = plain_text;

    if (annotations.bold) {
      element = <strong>{element}</strong>;
    }
    if (annotations.italic) {
      element = <em>{element}</em>;
    }
    if (annotations.strikethrough) {
      element = <s>{element}</s>;
    }
    if (annotations.underline) {
      element = <u>{element}</u>;
    }
    if (annotations.code) {
      element = (
        <code className="bg-charcoal/5 px-1.5 py-0.5 rounded text-sm font-mono">
          {element}
        </code>
      );
    }
    if (href) {
      element = (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-charcoal underline underline-offset-2 hover:text-charcoal-light transition-colors"
        >
          {element}
        </a>
      );
    }

    return <Fragment key={index}>{element}</Fragment>;
  });
}
