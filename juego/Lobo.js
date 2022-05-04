import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Lobo extends THREE.Object3D {
  constructor() {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    //this.createGUI(gui,titleGui);
    
    this.model = this.createLobo();
    this.model.position.y = 1.35;
    this.add(this.model);

    this.mov_d = 0;
    this.mov_i = 0;
    
  }

  createLobo(){
      var mat = new THREE.MeshPhongMaterial({color: 0xe6e6e6}); // Gris
      var matn = new THREE.MeshPhongMaterial({color: 0x000000}); // Negro
      var matb = new THREE.MeshPhongMaterial({color: 0xFFFFFF}); // Blanco

      // Parte central (cabeza y lomo)
      var centralGeom = new THREE.BoxGeometry(1.5, 1.5, 4.5);
      var central = new THREE.Mesh(centralGeom, mat);

      // Cuello
      var cuelloGeom = new THREE.BoxGeometry(2, 1.75, 1.5);
      var cuello = new THREE.Mesh(cuelloGeom, mat);
      cuello.position.z = 0.75;

      // Cola
      var colaGeom = new THREE.BoxGeometry(0.5, 0.5, 1.75);
      var cola = new THREE.Mesh(colaGeom, mat);
      cola.position.z = -2.5;
      cola.position.y = 0.5;

      // Hocico parte superior
      var hocicoSGeom = new THREE.BoxGeometry(0.75, 0.5, 1);
      var hocicoS = new THREE.Mesh(hocicoSGeom, mat);
      hocicoS.position.y = 0.125;

      // Hocico parte inferior
      var hocicoIGeom = new THREE.BoxGeometry(0.75, 0.25, 1);
      var hocicoI = new THREE.Mesh(hocicoIGeom, matn);
      hocicoI.position.y = -0.25;

      // Nariz
      var cuboGeom = new THREE.BoxGeometry(0.25, 0.25, 0.25);
      var nariz = new THREE.Mesh(cuboGeom, matn);
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
      orejaI.position.x = 0.5;

      // Oreja derecha
      var orejaD = new THREE.Mesh(orejaGeom, mat);
      orejaD.position.x = -0.5;

      // Orejas (izquierda y derecha)
      var orejas = new THREE.Object3D();
      orejas.add(orejaI);
      orejas.add(orejaD);
      orejas.position.z = 1.75;
      orejas.position.y = 1;

      // Pupila ojo izquierdo
      var ojonI = new THREE.Mesh(cuboGeom, matn);
      // Esclerótica ojo izquierdo
      var ojobI = new THREE.Mesh(cuboGeom, matb);
      ojobI.position.x = 0.25;

      // Ojo izquierdo (pupila y esclerótica)
      var ojoI = new THREE.Object3D();
      ojoI.add(ojonI);
      ojoI.add(ojobI);
      ojoI.position.x = 0.35;

      // Pupila ojo derecho
      var ojonD = new THREE.Mesh(cuboGeom, matn);
      // Esclerótica ojo derecho
      var ojobD = new THREE.Mesh(cuboGeom, matb);
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
      auxpataDI.position.x = 0.5;
      auxpataDI.position.y = -0.625;
      this.pataDI = new THREE.Object3D();
      this.pataDI.add(auxpataDI);
      this.pataDI.position.z = 0.75;
      this.pataDI.position.y = 0.625;
      

      // Pata delantera derecha
      var auxpataDD = new THREE.Mesh(pataGeom, mat);
      auxpataDD.position.x = -0.5;
      auxpataDD.position.y = -0.625;
      this.pataDD = new THREE.Object3D();
      this.pataDD.add(auxpataDD);
      this.pataDD.position.z = 0.75;
      this.pataDD.position.y = 0.625;

      // Pata trasera izquierda
      var auxpataTI = new THREE.Mesh(pataGeom, mat);
      auxpataTI.position.x = 0.5;
      auxpataTI.position.y = -0.625;
      this.pataTI = new THREE.Object3D();
      this.pataTI.add(auxpataTI);
      this.pataTI.position.z = -1.5;
      this.pataTI.position.y = 0.625;

      // Pata trasera derecha
      var auxpataTD = new THREE.Mesh(pataGeom, mat);
      auxpataTD.position.x = -0.5;
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
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      sizeX : 1.0,
      sizeY : 1.0,
      sizeZ : 1.0,
      
      rotX : 0.0,
      rotY : 0.0,
      rotZ : 0.0,
      
      posX : 0.0,
      posY : 0.0,
      posZ : 0.0,
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset : () => {
        this.guiControls.sizeX = 1.0;
        this.guiControls.sizeY = 1.0;
        this.guiControls.sizeZ = 1.0;
        
        this.guiControls.rotX = 0.0;
        this.guiControls.rotY = 0.0;
        this.guiControls.rotZ = 0.0;
        
        this.guiControls.posX = 0.0;
        this.guiControls.posY = 0.0;
        this.guiControls.posZ = 0.0;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name ('Tamaño X : ').listen();
    folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Tamaño Y : ').listen();
    folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name ('Tamaño Z : ').listen();
    
    folder.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.1).name ('Rotación X : ').listen();
    folder.add (this.guiControls, 'rotY', 0.0, Math.PI/2, 0.1).name ('Rotación Y : ').listen();
    folder.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.1).name ('Rotación Z : ').listen();
    
    folder.add (this.guiControls, 'posX', -20.0, 20.0, 0.1).name ('Posición X : ').listen();
    folder.add (this.guiControls, 'posY', 0.0, 10.0, 0.1).name ('Posición Y : ').listen();
    folder.add (this.guiControls, 'posZ', -20.0, 20.0, 0.1).name ('Posición Z : ').listen();
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    //this.rotation.x += 0.01;
    /*this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
    */

    if(this.mov_d == 0){
      if(this.pataDD.rotation.x < Math.PI/6 ){
        this.pataDD.rotation.x += 0.01;
        this.pataTD.rotation.x += 0.01;
      }
      else {
        this.mov_d = 1;
      }
    }
    else{
      if(this.pataDD.rotation.x > -Math.PI/6 ){
        this.pataDD.rotation.x += -0.01;
        this.pataTD.rotation.x += -0.01;
      }
      else {
        this.mov_d = 0;
      }
    }

    if(this.mov_i == 1){
      if(this.pataDI.rotation.x < Math.PI/6 ){
        this.pataDI.rotation.x += 0.01;
        this.pataTI.rotation.x += 0.01;
      }
      else {
        this.mov_i = 0;
      }
    }
    else{
      if(this.pataDI.rotation.x > -Math.PI/6 ){
        this.pataDI.rotation.x += -0.01;
        this.pataTI.rotation.x += -0.01;
      }
      else {
        this.mov_i = 1;
      }
    }
  }
}

export { Lobo };