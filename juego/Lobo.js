import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Cazador } from './Cazador.js'
 
class Lobo extends Cazador {
  constructor() {
    super();

    this.model = this.createLobo();
    this.model.position.y = 1.35;
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
      var texture = new THREE.TextureLoader().load('../imgs/pelaje.jpg');
      var mat = new THREE.MeshPhongMaterial ({map: texture});
      //var mat = new THREE.MeshPhongMaterial({color: 0xe6e6e6}); // Gris
      var matn = new THREE.MeshPhongMaterial({color: 0x000000}); // Negro
      var matb = new THREE.MeshPhongMaterial({color: 0xFFFFFF}); // Blanco

      // Parte central (cabeza y lomo)
      var centralGeom = new THREE.BoxGeometry(1.5, 1.5, 4.5);
      var central = new THREE.Mesh(centralGeom, mat);
      central.userData = this;

      // Cuello
      var cuelloGeom = new THREE.BoxGeometry(2, 1.75, 1.5);
      var cuello = new THREE.Mesh(cuelloGeom, mat);
      cuello.userData = this;
      cuello.position.z = 0.75;

      // Cola
      var colaGeom = new THREE.BoxGeometry(0.5, 0.5, 1.75);
      var cola = new THREE.Mesh(colaGeom, mat);
      cola.userData = this;
      cola.position.z = -2.5;
      cola.position.y = 0.48;

      // Hocico parte superior
      var hocicoSGeom = new THREE.BoxGeometry(0.75, 0.5, 1);
      var hocicoS = new THREE.Mesh(hocicoSGeom, mat);
      hocicoS.userData = this;
      hocicoS.position.y = 0.125;

      // Hocico parte inferior
      var hocicoIGeom = new THREE.BoxGeometry(0.75, 0.25, 1);
      var hocicoI = new THREE.Mesh(hocicoIGeom, matn);
      hocicoI.userData = this;
      hocicoI.position.y = -0.25;

      // Nariz
      var cuboGeom = new THREE.BoxGeometry(0.25, 0.25, 0.25);
      var nariz = new THREE.Mesh(cuboGeom, matn);
      nariz.userData = this;
      nariz.position.z = 0.4375;
      nariz.position.y = 0.3125;

      // Hocico completo (parte superior e inferior y nariz)
      var hocico = new THREE.Object3D();
      hocico.add(hocicoS);
      hocico.add(hocicoI);
      hocico.add(nariz);
      hocico.position.z = 2.625;
      hocico.position.y = -0.25;

      // Oreja izquierda
      var orejaGeom = new THREE.BoxGeometry(0.5, 0.5, 0.25);
      var orejaI = new THREE.Mesh(orejaGeom, mat);
      orejaI.userData = this;
      orejaI.position.x = 0.5;

      // Oreja derecha
      var orejaD = new THREE.Mesh(orejaGeom, mat);
      orejaD.userData = this;
      orejaD.position.x = -0.5;

      // Orejas (izquierda y derecha)
      var orejas = new THREE.Object3D();
      orejas.add(orejaI);
      orejas.add(orejaD);
      orejas.position.z = 1.75;
      orejas.position.y = 1;

      // Pupila ojo izquierdo
      var ojonI = new THREE.Mesh(cuboGeom, matn);
      ojonI.userData = this;
      // Esclerótica ojo izquierdo
      var ojobI = new THREE.Mesh(cuboGeom, matb);
      ojobI.userData = this;
      ojobI.position.x = 0.25;

      // Ojo izquierdo (pupila y esclerótica)
      var ojoI = new THREE.Object3D();
      ojoI.add(ojonI);
      ojoI.add(ojobI);
      ojoI.position.x = 0.35;

      // Pupila ojo derecho
      var ojonD = new THREE.Mesh(cuboGeom, matn);
      ojonD.userData= this;
      // Esclerótica ojo derecho
      var ojobD = new THREE.Mesh(cuboGeom, matb);
      ojobD.userData = this;
      ojobD.position.x = -0.25;

      // Ojo derecho (pupila y esclerótica)
      var ojoD = new THREE.Object3D();
      ojoD.add(ojonD);
      ojoD.add(ojobD);
      ojoD.position.x = -0.35;

      // Ojos completos (izquierdo y derecho)
      var ojos = new THREE.Object3D();
      ojos.add(ojoD);
      ojos.add(ojoI);
      ojos.position.z = 2.25;
      ojos.position.y = 0.25;

      // Cuerpo sin patas
      var cuerpo = new THREE.Object3D();
      cuerpo.add(central);
      cuerpo.add(cuello);
      cuerpo.add(cola);
      cuerpo.add(hocico);
      cuerpo.add(orejas);
      cuerpo.add(ojos);

      cuerpo.position.y = 1.5;

      // Pata delantera izquierda
      var pataGeom = new THREE.BoxGeometry(0.5, 1.75, 0.5);
      var auxpataDI = new THREE.Mesh(pataGeom, mat);
      auxpataDI.userData = this;
      auxpataDI.position.x = 0.5;
      auxpataDI.position.y = -0.625;
      this.pataDI = new THREE.Object3D();
      this.pataDI.add(auxpataDI);
      this.pataDI.position.z = 0.75;
      this.pataDI.position.y = 0.625;
      
      // Pata delantera derecha
      var auxpataDD = new THREE.Mesh(pataGeom, mat);
      auxpataDD.userData = this;
      auxpataDD.position.x = -0.5;
      auxpataDD.position.y = -0.625;
      this.pataDD = new THREE.Object3D();
      this.pataDD.add(auxpataDD);
      this.pataDD.position.z = 0.75;
      this.pataDD.position.y = 0.625;

      // Pata trasera izquierda
      var auxpataTI = new THREE.Mesh(pataGeom, mat);
      auxpataTI.userData = this;
      auxpataTI.position.x = 0.48;
      auxpataTI.position.y = -0.625;
      this.pataTI = new THREE.Object3D();
      this.pataTI.add(auxpataTI);
      this.pataTI.position.z = -1.5;
      this.pataTI.position.y = 0.625;

      // Pata trasera derecha
      var auxpataTD = new THREE.Mesh(pataGeom, mat);
      auxpataTD.userData = this;
      auxpataTD.position.x = -0.48;
      auxpataTD.position.y = -0.625;
      this.pataTD = new THREE.Object3D();
      this.pataTD.add(auxpataTD);
      this.pataTD.position.y = 0.625;
      this.pataTD.position.z = -1.5;

      // Cuerpo completo
      var completo = new THREE.Object3D();
      completo.add(cuerpo);
      completo.add(this.pataDI);
      completo.add(this.pataDD);
      completo.add(this.pataTI);
      completo.add(this.pataTD);

      // Subimos el lobo la mitad de la altura de las patas para que esté en la base
      completo.position.y = 0.875;
      return completo;

  }

