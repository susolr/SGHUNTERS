import * as THREE from '../libs/three.module.js'
 
class Tablero extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var boxGeom = new THREE.BoxBufferGeometry (5, 1, 5);
    // Como material se crea uno a partir de un color
    var boxMat = new THREE.MeshNormalMaterial();
    
    // Ya podemos construir el Mesh

    var cilGeom = new THREE.CylinderGeometry( 3, 3, 1, 8);
    // Y añadirlo como hijo del Object3D (el this)

    var model = new THREE.Mesh(cilGeom, boxMat);
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    model.position.x = -20;
    this.add(model);

    model = new THREE.Mesh(cilGeom, boxMat);
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    model.position.x = -10;
    model.position.z = -10;
    this.add(model);

    model = new THREE.Mesh(boxGeom, boxMat);
    model.position.x = -10;
    this.add(model);

    model = new THREE.Mesh(cilGeom, boxMat);
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    model.position.x = -10;
    model.position.z = 10;
    this.add(model);

    model = new THREE.Mesh(boxGeom, boxMat);
    model.position.z = -10;
    this.add(model);

    model = new THREE.Mesh(cilGeom, boxMat);
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    this.add(model);

    model = new THREE.Mesh(boxGeom, boxMat);
    model.position.z = 10;
    this.add(model);

    model = new THREE.Mesh(cilGeom, boxMat);
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    model.position.x = 10;
    model.position.z = -10;
    this.add(model);

    model = new THREE.Mesh(boxGeom, boxMat);
    model.position.x = 10;
    this.add(model);

    model = new THREE.Mesh(cilGeom, boxMat);
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    model.position.x = 10;
    model.position.z = 10;
    this.add(model);

    model = new THREE.Mesh(cilGeom, boxMat);
    model.position.x = 20;
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
