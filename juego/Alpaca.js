import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Presa } from './Presa.js'
 
class Alpaca extends Presa {
  constructor() {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    //this.createGUI(gui,titleGui);

    this.model = this.createAlpaca();
    this.model.position.y = 1.5; //2 si quitamos escalado
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

  createAlpaca(){
      var texture = new THREE.TextureLoader().load('../imgs/pelajealpaca.jpg');
      var mat = new THREE.MeshPhongMaterial ({map: texture});
      //var mat = new THREE.MeshPhongMaterial({color: 0xe6e6e6}); // Gris
      var matn = new THREE.MeshPhongMaterial({color: 0x000000}); // Negro
      var matm = new THREE.MeshPhongMaterial({color: 0x6c3b2a}); // Marrón

      var hocicoGeom = new THREE.BoxGeometry(1, 1, 1); // Hocico
      var hocico = new THREE.Mesh(hocicoGeom, mat);
      hocico.userData = this;

      var narizGeom = new THREE.BoxGeometry(0.25, 0.25, 0.25); // Nariz izquierda
      var narizI = new THREE.Mesh(narizGeom, matn);
      narizI.userData = this;
      narizI.position.x = 0.325;

      var narizD = new THREE.Mesh(narizGeom, matn); // Nariz derecha
      narizD.userData = this;
      narizD.position.x = -0.325;

      var nariz = new THREE.Object3D(); // Nariz completa (fosa izquierda y derecha)
      nariz.add(narizI);
      nariz.add(narizD);
      nariz.position.y = 0.125;
      nariz.position.z = 0.38;

      var bocaSGeom = new THREE.BoxGeometry(0.4, 0.25, 0.25); // Boca superior
      var bocaS = new THREE.Mesh(bocaSGeom, matm);
      bocaS.userData = this;

      var bocaIGeom = new THREE.BoxGeometry(1.02, 0.25, 0.25); // Boca inferior
      var bocaI = new THREE.Mesh(bocaIGeom, matm);
      bocaI.userData = this;
      bocaI.position.y = -0.25;

      var boca = new THREE.Object3D(); // Boca completa (parte superior e inferior)
      boca.add(bocaS);
      boca.add(bocaI);
      boca.position.y = -0.13;
      boca.position.z = 0.38;
      
      var hocicocompleto = new THREE.Object3D(); // Hocico completo (hocico, nariz y boca)
      hocicocompleto.add(hocico);
      hocicocompleto.add(nariz);
      hocicocompleto.add(boca);
      hocicocompleto.position.y = 1.25;
      hocicocompleto.position.z = 1.25;

      var cabezaGeom = new THREE.BoxGeometry(2, 4.5, 1.5); // Cabeza
      var cabeza = new THREE.Mesh(cabezaGeom, mat);
      cabeza.userData = this;

      var orejaEGeom = new THREE.BoxGeometry(0.75, 0.75, 0.5); // Oreja izquierda parte exterior
      var orejaIE = new THREE.Mesh(orejaEGeom, mat);
      orejaIE.userData = this;

      var orejaIGeom = new THREE.BoxGeometry(0.25, 0.5, 0.25); // Oreja izquierda parte interior
      var orejaIM = new THREE.Mesh(orejaIGeom, matm);
      orejaIM.userData = this;
      orejaIM.position.y = -0.125;
      orejaIM.position.z = 0.15;

      var orejaI = new THREE.Object3D(); // Oreja izquierda completa (parte exterior e interior)
      orejaI.add(orejaIE);
      orejaI.add(orejaIM);
      orejaI.position.x = 0.6;

      var orejaDE = new THREE.Mesh(orejaEGeom, mat); // Oreja derecha parte exterior
      orejaDE.userData = this;

      var orejaDM = new THREE.Mesh(orejaIGeom, matm); // Oreja derecha parte interior
      orejaDM.userData = this;
      orejaDM.position.y = -0.125;
      orejaDM.position.z = 0.15;

      var orejaD = new THREE.Object3D(); // Oreja derecha completa (parte exterior e interior)
      orejaD.add(orejaDE);
      orejaD.add(orejaDM);
      orejaD.position.x = -0.6;

      var orejas = new THREE.Object3D(); // Orejas completas (izquierda y derecha)
      orejas.add(orejaI);
      orejas.add(orejaD);
      orejas.position.y = 2.625; 

      var ojoMGeom = new THREE.BoxGeometry(0.5, 0.25, 0.25); // Ojo izquierdo párpado
      var ojoIM = new THREE.Mesh(ojoMGeom, matm);
      ojoIM.userData = this;
      ojoIM.position.y = 0.25;

      var ojoNGeom = new THREE.BoxGeometry(0.5, 0.25, 0.25); // Ojo izquierdo pupila
      var ojoIN = new THREE.Mesh(ojoNGeom, matn);
      ojoIN.userData = this;

      var ojoI = new THREE.Object3D(); // Ojo izquierdo completo (párpado y pupila)
      ojoI.add(ojoIM);
      ojoI.add(ojoIN);
      ojoI.position.x = 0.5;

      var ojoDM = new THREE.Mesh(ojoMGeom, matm); // Ojo derecho párpado
      ojoDM.userData = this;
      ojoDM.position.y = 0.25;

      var ojoDN = new THREE.Mesh(ojoNGeom, matn); // Ojo derecho pupila
      ojoDN.userData = this;

      var ojoD = new THREE.Object3D(); // Ojo derecho completo (párpado y pupila)
      ojoD.add(ojoDM);
      ojoD.add(ojoDN);
      ojoD.position.x = -0.5;

      var ojos = new THREE.Object3D(); // Ojos completos (izquierdo y derecho)
      ojos.add(ojoI);
      ojos.add(ojoD);
      ojos.position.y = 1.625;
      ojos.position.z = 0.75; 

      var cabezacompleta = new THREE.Object3D(); // Cabeza completa (hocico, cabeza, orejas y ojos)
      cabezacompleta.add(hocicocompleto);
      cabezacompleta.add(cabeza);
      cabezacompleta.add(orejas);
      cabezacompleta.add(ojos);
      cabezacompleta.position.y = 1.5;
      cabezacompleta.position.z = 2.375; 

      var cuerpoGeom = new THREE.BoxGeometry(3, 2.5, 4.5); // Cuerpo
      var cuerpo = new THREE.Mesh(cuerpoGeom, mat);
      cuerpo.userData = this;

      var cuerpocompleto = new THREE.Object3D(); // Cuerpo completo sin patas (cabeza y cuerpo)
      cuerpocompleto.add(cabezacompleta);
      cuerpocompleto.add(cuerpo);
      cuerpocompleto.position.y = 2.5;

      // Pata delantera izquierda
      var pataGeom = new THREE.BoxGeometry(1, 3, 1);
      var auxpataDI = new THREE.Mesh(pataGeom, mat);
      auxpataDI.userData = this;
      auxpataDI.position.x = 0.75;
      auxpataDI.position.y = -1;
      this.pataDI = new THREE.Object3D();
      this.pataDI.add(auxpataDI);
      this.pataDI.position.z = 1;
      this.pataDI.position.y = 1;
      
      // Pata delantera derecha
      var auxpataDD = new THREE.Mesh(pataGeom, mat);
      auxpataDD.userData = this;
      auxpataDD.position.x = -0.75;
      auxpataDD.position.y = -1;
      this.pataDD = new THREE.Object3D();
      this.pataDD.add(auxpataDD);
      this.pataDD.position.z = 1;
      this.pataDD.position.y = 1;

      // Pata trasera izquierda
      var auxpataTI = new THREE.Mesh(pataGeom, mat);
      auxpataTI.userData = this;
      auxpataTI.position.x = 0.75;
      auxpataTI.position.y = -1;
      this.pataTI = new THREE.Object3D();
      this.pataTI.add(auxpataTI);
      this.pataTI.position.z = -1.25;
      this.pataTI.position.y = 1;

      // Pata trasera derecha
      var auxpataTD = new THREE.Mesh(pataGeom, mat);
      auxpataTD.userData = this;
      auxpataTD.position.x = -0.75;
      auxpataTD.position.y = -1;
      this.pataTD = new THREE.Object3D();
      this.pataTD.add(auxpataTD);
      this.pataTD.position.z = -1.25;
      this.pataTD.position.y = 1;
      
      var completo = new THREE.Object3D();
      completo.add(cuerpocompleto);
      completo.add(this.pataDI);
      completo.add(this.pataDD);
      completo.add(this.pataTI);
      completo.add(this.pataTD);
      completo.position.y = 1.5; // Subimos la alpaca la mitad de la altura de las patas para que esté en la base
      completo.scale.set(0.75,0.75,0.75);
      return completo;
  }

  resetPatas(){
    this.pataDD.rotation.x = 0;
    this.pataTD.rotation.x = 0;
    this.pataDI.rotation.x = 0;
    this.pataTI.rotation.x = 0;
  } 
  
  update () {
    var delta = this.clock.getDelta() ;
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

export { Alpaca };