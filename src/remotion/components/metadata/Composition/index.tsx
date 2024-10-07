import * as z from "zod";
import { loadFont } from "@remotion/google-fonts/Inter";
import { CompositionProps } from "./schema";
import { AbsoluteFill } from "remotion";
import { Layer } from "../Layer";

loadFont();

const Composition = (props: z.infer<typeof CompositionProps>) => {
  return (
    <AbsoluteFill className="bg-white">
      {props.composition.layers.map((layer, index) => {
        return <Layer key={index} {...layer} />;
      })}
    </AbsoluteFill>
  );
};

export { Composition, Composition as JsonComposition };
