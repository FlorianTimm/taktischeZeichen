import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';

class TaktZeichen {
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


class Fahrzeug extends TaktZeichen {
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

class Einheit extends TaktZeichen {
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
/*
document.body.appendChild(Fahrzeug.createAnhaenger("LiMa"))
document.body.appendChild(Fahrzeug.createKraftfahrzeug("MTW ZTr"))
document.body.appendChild(Fahrzeug.createKraftfahrzeug("GKW", true))
document.body.appendChild(Fahrzeug.createKraftfahrzeug("MLW 1", false))
document.body.appendChild(Einheit.createTrupp("B"))
document.body.appendChild(Einheit.createGruppe("B"))
document.body.appendChild(Einheit.createZug("TZ-W"))*/

var map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});
let icon = Einheit.createGruppe("B");
let vs = new VectorSource();
map.addLayer(new VectorLayer({
  source: vs,
  style: new Style({
    image: new Icon({
      img: icon,
      //size: [200,300],
      imgSize: [50,75]
    })
  })
}));

vs.addFeature(new Feature(new Point([0, 0])))