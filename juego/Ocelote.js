import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import * as TWEEN from '../libs/tween.esm.js'
import { FirstPersonControls } from '../libs/FirstPersonControls.js'
import { OrbitControls } from '../libs/OrbitControls.js'
 
class Ocelote extends THREE.Object3D {
  constructor(renderer) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    //this.createGUI(gui,titleGui);
    this.createCamera(renderer);
    this.model = this.createOcelote();
    this.model.add(this.camera);
    this.model.position.y = 1.35;
    this.add(this.model);
    
    

    this.mov_d = 0;
    this.mov_i = 0;
    this.animacionControl = false;

    this.casillaActual;
    this.light = this.createLight();
    this.light.visible=false;
    this.model.add(this.light);
    
  }

  createLight(){
    var light = new THREE.SpotLight(0xfcfcfc, 3, 6, Math.PI/4);
    light.position.set(0, 6, 0);
    light.target = this.model;
    return light;
  }

  createCamera(renderer){
    this.clock = new THREE.Clock();
    this.camera = new THREE.PerspectiveCamera ( 75 , window.innerWidth/window.innerHeight, 0.1 , 1000) ;
    this.camera.position.set(2.25,3,0);
    this.camera.lookAt( 0 , 0 , 0 ) ;
    // Se crea e l c o n t r o l de v u e l o
    this.fpControls = new FirstPersonControls ( this.camera , renderer.domElement ) ;
    //this.fpControls = new OrbitControls(this.camera, renderer.domElement);
    this.fpControls.movementSpeed = 25 ;
    this.fpControls.rollSpeed = Math.PI/48 ;
    this.fpControls.autoForward = false ;
  }

  activarLuz(){
    //this.add(this.light);
    this.light.visible = true;
  }

  desactivarLuz(){
    //this.remove(this.light);
    this.light.visible = false;
  }

  createOcelote(){
      var texture = new THREE.TextureLoader().load('../imgs/pelajeocelote.jpg');
      var mat = new THREE.MeshPhongMaterial ({map: texture});
      //var mat = new THREE.MeshPhongMaterial({color: 0xe6e6e6}); // Gris
      var matn = new THREE.MeshPhongMaterial({color: 0x000000}); // Negro
      var matb = new THREE.MeshPhongMaterial({color: 0xFFFFFF}); // Blanco
      var matv = new THREE.MeshPhongMaterial({color: 0x008f39}); // Verde
      var matm = new THREE.MeshPhongMaterial({color: 0x73400d}); // Verde

      // Parte central (cabeza y lomo)
      var centralGeom = new THREE.BoxGeometry(1, 1.5, 4);
      var central = new THREE.Mesh(centralGeom, mat);
      central.userData = this;

      // Cabeza
      var cabezaGeom = new THREE.BoxGeometry(1.25, 1, 1.25);
      var cabeza = new THREE.Mesh(cabezaGeom, mat);
      cabeza.userData = this;
      cabeza.position.z = 2.625;
      cabeza.position.y = 0.5;

      // Cola
      var colaGeom = new THREE.BoxGeometry(0.25, 0.25, 1.5);
      var colaD = new THREE.Mesh(colaGeom, mat);
      colaD.userData = this;
      colaD.rotateX(-Math.PI/8);
      colaD.position.z = -2.5;
      colaD.position.y = 0;

      var colaTGeom = new THREE.BoxGeometry(0.25, 0.25, 2);
      var colaT = new THREE.Mesh(colaTGeom, mat);
      colaT.userData = this;
      colaT.rotateX(Math.PI/8);
      colaT.position.z = -4;
      colaT.position.y = 0.125;



      var cola = new THREE.Object3D();
      cola.add(colaD);
      cola.add(colaT);


      // Hocico parte superior
      var hocicoSGeom = new THREE.BoxGeometry(0.75, 0.25, 0.25);
      var hocicoS = new THREE.Mesh(hocicoSGeom, mat);
      hocicoS.userData = this;
      hocicoS.position.y = -0.375;

      // Hocico parte inferior
      var hocicoIGeom = new THREE.BoxGeometry(0.75, 0.25, 0.25);
      var hocicoI = new THREE.Mesh(hocicoIGeom, mat);
      hocicoI.userData = this;
      hocicoI.position.y = -0.625;

      // Nariz
      var cuboGeom = new THREE.BoxGeometry(0.25, 0.25, 0.25);
      var nariz = new THREE.Mesh(cuboGeom, matm);
      nariz.userData= this;
      nariz.position.z = 0.125;
      nariz.position.y = -0.38;

      // Hocico completo (parte superior e inferior y nariz)
      var hocico = new THREE.Object3D();
      hocico.add(hocicoS);
      hocico.add(hocicoI);
      hocico.add(nariz);
      hocico.position.z = 3.375;
      hocico.position.y = 0.75;

      // Oreja izquierda
      var orejaGeom = new THREE.BoxGeometry(0.25, 0.25, 0.5);
      var orejaI = new THREE.Mesh(orejaGeom, mat);
      orejaI.userData = this;
      orejaI.position.x = 0.25;

      // Oreja derecha
      var orejaD = new THREE.Mesh(orejaGeom, mat);
      orejaD.userData = this;
      orejaD.position.x = -0.25;

      // Orejas (izquierda y derecha)
      var orejas = new THREE.Object3D();
      orejas.add(orejaI);
      orejas.add(orejaD);
      orejas.position.z = 2.25;
      orejas.position.y = 1;

      // Pupila ojo izquierdo
      var ojonI = new THREE.Mesh(cuboGeom, matv);
      ojonI.userData = this;
      
      // Esclerótica ojo izquierdo
      var ojobI = new THREE.Mesh(cuboGeom, matb);
      ojobI.userData = this;
      ojobI.position.x = 0.25;

      // Ojo izquierdo (pupila y esclerótica)
      var ojoI = new THREE.Object3D();
      ojoI.add(ojonI);
      ojoI.add(ojobI);
      ojoI.position.x = 0.23;

      // Pupila ojo derecho
      var ojonD = new THREE.Mesh(cuboGeom, matv);
      // Esclerótica ojo derecho
      var ojobD = new THREE.Mesh(cuboGeom, matb);
      ojobD.position.x = -0.25;

      // Ojo derecho (pupila y esclerótica)
      var ojoD = new THREE.Object3D();
      ojoD.add(ojonD);
      ojoD.add(ojobD);
      ojoD.position.x = -0.23;

      // Ojos completos (izquierdo y derecho)
      var ojos = new THREE.Object3D();
      ojos.add(ojoD);
      ojos.add(ojoI);
      ojos.position.z = 3.25;
      ojos.position.y = 0.625;

      // Cuerpo sin patas
      var cuerpo = new THREE.Object3D();
      cuerpo.add(central);
      cuerpo.add(cabeza);
      cuerpo.add(cola);
      cuerpo.add(hocico);
      cuerpo.add(orejas);
      cuerpo.add(ojos);

      cuerpo.position.y = 1.25;

      // Pata delantera izquierda
      var pataGeomD = new THREE.BoxGeometry(0.5, 2.75, 0.5);
      var auxpataDI = new THREE.Mesh(pataGeomD, mat);
      auxpataDI.position.x = 0.3;
      auxpataDI.position.y = -1.25;
      this.pataDI = new THREE.Object3D();
      this.pataDI.add(auxpataDI);
      this.pataDI.position.z = 1.25;
      this.pataDI.position.y = 2.05;
      

      // Pata delantera derecha
      var auxpataDD = new THREE.Mesh(pataGeomD, mat);
      auxpataDD.position.x = -0.3;
      auxpataDD.position.y = -1.25;
      this.pataDD = new THREE.Object3D();
      this.pataDD.add(auxpataDD);
      this.pataDD.position.z = 1.25;
      this.pataDD.position.y = 2.05;

      // Pata trasera izquierda
      var pataGeomT = new THREE.BoxGeometry(0.5, 1.25, 0.5);
      var auxpataTI = new THREE.Mesh(pataGeomT, mat);
      auxpataTI.position.x = 0.3;
      auxpataTI.position.y = -0.625;
      this.pataTI = new THREE.Object3D();
      this.pataTI.add(auxpataTI);
      this.pataTI.position.z = -1;
      this.pataTI.position.y = 0.625;

      // Pata trasera derecha
      var auxpataTD = new THREE.Mesh(pataGeomT, mat);
      auxpataTD.position.x = -0.3;
      auxpataTD.position.y = -0.625;
      this.pataTD = new THREE.Object3D();
      this.pataTD.add(auxpataTD);
      this.pataTD.position.y = 0.625;
      this.pataTD.position.z = -1;

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

  controlAnimacion () {
    this.animacionControl = !this.animacionControl;
  }

  resetPatas(){
    this.pataDD.rotation.x = 0;
    this.pataTD.rotation.x = 0;
    this.pataDI.rotation.x = 0;
    this.pataTI.rotation.x = 0;
  }

  createAnimation(spline){
    
    this.spline = spline;
    this.animacion = new THREE.Object3D();
    var pos = this.spline.getPointAt(0);
    this.animacion.position.copy(pos);
    //var tangente = this.spline.getTangentAt(0);
    //pos.add(tangente);
    //this.animacion.lookAt(pos);
    this.animacion.add(this.model);
    //this.animacion.add(this.light);
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
            //var tangente = that.spline.getTangentAt(that.origin.p);
            //pos.add(tangente);
            //that.animacion.lookAt(pos);
        })
        .onStart( that.controlAnimacion())
        .onComplete(function(){
            that.controlAnimacion(); 
            that.resetPatas();
          });

      this.animation.start();
  }
  
  update () {
    var delta = this.clock.getDelta() ;
    this.fpControls.update(delta) ;
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

export { Ocelote};