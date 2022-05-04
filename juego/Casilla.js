import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Casilla extends THREE.Object3D {
  constructor(tipo, indice) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    //this.createGUI(gui,titleGui);
    
    this.model = this.createCasilla(tipo);
    this.add(this.model);

    this.casillasAccesiblesCazadores = [];
    this.casillasAccesiblesPresa = [];
    this.indice = indice;

    this.ocupada = false;
    
  }

  createCasilla(tipo){
    var casilla;
    var boxGeom = new THREE.BoxBufferGeometry (5, 1, 5);
    var boxMat = new THREE.MeshPhongMaterial({color: 0x6d36a3});
    var cilMat = new THREE.MeshPhongMaterial({color: 0x6fb53a});
    var cilGeom = new THREE.CylinderGeometry( 3, 3, 1, 8);

    if (tipo === 0){
        casilla = new THREE.Mesh(cilGeom, cilMat);
    }
    else {
        casilla = new THREE.Mesh(boxGeom, boxMat); 
    }

    return casilla;
  }

  setCasillasAccesiblesCazadores(casillas){
    for (var cs in casillas){
        this.casillasAccesiblesCazadores.push(casillas[cs]);
    }
  }

  setCasillasAccesiblesPresa(casillas){
    for (let cs in casillas){
        this.casillasAccesiblesPresa.push(casillas[cs]);
    }
  }

  marcarCasilla(){
      this.model.material.wireframe = true;
  }

  desmarcarCasilla(){
      this.model.material.wireframe = false;
  }

  ocuparCasilla(){
    this.ocupada = true;
  }

  liberarCasilla(){
    this.ocupada = false;
  }

  getCasillasAccesiblesCazadores(){
      return this.casillasAccesiblesCazadores;
  }
  
  update () {

  }
}

export { Casilla };