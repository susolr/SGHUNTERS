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

  createCasilla(tipo){
    var casilla;
    var boxGeom = new THREE.BoxBufferGeometry (5, 1, 5);
    var boxtexture = new THREE.TextureLoader().load('../imgs/verde.jpg');
    var boxMat = new THREE.MeshPhongMaterial ({map: boxtexture});
    //var boxMat = new THREE.MeshPhongMaterial({color: 0x6d36a3});
    var ciltexture = new THREE.TextureLoader().load('../imgs/morado.jpg');
    var cilMat = new THREE.MeshPhongMaterial ({map: ciltexture});
    //var cilMat = new THREE.MeshPhongMaterial({color: 0x6fb53a});
    var cilGeom = new THREE.CylinderGeometry( 3, 3, 1, 8);

    if (tipo === 0){
        casilla = new THREE.Mesh(cilGeom, cilMat);
    }
    else {
        casilla = new THREE.Mesh(boxGeom, boxMat); 
    }

    casilla.userData = this;

    return casilla;
  }

  createLight(){
    var light = new THREE.SpotLight(0xfcfcfc, 4, 6, Math.PI/4);
    light.position.set(0, 5, 0);
    light.target = this.model;
    return light;
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
      //this.model.material.wireframe = true;
      this.model.material.transparent = true;
      this.model.material.opacity = 0.95;
      //this.add(this.light);
      this.light.visible = true;
  }

  desmarcarCasilla(){
      //this.model.material.wireframe = false;
      this.model.material.transparent = false;
      //this.remove(this.light);
      this.light.visible = false;
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

  getCasillasAccesiblesPresa(){
    return this.casillasAccesiblesPresa;
  }
  
  update () {

  }
}

export { Casilla };