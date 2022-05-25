
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import { Stats } from '../libs/stats.module.js'

// Clases de mi proyecto
import { Tablero } from './Tablero.js'
import { Conejo } from './conejo.js'
import { Alpaca } from './alpaca.js'
import { Pollo } from './Pollo.js'
import { Lobo } from './Lobo.js'
import { Ocelote } from './Ocelote.js'
import { Zorro } from './Zorro.js'


/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    // Se añade a la gui los controles para manipular los elementos de esta clase
    this.gui = this.createGUI ();
    
    this.initStats();
    
    this.aplicationMode = MyScene.TURNO_PRESA;
    this.action = MyScene.ELEGIR_PIEZA;
    this.piezaSeleccionada = null;
    this.positionPresa = new THREE.Vector3 (35, 15, 0);
    this.positionCazadores = new THREE.Vector3 (-35, 15, 0);
    this.createCamera ();
    this.createCameraAerea();
    this.primeraPersona = false;
    this.camaraActual = this.camera;

    this.raycaster = new THREE.Raycaster ();
    this.createLights ();
    
    this.cAerea = false;
    this.cFija = false;

    this.rotarCamara = false;
    this.clock = new THREE.Clock();
    
    
    // Un suelo 
    this.createGround ();

    this.axis = new THREE.AxesHelper(5);
    this.add(this.axis);
    
    this.tablero = new Tablero();
    this.add(this.tablero);

    //Creacion del conejo
    this.conejo = new Pollo(this.renderer);
    this.add(this.conejo);
    this.conejo.model.rotateY(-Math.PI/2);
    this.conejo.model.position.x = 20;
    this.conejo.casillaActual = 10;
    //this.conejo.light.position.set(20, 5, 0);
    this.tablero.casillasIndexadas[10].ocuparCasilla();

    //Creacion de los lobos
    //Lobo 1
    this.lobo1 = new Zorro(this.renderer);
    this.add(this.lobo1);
    this.lobo1.model.rotateY(Math.PI/2);
    this.lobo1.model.position.x = -10;
    this.lobo1.model.position.z = -10;
    this.lobo1.casillaActual = 1;
    
    //this.lobo1.light.position.set(-10, 5, -10);
    this.tablero.casillasIndexadas[1].ocuparCasilla();

    //Lobo 2
    this.lobo2 = new Ocelote(this.renderer);
    this.add(this.lobo2);
    this.lobo2.model.rotateY(Math.PI/2);
    this.lobo2.model.position.x = -20;
    this.lobo2.casillaActual = 0;
    //this.lobo2.light.position.set(-20, 5, 0);
    this.tablero.casillasIndexadas[0].ocuparCasilla();

    //Lobo 3
    this.lobo3 = new Lobo(this.renderer);
    this.add(this.lobo3);
    this.lobo3.model.rotateY(Math.PI/2);
    this.lobo3.model.position.x = -10;
    this.lobo3.model.position.z = 10;
    this.lobo3.casillaActual = 3;
    //this.lobo3.light.position.set(-10, 5, 10);
    this.tablero.casillasIndexadas[3].ocuparCasilla();

    this.pickeableCazadores = [this.lobo1, this.lobo2, this.lobo3];
    this.pickeablePresa = [this.conejo];

    this.pickeableCasillas = [];
    if(this.aplicationMode == MyScene.TURNO_CAZADORES){
      this.activarLuzCazadores();
    }
    else {
      this.activarLuzPresas();
    }
    
  }

  activarLuzCazadores(){
    this.lobo1.activarLuz();
    this.lobo2.activarLuz();
    this.lobo3.activarLuz();
  }

  desactivarLuzCazadores(){
    this.lobo1.desactivarLuz();
    this.lobo2.desactivarLuz();
    this.lobo3.desactivarLuz();
  }

  activarLuzPresas(){
    this.conejo.activarLuz();
  }

  desactivarLuzPresas(){
    this.conejo.desactivarLuz();
  }
  setMessage (str) {
    document.getElementById ("Messages").innerHTML = "<h2>"+str+"</h2>";
  }

  comprobarEstado(){
    //if (this.conejo.model.position.x <= this.lobo1.model.position.x && this.conejo.model.position.x <= this.lobo2.model.position.x && this.conejo.model.position.x <= this.lobo3.model.position.x){
    if (this.conejo.casillaActual == 0){  
      this.setMessage("Gana el conejo");
      MyScene.FINAL_DEL_JUEGO = 2;
    }

    else {
      var list = this.tablero.casillasIndexadas[this.conejo.casillaActual].getCasillasAccesiblesPresa();
      var totales = list.length;
      var ocupadas = 0;
      //console.log(list);
      for (let i in list){
        if (this.tablero.casillasIndexadas[list[i]].ocupada){
          ocupadas++;
        }
      }
      if (ocupadas == totales){
        this.setMessage("Ganan los lobos");
        MyScene.FINAL_DEL_JUEGO = 1;
      }

    }

  }

  seleccionarPiezaCazadores(event){
    var mouse = this.getMouse (event);
    this.raycaster.setFromCamera (mouse, this.getCamera());
    var pickedObjects = this.raycaster.intersectObjects (this.pickeableCazadores, true);
    if (pickedObjects.length > 0) {
      this.piezaSeleccionada = pickedObjects[0].object.userData;
      var casilla = this.piezaSeleccionada.casillaActual;
      //console.log(casilla);
      var casillas = this.tablero.casillasIndexadas[casilla].getCasillasAccesiblesCazadores();
      this.pickeableCasillas = this.tablero.marcarCasillas(casillas);
      this.desactivarLuzCazadores();
      this.piezaSeleccionada.activarLuz();
      this.action = MyScene.ELEGIR_CASILLA;
    } 

  }

  seleccionarCasillaCazadores(event){
    var mouse = this.getMouse (event);
    this.raycaster.setFromCamera (mouse, this.getCamera());
    var pickedObjects = this.raycaster.intersectObjects (this.pickeableCasillas, true);
    if (pickedObjects.length > 0) {
      var casillaSeleccionada = pickedObjects[0].object.userData;
      //console.log(casillaSeleccionada.indice);
      this.pickeableCasillas = [];
      this.tablero.desmarcarCasillas();
      //movimiento
      var spline = this.tablero.getSpline(this.piezaSeleccionada.casillaActual,casillaSeleccionada.indice, this.piezaSeleccionada);
      this.piezaSeleccionada.createAnimation(spline);
      this.tablero.casillasIndexadas[this.piezaSeleccionada.casillaActual].liberarCasilla();
      this.piezaSeleccionada.casillaActual = casillaSeleccionada.indice;
      casillaSeleccionada.ocuparCasilla();
      this.comprobarEstado();
      this.aplicationMode = MyScene.TURNO_PRESA;
      this.desactivarLuzCazadores();
      this.activarLuzPresas();
      this.action = MyScene.ELEGIR_PIEZA;
      this.piezaSeleccionada = null;
      this.girarCamara();
      //this.camaraActual = this.camera;
      //this.cAerea = false;
      //this.primeraPersona = false;
    } else {
      pickedObjects = this.raycaster.intersectObjects (this.pickeableCazadores, true);
      if (pickedObjects.length > 0){
        this.tablero.desmarcarCasillas();
        var pieza = pickedObjects[0].object.userData;
        if (pieza !== this.piezaSeleccionada){
          this.piezaSeleccionada.desactivarLuz();
          this.piezaSeleccionada = pieza;
          this.piezaSeleccionada.activarLuz();
          var casilla = this.piezaSeleccionada.casillaActual;
          //console.log(casilla);
          var casillas = this.tablero.casillasIndexadas[casilla].getCasillasAccesiblesCazadores();
          this.pickeableCasillas = this.tablero.marcarCasillas(casillas);
        } else {
          this.action = MyScene.ELEGIR_PIEZA;
          this.piezaSeleccionada.desactivarLuz();
          this.piezaSeleccionada = null;
          this.activarLuzCazadores();
        }
      }
    }
  }

  seleccionarPiezaPresa(event){
    var mouse = this.getMouse (event);
    this.raycaster.setFromCamera (mouse, this.getCamera());
    var pickedObjects = this.raycaster.intersectObjects (this.pickeablePresa, true);
    if (pickedObjects.length > 0) {
      //this.setMessage("Pieza Seleccionada");
      this.piezaSeleccionada = pickedObjects[0].object.userData;
      var casilla = this.piezaSeleccionada.casillaActual;
      //console.log(casilla);
      var casillas = this.tablero.casillasIndexadas[casilla].getCasillasAccesiblesPresa();
      this.pickeableCasillas = this.tablero.marcarCasillas(casillas);
      this.action = MyScene.ELEGIR_CASILLA;
    } 

  }

  seleccionarCasillaPresa(event){
    var mouse = this.getMouse (event);
    this.raycaster.setFromCamera (mouse, this.getCamera());
    var pickedObjects = this.raycaster.intersectObjects (this.pickeableCasillas, true);
    if (pickedObjects.length > 0) {
      var casillaSeleccionada = pickedObjects[0].object.userData;
      //console.log(casillaSeleccionada.indice);
      this.pickeableCasillas = [];
      this.tablero.desmarcarCasillas();
      //movimiento
      var spline = this.tablero.getSpline(this.piezaSeleccionada.casillaActual,casillaSeleccionada.indice, this.piezaSeleccionada);
      this.piezaSeleccionada.createAnimation(spline);
      this.tablero.casillasIndexadas[this.piezaSeleccionada.casillaActual].liberarCasilla();
      this.piezaSeleccionada.casillaActual = casillaSeleccionada.indice;
      casillaSeleccionada.ocuparCasilla();
      this.comprobarEstado();
      this.aplicationMode = MyScene.TURNO_CAZADORES;
      this.desactivarLuzPresas();
      this.activarLuzCazadores();
      this.action = MyScene.ELEGIR_PIEZA;
      this.piezaSeleccionada = null;
      this.girarCamara();
      //this.camaraActual = this.camera;
      //this.cAerea = false;
      //this.primeraPersona = false;
    } else {
      pickedObjects = this.raycaster.intersectObjects (this.pickeablePresa, true);
      if (pickedObjects.length > 0){
        this.tablero.desmarcarCasillas();
        this.action = MyScene.ELEGIR_PIEZA;
        this.piezaSeleccionada = null;
      }
    }
  }

  seleccionarCazador(event){
    if (!event.ctrlKey) {
      switch(this.action){
        case MyScene.ELEGIR_PIEZA:
          this.seleccionarPiezaCazadores(event);
          break;

        case MyScene.ELEGIR_CASILLA:
          this.seleccionarCasillaCazadores(event);
          break;

        default:
          this.setMessage("Cagaste");
      }
    }
  }

  seleccionarPresa(event){
    if (!event.ctrlKey) {
      switch(this.action){
        case MyScene.ELEGIR_PIEZA:
          this.seleccionarPiezaPresa(event);
          break;

        case MyScene.ELEGIR_CASILLA:
          this.seleccionarCasillaPresa(event);
          break;

        default:
          this.setMessage("Cagaste");
      }
    }
  }
  
  onMouseDown(event){
    if (!event.ctrlKey) {
      switch(this.aplicationMode){
        case MyScene.TURNO_CAZADORES:
          this.seleccionarCazador(event);
          break;

        case MyScene.TURNO_PRESA:
          this.seleccionarPresa(event);
          break;

        default:
          this.setMessage("Cagaste");
      }
    }
  }

  onKeyDown(event){
    if (!event.ctrlKey) {
      var x = event.which || event.key;
      switch (x){
        case 67:
          if(!this.cAerea){
            this.camaraActual = this.camaraAerea;
            this.cAerea = true;
          }
          else {
            this.camaraActual = this.camera;
            this.cAerea = false;
          }  
          break;
        case 86:
          if(!this.cFija){
            this.camaraActual = this.getCamaraFija();
            this.cFija = true;
            this.cAerea = false;
            this.primeraPersona = false;
          }
          else {
            this.camaraActual = this.camera;
            this.cFija = false;
          } 
          break;
      }
    }
  }

