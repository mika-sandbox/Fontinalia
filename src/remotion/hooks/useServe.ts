import { useCompositionContext } from "@fontinalia-remotion/context";
import { useCallback } from "react";

export const useServe = () => {
  const context = useCompositionContext();
  const serve = useCallback(
    (path: string) => {
      return `http://localhost:${context.port}/${path}`;
    },
    [context.port],
  );

  return { serve } as const;
};
