import { z } from "zod";
import { LayerProps } from "../Layer/constants";

export const CompositionProps = z.object({
  metadata: z.object({
    title: z.string(),
    rendering: z.object({
      framerate: z.number().positive().min(1).max(120),
      width: z.number().positive().min(1),
      height: z.number().positive().min(1),
    }),
    length: z.number().positive().min(1),
  }),
  composition: z.object({
    layers: z.array(LayerProps),
  }),
});
