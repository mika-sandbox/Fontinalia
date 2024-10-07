import { z } from "zod";
import { LayerProps } from "../Layer/schema";
import { AudioResourceProps } from "../../references/Audio/schema";
import { VideoResourceProps } from "../../references/Video/schema";

export const CompositionProps = z.object({
  metadata: z.object({
    title: z.string(),
    rendering: z.object({
      framerate: z.number().positive().min(1).max(120),
      width: z.number().positive().min(1),
      height: z.number().positive().min(1),
    }),
    length: z.number().positive().min(1),
    workingDirectory: z.string(),
  }),
  composition: z.object({
    layers: z.array(LayerProps),
  }),
  resources: z.array(z.union([AudioResourceProps, VideoResourceProps])),
});

export type CompositionSchema = z.infer<typeof CompositionProps>;
