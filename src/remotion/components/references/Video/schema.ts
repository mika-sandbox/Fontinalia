import { z } from "zod";

export const VideoReferenceProps = z.object({
  type: z.literal("references/video"),
  path: z.string(),
  start: z.number().min(0),
  length: z.number(),
  metadata: z.object({
    volume: z.number().min(0).max(100),
    length: z.number().min(0),
  }),
});
