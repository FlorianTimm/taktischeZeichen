export default class TaktZeichen {
  protected ctx: CanvasRenderingContext2D;
  protected canvas: HTMLCanvasElement;

  protected constructor(canvas?: HTMLCanvasElement) {
    if (!canvas) canvas = document.createElement("canvas");
    this.canvas = canvas
    if (canvas.getContext) {
      let ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas-Fehler");
      ctx.scale(0.25, 0.25);
      this.ctx = ctx;
    } else {
      throw new Error("Canvas-Fehler")
    }
  }
}