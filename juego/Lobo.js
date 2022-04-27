import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Lobo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    this.lobo = this.createLobo();
    this.lobo.position.y = 1.5;
    this.add(this.lobo);
    
  }

  createLobo(){
      var mat = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
      var mat2 = new THREE.MeshPhongMaterial({color: 0x000000});
      var centralGeom = new THREE.BoxGeometry(1.5, 1.5, 4.5);
      var central = new THREE.Mesh(centralGeom, mat);
      var cuelloGeom = new THREE.BoxGeometry(2, 1.75, 1.5);
      var cuello = new THREE.Mesh(cuelloGeom, mat);
      cuello.position.z = 0.75;

      var colaGeom = new THREE.BoxGeometry(0.5, 0.5, 1.75);
      var cola = new THREE.Mesh(colaGeom, mat);
      cola.position.z = -2.5;
      cola.position.y = 0.5;

      var hocicoSGeom = new THREE.BoxGeometry(0.75, 0.5, 1);
      var hocicoS = new THREE.Mesh(hocicoSGeom, mat);
      hocicoS.position.y = 0.125;
      var hocicoIGeom = new THREE.BoxGeometry(0.75, 0.25, 1);
      var hocicoI = new THREE.Mesh(hocicoIGeom, mat2);
      hocicoI.position.y = -0.25;

      var hocico = new THREE.Object3D();
      hocico.add(hocicoS);
      hocico.add(hocicoI);
      hocico.position.z = 2.625;
      hocico.position.y = -0.25;

      var orejaGeom = new THREE.BoxGeometry(0.5, 0.5, 0.25);

      var orejaI = new THREE.Mesh(orejaGeom, mat);
      orejaI.position.z = 1.5;
      orejaI.position.y = 1;
      orejaI.position.x = 0.5;

      var orejaD = new THREE.Mesh(orejaGeom, mat);
      orejaD.position.z = 1.5;
      orejaD.position.y = 1;
      orejaD.position.x = -0.5;

      var cuboGeom = new THREE.BoxGeometry(0.25, 0.25, 0.25);
      
      var nariz = new THREE.Mesh(cuboGeom, mat2);
      nariz.position.z = 3.0625;
      nariz.position.y = 0.0625;

      var ojoI = new THREE.Mesh(cuboGeom, mat2);
      ojoI.position.x = 0.375;
      ojoI.position.z = 2.25;
      ojoI.position.y = 0.25;

      var ojoD = new THREE.Mesh(cuboGeom, mat2);
      ojoD.position.x = -0.375;
      ojoD.position.z = 2.25;
      ojoD.position.y = 0.25;

      var cuerpo = new THREE.Object3D();
      cuerpo.add(central);
      cuerpo.add(cuello);
      cuerpo.add(cola);
      cuerpo.add(hocico);
      cuerpo.add(orejaI);
      cuerpo.add(orejaD);
      cuerpo.add(nariz);
      cuerpo.add(ojoI);
      cuerpo.add(ojoD);

      cuerpo.position.y = 1.5;

      var pataGeom = new THREE.BoxGeometry(0.5, 1.75, 0.5);
      var pataDI = new THREE.Mesh(pataGeom, mat);
      pataDI.position.x = 0.5;
      pataDI.position.z = 0.75;

      var pataDD = new THREE.Mesh(pataGeom, mat);
      pataDD.position.x = -0.5;
      pataDD.position.z = 0.75;

      var pataTI = new THREE.Mesh(pataGeom, mat);
      pataTI.position.x = 0.5;
      pataTI.position.z = -1.5;

      var pataTD = new THREE.Mesh(pataGeom, mat);
      pataTD.position.x = -0.5;
      pataTD.position.z = -1.5;

      var completo = new THREE.Object3D();
      completo.add(cuerpo);
      completo.add(pataDI);
      completo.add(pataDD);
      completo.add(pataTI);
      completo.add(pataTD);

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
  }
}

export { Lobo };