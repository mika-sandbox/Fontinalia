import { z } from "zod";
import { AudioReferenceProps } from "../../references/Audio/schema";
import { ImageReferenceProps } from "../../references/Image/schema";
import { VideoReferenceProps } from "../../references/Video/schema";

export const LayerProps = z.object({
  name: z.string().default("Layer"),
  items: z.array(z.union([AudioReferenceProps, ImageReferenceProps, VideoReferenceProps])),
});
