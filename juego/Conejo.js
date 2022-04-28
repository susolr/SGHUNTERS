import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Conejo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    this.conejo = this.createConejo();
    this.conejo.position.y = 1.5;
    this.add(this.conejo);
    
  }

  createConejo(){
      var mat = new THREE.MeshPhongMaterial({color: 0xb5a062}); // Amarillo amarronado
      var matOjos = new THREE.MeshPhongMaterial({color: 0x000000}); // Negro
      var matNariz = new THREE.MeshPhongMaterial({color: 0xedb7e0}); // Rosa

      // Cabeza
      var cabezaGeom = new THREE.BoxGeometry(1.25, 1, 1.25);
      var cabeza = new THREE.Mesh(cabezaGeom, mat);

      // Nariz
      var narizGeom = new THREE.BoxGeometry(0.25, 0.25, 0.25);
      var nariz = new THREE.Mesh(narizGeom, matNariz);
      nariz.position.z = 0.625;

      // Ojo izquierdo
      var ojosGeom = new THREE.BoxGeometry(0.25, 0.375, 0.25);
      var ojoI = new THREE.Mesh(ojosGeom, matOjos);
      ojoI.position.x = 0.25;

      // Ojo derecho
      var ojoD = new THREE.Mesh(ojosGeom, matOjos);
      ojoD.position.x = -0.25;

      // Ojos completos
      var ojos = new THREE.Object3D();
      ojos.add(ojoI);
      ojos.add(ojoD);
      ojos.position.y = 0.25;
      ojos.position.z = 0.55;

      // Oreja izquierda
      var orejaGeom = new THREE.BoxGeometry(0.5, 1.25, 0.25);
      var orejaI = new THREE.Mesh(orejaGeom, mat);
      orejaI.rotateY(-Math.PI/12);
      orejaI.position.x = 0.375;

      // Oreja derecha
      var orejaD = new THREE.Mesh(orejaGeom, mat);
      orejaD.rotateY(Math.PI/12);
      orejaD.position.x = -0.375;

      // Orejas completas
      var orejas = new THREE.Object3D();
      orejas.add(orejaI);
      orejas.add(orejaD);
      orejas.position.y = 1.125;
      orejas.position.z = -0.25;

      // Cabeza completa (cabeza, nariz, ojos y orejas)
      var cabezaCompleta = new THREE.Object3D();
      cabezaCompleta.add(cabeza);
      cabezaCompleta.add(nariz);
      cabezaCompleta.add(ojos);
      cabezaCompleta.add(orejas);
      cabezaCompleta.position.z = 1.375;
      cabezaCompleta.position.y = 1;

      // Barriga
      var barrigaGeom = new THREE.BoxGeometry(1.5, 1.5, 2.5);
      var barriga = new THREE.Mesh(barrigaGeom, mat);
      barriga.rotateX(-Math.PI/8);
      
      // Cola
      var colaGeom = new THREE.BoxGeometry(0.75, 0.75, 0.5);
      var cola = new THREE.Mesh(colaGeom, mat);
      cola.rotateX(-Math.PI/8);
      cola.position.z = -1.25;
      cola.position.y = -0.625;

      // Cuerpo (cabeza completa, barriga y cola)
      var cuerpo = new THREE.Object3D();
      cuerpo.add(cabezaCompleta);
      cuerpo.add(barriga);
      cuerpo.add(cola);
      cuerpo.position.y = 0.875;

      // Pata delanteraizquierda
      var pataGeom = new THREE.BoxGeometry(0.5, 2, 0.5);
      var pataI = new THREE.Mesh(pataGeom, mat);
      pataI.position.x = 0.75;

      // Pata delanteraderecha
      var pataD = new THREE.Mesh(pataGeom, mat);
      pataD.position.x = -0.75;

      // Patas delanteras completas (izquierda y derecha)
      var patasD = new THREE.Object3D();
      patasD.add(pataI);
      patasD.add(pataD);
      patasD.position.z = 1.25;

      // Pie trasero izquierdo
      var pieGeom = new THREE.BoxGeometry(0.5, 0.25, 1.75);
      var pieI = new THREE.Mesh(pieGeom, mat);
      pieI.position.z = -0.125;

      // Muslo trasero izquierdo
      var musloGeom = new THREE.BoxGeometry(0.5, 1, 1.25)
      var musloI = new THREE.Mesh(musloGeom, mat);
      musloI.rotateX(-Math.PI/8);
      musloI.position.y = 0.75;
      musloI.position.z = -0.625;

      // Pata trasera izquierda (pie y muslo)
      var patasTI = new THREE.Object3D();
      patasTI.add(pieI);
      patasTI.add(musloI);
      patasTI.position.x = 0.75;
      patasTI.position.y = -0.875;

      // Pie trasero derecho
      var pieD = new THREE.Mesh(pieGeom, mat);
      pieD.position.z = -0.125;

      // Muslo trasero derecho
      var musloD = new THREE.Mesh(musloGeom, mat);
      musloD.rotateX(-Math.PI/8);
      musloD.position.z = -0.625;
      musloD.position.y = 0.75;

      // Pata trasera derecha (pie y muslo)
      var patasTD = new THREE.Object3D();
      patasTD.add(pieD);
      patasTD.add(musloD);
      patasTD.position.x = -0.75;
      patasTD.position.y = -0.875;

      // Patas traseras completas (izquierda y derecha)
      var patasT = new THREE.Object3D();
      patasT.add(patasTI);
      patasT.add(patasTD);

      // Cuerpo completo (cuerpo, patas delanteras y patas traseras)
      var cuerpoCompleto = new THREE.Object3D();
      cuerpoCompleto.add(cuerpo);
      cuerpoCompleto.add(patasD);
      cuerpoCompleto.add(patasT);

      // Subimos el conejo la mitad de la altura de las patas delanteras para que esté en la base
      cuerpoCompleto.position.y = 1;

      return cuerpoCompleto;

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