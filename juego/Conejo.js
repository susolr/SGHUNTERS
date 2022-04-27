import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Conejo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    this.conejo = this.createConejo();
    this.conejo.position.y=1;
    this.add(this.conejo);
    
  }

  createConejo(){
      var mat = new THREE.MeshPhongMaterial({color: 0xe8e8e8})
      var pieGeom = new THREE.BoxGeometry(0.5, 0.25, 1.75);
      var pieI = new THREE.Mesh(pieGeom, mat);
      pieI.position.x = 0.75;
      pieI.position.z = -0.125;

      var pieD = new THREE.Mesh(pieGeom, mat);
      pieD.position.x = -0.75;
      pieD.position.z = -0.125;

      var musloGeom = new THREE.BoxGeometry(0.5, 1, 1.25)

      var musloI = new THREE.Mesh(musloGeom, mat);
      musloI.position.y = 0.5;
      musloI.position.z = 1.25/2;
      musloI.rotateX(-Math.PI/8);
      musloI.position.x = 0.75;
      musloI.position.z = -0.625;
      musloI.position.y += 0.25;
      

      var musloD = new THREE.Mesh(musloGeom, mat);
      musloD.position.y = 0.5;
      musloD.position.z = 1.25/2;
      musloD.rotateX(-Math.PI/8);
      musloD.position.x = -0.75;
      musloD.position.z = -0.625;
      musloD.position.y += 0.25;

      var barrigaGeom = new THREE.BoxGeometry(1.5, 1.5, 2.5);

      var barriga = new THREE.Mesh(barrigaGeom, mat);

      barriga.position.y = 0.75;
      barriga.position.z = 1.25;
      barriga.rotateX(-Math.PI/8);
      barriga.position.z = 0;
      barriga.position.y += 1;

      var cabezaGeom = new THREE.BoxGeometry(1.25, 1, 1.25);
      var cabeza = new THREE.Mesh(cabezaGeom, mat);
      cabeza.position.y = 2.75;
      cabeza.position.z = 1.5;

      var pataGeom = new THREE.BoxGeometry(0.5, 2, 0.5);
      var pataI = new THREE.Mesh(pataGeom, mat);
      pataI.position.z = 1.25;
      pataI.position.y = 0.875;
      pataI.position.x = 0.75;

      var pataD = new THREE.Mesh(pataGeom, mat);
      pataD.position.z = 1.25;
      pataD.position.y = 0.875;
      pataD.position.x = -0.75;

      var orejaGeom = new THREE.BoxGeometry(0.5, 1.25, 0.25);
      var orejaI = new THREE.Mesh(orejaGeom, mat);
      orejaI.position.y = 1.25/2;
      orejaI.rotateY(-Math.PI/16);
      orejaI.position.x = 0.5;
      orejaI.position.y += 3.25;
      orejaI.position.z = 1.5;

      var orejaD = new THREE.Mesh(orejaGeom, mat);
      orejaD.position.y = 1.25/2;
      orejaD.rotateY(Math.PI/16);
      orejaD.position.x = -0.5;
      orejaD.position.y += 3.25;
      orejaD.position.z = 1.5;

      var csg = new CSG();
      csg.union([pieI, pieD, musloI, musloD, barriga, cabeza, pataI, pataD, orejaI, orejaD]);

      var cuerpo = csg.toMesh();

      return cuerpo;

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

export { Conejo };