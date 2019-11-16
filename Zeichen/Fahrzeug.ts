import TaktZeichen from "./TaktZeichen";

export default class Fahrzeug extends TaktZeichen {
  private constructor(text?: string, canvas?: HTMLCanvasElement) {
    super(canvas);
    this.ctx.fillStyle = "#120a8f";
    this.ctx.beginPath();
    this.ctx.moveTo(20, 100);
    this.ctx.lineTo(180, 100);
    this.ctx.lineTo(180, 0);
    this.ctx.quadraticCurveTo(100, 30, 20, 0);
    this.ctx.fill();
    this.createOrga("THW")
    if (text) this.setText(text)
  }

  private createOrga(text: string) {

  }

  public static createAnhaenger(text?: string, canvas?: HTMLCanvasElement) {
    let r = new Fahrzeug(text, canvas);
    r.ctx.fillStyle = "#120a8f";
    r.ctx.fillRect(0, 75, 40, 10);
    return r.canvas;
  }

  public static createKraftfahrzeug(text?: string, gelaendegaengig = false, canvas?: HTMLCanvasElement) {
    let r = new Fahrzeug(text, canvas);
    r.ctx.strokeStyle = "#120a8f";
    r.ctx.lineWidth = 4;
    r.createRad(50, 110);
    r.createRad(150, 110);
    if (gelaendegaengig) r.createRad(100, 110)
    return r.canvas;
  }

  private createRad(x: number, y: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 8, 0, Math.PI * 2, true);
    this.ctx.stroke();
  }

  private setText(text: string) {
    this.ctx.fillStyle = "white"
    this.ctx.font = '48px sans-serif';
    this.ctx.textAlign = "center"
    this.ctx.textBaseline = "middle"
    this.ctx.fillText(text, 100, 60, 150);
  }
}