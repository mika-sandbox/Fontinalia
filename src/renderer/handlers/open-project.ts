import { CompositionAtom } from "@fontinalia-renderer/state/composition";
import { Composition } from "@fontinalia-shared/timeline";
import { getDefaultStore } from "jotai";

window.api.handle.openProject(async (a, { data }) => {
  const store = getDefaultStore();
  store.set(CompositionAtom, Composition.fromJSONProject(data));

  return "";
});
