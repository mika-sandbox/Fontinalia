import { createContext, useContext } from "react";

type CompositionContextProps = {
  port: number;
};

export const CompositionContext = createContext<CompositionContextProps>({ port: 9271 });

export const useCompositionContext = () => {
  return useContext(CompositionContext);
};
