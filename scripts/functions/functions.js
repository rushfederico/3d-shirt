function init() {
  scene = new THREE.Scene();
  container = $("#container")[0];
  camera = new THREE.PerspectiveCamera(40, screen_rate, 100, 1200);
  camera.position.set(600, 0, 200);
  configControls();
  configLights();
  scene.add(camera);
  scene.add(new THREE.AmbientLight(0x666666));
  scene.add(light);
  createObjects();
  textureLoader = new THREE.TextureLoader();
  loadSvg(function (resp) {
    obj2_model_load(gender + "/cat" + category + "/model");
  });

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);

  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.soft = true;
  configTextEditor();
}

function configControls() {
  controls = new THREE.OrbitControls(camera, container);
  controls.enableKeys = false;
  controls.enablePan = false;
  controls.minDistance = 166;
  controls.maxDistance = 200;
  controls.update();
}

function configLights() {
  lights.forEach(function (light) {
    var dlight = new THREE.DirectionalLight(light.color, light.intensity);
    var p = light.position;
    var l = light.lookAt;
    dlight.position.set(p.x, p.y, p.z);
    dlight.lookAt(l.x, l.y, l.z);
    if (light.angle) {
    }
    scene.add(dlight);
  });

  var slight = new THREE.SpotLight(0xffffbb, 0.1);
  slight.position.set(0, 0, 0);
  slight.lookAt(0, 0, 0);
  slight.distance = 100;
  slight.target = object;
  slight.angle = 0.4;
  light = new THREE.DirectionalLight(0xdfebff, 0.3);
  light.position.set(500, 100, 80);
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  var d = 300;
  light.shadow.camera.left = -d;
  light.shadow.camera.right = d;
  light.shadow.camera.top = d;
  light.shadow.camera.bottom = -d;

  light.shadow.camera.far = 100;
  light.shadowDarkness = 0.5;
  light.shadowCameraVisible = true;
}

function createObjects() {
  object = new THREE.Object3D();
  objectLogo = new THREE.Object3D();
}

///////////////////////////////////////////////////////////////////////////////////////////

function onWindowResize() {
  // width = window.innerWidth;
  // height = window.innerHeight;
  width = $("#container").width();
  height = $("#container").height();
  if (width < height) {
    height = width;
  }
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}

var onProgress = function (xhr) {
  if (xhr.lengthComputable) {
    var percentComplete = (xhr.loaded / xhr.total) * 100;
  }
};

var onError = function (xhr) {
  console.error(xhr);
};

function obj2_model_load(model) {
  var loader = new THREE.OBJLoader2(manager);
  loader.load("assets/" + model + ".obj", function (data) {
    if (object != null) {
      scene.remove(object);
    }
    object = null;
    object = data.detail.loaderRootNode;
    materials = [];
    object.traverse(function (node) {
      if (node.isMesh) {
        node.material = textureMaterial;
        //node.material.map = textureMaterial;
        node.geometry.uvsNeedUpdate = true;
        //object = node;
      }
    });

    object.scale.set(9, 9, 9);
    object.position.set(0, -75, 0);
    object.rotation.set(0, Math.PI / 2, 0);
    object.receiveShadow = true;
    object.castShadow = true;

    canvas['on']('after:render', function() { 
      object['children'][0]['material']['map']['needsUpdate'] = true; 
    });

    scene.add(object);

    //model_logo_load();
  });
}

function model_logo_load() {
  var loader = new THREE.OBJLoader2();
  loader.load("assets/men/cat1/logo-frontal.obj", function (data) {
    if (objectLogo != null) {
      scene.remove(objectLogo);
    }
    objectLogo = null;
    objectLogo = data.detail.loaderRootNode;
    materials = [];
    objectLogo.traverse(function (node) {
      if (node.isMesh) {
        node.material = textureLogoMaterial;
        node.geometry.uvsNeedUpdate = true;
      }
    });

    objectLogo.scale.set(9, 9, 9);
    objectLogo.position.set(0, -75, 0);
    objectLogo.rotation.set(0, Math.PI / 2, 0);
    objectLogo.receiveShadow = true;
    objectLogo.castShadow = true;

    scene.add(objectLogo);
  });
}

function loadSvg(response) {
  $.ajax({
    url:
      "assets/" +
      gender +
      "/cat" +
      category +
      "/prod" +
      product +
      "/pattern.svg",
    async: false,
    success: function (data) {
      var svgData = new XMLSerializer().serializeToString(data.documentElement);
      $("#svgContainer").empty();
      $("#svgContainer").append(svgData).html();
    },
  });
  $.ajax({
    url: "assets/men/cat1/logo-frontal-pattern.svg",
    async: false,
    success: function (data) {
      var svgData = new XMLSerializer().serializeToString(data.documentElement);
      $("#svgLogoContainer").empty();
      $("#svgLogoContainer").append(svgData).html();
    },
  });
  set_materials(function (resp) {
    response(resp);
  });
}

