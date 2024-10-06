import { z } from "zod";
import { LayerProps } from "../Layer/constants";

export const CompositionProps = z.object({
  metadata: z.object({
    title: z.string(),
  }),
  composition: z.object({
    layers: z.array(LayerProps),
  }),
});
