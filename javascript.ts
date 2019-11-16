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
import Einheit from './Zeichen/Einheit';

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
      imgSize: [50, 75]
    })
  })
}));

vs.addFeature(new Feature(new Point([0, 0])))