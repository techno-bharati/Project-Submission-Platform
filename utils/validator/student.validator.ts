import { z } from "zod";

export const submitProjectSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title should be at least 5 characters long." })
    .max(100, { message: "Title should not exceed 100 characters." }),
  description: z
    .string()
    .min(20, { message: "Description should be at least 20 characters long." }),
  domain: z
    .array(z.string())
    .min(1, { message: "Please select at least one domain." }),
  zip: z.string(),
  githubUrl: z.string().url({ message: "GitHub URL must be a valid URL." }),
  projectThumbnail: z
    .string()
    .url({ message: "Thumbnail must be a valid image URL." }),
  technologies: z
    .array(z.string())
    .min(1, { message: "Select at least one technology." }),
  liveLink: z
    .string()
    .url({ message: "Live link must be a valid URL." })
    .optional()
    .or(z.literal("")) // Allow empty string for optional live link
});
