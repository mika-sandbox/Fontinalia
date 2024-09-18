const drawLine = (ctx: CanvasRenderingContext2D, i: number, w: number, h: number, color: string = "#737373") => {
  ctx.beginPath();
  ctx.moveTo(i * w, 0);
  ctx.lineTo(i * w, h);
  ctx.strokeStyle = color;
  ctx.stroke();
};

type DrawFunc = (ctx: CanvasRenderingContext2D, i: number, height: number, drawForce: boolean) => void;
type DrawRulerArgs = {
  ctx: CanvasRenderingContext2D;
  i: number;
  height: number;
  x?: number;
  factor?: number;
  semi?: number;
  long?: number;
  drawForce?: boolean;
  unit?: (i: number) => string;
};

const drawRulerLine = (args: DrawRulerArgs) => {
  const opts: Required<DrawRulerArgs> = {
    x: 20,
    factor: 1,
    semi: 15,
    long: 30,
    drawForce: false,
    unit: (i: number) => `${(i / 30).toFixed(0)}s`,
    ...args,
  };

  if (opts.i % opts.factor === 0) {
    if (opts.i % opts.long === 0) {
      drawLine(opts.ctx, opts.i, opts.x, opts.height);
      opts.ctx.fillText(opts.unit(opts.i), opts.i * opts.x + 4, 15);
    } else {
      if (opts.i % opts.semi === 0) {
        drawLine(opts.ctx, opts.i, opts.x, 40);
      } else {
        drawLine(opts.ctx, opts.i, opts.x, 20);
      }

      if (opts.drawForce) {
        opts.ctx.fillText(opts.unit(opts.i), opts.i * opts.x + 4, 15);
      }
    }
  }
};

const draw00125Scale: DrawFunc = (ctx, i, height, drawForce) => {
  drawRulerLine({ ctx, i, height, drawForce });
};

const draw0025Scale: DrawFunc = (ctx, i, height, drawForce) => {
  drawRulerLine({ ctx, i, height, x: 15, drawForce });
};

const draw005Scale: DrawFunc = (ctx, i, height, drawForce) => {
  drawRulerLine({ ctx, i, height, x: 10, drawForce });
};

const draw01Scale: DrawFunc = (ctx, i, height, drawForce) => {
  drawRulerLine({ ctx, i, height, x: 6, factor: 2, semi: 30, long: 60, drawForce });
};

const draw02Scale: DrawFunc = (ctx, i, height, drawForce) => {
  drawRulerLine({ ctx, i, height, x: 4, factor: 5, semi: 30, long: 60, drawForce });
};

const draw04Scale: DrawFunc = (ctx, i, height, drawForce) => {
  drawRulerLine({ ctx, i, height, x: 2, factor: 10, semi: 30, long: 120, drawForce });
};

const draw08Scale: DrawFunc = (ctx, i, height, drawForce) => {
  drawRulerLine({ ctx, i, height, x: 1, factor: 15, semi: 30, long: 180, drawForce });
};

const draw16Scale: DrawFunc = (ctx, i, height, drawForce) => {
  drawRulerLine({ ctx, i, height, x: 0.75, factor: 30, semi: 30, long: 240, drawForce });
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

const frame2pixel = (frame: number, scale: number): number => {
  const val = frame * UNIT_PIXEL[scale];

  return val;
};

const position2frame = (x: number, scale: number): number => {
  const val = x / UNIT_PIXEL[scale];

  return Math.floor(val);
};

const drawRuler = (scale: number) => {
  return (ctx: CanvasRenderingContext2D, totalFrames: number) => {
    ctx.reset();
    ctx.font = "16px Consolas";
    ctx.fillStyle = "#737373";

    const frames = totalFrames + 1;
    for (let i = 0; i < frames; i++) {
      UNIT_FUNC[scale]?.(ctx, i, 9999, i + 1 == frames);
    }
  };
};

const drawFrameLine = (scale: number) => {
  const fn = drawRuler(scale);
  return (ctx: CanvasRenderingContext2D, totalFrames: number, currentFrame: number): void => {
    fn(ctx, totalFrames);

    const pixel = frame2pixel(currentFrame, scale);

    ctx.beginPath();
    ctx.moveTo(pixel, 0);
    ctx.lineTo(pixel, 9999);
    ctx.strokeStyle = "#dc2626";
    ctx.stroke();
  };
};

export { drawRulerLine as drawRuler, drawFrameLine, frame2pixel, position2frame };