/* Trozo de codigo porque si 
var vector = this.getPointOnGround(event);
this.setMessage(event);
if (vector === null){
  this.setMessage("Vector nulo");
}
else {
  this.setMessage(vector.x + "\t" + vector.y);
} 
*/

  /// It returns the position of the mouse in normalized coordinates ([-1,1],[-1,1])
  /**
   * @param event - Mouse information
   * @return A Vector2 with the normalized mouse position
   */
  getMouse (event) {
    var mouse = new THREE.Vector2 ();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = 1 - 2 * (event.clientY / window.innerHeight);
    return mouse;
  }
  
  /// It returns the point on the ground where the mouse has clicked
  /**
   * @param event - The mouse information
   * @return The Vector2 with the ground point clicked, or null
   */
  getPointOnGround (event) {
    var mouse = this.getMouse (event);
    this.raycaster.setFromCamera (mouse, this.getCamera());
    var surfaces = [this.lobo1, this.lobo2, this.lobo3];
    var pickedObjects = this.raycaster.intersectObjects (surfaces, true);
    if (pickedObjects.length > 0) {
      //pickedObjects[0].object.userData.controlAnimacion();
      var casilla = pickedObjects[0].object.userData.casillaActual;
      console.log(casilla);
      var casillas = this.tablero.casillasIndexadas[casilla].getCasillasAccesiblesCazadores();
      this.tablero.marcarCasillas(casillas);
      //this.lobo1.controlAnimacion();
      return new THREE.Vector2 (pickedObjects[0].point.x, pickedObjects[0].point.z);
    } else
      return null;
  }

  initStats() {
  
    var stats = new Stats();
    
    stats.setMode(0); // 0: fps, 1: ms
    
    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    
    $("#Stats-output").append( stats.domElement );
    
    this.stats = stats;
  }
  
  createCamera() {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    if (this.aplicationMode == MyScene.TURNO_CAZADORES){
      this.camera.position.set(0, 15, 25);
    }
    else{
      this.camera.position.set(0, 15, -25);
    }
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new TrackballControls (this.camera, this.renderer.domElement);
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;


    this.camaraFijaCazadores = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camaraFijaCazadores.position.set(this.positionCazadores.x, this.positionCazadores.y, this.positionCazadores.z);
    this.camaraFijaCazadores.lookAt(look);
    this.add(this.camaraFijaCazadores);

    this.camaraFijaPresa = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camaraFijaPresa.position.set(this.positionPresa.x, this.positionPresa.y, this.positionPresa.z);
    this.camaraFijaPresa.lookAt(look);
    this.add(this.camaraFijaPresa);
  }

  getCamaraFija(){
    if(this.aplicationMode == MyScene.TURNO_CAZADORES){
      return this.camaraFijaCazadores;
    }
    else {
      return this.camaraFijaPresa;
    }
  }

  createCameraAerea() {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camaraAerea = new THREE.OrthographicCamera(-40, 40, 20, -20, 0.1, 1000);
    // También se indica dónde se coloca
    this.camaraAerea.position.set (0, 10, 0);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camaraAerea.lookAt(look);
    this.add (this.camaraAerea);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.camaraAereaControl = new TrackballControls (this.camera, this.renderer.domElement);
    // Se configuran las velocidades de los movimientos
    this.camaraAereaControl.rotateSpeed = 5;
    this.camaraAereaControl.zoomSpeed = -2;
    this.camaraAereaControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.camaraAereaControl.target = look;
  }

  girarCamara(){
    this.rotarCamara = true;
    if (this.cFija){
      this.camaraActual = this.getCamaraFija();
    }
    if (this.aplicationMode == MyScene.TURNO_CAZADORES){
      this.camera.position.set(0, 15, 25);
    }
    else{
      this.camera.position.set(0, 15, -25);
    }
    
    //this.camaraActual.rotateZ(Math.PI);
  }
  
  createGround () {
    // El suelo es un Mesh, necesita una geometría y un material.
    
    // La geometría es una caja con muy poca altura
    var geometryGround = new THREE.BoxGeometry (50,0.2,50);
    
    // El material se hará con una textura de madera
    var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    var materialGround = new THREE.MeshPhongMaterial ({map: texture});
    
    // Ya se puede construir el Mesh
    var ground = new THREE.Mesh (geometryGround, materialGround);
    
    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    ground.position.y = -1;
    
    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    this.add (ground);
  }
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante un objeto de control
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = {
      // En el contexto de una función   this   alude a la función
      lightIntensity : 0.5,
      axisOnOff : true
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la intensidad de la luz
    folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1)
      .name('Intensidad de la Luz : ')
      .onChange ( (value) => this.setLightIntensity (value) );
    
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff')
      .name ('Mostrar ejes : ')
      .onChange ( (value) => this.setAxisVisible (value) );
    
    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.6);
    // La añadimos a la escena
    this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
  }
  
  setLightIntensity (valor) {
    this.spotLight.intensity = valor;
  }
  
  setAxisVisible (valor) {
    //this.axis.visible = valor;
    for (let i = 0; i < this.axisVector.length; i++){
      this.axisVector[i].visible = valor;
    }
    
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camaraActual;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
  
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  update () {
    
    if (this.stats) this.stats.update();
    
    // Se actualizan los elementos de la escena para cada frame
    
    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();
    this.camaraAereaControl.update();
    var delta = this.clock.getDelta();

    if(this.rotarCamara == true){
      
      var v = 3*delta;
      if (this.aplicationMode == MyScene.TURNO_CAZADORES){
        if (this.camaraAerea.rotation.z >= -Math.PI && this.camaraAerea.rotation.z < 0){
          console.log("Rotando camara turno cazador: " + this.camaraAerea.rotation.z);
          this.camaraAerea.rotateZ(v);
        }
        else {
          this.rotarCamara = false;
          this.camaraAerea.rotation.z = 0;
          console.log("Parar rotacion camara cazador: " + this.camaraAerea.rotation.z);
        }
        
      }
      else {
        if (this.camaraAerea.rotation.z <= Math.PI && this.camaraAerea.rotation.z >= 0){
          console.log("Rotando camara turno presa: " + this.camaraAerea.rotation.z);
          this.camaraAerea.rotateZ(v);
        }
        else {
          this.rotarCamara = false;
          this.camaraAerea.rotation.z = -Math.PI;
          //this.camera.position.set();
          console.log("Parar rotacion camara presa: " + this.camaraAerea.rotation.z);
        }
      }
    }
    
    // Se actualiza el resto del modelo
    this.conejo.update();
    this.lobo1.update();
    this.lobo2.update();
    this.lobo3.update();
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
  }
}

  //Variables de clase
  //Aplication modes
  MyScene.TURNO_CAZADORES = 0;
  MyScene.TURNO_PRESA = 1;

  //Actions
  MyScene.ELEGIR_PIEZA = 0;
  MyScene.ELEGIR_CASILLA = 1;

  //Estados
  MyScene.FINAL_DEL_JUEGO = 0;
  

/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  window.addEventListener ("mousedown", (event) => scene.onMouseDown(event), true);
  window.addEventListener ("keydown", (event) => scene.onKeyDown(event), true);
  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});
