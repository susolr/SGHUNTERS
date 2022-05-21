import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import * as TWEEN from '../libs/tween.esm.js'
import { FirstPersonControls } from '../libs/FirstPersonControls.js'
import { OrbitControls } from '../libs/OrbitControls.js'
 
class Conejo extends THREE.Object3D {
  constructor(renderer) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    //this.createGUI(gui,titleGui);
    this.createCamera(renderer);
    this.model = this.createConejo();
    this.model.position.y = 1.5;
    this.model.add(this.camera);
    this.add(this.model);
    this.animacionControl = false;
    

    this.mov_d = 0;
    this.mov_t = 0;

    this.casillaActual;
    this.light = this.createLight();
    this.model.add(this.light);
    this.light.visible = false;
  }

  createLight(){
    var light = new THREE.SpotLight(0xfcfcfc, 3, 6, Math.PI/4);
    light.position.set(0, 6, 0);
    light.target = this.model;
    return light;
  }

  activarLuz(){
    //this.add(this.light);
    this.light.visible = true;
  }

  desactivarLuz(){
    //this.remove(this.light);
    this.light.visible = false;
  }

  createCamera(renderer){
    this.clock = new THREE.Clock();
    this.camera = new THREE.PerspectiveCamera ( 75 , window.innerWidth/window.innerHeight, 0.1 , 1000) ;
    this.camera.position.set(2.25,3.625,0);
    this.camera.lookAt( 0 , 0 , 0 ) ;
    // Se crea e l c o n t r o l de v u e l o
    this.fpControls = new FirstPersonControls ( this.camera , renderer.domElement ) ;
    //this.fpControls = new OrbitControls(this.camera, renderer.domElement);
    this.fpControls.movementSpeed = 25 ;
    this.fpControls.rollSpeed = Math.PI/48 ;
    this.fpControls.autoForward = false ;
  }

  createConejo(){
      var texture = new THREE.TextureLoader().load('../imgs/pelajeconejo.jpg');
      var mat = new THREE.MeshPhongMaterial ({map: texture});
      //var mat = new THREE.MeshPhongMaterial({color: 0xb5a062}); // Amarillo amarronado
      var matOjos = new THREE.MeshPhongMaterial({color: 0x000000}); // Negro
      var matNariz = new THREE.MeshPhongMaterial({color: 0xedb7e0}); // Rosa

      // Cabeza
      var cabezaGeom = new THREE.BoxGeometry(1.25, 1, 1.25);
      var cabeza = new THREE.Mesh(cabezaGeom, mat);
      cabeza.userData = this;

      // Nariz
      var narizGeom = new THREE.BoxGeometry(0.25, 0.25, 0.25);
      var nariz = new THREE.Mesh(narizGeom, matNariz);
      nariz.userData = this;
      nariz.position.z = 0.625;

      // Ojo izquierdo
      var ojosGeom = new THREE.BoxGeometry(0.25, 0.375, 0.25);
      var ojoI = new THREE.Mesh(ojosGeom, matOjos);
      ojoI.userData = this;
      ojoI.position.x = 0.25;

      // Ojo derecho
      var ojoD = new THREE.Mesh(ojosGeom, matOjos);
      ojoD.userData= this;
      ojoD.position.x = -0.25;

      // Ojos completos
      var ojos = new THREE.Object3D();
      ojos.add(ojoI);
      ojos.add(ojoD);
      ojos.position.y = 0.25;
      ojos.position.z = 0.55;

      // Oreja izquierda
      var orejaGeom = new THREE.BoxGeometry(0.5, 1.25, 0.25);
      var orejaI = new THREE.Mesh(orejaGeom, mat);
      orejaI.userData = this;
      orejaI.rotateY(-Math.PI/12);
      orejaI.position.x = 0.375;

      // Oreja derecha
      var orejaD = new THREE.Mesh(orejaGeom, mat);
      orejaD.userData = this;
      orejaD.rotateY(Math.PI/12);
      orejaD.position.x = -0.375;

      // Orejas completas
      var orejas = new THREE.Object3D();
      orejas.add(orejaI);
      orejas.add(orejaD);
      orejas.position.y = 1.125;
      orejas.position.z = -0.25;

      // Cabeza completa (cabeza, nariz, ojos y orejas)
      var cabezaCompleta = new THREE.Object3D();
      cabezaCompleta.add(cabeza);
      cabezaCompleta.add(nariz);
      cabezaCompleta.add(ojos);
      cabezaCompleta.add(orejas);
      cabezaCompleta.position.z = 1.375;
      cabezaCompleta.position.y = 1;

      // Barriga
      var barrigaGeom = new THREE.BoxGeometry(1.5, 1.5, 2.5);
      var barriga = new THREE.Mesh(barrigaGeom, mat);
      barriga.userData = this;
      barriga.rotateX(-Math.PI/8);
      
      // Cola
      var colaGeom = new THREE.BoxGeometry(0.75, 0.75, 0.5);
      var cola = new THREE.Mesh(colaGeom, mat);
      cola.userData = this;
      cola.rotateX(-Math.PI/8);
      cola.position.z = -1.25;
      cola.position.y = -0.625;

      // Cuerpo (cabeza completa, barriga y cola)
      var cuerpo = new THREE.Object3D();
      cuerpo.add(cabezaCompleta);
      cuerpo.add(barriga);
      cuerpo.add(cola);
      cuerpo.position.y = 0.875;

      // Pata delanteraizquierda
      var pataGeom = new THREE.BoxGeometry(0.5, 2, 0.5);
      var pataI = new THREE.Mesh(pataGeom, mat);
      pataI.userData = this;
      pataI.position.x = 0.75;
      pataI.position.y = -0.75;

      // Pata delanteraderecha
      var pataD = new THREE.Mesh(pataGeom, mat);
      pataD.userData = this;
      pataD.position.x = -0.75;
      pataD.position.y = -0.75;

      // Patas delanteras completas (izquierda y derecha)
      this.patasD = new THREE.Object3D();
      this.patasD.add(pataI);
      this.patasD.add(pataD);
      this.patasD.position.y = 0.75;
      this.patasD.position.z = 1.25;

      // Pie trasero izquierdo
      var pieGeom = new THREE.BoxGeometry(0.5, 0.25, 1.75);
      var pieI = new THREE.Mesh(pieGeom, mat);
      pieI.userData = this;
      pieI.position.z = -0.125;

      // Muslo trasero izquierdo
      var musloGeom = new THREE.BoxGeometry(0.5, 1, 1.25)
      var musloI = new THREE.Mesh(musloGeom, mat);
      musloI.userData = this;
      musloI.rotateX(-Math.PI/8);
      musloI.position.y = 0.75;
      musloI.position.z = -0.625;

      // Pata trasera izquierda (pie y muslo)
      var patasTI = new THREE.Object3D();
      patasTI.add(pieI);
      patasTI.add(musloI);
      patasTI.position.x = 0.75;
      patasTI.position.y = -0.875;

      // Pie trasero derecho
      var pieD = new THREE.Mesh(pieGeom, mat);
      pieD.userData = this;
      pieD.position.z = -0.125;

      // Muslo trasero derecho
      var musloD = new THREE.Mesh(musloGeom, mat);
      musloD.userData = this;
      musloD.rotateX(-Math.PI/8);
      musloD.position.z = -0.625;
      musloD.position.y = 0.75;

      // Pata trasera derecha (pie y muslo)
      var patasTD = new THREE.Object3D();
      patasTD.add(pieD);
      patasTD.add(musloD);
      patasTD.position.x = -0.75;
      patasTD.position.y = -0.875;

      // Patas traseras completas (izquierda y derecha)
      this.patasT = new THREE.Object3D();
      this.patasT.add(patasTI);
      this.patasT.add(patasTD);

      // Cuerpo completo (cuerpo, patas delanteras y patas traseras)
      var cuerpoCompleto = new THREE.Object3D();
      cuerpoCompleto.add(cuerpo);
      cuerpoCompleto.add(this.patasD);
      cuerpoCompleto.add(this.patasT);

      // Subimos el conejo la mitad de la altura de las patas delanteras para que esté en la base
      cuerpoCompleto.position.y = 1;

      return cuerpoCompleto;

  }

  resetPatas(){
    this.patasD.rotation.x = 0;
    this.patasT.rotation.x = 0;
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

  controlAnimacion () {
    this.animacionControl = !this.animacionControl;
  }
  
  update () {
    var delta = this.clock.getDelta() ;
    this.fpControls.update(delta) ;
    var v = 2*delta;
    TWEEN.update();
    if(this.animacionControl){
      if(this.mov_d == 0){
        if(this.patasD.rotation.x < Math.PI/6 ){
          this.patasD.rotation.x += v;
        }
        else {
          this.mov_d = 1;
        }
      }
      else{
        if(this.patasD.rotation.x > -Math.PI/6 ){
          this.patasD.rotation.x -= v;
        }
        else {
          this.mov_d = 0;
        }
      }

      if(this.mov_t == 1){
        if(this.patasT.rotation.x < Math.PI/6 ){
          this.patasT.rotation.x += v;
        }
        else {
          this.mov_t = 0;
        }
      }
      else{
        if(this.patasT.rotation.x > -Math.PI/6 ){
          this.patasT.rotation.x -= v;
        }
        else {
          this.mov_t = 1;
        }
      }
    }

  }
}

export { Conejo };