  resetPatas(){
    this.pataDD.rotation.x = 0;
    this.pataTD.rotation.x = 0;
    this.pataDI.rotation.x = 0;
    this.pataTI.rotation.x = 0;
  }
  
  update () {
    var delta = this.clock.getDelta();
    var v = 2*delta;
    TWEEN.update();

    if (this.animacionControl){
      if(this.mov_d == 0){
        if(this.pataDD.rotation.x < Math.PI/6 ){
          this.pataDD.rotation.x += v;
          this.pataTD.rotation.x += v;
        }
        else {
          this.mov_d = 1;
        }
      }

      else{
        if(this.pataDD.rotation.x > -Math.PI/6 ){
          this.pataDD.rotation.x += -v;
          this.pataTD.rotation.x += -v;
        }
        else {
          this.mov_d = 0;
        }
      }

      if(this.mov_i == 1){
        if(this.pataDI.rotation.x < Math.PI/6 ){
          this.pataDI.rotation.x += v;
          this.pataTI.rotation.x += v;
        }
        else {
          this.mov_i = 0;
        }
      }

      else{
        if(this.pataDI.rotation.x > -Math.PI/6 ){
          this.pataDI.rotation.x += -v;
          this.pataTI.rotation.x += -v;
        }
        else {
          this.mov_i = 1;
        }
      }
    }
  }
}

export { Lobo };