//var canvas = document.createElement("canvas");
var canvas = new fabric.Canvas("fabricCanvas",{
  'preserveObjectStacking': true,
  'selection': false
});
var texture = new THREE.Texture(document.getElementById('canvas'));
var canvasTexture = new THREE['CanvasTexture'](document['getElementById']('canvas'));

function set_materials(response) {
  process_svg();
  // var svg = document.getElementById("svgPathContainer").querySelector("svg");

  //canvasTexture['anisotropy'] = renderer['capabilities']['getMaxAnisotropy']();
  /*textureMaterial = new THREE['MeshPhongMaterial'](
		{ 'map': canvasTexture, 'combine': 1 });
  texture['needsUpdate'] = true;
  */
  let svg = $("#svgPathContainer").find("svg")[0];
  let svgData = new XMLSerializer().serializeToString(svg);
  canvas.width = $(svg).width();
  canvas.height = $(svg).height();
  var ctx = canvas.getContext("2d");

  var img = document.createElement("img");
  img.setAttribute(
    "src",
    "data:image/svg+xml;base64," +
      window.btoa(unescape(encodeURIComponent(svgData)))
  );

  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    var oImg = document.createElement("img");
    oImg.width = "100px";
    oImg.height = "100px";
    oImg.setAttribute(
      "src",
      "assets/" + gender + "/cat" + category + "/texture.png"
    );

    oImg.onload = function () {
      ctx.globalAlpha = 0.4;
      ctx.scale(0.3, 0.3);
      var pattern = ctx.createPattern(oImg, "repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width * 3.33, canvas.height * 3.33);
      ctx.globalAlpha = 1;
      ctx.scale(3.33, 3.33);


      var svgText = document
        .getElementById("svgTextContainer")
        .querySelector("svg");
      var svgTextData = new XMLSerializer().serializeToString(svgText);
      var imgT = document.createElement("img");
      imgT.setAttribute(
        "src",
        "data:image/svg+xml;base64," +
          window.btoa(unescape(encodeURIComponent(svgTextData)))
      );
      imgT.onload = function () {
        ctx.drawImage(imgT, 0, 0);

        //canvasTexture['anisotropy'] = renderer['capabilities']['getMaxAnisotropy']();
        /*textureMaterial = new THREE['MeshPhongMaterial'](
          { 'map': canvasTexture, 'combine': 1 });
        texture['needsUpdate'] = true;
        */
        var texture = new THREE.Texture(document.getElementById('fabricCanvas'));
        texture.needsUpdate = true;
        map = texture;
        textureMaterial = new THREE.MeshPhongMaterial({ map: map });

        // textureMaterial.transparent = true;
        // textureMaterial.opacity = 0.5;
        // textureMaterial.needsUpdate = true;
        // textureMaterial.position = 0;
        load_materials();
        response(true);
      };
    };
  };
}

function process_svg() {
  var baseSvgData = new XMLSerializer().serializeToString(
    $("#svgContainer svg")[0]
  );
  $("#svgPathContainer").empty();
  $("#svgTextContainer").empty();
  $("#svgPathContainer").append(baseSvgData).html();
  $("#svgTextContainer").append(baseSvgData).html();
  var texts = $("#svgPathContainer text");
  for (var i = 0; i < texts.length; i++) {
    $(texts[i]).remove();
  }
  var paths = $("#svgTextContainer path");
  for (var i = 0; i < paths.length; i++) {
    $(paths[i]).remove();
  }
}

function update_svg(op, value) {
  if (op == "color") {
    $(`path[data-color="${$(`#${selectedMaterial}`).data("color")}"]`).attr(
      "fill",
      value
    );
    $(`rect[data-color="${$(`#${selectedMaterial}`).data("color")}"]`).attr(
      "fill",
      value
    );
  }
  if (op == "ftext") {
    document.getElementById(nuevoId).innerHTML = value;
  }
  if (op == "fillText") {
    document.getElementById(nuevoId).setAttribute("fill", value);
    document.getElementById(nuevoId).style.fill = value;
  }
  if (op == "fillStroke") {
    document.getElementById(nuevoId).setAttribute("stroke", value);
    document.getElementById(nuevoId).style.stroke = value;
  }
  if (op == "ff") {
    document.getElementById(nuevoId).setAttribute("font-family", value);
    document.getElementById(nuevoId).style.fontFamily = value;
  }
  if (op == "fs") {
    document
      .getElementById(nuevoId)
      .setAttribute("font-size", value.replace("px", ""));
    document.getElementById(nuevoId).style.fontSize = value;
  }
  if (op == "xpos") {
    document.getElementById(nuevoId).attributes.x.value =
      parseInt(document.getElementById(nuevoId).attributes.x.value) + value;
  }
  if (op == "ypos") {
    document.getElementById(nuevoId).attributes.y.value =
      parseInt(document.getElementById(nuevoId).attributes.y.value) + value;
  }
  if (op == "fillNuevaLeyenda") {
    document.getElementById(nuevoId).style.fill = value;
  }

  set_materials(function (resp) {
    object.children[0].material = textureMaterial;
    render();
  });
}

