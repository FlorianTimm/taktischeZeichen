"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TaktZeichen = /** @class */ (function () {
    function TaktZeichen(canvas) {
        if (!canvas)
            canvas = document.createElement("canvas");
        this.canvas = canvas;
        if (canvas.getContext) {
            var ctx = canvas.getContext("2d");
            if (!ctx)
                throw new Error("Canvas-Fehler");
            this.ctx = ctx;
        }
        else {
            throw new Error("Canvas-Fehler");
        }
    }
    return TaktZeichen;
}());
var Fahrzeug = /** @class */ (function (_super) {
    __extends(Fahrzeug, _super);
    function Fahrzeug(text, canvas) {
        var _this = _super.call(this, canvas) || this;
        _this.ctx.fillStyle = "#120a8f";
        _this.ctx.beginPath();
        _this.ctx.moveTo(20, 100);
        _this.ctx.lineTo(180, 100);
        _this.ctx.lineTo(180, 0);
        _this.ctx.quadraticCurveTo(100, 30, 20, 0);
        _this.ctx.fill();
        _this.createOrga("THW");
        if (text)
            _this.setText(text);
        return _this;
    }
    Fahrzeug.prototype.createOrga = function (text) {
    };
    Fahrzeug.createAnhaenger = function (text, canvas) {
        var r = new Fahrzeug(text, canvas);
        r.ctx.fillStyle = "#120a8f";
        r.ctx.fillRect(0, 75, 40, 10);
        return r.canvas;
    };
    Fahrzeug.createKraftfahrzeug = function (text, gelaendegaengig, canvas) {
        if (gelaendegaengig === void 0) { gelaendegaengig = false; }
        var r = new Fahrzeug(text, canvas);
        r.ctx.strokeStyle = "#120a8f";
        r.ctx.lineWidth = 4;
        r.createRad(50, 110);
        r.createRad(150, 110);
        if (gelaendegaengig)
            r.createRad(100, 110);
        return r.canvas;
    };
    Fahrzeug.prototype.createRad = function (x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 8, 0, Math.PI * 2, true);
        this.ctx.stroke();
    };
    Fahrzeug.prototype.setText = function (text) {
        this.ctx.fillStyle = "white";
        this.ctx.font = '48px sans-serif';
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(text, 100, 60, 150);
    };
    return Fahrzeug;
}(TaktZeichen));
var Einheit = /** @class */ (function (_super) {
    __extends(Einheit, _super);
    function Einheit(text, canvas) {
        var _this = _super.call(this, canvas) || this;
        _this.ctx.fillStyle = "#120a8f";
        _this.ctx.beginPath();
        _this.ctx.moveTo(0, 120);
        _this.ctx.lineTo(160, 120);
        _this.ctx.lineTo(160, 20);
        _this.ctx.lineTo(0, 20);
        _this.ctx.fill();
        //this.createOrga("THW")
        if (text)
            _this.setText(text);
        return _this;
    }
    Einheit.prototype.setText = function (text) {
        this.ctx.fillStyle = "white";
        this.ctx.font = '50px sans-serif';
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(text, 80, 70, 150);
    };
    Einheit.prototype.setPunkte = function (anz) {
        if (anz == 3)
            this.createPunkt(60, 7);
        if (anz == 2)
            this.createPunkt(70, 7);
        if (anz == 1 || anz == 3)
            this.createPunkt(80, 7);
        if (anz == 2)
            this.createPunkt(90, 7);
        if (anz == 3)
            this.createPunkt(100, 7);
    };
    Einheit.prototype.createPunkt = function (x, y) {
        this.ctx.fillStyle = "#120a8f";
        this.ctx.beginPath();
        this.ctx.arc(x, y, 7, 0, Math.PI * 2, true);
        this.ctx.fill();
    };
    Einheit.createTrupp = function (text, canvas) {
        var e = new Einheit(text, canvas);
        e.setPunkte(1);
        return e.canvas;
    };
    Einheit.createGruppe = function (text, canvas) {
        var e = new Einheit(text, canvas);
        e.setPunkte(2);
        return e.canvas;
    };
    Einheit.createZug = function (text, canvas) {
        var e = new Einheit(text, canvas);
        e.setPunkte(3);
        return e.canvas;
    };
    return Einheit;
}(TaktZeichen));
document.body.appendChild(Fahrzeug.createAnhaenger("LiMa"));
document.body.appendChild(Fahrzeug.createKraftfahrzeug("MTW ZTr"));
document.body.appendChild(Fahrzeug.createKraftfahrzeug("GKW", true));
document.body.appendChild(Fahrzeug.createKraftfahrzeug("MLW 1", false));
document.body.appendChild(Einheit.createTrupp("B 1"));
document.body.appendChild(Einheit.createGruppe("B 1"));
document.body.appendChild(Einheit.createZug("TZ-W"));
