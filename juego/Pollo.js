import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Presa } from './Presa.js'
 
class Pollo extends Presa {
  constructor() {
    super();

    this.model = this.createLobo();
    this.model.position.y = 1.1;
    this.add(this.model);
    this.clock = new THREE.Clock();
    
    this.mov_d = 0;
    this.mov_i = 0;
    this.animacionControl = false;

    this.casillaActual;
    this.light = this.createLight();
    this.light.visible=false;
    this.model.add(this.light);
  }

  createLobo(){
      var texture = new THREE.TextureLoader().load('../imgs/plumas.jpg');
      var mat = new THREE.MeshPhongMaterial ({map: texture});
      //var mat = new THREE.MeshPhongMaterial({color: 0xe6e6e6}); // Gris
      var matn = new THREE.MeshPhongMaterial({color: 0x000000}); // Negro
      var mata = new THREE.MeshPhongMaterial({color: 0xffcc00}); // Amarillo
      var matr = new THREE.MeshPhongMaterial({color: 0xff0000}); // Amarillo

      var picoSGeom = new THREE.BoxGeometry(1, 0.25, 0.5); // Parte pico superior
      var picoS = new THREE.Mesh(picoSGeom, mata);
      picoS.userData = this;

      var picoIGeom = new THREE.BoxGeometry(0.8, 0.25, 0.5); // Parte pico inferior
      var picoI = new THREE.Mesh(picoIGeom, mata);
      picoI.userData = this;
      picoI.position.y = -0.25;
      picoI.position.z= -0.1;

      var barbillaGeom = new THREE.BoxGeometry(0.5, 0.5, 0.25); // Barbilla
      var barbilla = new THREE.Mesh(barbillaGeom, matr);
      barbilla.userData = this;
      barbilla.position.y = -0.625;
      barbilla.position.z = -0.125;

      var pico = new THREE.Object3D(); // Pico completo (pico superior, inferior y barbilla)
      pico.add(picoS);
      pico.add(picoI);
      pico.add(barbilla);
      pico.position.y = 0.125
      pico.position.z = 0.625;

      var cabezaGeom = new THREE.BoxGeometry(1, 1.5, 0.75); // Cabeza
      var cabeza = new THREE.Mesh(cabezaGeom, mat);
      cabeza.userData = this;

      var ojoGeom = new THREE.BoxGeometry(0.25, 0.25, 0.25); // Ojo izquierdo
      var ojoI = new THREE.Mesh(ojoGeom, matn);
      ojoI.userData = this;
      ojoI.position.x = 0.35;

      var ojoD = new THREE.Mesh(ojoGeom, matn); // Ojo derecho
      ojoD.userData = this;
      ojoD.position.x = -0.35;

      var ojos = new THREE.Object3D(); // Ojos completos (izquierdo y derecho)
      ojos.add(ojoI);
      ojos.add(ojoD);
      ojos.position.y = 0.4;
      ojos.position.z = 0.3;

      var cabezacompleta = new THREE.Object3D(); // Cabeza completa (pico, cabeza y ojos)
      cabezacompleta.add(pico);
      cabezacompleta.add(cabeza);
      cabezacompleta.add(ojos);
      cabezacompleta.position.y = 1;
      cabezacompleta.position.z = 1.125;

      var cuerpoGeom = new THREE.BoxGeometry(1.5, 1.5, 2); // Cuerpo
      var cuerpo = new THREE.Mesh(cuerpoGeom, mat);
      cuerpo.userData = this;

      var alaGeom = new THREE.BoxGeometry(0.25, 1, 1.5); // Ala izquierda
      var alaI = new THREE.Mesh(alaGeom, mat);
      alaI.userData = this;
      alaI.position.x = 0.875;

      var alaD = new THREE.Mesh(alaGeom, mat); // Ala derecha
      alaD.userData = this;
      alaD.position.x = -0.875;

      var alas = new THREE.Object3D(); // Alas completas (izquierda y derecha)
      alas.add(alaI);
      alas.add(alaD);
      alas.position.y = 0.25;

      var cuerpocompleto = new THREE.Object3D(); // Cuerpo completo sin patas (cabeza, cuerpo y alas)
      cuerpocompleto.add(cabezacompleta);
      cuerpocompleto.add(cuerpo);
      cuerpocompleto.add(alas);
      cuerpocompleto.position.y = 1.3;

      var pataGeom = new THREE.BoxGeometry(0.25, 1.25, 0.1); // Pata izquierda
      var auxpataI = new THREE.Mesh(pataGeom, mata);
      auxpataI.userData = this;
      auxpataI.position.y = -0.625;

      var pieGeom = new THREE.BoxGeometry(0.75, 0.1, 0.5); // Pie izquierdo
      var pieI = new THREE.Mesh(pieGeom, mata);
      pieI.userData = this;
      pieI.position.y = -1.2;
      pieI.position.z = 0.25;

      this.pataI = new THREE.Object3D();
      this.pataI.add(auxpataI);
      this.pataI.add(pieI);
      this.pataI.position.x = 0.5;
      this.pataI.position.y = 0.625;

      // Pata derecha
      var auxpataD = new THREE.Mesh(pataGeom, mata);
      auxpataD.userData = this;
      auxpataD.position.y = -0.625;

      var pieD = new THREE.Mesh(pieGeom, mata); // Pie derecho
      pieD.userData = this;
      pieD.position.y = -1.2;
      pieD.position.z = 0.25;

      this.pataD = new THREE.Object3D();
      this.pataD.add(auxpataD);
      this.pataD.add(pieD);
      this.pataD.position.x = -0.5;
      this.pataD.position.y = 0.625;

      var completo = new THREE.Object3D();
      completo.add(cuerpocompleto);
      completo.add(this.pataI);
      completo.add(this.pataD);

      completo.position.y = 0.625;

      return completo;
  }

  resetPatas(){
    this.pataD.rotation.x = 0;
    this.pataI.rotation.x = 0;
  }
  
  update () {
    var delta = this.clock.getDelta() ;
    var v = 2*delta;
    TWEEN.update();

    if (this.animacionControl){
      if(this.mov_d == 0){
        if(this.pataD.rotation.x < Math.PI/6 ){
          this.pataD.rotation.x += v;
        }
        else {
          this.mov_d = 1;
        }
      }

      else{
        if(this.pataD.rotation.x > -Math.PI/6 ){
          this.pataD.rotation.x += -v;
        }
        else {
          this.mov_d = 0;
        }
      }

      if(this.mov_i == 1){
        if(this.pataI.rotation.x < Math.PI/6 ){
          this.pataI.rotation.x += v;
        }
        else {
          this.mov_i = 0;
        }
      }

      else{
        if(this.pataI.rotation.x > -Math.PI/6 ){
          this.pataI.rotation.x += -v;
        }
        else {
          this.mov_i = 1;
        }
      }
    }
  }
}

export { Pollo };