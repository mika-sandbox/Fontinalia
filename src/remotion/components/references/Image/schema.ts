import { z } from "zod";

export const ImageReferenceProps = z.object({
  type: z.literal("references/img"),
  path: z.string(),
  start: z.number().min(0),
  length: z.number(),
  metadata: z.object({
    flip: z.boolean().default(false),
    position: z.object({
      x: z.object({
        base: z.union([z.literal("left"), z.literal("right"), z.literal("center")]),
        offset: z.number().default(0),
        unit: z.union([z.literal("px"), z.literal("%")]).default("px"),
      }),
      y: z.object({
        base: z.union([z.literal("top"), z.literal("bottom"), z.literal("center")]),
        offset: z.number().default(0),
        unit: z.union([z.literal("px"), z.literal("%")]).default("px"),
      }),
    }),
    scale: z.number().default(1),
  }),
});
