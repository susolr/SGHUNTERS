

// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import { Stats } from '../libs/stats.module.js'

// Clases de mi proyecto
import { Tablero } from './Tablero.js'
import { Conejo } from './Conejo.js'
import { Alpaca } from './Alpaca.js'
import { Pollo } from './Pollo.js'
import { Lobo } from './Lobo.js'
import { Ocelote } from './Ocelote.js'
import { Zorro } from './Zorro.js'


/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor(myCanvas) {
    super();

    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);

    // Se añade a la gui los controles para manipular los elementos de esta clase
    this.gui = this.createGUI();

    this.initStats();

    this.aplicationMode = this.turno();
    this.action = MyScene.ELEGIR_PIEZA;
    this.state = MyScene.JUGANDO;

    this.piezaSeleccionada = null;
    this.positionPresa = new THREE.Vector3(35, 15, 0); // Posición cámara presa
    this.positionCazadores = new THREE.Vector3(-35, 15, 0); // Posición cámara cazador

    this.createCamera();
    this.createCameraAerea();
    this.camaraActual = this.camera;
    this.timeAnimation = 0;

    //Carga textura fondo
    var ruta = "../imgs/skybox/";
    var localizacion = [ruta + "right.jpg", ruta + "left.jpg", ruta + "top.jpg", ruta + "bottom.jpg", ruta + "front.jpg", ruta + "back.jpg"];

    var mapaCubo = new THREE.CubeTextureLoader().load(localizacion);
    this.background = mapaCubo;

    this.raycaster = new THREE.Raycaster();
    this.createLights();

    this.cAerea = false; // Utilización cámara aérea
    this.cFija = false; // Utilización cámara fija

    this.rotarCamara = false;
    this.clock = new THREE.Clock();

    // Un suelo 
    this.createGround();
    this.ground.visible = false;

    this.axis = new THREE.AxesHelper(5);
    this.add(this.axis);

    this.tablero = new Tablero();
    this.add(this.tablero);

    //Creación de la presa
    this.presa = this.crearPresa();
    this.add(this.presa);
    this.presa.model.rotateY(-Math.PI / 2);
    this.presa.model.position.x = 20;
    this.presa.casillaActual = 10;
    this.tablero.casillasIndexadas[10].ocuparCasilla();

    //Creación de los cazadores
    //Cazador 1
    this.cazador1 = this.crearCazadores();
    this.add(this.cazador1);
    this.cazador1.model.rotateY(Math.PI / 2);
    this.cazador1.model.position.x = -10;
    this.cazador1.model.position.z = -10;
    this.cazador1.casillaActual = 1;
    this.tablero.casillasIndexadas[1].ocuparCasilla();

    //Cazador 2
    this.cazador2 = this.crearCazadores();
    this.add(this.cazador2);
    this.cazador2.model.rotateY(Math.PI / 2);
    this.cazador2.model.position.x = -20;
    this.cazador2.casillaActual = 0;
    this.tablero.casillasIndexadas[0].ocuparCasilla();

    //Cazador 3
    this.cazador3 = this.crearCazadores();
    this.add(this.cazador3);
    this.cazador3.model.rotateY(Math.PI / 2);
    this.cazador3.model.position.x = -10;
    this.cazador3.model.position.z = 10;
    this.cazador3.casillaActual = 3;
    this.tablero.casillasIndexadas[3].ocuparCasilla();

    this.pickeableCazadores = [this.cazador1, this.cazador2, this.cazador3];
    this.pickeablePresa = [this.presa];
    this.pickeableCasillas = [];

    if (this.aplicationMode == MyScene.TURNO_CAZADORES) {
      this.activarLuzCazadores();
    }

    else {
      this.activarLuzPresas();
    }
  }


  // Método que devuelve el turno elegido por el jugador al inicio
  turno() {
    var vturno = $("#turno_select").val();
    var turnoelegido;

    switch (vturno) {
      case '1':
        turnoelegido = MyScene.TURNO_CAZADORES;
        break;

      case '2':
        turnoelegido = MyScene.TURNO_PRESA;
        break;

      default:
        console.log("Error. No existe truno: " + vturno);
    }

    return turnoelegido;
  }


  // Método que crea el modelo de presa elegida por el jugador al inicio
  crearPresa() {
    var presaC = $("#presa_select").val();
    var presaCreada;

    switch (presaC) {
      case '1':
        presaCreada = new Conejo();
        break;

      case '2':
        presaCreada = new Alpaca();
        break;

      case '3':
        presaCreada = new Pollo();
        break;

      default:
        console.log("Error. No existe presa: " + presaC);
    }

    return presaCreada;
  }


  // Método que crea el modelo de presa elegida por el jugador al inicio
  crearCazadores() {
    var cazador = $("#cazadores_select").val();
    var cazadorCreado;

    switch (cazador) {
      case '1':
        cazadorCreado = new Lobo();
        break;

      case '2':
        cazadorCreado = new Zorro();
        break;

      case '3':
        cazadorCreado = new Ocelote();
        break;

      default:
        console.log("Error. No existe cazador: " + cazador);
    }

    return cazadorCreado;
  }


  // Método que activa la luz de los cazadores
  activarLuzCazadores() {
    setTimeout(() => {
      this.cazador1.activarLuz();
      this.cazador2.activarLuz();
      this.cazador3.activarLuz();
    }, this.timeAnimation);
  }


  // Método que desactiva la luz de los cazadores
  desactivarLuzCazadores() {
    this.cazador1.desactivarLuz();
    this.cazador2.desactivarLuz();
    this.cazador3.desactivarLuz();
  }


  // Método que activa la luz de la presa
  activarLuzPresas() {
    setTimeout(() => {
      this.presa.activarLuz();
    }, this.timeAnimation);
  }


  // Método que desactiva la luz de la presa
  desactivarLuzPresas() {
    this.presa.desactivarLuz();
  }


  // Método que calcula el ángulo de giro de las piezas al moverse hacia otra casilla
  calcularAngulo(xi, zi, xf, zf) {
    var angulo, difx, difz, tang;
    difx = xf - xi;
    difz = zf - zi;
    tang = difx / difz;

    if (zf == zi) {
      if (xf < xi) {
        angulo = 0;
      }
      else {
        angulo = Math.PI;
      }
    }

    else {
      if (xf == xi) {
        if (zf < zi) {
          angulo = -Math.PI / 2;
        }
        else {
          angulo = Math.PI / 2;
        }
      }

      else {
        if (xf < xi) {
          angulo = -Math.atan(tang);
        }

        else {
          if (zf < zi) {
            angulo = Math.atan(tang) - Math.PI / 2;
          }
          else {
            angulo = Math.atan(tang) + Math.PI / 2;
          }
        }
      }
    }

    return angulo;
  }


  // Método que muestra un mensaje por pantalla
  setMessage(str) {
    document.getElementById("Messages").innerHTML = "<h2>" + str + "</h2>";
  }


  // Método que comprueba si alguna de las partes ha ganado
  comprobarEstado() {
    var posPresaX = this.tablero.casillasIndexadas[this.presa.casillaActual].position.x;
    var posCazador1X = this.tablero.casillasIndexadas[this.cazador1.casillaActual].position.x;
    var posCazador2X = this.tablero.casillasIndexadas[this.cazador2.casillaActual].position.x;
    var posCazador3X = this.tablero.casillasIndexadas[this.cazador3.casillaActual].position.x;

    // Si la x de la presa es menor o igual a la x de los tres cazadores, gana la presa
    if ((posPresaX <= posCazador1X) && (posPresaX <= posCazador2X) && (posPresaX <= posCazador3X)) {
      //this.setMessage("Gana la presa");
      this.state = MyScene.GANA_PRESA;
    }

    else {
      var list = this.tablero.casillasIndexadas[this.presa.casillaActual].getCasillasAccesiblesPresa();
      var totales = list.length;
      var ocupadas = 0;

      for (let i in list) {
        if (this.tablero.casillasIndexadas[list[i]].ocupada) {
          ocupadas++;
        }
      }

      if (ocupadas == totales) { // Si las casillas accesibles por la presa están ocupadas por los cazadores, ganan los cazadores
        //this.setMessage("Ganan los cazadores");
        this.state = MyScene.GANAN_CAZADORES;
      }
    }

    if (this.state != MyScene.JUGANDO) { // Si se ha ganado, se muestra la pantalla final
      setTimeout(() => {
        if (this.state == MyScene.GANAN_CAZADORES) {
          $("#gananCazadores").fadeIn(3000);
        }
        else {
          $("#ganaPresa").fadeIn(3000);
        }

        $("#WebGL-output").hide();
        $("#restartButton").fadeIn(3000);
      }, this.timeAnimation);
    }
  }


  // Método que selecciona las piezas de los cazadores
  seleccionarPiezaCazadores(event) {
    var mouse = this.getMouse(event);
    this.raycaster.setFromCamera(mouse, this.getCamera());
    var pickedObjects = this.raycaster.intersectObjects(this.pickeableCazadores, true);

    if (pickedObjects.length > 0) {
      this.piezaSeleccionada = pickedObjects[0].object.userData;
      var casilla = this.piezaSeleccionada.casillaActual;
      var casillas = this.tablero.casillasIndexadas[casilla].getCasillasAccesiblesCazadores();

      this.pickeableCasillas = this.tablero.marcarCasillas(casillas); // Marcar las casillas accesibles
      this.desactivarLuzCazadores();
      this.piezaSeleccionada.activarLuz();

      this.action = MyScene.ELEGIR_CASILLA;
    }
  }


  // Método que selecciona las casillas de los cazadores
  seleccionarCasillaCazadores(event) {
    var angulo = -Math.PI / 2;
    var mouse = this.getMouse(event);
    this.raycaster.setFromCamera(mouse, this.getCamera());
    var pickedObjects = this.raycaster.intersectObjects(this.pickeableCasillas, true);

    if (pickedObjects.length > 0) {
      var casillaSeleccionada = pickedObjects[0].object.userData;
      this.pickeableCasillas = [];
      this.tablero.desmarcarCasillas();

      // Movimiento de la casilla actual de la pieza a la casilla seleccionada
      var spline = this.tablero.getSpline(this.piezaSeleccionada.casillaActual, casillaSeleccionada.indice, this.piezaSeleccionada);
      this.piezaSeleccionada.createAnimation(spline);

      // Se cambia la orientación de la pieza hacia la casilla seleccionada
      this.piezaSeleccionada.model.rotation.y = angulo;
      angulo = this.calcularAngulo(this.tablero.casillasIndexadas[this.piezaSeleccionada.casillaActual].position.x,
                                   this.tablero.casillasIndexadas[this.piezaSeleccionada.casillaActual].position.z,
                                   this.tablero.casillasIndexadas[casillaSeleccionada.indice].position.x,
                                   this.tablero.casillasIndexadas[casillaSeleccionada.indice].position.z);
      this.piezaSeleccionada.model.rotateY(angulo);

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
    }

    else { // No se selecciona una casilla
      pickedObjects = this.raycaster.intersectObjects(this.pickeableCazadores, true);

      if (pickedObjects.length > 0) {
        this.tablero.desmarcarCasillas();
        var pieza = pickedObjects[0].object.userData;

        if (pieza !== this.piezaSeleccionada) { // Se selecciona una pieza diferente
          this.piezaSeleccionada.desactivarLuz();
          this.piezaSeleccionada = pieza;
          this.piezaSeleccionada.activarLuz();
          var casilla = this.piezaSeleccionada.casillaActual;
          var casillas = this.tablero.casillasIndexadas[casilla].getCasillasAccesiblesCazadores();
          this.pickeableCasillas = this.tablero.marcarCasillas(casillas);
        }
        
        else { // Se elimina la selección de la pieza actual
          this.action = MyScene.ELEGIR_PIEZA;
          this.piezaSeleccionada.desactivarLuz();
          this.piezaSeleccionada = null;
          this.activarLuzCazadores();
        }
      }
    }
  }


  // Método que selecciona la pieza de la presa
  seleccionarPiezaPresa(event) {
    var mouse = this.getMouse(event);
    this.raycaster.setFromCamera(mouse, this.getCamera());
    var pickedObjects = this.raycaster.intersectObjects(this.pickeablePresa, true);

    if (pickedObjects.length > 0) {
      this.piezaSeleccionada = pickedObjects[0].object.userData;
      var casilla = this.piezaSeleccionada.casillaActual;

      var casillas = this.tablero.casillasIndexadas[casilla].getCasillasAccesiblesPresa();
      this.pickeableCasillas = this.tablero.marcarCasillas(casillas); // Marcar las casillas accesibles

      this.action = MyScene.ELEGIR_CASILLA;
    }
  }


  // Método que selecciona las casillas de la presa
  seleccionarCasillaPresa(event) {
    var angulo = -Math.PI / 2;
    var mouse = this.getMouse(event);
    this.raycaster.setFromCamera(mouse, this.getCamera());
    var pickedObjects = this.raycaster.intersectObjects(this.pickeableCasillas, true);

    if (pickedObjects.length > 0) {
      var casillaSeleccionada = pickedObjects[0].object.userData;
      this.pickeableCasillas = [];
      this.tablero.desmarcarCasillas();

      // Movimiento de la casilla actual de la pieza a la casilla seleccionada
      var spline = this.tablero.getSpline(this.piezaSeleccionada.casillaActual, casillaSeleccionada.indice, this.piezaSeleccionada);
      this.piezaSeleccionada.createAnimation(spline);

      // Se cambia la orientación de la pieza hacia la casilla seleccionada
      this.piezaSeleccionada.model.rotation.y = angulo;
      angulo = this.calcularAngulo(this.tablero.casillasIndexadas[this.piezaSeleccionada.casillaActual].position.x,
                                   this.tablero.casillasIndexadas[this.piezaSeleccionada.casillaActual].position.z,
                                   this.tablero.casillasIndexadas[casillaSeleccionada.indice].position.x,
                                   this.tablero.casillasIndexadas[casillaSeleccionada.indice].position.z);
      this.piezaSeleccionada.model.rotateY(angulo);

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
    }
    
    else { // No se selecciona una casilla
      pickedObjects = this.raycaster.intersectObjects(this.pickeablePresa, true);

      if (pickedObjects.length > 0) {
        this.tablero.desmarcarCasillas(); // Se elimina la selección de la pieza actual
        this.action = MyScene.ELEGIR_PIEZA;
        this.piezaSeleccionada = null;
      }
    }
  }


  // Método que decide qué toca hacer en el turno del cazador
  seleccionarCazador(event) {
    if (!event.ctrlKey) {
      switch (this.action) {
        case MyScene.ELEGIR_PIEZA:
          this.seleccionarPiezaCazadores(event);
          break;

        case MyScene.ELEGIR_CASILLA:
          this.seleccionarCasillaCazadores(event);
          break;

        default:
          this.setMessage("Error al seleccionar cazador");
      }
    }
  }


  // Método que decide qué toca hacer en el turno de la presa
  seleccionarPresa(event) {
    if (!event.ctrlKey) {
      switch (this.action) {
        case MyScene.ELEGIR_PIEZA:
          this.seleccionarPiezaPresa(event);
          break;

        case MyScene.ELEGIR_CASILLA:
          this.seleccionarCasillaPresa(event);
          break;

        default:
          this.setMessage("Error al seleccionar presa");
      }
    }
  }

  // Método que se activa al pulsar con el ratón, y llama a los métodos correspondientes de selección según el turno
  onMouseDown(event) {
    this.timeAnimation = 2000;

    if (!event.ctrlKey) {
      switch (this.aplicationMode) {
        case MyScene.TURNO_CAZADORES:
          this.seleccionarCazador(event);
          break;

        case MyScene.TURNO_PRESA:
          this.seleccionarPresa(event);
          break;

        default:
          this.setMessage("Error de turno");
      }
    }
  }

  // Método que se activa al pulsar una tecla, para cambiar de cámara
  onKeyDown(event) {
    if (!event.ctrlKey) {
      var x = event.which || event.key;

      switch (x) { // Se pulsa "c" para cambiar vista aérea
        case 67:
          if (!this.cAerea) { // Activar cámara aérea
            this.ground.visible = true;
            this.camaraActual = this.camaraAerea;
            this.cAerea = true;
          }

          else { // Desactivar cámara aérea
            this.ground.visible = false;
            this.camaraActual = this.camera;
            this.cAerea = false;
          }

          break;

        case 86: // Se pulsa "v" para cambiar vista del jugador que tiene el turno
          if (!this.cFija) { // Activar cámara fija
            this.camaraActual = this.getCamaraFija();
            this.cFija = true;
            this.cAerea = false;
          }

          else { // Desactivar cámara fija
            this.camaraActual = this.camera;
            this.cFija = false;
          }

          break;
      }
    }
  }


  /// It returns the position of the mouse in normalized coordinates ([-1,1],[-1,1])
  /**
   * @param event - Mouse information
   * @return A Vector2 with the normalized mouse position
   */
  getMouse(event) {
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = 1 - 2 * (event.clientY / window.innerHeight);
    return mouse;
  }

  initStats() {
    var stats = new Stats();

    stats.setMode(0); // 0: fps, 1: ms

    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    $("#Stats-output").append(stats.domElement);

    this.stats = stats;
  }


  // Método que crea la cámara actual y las cámaras fijas
  createCamera() {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // También se indica dónde se coloca según el turno
    if (this.aplicationMode == MyScene.TURNO_CAZADORES) {
      this.camera.position.set(0, 15, 25);
    }

    else {
      this.camera.position.set(0, 15, -25);
    }

    // Y hacia dónde mira
    var look = new THREE.Vector3(0, 0, 0);
    this.camera.lookAt(look);
    this.add(this.camera);

    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new TrackballControls(this.camera, this.renderer.domElement);
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;

    // Cámara fija cazadores
    this.camaraFijaCazadores = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camaraFijaCazadores.position.set(this.positionCazadores.x, this.positionCazadores.y, this.positionCazadores.z);
    this.camaraFijaCazadores.lookAt(look);
    this.add(this.camaraFijaCazadores);

    // Cámara fija presa
    this.camaraFijaPresa = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camaraFijaPresa.position.set(this.positionPresa.x, this.positionPresa.y, this.positionPresa.z);
    this.camaraFijaPresa.lookAt(look);
    this.add(this.camaraFijaPresa);
  }


  // Método que obtiene la cámara fija que corresponda según el turno
  getCamaraFija() {
    if (this.aplicationMode == MyScene.TURNO_CAZADORES) {
      return this.camaraFijaCazadores;
    }

    else {
      return this.camaraFijaPresa;
    }
  }


  // Método que crea la cámara aérea
  createCameraAerea() {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camaraAerea = new THREE.OrthographicCamera(-40, 40, 20, -20, 0.1, 1000);
    // También se indica dónde se coloca
    this.camaraAerea.position.set(0, 10, 0);
    // Y hacia dónde mira
    var look = new THREE.Vector3(0, 0, 0);
    this.camaraAerea.lookAt(look);
    this.add(this.camaraAerea);

    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.camaraAereaControl = new TrackballControls(this.camera, this.renderer.domElement);
    // Se configuran las velocidades de los movimientos
    this.camaraAereaControl.rotateSpeed = 5;
    this.camaraAereaControl.zoomSpeed = -2;
    this.camaraAereaControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.camaraAereaControl.target = look;
  }


  // Método que gira la cámara
  girarCamara() {
    if (this.cFija) { // Si la cámara está fija, se obtiene la cámara correspondiente
      setTimeout(() => {
        this.camaraActual = this.getCamaraFija();
      }, this.timeAnimation);
    }

    if ($("#crotar").prop("checked")) { // Si al inicio se activa la rotación tras cambiar de turno
      this.rotarCamara = true;
      if (this.aplicationMode == MyScene.TURNO_CAZADORES) { // Si es el turno de los cazadores, se coloca en su posición correspondiente
        setTimeout(() => {
          this.camera.position.set(0, 15, 25);
        }, this.timeAnimation);
      }

      else { // Si es el turno de la presa, se coloca en su posición correspondiente
        setTimeout(() => {
          this.camera.position.set(0, 15, -25);
        }, this.timeAnimation);
      }
    }
  }

  
  createGround() {
    // El suelo es un Mesh, necesita una geometría y un material.

    // La geometría es una caja con muy poca altura
    var geometryGround = new THREE.BoxGeometry(50, 0.2, 50);

    // El material se hará con una textura de madera
    var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    var materialGround = new THREE.MeshPhongMaterial({ map: texture });

    // Ya se puede construir el Mesh
    this.ground = new THREE.Mesh(geometryGround, materialGround);

    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    this.ground.position.y = -1;

    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    this.add(this.ground);
  }

  createGUI() {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();

    // La escena le va a añadir sus propios controles. 
    // Se definen mediante un objeto de control
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = {
      // En el contexto de una función   this   alude a la función
      lightIntensity: 0.5,
      axisOnOff: true
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder('Luz y Ejes');

    // Se le añade un control para la intensidad de la luz
    folder.add(this.guiControls, 'lightIntensity', 0, 1, 0.1)
      .name('Intensidad de la Luz : ')
      .onChange((value) => this.setLightIntensity(value));

    // Y otro para mostrar u ocultar los ejes
    folder.add(this.guiControls, 'axisOnOff')
      .name('Mostrar ejes : ')
      .onChange((value) => this.setAxisVisible(value));

    return gui;
  }


  createLights() {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.6);
    // La añadimos a la escena
    this.add(ambientLight);

    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight(0xffffff, this.guiControls.lightIntensity);
    this.spotLight.position.set(60, 60, 40);
    this.add(this.spotLight);
  }


  setLightIntensity(valor) {
    this.spotLight.intensity = valor;
  }


  setAxisVisible(valor) {
    //this.axis.visible = valor;
    for (let i = 0; i < this.axisVector.length; i++) {
      this.axisVector[i].visible = valor;
    }

  }


  createRenderer(myCanvas) {
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


  getCamera() {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camaraActual;
  }


  setCameraAspect(ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }


  onWindowResize() {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect(window.innerWidth / window.innerHeight);

    // Y también el tamaño del renderizador
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }


  update() {

    // Se actualizan los elementos de la escena para cada frame
    if (this.stats) this.stats.update();

    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();
    this.camaraAereaControl.update();
    var delta = this.clock.getDelta();

    // Si se está rotando la cámara
    if (this.rotarCamara == true) {
      var v = 3 * delta;

      if (this.aplicationMode == MyScene.TURNO_CAZADORES) {
        setTimeout(() => {
          if (this.camaraAerea.rotation.z >= -Math.PI && this.camaraAerea.rotation.z < 0) { // Rota 180º
            this.camaraAerea.rotateZ(v);
          }
          else { // Se detiene el giro
            this.rotarCamara = false;
            this.camaraAerea.rotation.z = 0;
          }
        }, this.timeAnimation / 2);

      }

      else { // Turno presa
        setTimeout(() => {
          if (this.camaraAerea.rotation.z <= Math.PI && this.camaraAerea.rotation.z >= 0) { // Rota 180º
            this.camaraAerea.rotateZ(v);
          }
          else { // Se detiene el giro
            this.rotarCamara = false;
            this.camaraAerea.rotation.z = -Math.PI;
          }
        }, this.timeAnimation / 2);
      }
    }

    // Se actualiza el resto del modelo
    this.presa.update();
    this.cazador1.update();
    this.cazador2.update();
    this.cazador3.update();
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render(this, this.getCamera());

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
MyScene.JUGANDO = 0;
MyScene.GANAN_CAZADORES = 1;
MyScene.GANA_PRESA = 2

/// La función main
$(function () {

  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  $('#boton_empezar').on('click', function () {
    $("#comienzo").hide();
    $("#ayuda").hide();
    var scene = new MyScene("#WebGL-output");
    //$("#WebGL-output").hide();

    // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
    window.addEventListener("resize", () => scene.onWindowResize());
    window.addEventListener("mousedown", (event) => scene.onMouseDown(event), true);
    window.addEventListener("keydown", (event) => scene.onKeyDown(event), true);

    // Que no se nos olvide, la primera visualización.
    scene.update();
  }
  );


});
