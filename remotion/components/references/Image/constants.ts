import { z } from "zod";

export const ImageReferenceProps = z.object({
  type: z.literal("references/img"),
  path: z.string(),
  start: z.number().positive(),
  length: z.number(),
  metadata: z.object({}),
});
