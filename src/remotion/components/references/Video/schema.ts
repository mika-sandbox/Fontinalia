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

export const VideoResourceProps = z.object({
  id: z.string(),
  type: z.literal("resources/video"),
  path: z.string(),
  metadata: z.object({
    duration: z.number().min(0),
    width: z.number().min(0),
    height: z.number().min(0),
    framerate: z.number().min(0),
  }),
});

export type VideoReferenceSchema = z.infer<typeof VideoReferenceProps>;
