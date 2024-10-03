import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardFast } from "@fortawesome/pro-solid-svg-icons/faBackwardFast";
import { faBackwardStep } from "@fortawesome/pro-solid-svg-icons/faBackwardStep";
import { faBracketSquare } from "@fortawesome/pro-solid-svg-icons/faBracketSquare";
import { faBracketSquareRight } from "@fortawesome/pro-solid-svg-icons/faBracketSquareRight";
import { faExpand } from "@fortawesome/pro-solid-svg-icons/faExpand";
import { faForwardStep } from "@fortawesome/pro-solid-svg-icons/faForwardStep";
import { faPause } from "@fortawesome/pro-solid-svg-icons/faPause";
import { faPlay } from "@fortawesome/pro-solid-svg-icons/faPlay";
import { faRepeat } from "@fortawesome/pro-solid-svg-icons/faRepeat";
import { faVolume } from "@fortawesome/pro-solid-svg-icons/faVolume";
import { faVolumeMute } from "@fortawesome/pro-solid-svg-icons/faVolumeMute";
import { useAtomValue } from "jotai";
import { memo, useCallback, useEffect, useState } from "react";
import { cn } from "../../utils";
import { RemotionAtom } from "../../states/remotion";

type Props = {
  onToggleRepeat: (isRepeating: boolean) => void;
};

const Controller: React.FC<Props> = memo(({ onToggleRepeat }) => {
  const controller = useAtomValue(RemotionAtom);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  // controls
  const play = useCallback(() => controller?.play(), [controller]);
  const pause = useCallback(() => controller?.pause(), [controller]);
  const mute = useCallback(() => controller?.mute(), [controller]);
  const unmute = useCallback(() => controller?.unmute(), [controller]);
  const seek = useCallback((frame: number) => controller?.seekTo(frame), [controller]);
  const fullscreen = useCallback(() => controller?.requestFullscreen(), [controller]);

  // handlers
  const onClickPlay = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
      pause();
    } else {
      setIsPlaying(true);
      play();
    }
  }, [isPlaying, play, pause]);

  const onClickMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      unmute();
    } else {
      setIsMuted(true);
      mute();
    }
  }, [isMuted, mute, unmute]);

  const onClickRepeat = useCallback(() => {
    const next = !isRepeating;
    setIsRepeating(next);
    onToggleRepeat(next);
  }, [isRepeating, onToggleRepeat]);

  const onClickFullScreen = useCallback(() => {
    fullscreen();
  }, [fullscreen]);

  // register event listeners
  useEffect(() => {
    if (controller) {
      const onEnded = () => !isRepeating && setIsPlaying(false);
      const onPause = () => setIsPlaying(false);
      const onPlay = () => setIsPlaying(true);

      controller.addEventListener("ended", onEnded);
      controller.addEventListener("pause", onPause);
      controller.addEventListener("play", onPlay);

      return () => {
        controller.removeEventListener("ended", onEnded);
        controller.removeEventListener("pause", onPause);
        controller.removeEventListener("play", onPlay);
      };
    }
  }, [isRepeating, controller]);

  return (
    <div className="flex flex-row gap-x-8 items-center justify-center h-12 border-t border-neutral-800">
      <div className="flex flex-row gap-x-2">
        <button>
          <FontAwesomeIcon fixedWidth icon={faBackwardFast} />
        </button>
        <button>
          <FontAwesomeIcon fixedWidth icon={faBackwardStep} />
        </button>
        <button onClick={onClickPlay}>
          {isPlaying ? <FontAwesomeIcon fixedWidth icon={faPause} /> : <FontAwesomeIcon fixedWidth icon={faPlay} />}
        </button>
        <button>
          <FontAwesomeIcon fixedWidth icon={faForwardStep} />
        </button>
      </div>

      <div className="flex flex-row gap-x-2">
        <button onClick={onClickMute}>
          {isMuted ? (
            <FontAwesomeIcon fixedWidth icon={faVolumeMute} />
          ) : (
            <FontAwesomeIcon fixedWidth icon={faVolume} />
          )}
        </button>
        <button onClick={onClickRepeat}>
          <FontAwesomeIcon fixedWidth icon={faRepeat} className={cn("text-white", isRepeating && "text-blue-500")} />
        </button>
      </div>

      <div className="flex flex-row gap-x-2">
        <button>
          <FontAwesomeIcon fixedWidth icon={faBracketSquare} />
        </button>
        <button>
          <FontAwesomeIcon fixedWidth icon={faBracketSquareRight} />
        </button>
      </div>

      <div className="flex flex-row gap-x-2">
        <button onClick={onClickFullScreen}>
          <FontAwesomeIcon fixedWidth icon={faExpand} />
        </button>
      </div>
    </div>
  );
});

export { Controller };
