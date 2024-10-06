import { z } from "zod";
import { AudioReferenceProps } from "../../references/Audio/constants";
import { ImageReferenceProps } from "../../references/Image/constants";
import { VideoReferenceProps } from "../../references/Video/constants";

export const LayerProps = z.object({
  items: z.array(z.union([AudioReferenceProps, ImageReferenceProps, VideoReferenceProps])),
});
