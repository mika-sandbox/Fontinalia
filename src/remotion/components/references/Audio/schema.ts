import { z } from "zod";

export const AudioReferenceProps = z.object({
  type: z.literal("references/audio"),
  path: z.string(),
  start: z.number().min(0),
  length: z.number().min(1),
  metadata: z.object({
    volume: z.number().min(0).max(100),
    length: z.number().min(0),
  }),
});

export const AudioResourceProps = z.object({
  id: z.string(),
  type: z.literal("resources/audio"),
  path: z.string(),
  metadata: z.object({
    duration: z.number().min(0),
  }),
});

export type AudioReferenceSchema = z.infer<typeof AudioReferenceProps>;
