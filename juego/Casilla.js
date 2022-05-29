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
    this.light = this.createLight();
    this.light.visible = false;
    this.add(this.light);
    this.ocupada = false;
  }

  // Método que crea la casilla según el tipo
  createCasilla(tipo){
    var casilla;
    var boxGeom = new THREE.BoxBufferGeometry (5, 1, 5); // Casillas cuadradas
    var boxtexture = new THREE.TextureLoader().load('../imgs/verde.jpg');
    var boxMat = new THREE.MeshPhongMaterial ({map: boxtexture});
    //var boxMat = new THREE.MeshPhongMaterial({color: 0x6d36a3});
    
    var cilGeom = new THREE.CylinderGeometry( 3, 3, 1, 8); // Casillas octogonales
    var ciltexture = new THREE.TextureLoader().load('../imgs/morado.jpg');
    var cilMat = new THREE.MeshPhongMaterial ({map: ciltexture});
    //var cilMat = new THREE.MeshPhongMaterial({color: 0x6fb53a});
    

    if (tipo == 0){ // Casillas octogonales
        casilla = new THREE.Mesh(cilGeom, cilMat);
    }

    else { // Casillas cuadradas
        casilla = new THREE.Mesh(boxGeom, boxMat); 
    }

    casilla.userData = this;

    return casilla;
  }

  // Método que crea la luz
  createLight(){
    var light = new THREE.SpotLight(0xfcfcfc, 4, 6, Math.PI/4);
    light.position.set(0, 5, 0);
    light.target = this.model;
    return light;
  }

  //  Método que define las casillas accesibles por un cazador desde esta
  setCasillasAccesiblesCazadores(casillas){
    for (var cs in casillas){
        this.casillasAccesiblesCazadores.push(casillas[cs]);
    }
  }

  //  Método que define las casillas accesibles por la presa desde esta
  setCasillasAccesiblesPresa(casillas){
    for (let cs in casillas){
        this.casillasAccesiblesPresa.push(casillas[cs]);
    }
  }

  //  Método que marca la casilla
  marcarCasilla(){
      //this.model.material.wireframe = true;
      this.model.material.transparent = true;
      this.model.material.opacity = 0.95;
      this.light.visible = true;
  }

  //  Método que desmarca la casilla
  desmarcarCasilla(){
      //this.model.material.wireframe = false;
      this.model.material.transparent = false;
      this.light.visible = false;
  }

  // Método que marca la casilla como ocupada
  ocuparCasilla(){
    this.ocupada = true;
  }

  // Método que marca la casilla como libre
  liberarCasilla(){
    this.ocupada = false;
  }

  // Método que devuelve las casillas accesibles por un cazador desde esta
  getCasillasAccesiblesCazadores(){
      return this.casillasAccesiblesCazadores;
  }

  // Método que devuelve las casillas accesibles por la presa desde esta
  getCasillasAccesiblesPresa(){
    return this.casillasAccesiblesPresa;
  }
  
  update () {

  }
}

export { Casilla };