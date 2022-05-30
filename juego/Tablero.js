import * as THREE from '../libs/three.module.js'
import { Casilla } from './Casilla.js';
 
class Tablero extends THREE.Object3D {
  constructor() {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    //this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    // Como material se crea uno a partir de un color

    var texture = new THREE.TextureLoader().load('../imgs/piedra2.jpg');
    var caminoMat = new THREE.MeshPhongMaterial ({map: texture});
    //var caminoMat = new THREE.MeshPhongMaterial({color: 0x5e5e5e});
    var caminoGeom = new THREE.BoxBufferGeometry (10, 0.5, 1);

    this.casillasIndexadas = new Array(11); // Las casillas se insertan de izquierda a derecha y de abajo a arriba
    
    var model = new Casilla(0, 0); // Casilla 0
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    model.position.x = -20;
    this.add(model);
    this.casillasIndexadas[0] = model;
    model.setCasillasAccesiblesCazadores([1,2,3]);
    model.setCasillasAccesiblesPresa([1,2,3]);

    model = new Casilla(0, 1); // Casilla 1
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    model.position.x = -10;
    model.position.z = -10;
    this.add(model);
    this.casillasIndexadas[1] = model;
    model.setCasillasAccesiblesCazadores([2,4,5]);
    model.setCasillasAccesiblesPresa([0,2,4,5]);

    model = new Casilla(1, 2); // Casilla 2
    model.position.x = -10;
    this.add(model);
    this.casillasIndexadas[2] = model;
    model.setCasillasAccesiblesCazadores([1,3,5]);
    model.setCasillasAccesiblesPresa([0,1,3,5]);

    model = new Casilla(0, 3); // Casilla 3
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    model.position.x = -10;
    model.position.z = 10;
    this.add(model);
    this.casillasIndexadas[3] = model;
    model.setCasillasAccesiblesCazadores([2,5,6]);
    model.setCasillasAccesiblesPresa([0,2,5,6]);

    model = new Casilla(1, 4); // Casilla 4
    model.position.z = -10;
    this.add(model);
    this.casillasIndexadas[4] = model;
    model.setCasillasAccesiblesCazadores([5,7]);
    model.setCasillasAccesiblesPresa([1,5,7]);

    model = new Casilla(0, 5); // Casilla 5
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    this.add(model);
    this.casillasIndexadas[5] = model;
    model.setCasillasAccesiblesCazadores([4,6,7,8,9]);
    model.setCasillasAccesiblesPresa([1,2,3,4,6,7,8,9]);

    model = new Casilla(1, 6); // Casilla 6
    model.position.z = 10;
    this.add(model);
    this.casillasIndexadas[6] = model;
    model.setCasillasAccesiblesCazadores([5,9]);
    model.setCasillasAccesiblesPresa([3,5,9]);

    model = new Casilla(0, 7); // Casilla 7
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    model.position.x = 10;
    model.position.z = -10;
    this.add(model);
    this.casillasIndexadas[7] = model;
    model.setCasillasAccesiblesCazadores([8,10]);
    model.setCasillasAccesiblesPresa([4,5,8,10]);

    model = new Casilla(1, 8); // Casilla 8
    model.position.x = 10;
    this.add(model);
    this.casillasIndexadas[8] = model;
    model.setCasillasAccesiblesCazadores([7,9,10]);
    model.setCasillasAccesiblesPresa([5,7,9,10]);

    model = new Casilla(0, 9); // Casilla 9
    model.rotateY(THREE.MathUtils.degToRad(22.5));
    model.position.x = 10;
    model.position.z = 10;
    this.add(model);
    this.casillasIndexadas[9] = model;
    model.setCasillasAccesiblesCazadores([8,10]);
    model.setCasillasAccesiblesPresa([5,6,8,10]);

    model = new Casilla(0, 10); // Casilla 10
    model.position.x = 20;
    this.add(model);
    this.casillasIndexadas[10] = model;
    model.setCasillasAccesiblesPresa([7,8,9]);


    // Caminos
    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 0 a 2
    model.position.x = -15;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 2 a 5
    model.position.x = -5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 5 a 8
    model.position.x = 5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 8 a 10
    model.position.x = 15;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 1 a 4
    model.position.z = -10;
    model.position.x = -5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 4 a 7
    model.position.z = -10;
    model.position.x = 5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 3 a 6
    model.position.z = 10;
    model.position.x = -5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 6 a 9
    model.position.z = 10;
    model.position.x = 5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 2 a 3
    model.rotateY(Math.PI/2);
    model.position.x = -10;
    model.position.z = 5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 1 a 2
    model.rotateY(Math.PI/2);
    model.position.x = -10;
    model.position.z = -5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 5 a 6
    model.rotateY(Math.PI/2);
    model.position.z = 5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 4 a 5
    model.rotateY(Math.PI/2);
    model.position.z = -5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 8 a 9
    model.rotateY(Math.PI/2);
    model.position.x = 10;
    model.position.z = 5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 7 a 8
    model.rotateY(Math.PI/2);
    model.position.x = 10;
    model.position.z = -5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 0 a 1
    model.rotateY(Math.PI/4);
    model.position.x = -15;
    model.position.z = -5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 5 a 7
    model.rotateY(Math.PI/4);
    model.position.x = 5;
    model.position.z = -5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 3 a 5
    model.rotateY(Math.PI/4);
    model.position.x = -5;
    model.position.z = 5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 9 a 10
    model.rotateY(Math.PI/4);
    model.position.x = 15;
    model.position.z = 5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 0 a 3
    model.rotateY(-Math.PI/4);
    model.position.x = -15;
    model.position.z = 5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 1 a 5
    model.rotateY(-Math.PI/4);
    model.position.x = -5;
    model.position.z = -5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 5 a 9
    model.rotateY(-Math.PI/4);
    model.position.x = 5;
    model.position.z = 5;
    this.add(model);

    model = new THREE.Mesh(caminoGeom, caminoMat); // Camino casillas 7 a 10
    model.rotateY(-Math.PI/4);
    model.position.x = 15;
    model.position.z = -5;
    this.add(model);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    //box.position.y = 0.5;
  }
  