function configPasos() {
  $(".buttonPaso").on("click", function (e) {
    if (!$(this).hasClass("active")) {
      $(".buttonPaso, .paso").removeClass("active");
      $(this).addClass("active");
      var idPaso = $(this).data("paso");
      $("#" + idPaso).addClass("active");
      if (idPaso == "pasoDisenio") {
        closeTextEditor();
        load_materials();
        $(".texts").empty();
      } else if (idPaso == "pasoTexto") {
        closeColorContainer();
        loadTexts();
      }
    }
  });
}

//var canvas = new fabric.Canvas( "fabricCanvas" );
function testText(){
  /*canvas.backgroundColor = "transparent";
  canvas.on("after:render", function() {
      mesh.material.map.needsUpdate = true;
  });
*/
  var text = new fabric.IText('Three.js\n', {
  fontSize: 40,
  textAlign: 'center',
  fontWeight: 'bold',
  left: 128,
  top: 128,
  angle: 30,
  originX: 'center',
  originY: 'center',
  //shadow: 'blue -5px 6px 5px'   
  });
  canvas.add(text);

  /*var canvasTexture = new THREE.CanvasTexture(document.getElementById( "fabricCanvas" ));
  var geometry = new THREE.PlaneGeometry(10, 10, 20, 20);
  geometry.vertices.forEach(v => {
  v.z = Math.cos(v.x) * Math.sin(-v.y * 0.5) * 0.5;
  });
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();

  var mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
  map: canvasTexture,
  metalness: 1,
  roughness: 1
  }));
  mesh.position.set(0, -75, 1);
  mesh.scale.set(9, 9, 9);
  mesh.rotation.set(0, Math.PI / 2, 0);
  mesh.up.set(0, 1, 1);
  scene.add(mesh);*/
}

