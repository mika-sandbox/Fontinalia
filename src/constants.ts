import { z } from "zod";
import { CompositionProps } from "../remotion/components/metadata/Composition/constants";

export const HOUR = 60 * 60;
export const MINUTE = 60;
export const SECOND = 1;

export const DEFAULT_PROJECT: z.infer<typeof CompositionProps> = {
  metadata: {
    title: "MyComposition",
    length: 30 * SECOND,
    rendering: {
      framerate: 30,
      width: 1920,
      height: 1080,
    },
  },
  composition: {
    layers: [],
  },
};
