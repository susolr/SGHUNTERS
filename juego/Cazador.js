import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
 
class Cazador extends THREE.Object3D {
  constructor() {
    super();
   
  }

  createLight(){
    var light = new THREE.SpotLight(0xfcfcfc, 5, 6, Math.PI/4);
    light.position.set(0, 6, 0);
    light.target = this.model;
    return light;
  }

  activarLuz(){
    this.light.visible = true;
  }

  desactivarLuz(){
    this.light.visible = false;
  }

  controlAnimacion () {
    this.animacionControl = !this.animacionControl;
  }

  createAnimation(spline){
    
    this.spline = spline;
    this.animacion = new THREE.Object3D();
    var pos = this.spline.getPointAt(0);
    this.animacion.position.copy(pos);
    this.animacion.add(this.model);
    this.add(this.animacion);


    this.origin = {p : 0};
    this.destiny = {p : 1};
    var that = this;
    this.animation = new TWEEN.Tween(this.origin)
        .to(this.destiny,2000)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() { 
            var pos = that.spline.getPointAt(that.origin.p);
            that.animacion.position.copy(pos);
        })
        .onStart( that.controlAnimacion())
        .onComplete(function(){
            that.controlAnimacion(); 
            that.resetPatas();
            that.model.rotation.y = Math.PI/2;
          });

      this.animation.start();
  }
  
}

export { Cazador };