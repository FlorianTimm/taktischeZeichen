import TaktZeichen from "./TaktZeichen";

export default class Einheit extends TaktZeichen {
  private constructor(text?: string, canvas?: HTMLCanvasElement) {
    super(canvas);
    this.ctx.fillStyle = "#120a8f";
    this.ctx.beginPath();
    this.ctx.moveTo(0, 120);
    this.ctx.lineTo(160, 120);
    this.ctx.lineTo(160, 20);
    this.ctx.lineTo(0, 20);
    this.ctx.fill();
    //this.createOrga("THW")
    if (text) this.setText(text)
  }

  private setText(text: string) {
    this.ctx.fillStyle = "white"
    this.ctx.font = '50px sans-serif';
    this.ctx.textAlign = "center"
    this.ctx.textBaseline = "middle"
    this.ctx.fillText(text, 80, 70, 150);
  }

  private setPunkte(anz: number) {
    if (anz == 3) this.createPunkt(60, 7);
    if (anz == 2) this.createPunkt(70, 7);
    if (anz == 1 || anz == 3) this.createPunkt(80, 7);
    if (anz == 2) this.createPunkt(90, 7);
    if (anz == 3) this.createPunkt(100, 7);

  }

  private createPunkt(x: number, y: number) {
    this.ctx.fillStyle = "#120a8f";
    this.ctx.beginPath();
    this.ctx.arc(x, y, 7, 0, Math.PI * 2, true);
    this.ctx.fill();
  }

  public static createTrupp(text?: string, canvas?: HTMLCanvasElement) {
    let e = new Einheit(text, canvas);
    e.setPunkte(1)
    return e.canvas;
  }

  public static createGruppe(text?: string, canvas?: HTMLCanvasElement) {
    let e = new Einheit(text, canvas);
    e.setPunkte(2)
    return e.canvas;
  }

  public static createZug(text?: string, canvas?: HTMLCanvasElement) {
    let e = new Einheit(text, canvas);
    e.setPunkte(3)
    return e.canvas;
  }

}