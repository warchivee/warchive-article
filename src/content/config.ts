import { defineCollection, reference, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const interview = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    subject: z.string(),
    title: z.string(),
    titleColor: z.string().optional(),
    backgroundColor: z.string().optional(),
    descriptionColor: z.string().optional(),
    description: z.string().optional(),
    thumbnailImage: z.string().optional(),
    titleImage: z.string().optional(),
    target: reference("interview-target").optional(),
    tags: z.array(z.string()).optional(),
    // Transform string to Date object
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
  }),
});

const review = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    target: z.string(),
    creator: z.string(),
    description: z.string().optional(),
    thumbnailImage: z.string().optional(),
    titleImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    // Transform string to Date object
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
  }),
});

const play = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    thumbnailImage: z.string().optional(),
    siteUrl: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
  }),
});

const bookclub = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    creator: z.string(),
    thumbnailImage: z.string().optional(),
    description: z.string().optional(),
    participants: z.number(),
    // Transform string to Date object
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    // Nested book report information
    bookReports: z.array(
      z.object({
        reportTitle: z.string(),
        reportContent: z.string(),
        pubDate: z.coerce.date(),
        reader: z.string(),
        is_best: z.number().optional(),
        is_funny: z.number().optional(),
        is_interested: z.number().optional(),
        is_empathized: z.number().optional(),
        is_amazed: z.number().optional(),
      })
    ).optional(),
  }),
});


export const collections = { blog, interview, review, play, bookclub };
