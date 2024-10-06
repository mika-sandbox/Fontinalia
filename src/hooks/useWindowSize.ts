import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [state, setState] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const onResize = () => {
      setState({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return state;
};

export { useWindowSize };
