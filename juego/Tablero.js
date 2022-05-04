import * as THREE from '../libs/three.module.js'
import { Casilla } from './Casilla.js';
 
class Tablero extends THREE.Object3D {
  constructor() {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    //this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var boxGeom = new THREE.BoxBufferGeometry (5, 1, 5);
    // Como material se crea uno a partir de un color
    var cilMat = new THREE.MeshPhongMaterial({color: 0x6fb53a});

    var boxMat = new THREE.MeshPhongMaterial({color: 0x6d36a3});

    var caminoMat = new THREE.MeshPhongMaterial({color: 0x5e5e5e});
    
    // Ya podemos construir el Mesh

    var cilGeom = new THREE.CylinderGeometry( 3, 3, 1, 8);

    var caminoGeom = new THREE.BoxBufferGeometry (10, 0.5, 1);

    this.casillasIndexadas = new Array(11);
    // Y añadirlo como hijo del Object3D (el this)

    var model = new Casilla(0);
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    model.position.x = -20;
    this.add(model);
    this.casillasIndexadas[0] = model;
    model.setCasillasAccesiblesCazadores([1,2,3]);
    model.setCasillasAccesiblesPresa([1,2,3]);

    model = new Casilla(0);
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    model.position.x = -10;
    model.position.z = -10;
    this.add(model);
    this.casillasIndexadas[1] = model;
    model.setCasillasAccesiblesCazadores([2,4,5]);
    model.setCasillasAccesiblesPresa([0,2,4,5]);

    model = new Casilla(1);
    model.position.x = -10;
    this.add(model);
    this.casillasIndexadas[2] = model;
    model.setCasillasAccesiblesCazadores([1,3,5]);
    model.setCasillasAccesiblesPresa([0,1,3,5]);

    model = new Casilla(0);
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    model.position.x = -10;
    model.position.z = 10;
    this.add(model);
    this.casillasIndexadas[3] = model;
    model.setCasillasAccesiblesCazadores([2,5,6]);
    model.setCasillasAccesiblesPresa([0,2,5,6]);

    model = new Casilla(1);
    model.position.z = -10;
    this.add(model);
    this.casillasIndexadas[4] = model;
    model.setCasillasAccesiblesCazadores([5,7]);
    model.setCasillasAccesiblesPresa([1,5,7]);

    model = new Casilla(0);
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    this.add(model);
    this.casillasIndexadas[5] = model;
    model.setCasillasAccesiblesCazadores([4,6,7,8,9]);
    model.setCasillasAccesiblesPresa([1,2,3,4,6,7,8,9]);

    model = new Casilla(1);
    model.position.z = 10;
    this.add(model);
    this.casillasIndexadas[6] = model;
    model.setCasillasAccesiblesCazadores([5,9]);
    model.setCasillasAccesiblesPresa([3,5,9]);

    model = new Casilla(0);
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    model.position.x = 10;
    model.position.z = -10;
    this.add(model);
    this.casillasIndexadas[7] = model;
    model.setCasillasAccesiblesCazadores([8,10]);
    model.setCasillasAccesiblesPresa([4,5,8,10]);

    model = new Casilla(1);
    model.position.x = 10;
    this.add(model);
    this.casillasIndexadas[8] = model;
    model.setCasillasAccesiblesCazadores([7,9,10]);
    model.setCasillasAccesiblesPresa([5,7,9,10]);

    model = new Casilla(0);
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    model.position.x = 10;
    model.position.z = 10;
    this.add(model);
    this.casillasIndexadas[9] = model;
    model.setCasillasAccesiblesCazadores([8,10]);
    model.setCasillasAccesiblesPresa([5,6,8,10]);

    model = new Casilla(0);
    model.position.x = 20;
    this.add(model);
    this.casillasIndexadas[10] = model;
    model.setCasillasAccesiblesPresa([7,8,9]);



    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.position.x = -15;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.position.x = -5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.position.x = 5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.position.x = 15;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.position.z = -10;
    model.position.x = -5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.position.z = -10;
    model.position.x = 5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.position.z = 10;
    model.position.x = -5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.position.z = 10;
    model.position.x = 5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.rotateY(Math.PI/2);
    model.position.x = -10;
    model.position.z = 5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.rotateY(Math.PI/2);
    model.position.x = -10;
    model.position.z = -5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.rotateY(Math.PI/2);
    model.position.z = 5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.rotateY(Math.PI/2);
    model.position.z = -5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.rotateY(Math.PI/2);
    model.position.x = 10;
    model.position.z = 5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.rotateY(Math.PI/2);
    model.position.x = 10;
    model.position.z = -5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.rotateY(Math.PI/4);
    model.position.x = -15;
    model.position.z = -5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.rotateY(Math.PI/4);
    model.position.x = 5;
    model.position.z = -5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.rotateY(Math.PI/4);
    model.position.x = -5;
    model.position.z = 5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.rotateY(Math.PI/4);
    model.position.x = 15;
    model.position.z = 5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.rotateY(-Math.PI/4);
    model.position.x = -15;
    model.position.z = 5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.rotateY(-Math.PI/4);
    model.position.x = -5;
    model.position.z = -5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.rotateY(-Math.PI/4);
    model.position.x = 5;
    model.position.z = 5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat);
    model.rotateY(-Math.PI/4);
    model.position.x = 15;
    model.position.z = -5;
    this.add(model);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    //box.position.y = 0.5;
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

export { Tablero };