  // Método que marca las casillas pasadas como argumento
  marcarCasillas(casillas){
    var lista = [];
    for (let cs in casillas){
      if (!this.casillasIndexadas[casillas[cs]].ocupada){
        this.casillasIndexadas[casillas[cs]].marcarCasilla();
        lista.push(this.casillasIndexadas[casillas[cs]]);
      }
    }
    return lista;
  }

  // Método que desmarca las casillas
  desmarcarCasillas (){
    for (let cs in this.casillasIndexadas){
      this.casillasIndexadas[cs].desmarcarCasilla();
    }
  }
  
  // Método que devuelve la spline que empieza en la casilla actual y termina en la casilla seleccionada, para una pieza
  getSpline(c1, c2, modelo){
    this.spline = new THREE.CatmullRomCurve3(
      [ new THREE.Vector3(this.casillasIndexadas[c1].position.x - modelo.model.position.x , this.casillasIndexadas[c1].position.y, this.casillasIndexadas[c1].position.z - modelo.model.position.z),
        new THREE.Vector3(this.casillasIndexadas[c2].position.x - modelo.model.position.x , this.casillasIndexadas[c2].position.y, this.casillasIndexadas[c2].position.z - modelo.model.position.z),
      ],false
    );
    
    /*
    this.spline2 = new THREE.CatmullRomCurve3(
      [ new THREE.Vector3(this.casillasIndexadas[c1].position.x, this.casillasIndexadas[c1].position.y + 2, this.casillasIndexadas[c1].position.z),
        new THREE.Vector3(this.casillasIndexadas[c2].position.x, this.casillasIndexadas[c2].position.y + 2, this.casillasIndexadas[c2].position.z),
      ],false
    );

    var lineGeom = new THREE.BufferGeometry();
    lineGeom.setFromPoints(this.spline2.getPoints(100));

    var lineMesh = new THREE.Line(lineGeom,new THREE.LineBasicMaterial({color: 0xFF0000, linewidth : 2}));
    this.add(lineMesh);
    */

    return this.spline;
  }
  
  update () {
    
  }
}

export { Tablero };
