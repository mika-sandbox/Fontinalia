import { z } from "zod";

export const VideoReferenceProps = z.object({
  type: z.literal("references/video"),
  path: z.string(),
  start: z.number().positive(),
  length: z.number(),
  metadata: z.object({
    volume: z.number().positive().min(0).max(100),
    length: z.number().positive(),
  }),
});
