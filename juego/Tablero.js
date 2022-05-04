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

    var model = new Casilla(0, 0);
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    model.position.x = -20;
    this.add(model);
    this.casillasIndexadas[0] = model;
    model.setCasillasAccesiblesCazadores([1,2,3]);
    model.setCasillasAccesiblesPresa([1,2,3]);

    model = new Casilla(0, 1);
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    model.position.x = -10;
    model.position.z = -10;
    this.add(model);
    this.casillasIndexadas[1] = model;
    model.setCasillasAccesiblesCazadores([2,4,5]);
    model.setCasillasAccesiblesPresa([0,2,4,5]);

    model = new Casilla(1, 2);
    model.position.x = -10;
    this.add(model);
    this.casillasIndexadas[2] = model;
    model.setCasillasAccesiblesCazadores([1,3,5]);
    model.setCasillasAccesiblesPresa([0,1,3,5]);

    model = new Casilla(0, 3);
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    model.position.x = -10;
    model.position.z = 10;
    this.add(model);
    this.casillasIndexadas[3] = model;
    model.setCasillasAccesiblesCazadores([2,5,6]);
    model.setCasillasAccesiblesPresa([0,2,5,6]);

    model = new Casilla(1, 4);
    model.position.z = -10;
    this.add(model);
    this.casillasIndexadas[4] = model;
    model.setCasillasAccesiblesCazadores([5,7]);
    model.setCasillasAccesiblesPresa([1,5,7]);

    model = new Casilla(0, 5);
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    this.add(model);
    this.casillasIndexadas[5] = model;
    model.setCasillasAccesiblesCazadores([4,6,7,8,9]);
    model.setCasillasAccesiblesPresa([1,2,3,4,6,7,8,9]);

    model = new Casilla(1, 6);
    model.position.z = 10;
    this.add(model);
    this.casillasIndexadas[6] = model;
    model.setCasillasAccesiblesCazadores([5,9]);
    model.setCasillasAccesiblesPresa([3,5,9]);

    model = new Casilla(0, 7);
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    model.position.x = 10;
    model.position.z = -10;
    this.add(model);
    this.casillasIndexadas[7] = model;
    model.setCasillasAccesiblesCazadores([8,10]);
    model.setCasillasAccesiblesPresa([4,5,8,10]);

    model = new Casilla(1, 8);
    model.position.x = 10;
    this.add(model);
    this.casillasIndexadas[8] = model;
    model.setCasillasAccesiblesCazadores([7,9,10]);
    model.setCasillasAccesiblesPresa([5,7,9,10]);

    model = new Casilla(0, 9);
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    model.position.x = 10;
    model.position.z = 10;
    this.add(model);
    this.casillasIndexadas[9] = model;
    model.setCasillasAccesiblesCazadores([8,10]);
    model.setCasillasAccesiblesPresa([5,6,8,10]);

    model = new Casilla(0, 10);
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
  
  marcarCasillas(casillas){
    for (let cs in casillas){
      this.casillasIndexadas[casillas[cs]].marcarCasilla();
    }
  }

  desmarcarCasillas (casillas){
    for (let cs in casillas){
      this.casillasIndexadas[cs].desmarcarCasilla();
    }
  }
  
  update () {
    
  }
}

export { Tablero };
