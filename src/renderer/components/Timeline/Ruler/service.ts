const drawLine = (
  ctx: CanvasRenderingContext2D,
  i: number,
  w: number,
  h: number,
  offset: number,
  color: string = "#737373",
) => {
  const x = i * w - offset;
  if (x < 0) {
    return;
  }

  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, h);
  ctx.strokeStyle = color;
  ctx.stroke();
};

type DrawFunc = (ctx: CanvasRenderingContext2D, i: number, height: number, drawForce: boolean, offset: number) => void;
type DrawRulerArgs = {
  ctx: CanvasRenderingContext2D;
  i: number;
  height: number;
  width?: number;
  factor?: number;
  semi?: number;
  long?: number;
  drawForce?: boolean;
  offset?: number;
  unit?: (i: number) => string;
};

const drawRulerLine = (args: DrawRulerArgs) => {
  const opts: Required<DrawRulerArgs> = {
    width: 20,
    factor: 1,
    semi: 15,
    long: 30,
    drawForce: false,
    offset: 0,
    unit: (i: number) => `${(i / 30).toFixed(0)}s`,
    ...args,
  };

  if (opts.i % opts.factor === 0) {
    if (opts.i % opts.long === 0) {
      drawLine(opts.ctx, opts.i, opts.width, opts.height, opts.offset);
      const x = opts.i * opts.width + 4 - opts.offset;
      if (x >= 0) {
        opts.ctx.fillText(opts.unit(opts.i), x, 15);
      }
    } else {
      if (opts.i % opts.semi === 0) {
        drawLine(opts.ctx, opts.i, opts.width, 40, opts.offset);
      } else {
        drawLine(opts.ctx, opts.i, opts.width, 20, opts.offset);
      }

      if (opts.drawForce) {
        opts.ctx.fillText(opts.unit(opts.i), opts.i * opts.width + 4, 15);
      }
    }
  }
};

const draw00125Scale: DrawFunc = (ctx, i, height, drawForce, offset) => {
  drawRulerLine({ ctx, i, height, drawForce, offset });
};

const draw0025Scale: DrawFunc = (ctx, i, height, drawForce, offset) => {
  drawRulerLine({ ctx, i, height, width: 15, drawForce, offset });
};

const draw005Scale: DrawFunc = (ctx, i, height, drawForce, offset) => {
  drawRulerLine({ ctx, i, height, width: 10, drawForce, offset });
};

const draw01Scale: DrawFunc = (ctx, i, height, drawForce, offset) => {
  drawRulerLine({ ctx, i, height, width: 6, factor: 2, semi: 30, long: 60, drawForce, offset });
};

const draw02Scale: DrawFunc = (ctx, i, height, drawForce, offset) => {
  drawRulerLine({ ctx, i, height, width: 4, factor: 5, semi: 30, long: 60, drawForce, offset });
};

const draw04Scale: DrawFunc = (ctx, i, height, drawForce, offset) => {
  drawRulerLine({ ctx, i, height, width: 2, factor: 10, semi: 30, long: 120, drawForce, offset });
};

const draw08Scale: DrawFunc = (ctx, i, height, drawForce, offset) => {
  drawRulerLine({ ctx, i, height, width: 1, factor: 15, semi: 30, long: 180, drawForce, offset });
};

const draw16Scale: DrawFunc = (ctx, i, height, drawForce, offset) => {
  drawRulerLine({ ctx, i, height, width: 0.75, factor: 30, semi: 30, long: 240, drawForce, offset });
};

const UNIT_FUNC: Record<number, DrawFunc> = {
  0.125: draw00125Scale,
  0.25: draw0025Scale,
  0.5: draw005Scale,
  1: draw01Scale,
  2: draw02Scale,
  4: draw04Scale,
  8: draw08Scale,
  16: draw16Scale,
};

const UNIT_PIXEL: Record<number, number> = {
  0.125: 20,
  0.25: 15,
  0.5: 10,
  1: 6,
  2: 4,
  4: 2,
  8: 1, // ok
  16: 0.75,
};

const frame2pixel = (frame: number, scale: number, offset: number = 0): number => {
  const val = frame * UNIT_PIXEL[scale] - offset;

  return val;
};

const position2frame = (x: number, scale: number, offset: number = 0): number => {
  const val = x / UNIT_PIXEL[scale] - offset / UNIT_PIXEL[scale];

  return Math.floor(val);
};

const drawRuler = (scale: number, offset: number) => {
  return (ctx: CanvasRenderingContext2D, totalFrames: number) => {
    ctx.reset();
    ctx.font = "16px Consolas";
    ctx.fillStyle = "#737373";

    const frames = totalFrames + 1;
    for (let i = 0; i < frames; i++) {
      const pixel = frame2pixel(i, scale, offset);
      if (pixel < 0) continue;
      UNIT_FUNC[scale]?.(ctx, i, 9999, i + 1 == frames, offset);
    }
  };
};

const drawFrameLine = (scale: number, offset: number) => {
  const fn = drawRuler(scale, offset);
  return (ctx: CanvasRenderingContext2D, totalFrames: number, currentFrame: number): void => {
    fn(ctx, totalFrames);

    const pixel = frame2pixel(currentFrame, scale, offset);
    if (pixel < 0) return;

    ctx.beginPath();
    ctx.moveTo(pixel, 0);
    ctx.lineTo(pixel, 9999);
    ctx.strokeStyle = "#dc2626";
    ctx.stroke();
  };
};

export { drawRulerLine as drawRuler, drawFrameLine, frame2pixel, position2frame };