/* Raycaster */
/*var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var onClickPosition = new THREE.Vector2();
var isMobile = false;
*/
/**
* Fabric.js patch
*/
/*fabric.Canvas.prototype.getPointer =  function (e, ignoreZoom) {
  if (this._absolutePointer && !ignoreZoom) {
   return this._absolutePointer;
  }
  if (this._pointer && ignoreZoom) {
   return this._pointer;
  }
  var simEvt;
       if (e.touches != undefined) {
           simEvt = new MouseEvent({
               touchstart: "mousedown",
               touchmove: "mousemove",
               touchend: "mouseup"
           }[e.type], {
               bubbles: true,
               cancelable: true,
               view: window,
               detail: 1,
               screenX: Math.round(e.changedTouches[0].screenX),
               screenY: Math.round(e.changedTouches[0].screenY),
               clientX: Math.round(e.changedTouches[0].clientX),
               clientY: Math.round(e.changedTouches[0].clientY),
               ctrlKey: false,
               altKey: false,
               shiftKey: false,
               metaKey: false,
               button: 0,
               relatedTarget: null
           });
           var pointer = fabric.util.getPointer(simEvt),
               upperCanvasEl = this.upperCanvasEl,
               bounds = upperCanvasEl.getBoundingClientRect(),
               boundsWidth = bounds.width || 0,
               boundsHeight = bounds.height || 0,
               cssScale;
       } else {
           var pointer = fabric.util.getPointer(e),
               upperCanvasEl = this.upperCanvasEl,
               bounds = upperCanvasEl.getBoundingClientRect(),
               boundsWidth = bounds.width || 0,
               boundsHeight = bounds.height || 0,
               cssScale;
       }
  if (!boundsWidth || !boundsHeight ) {
   if ('top' in bounds && 'bottom' in bounds) {
     boundsHeight = Math.abs( bounds.top - bounds.bottom );
   }
   if ('right' in bounds && 'left' in bounds) {
     boundsWidth = Math.abs( bounds.right - bounds.left );
   }
  }
  this.calcOffset();
  pointer.x = pointer.x - this._offset.left;
  pointer.y = pointer.y - this._offset.top;
  */
  /* BEGIN PATCH CODE */
  /*if (e.target !== this.upperCanvasEl) {
           var positionOnScene;
           if (isMobile == true) {
               positionOnScene = getPositionOnSceneTouch(container, e);
               if (positionOnScene) {
                   console.log(positionOnScene);
                   pointer.x = positionOnScene.x;
                   pointer.y = positionOnScene.y;
               }
           } else {
               positionOnScene = getPositionOnScene(container, e);
               if (positionOnScene) {
                   console.log(positionOnScene);
                   pointer.x = positionOnScene.x;
                   pointer.y = positionOnScene.y;
               }
           }
       }
    */
  /* END PATCH CODE */
  /*if (!ignoreZoom) {
   pointer = this.restorePointerVpt(pointer);
  }
  
  if (boundsWidth === 0 || boundsHeight === 0) {
   cssScale = { width: 1, height: 1 };
  }
  else {
   cssScale = {
     width: upperCanvasEl.width / boundsWidth,
     height: upperCanvasEl.height / boundsHeight
   };
  }
  
  return {
   x: pointer.x * cssScale.width,
   y: pointer.y * cssScale.height
  };
  }
  */
  /**
  * Listeners
  */
  /*var container = document.getElementById( "container" );
  container.addEventListener("mousedown", onMouseEvt, false);
  
  if (
   /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
       navigator.userAgent,
   ) ||
   /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
       navigator.userAgent.substr(0, 4),
   )
  ) {
   isMobile = true;
   container.addEventListener("touchstart", onTouch, false);
  }
  */
  /**
  * Event handler
  */
  /*
  function onTouch(evt) {
   evt.preventDefault();
   const positionOnScene = getPositionOnSceneTouch(container, evt);
   if (positionOnScene) {
       const canvasRect = canvas._offset;
       const simEvt = new MouseEvent(evt.type, {
           clientX: canvasRect.left + positionOnScene.x,
           clientY: canvasRect.top + positionOnScene.y,
       });
       canvas.upperCanvasEl.dispatchEvent(simEvt);
   }
  }
  
  function getPositionOnSceneTouch(sceneContainer, evt) {
   var array = getMousePosition(sceneContainer, evt.changedTouches[0].clientX, evt.changedTouches[0].clientY);
   onClickPosition.fromArray(array);
  console.log(scene);
   var intersects = getIntersects(onClickPosition, scene.children);
   if (intersects.length > 0 && intersects[0].uv) {
       var uv = intersects[0].uv;
       intersects[0].object.material.map.transformUv(uv);
       var circle = new fabric.Circle({
           radius: 3,
           left: getRealPosition("x", uv.x),
           top: getRealPosition("y", uv.y),
           fill: "white",
       });
       // canvas.add(circle);
       getUv = uv;
       return {
           x: getRealPosition("x", uv.x),
           y: getRealPosition("y", uv.y),
       };
   }
   return null;
  }
  function onMouseEvt(evt) {
   evt.preventDefault();
   const positionOnScene = getPositionOnScene(container, evt)
   if (positionOnScene) {
     const canvasRect = canvas._offset;
     const simEvt = new MouseEvent(evt.type, {
       clientX: canvasRect.left + positionOnScene.x,
       clientY: canvasRect.top + positionOnScene.y
     });
  
     console.log(simEvt);
  
     canvas.upperCanvasEl.dispatchEvent(simEvt);
   }
  }
  */
  /**
  * Three.js Helper functions
  */
 /*
  function getPositionOnScene(sceneContainer, evt) {
  console.log(evt);
  console.log(scene);
   var array = getMousePosition(container, evt.clientX, evt.clientY);
   onClickPosition.fromArray(array);
   var intersects = getIntersects(onClickPosition, scene.children);
   if (intersects.length > 0 && intersects[0].uv) {
     var uv = intersects[0].uv;
     intersects[0].object.material.map.transformUv(uv);
     return {
       x: getRealPosition('x', uv.x),
       y: getRealPosition('y', uv.y)
     }
   }
   return null
  }
  
  function getRealPosition(axis, value) {
   let CORRECTION_VALUE = axis === "x" ? 4.5 : 5.5;
  
   return Math.round(value * 512) - CORRECTION_VALUE;
  }
  
  var getMousePosition = function(dom, x, y) {
   var rect = dom.getBoundingClientRect();
   return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
  };
  
  var getIntersects = function(point, objects) {
   mouse.set(point.x * 2 - 1, -(point.y * 2) + 1);
   raycaster.setFromCamera(mouse, camera);
   return raycaster.intersectObjects(objects);
  };
  */