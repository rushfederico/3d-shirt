// THREEJS FUNCTIONS
manager.onLoad = function ( ) {  
  animate();
	container.appendChild(renderer.domElement);
  $("#sectorRemera").css("background-image", "none");
};

function init() {
  createScene();
  getContainer();
  getCamera();
  getControls();
  getLights();
  fillScene();
  createObject();
  textureLoader = new THREE.TextureLoader();
  changeProduct();
  
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.soft = true;  
}

function fillScene() {
  scene.add(camera);
  scene.add(new THREE.AmbientLight(0x666666));
  scene.add(light);
}

function createScene() {
  scene = new THREE.Scene();
}

function createObject() {
  object = new THREE.Object3D();
  objectLogo = new THREE.Object3D();
}

function getContainer() {
  //container = document.createElement("div");
  //document.getElementById("container").appendChild(container);
  container = document.getElementById("container");
}
function getCamera() {
  // acá quizás esté el quid de la cuestión del resize?
  camera = new THREE.PerspectiveCamera(40, screen_rate, 100, 1200);
  camera.position.set(600, 0, 200);
}
function getControls() {
  controls = new THREE.OrbitControls(camera, container);
  controls.enableKeys = false;
  controls.enablePan = false;
  controls.minDistance = 166;
  controls.maxDistance = 200;
  controls.update();
}

function getLights() {
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

///////////////////////////////////////////////////////////////////////////////////////////

function loadColorPickers(initialColor) {
  $(document).ready(function () {
    $(".colorPickers").spectrum({
      color: initialColor,
      change: function (color) {
        update_svg($(this).attr("op"), color.toHexString());
        closeColorContainer();
      },
    });
  });
}

function loadTextStrokeColorPickers(initialColor) {
  $(document).ready(function () {
    $("#strokeColorPick").spectrum({
      color: initialColor,
      change: function (color) {
        update_svg("fillStroke", color.toHexString());
        closeColorContainer();
      },
    });
  });
}

function loadNuevaLeyendaColorPickers(initialColor) {
  $(document).ready(function () {
    $("#nuevaLeyendaColorPick").spectrum({
      color: initialColor,
      change: function (color) {
        closeColorContainer();
      },
    });
  });
}

function loadNuevaLeyendaStrokeColorPickers(initialColor) {
  $(document).ready(function () {
    $("#nuevaLeyendaStrokeColorPick").spectrum({
      color: initialColor,
      change: function (color) {
        closeColorContainer();
      },
    });
  });
}

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
        node.geometry.uvsNeedUpdate = true;
        //object = node;
      }
    });

    object.scale.set(9, 9, 9);
    object.position.set(0, -75, 0);
    object.rotation.set(0, Math.PI / 2, 0);
    object.receiveShadow = true;
    object.castShadow = true;

    scene.add(object);

    model_logo_load();  
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

function selectMaterial(id) {
  selectedMaterial = id;
  var idd = document.getElementById(id);
  var color = $(idd).css("fill");
  loadColorPickers(color);
  load_materials();
  $(".colorZona").not(".active").addClass("hidden");
  $(".color-palete").show();
}

function setColorBk(color) {
  selectedColors.push(color);
  object.traverse(function (node) {
    if (node.isMesh) {
      node.material[selectedMaterial].color.set(color);
    }
  });
  render();
}

function changeProduct() {
  loadSvg(function (resp) {
    obj2_model_load(gender + "/cat" + category + "/model");
  });
}
function loadSvg(response) {
  $.ajax({
    url: "assets/" + gender + "/cat" + category + "/prod" + product + "/pattern.svg",
    async: false,
    success: function (data) {
      var svgData = new XMLSerializer().serializeToString(data.documentElement);
      $("#svgContainer").empty();
      $("#svgContainer").append(svgData).html();
    }
  });
  $.ajax({
    url: "assets/men/cat1/logo-frontal-pattern.svg",
    async: false,
    success: function(data) {
      var svgData = new XMLSerializer().serializeToString(data.documentElement);
      $("#svgLogoContainer").empty();
      $("#svgLogoContainer").append(svgData).html();
    }
  });
  set_materials(function (resp) {
    response(resp);
  });
}

function set_materials(response) {
  var baseSvg = document.getElementById("svgContainer").querySelector("svg");
  var baseSvgData = new XMLSerializer().serializeToString(baseSvg);

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

  var svg = document.getElementById("svgPathContainer").querySelector("svg");
  var svgData = new XMLSerializer().serializeToString(svg);
  var canvas = document.createElement("canvas");
  canvas.width = $(svg).width();
  canvas.height = $(svg).height();
  var ctx = canvas.getContext("2d");

  var img = document.createElement("img");
  var material;
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
      
      var svgLogo = document.getElementById("svgLogoContainer").querySelector("svg");
      var svgLogoData = new XMLSerializer().serializeToString(svgLogo);
      
      var canvasLogo = document.createElement("canvas");
      canvasLogo.width = $(svgLogo).width();
      canvasLogo.height = $(svgLogo).height();
      var ctxLogo = canvasLogo.getContext("2d");

      var logoImg = document.createElement("img");
      logoImg.setAttribute(
        "src",
        "data:image/svg+xml;base64," +
          window.btoa(unescape(encodeURIComponent(svgLogoData)))
      );
      logoImg.onload = function () {
        ctxLogo.drawImage(logoImg, 0, 0);
        var textureLogo = new THREE.Texture(canvas);
        textureLogo.needsUpdate = true;
        mapLogo = textureLogo;
        textureLogoMaterial = new THREE.MeshPhongMaterial({ map: mapLogo });

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
          var texture = new THREE.Texture(canvas);
          texture.needsUpdate = true;
          map = texture;
          textureMaterial = new THREE.MeshPhongMaterial({ map: map });
          load_materials();
          response(true);        
        };
      };
    };
  };
}

function load_materials() {
  var paths = $("#svgContainer path");
  var materialContainer = "";

  for (var i = 0; i < paths.length; i++) {
    var id = $(paths[i]).attr("id");
    var bg = $(paths[i]).css("fill");

    if (bg != undefined && id != undefined) {
      var data = id;
      var selected = selectedMaterial == id ? "active" : "";
      materialContainer +=
        '<div id="mat_' +
        data +
        '" class="xixcust colorZona' +
        selected +
        '" onclick="selectMaterial(\'' +
        id +
        '\')"><span class="molids" style="background:' +
        bg +
        '"></span><span class="egseas">' +
        id +
        "</span></div>";
    }
  }
  $(".materials").empty();
  $(".materials").append(materialContainer).html();
}

function load_texts() {
  var texts = $("#svgContainer text");
  var textContainer = `<h3 class="cursorPointer" onclick="addNewText()">+ Agregar texto</h3>`;
  for (var i = 0; i < texts.length; i++) {
    var id = $(texts[i]).attr("id");
    var bg = $(texts[i]).css("fill");
    var selected = selectedText == id ? "active" : "";
    if (id != undefined) {
      textContainer +=
        '<div id="txt_' +
        id +
        '" class="xixcust ' +
        selected +
        '" onclick="load_text_details(\'' +
        id +
        '\')"><span class="molids" style="background:' +
        bg +
        '"></span><span class="egseas">' +
        id +
        "</span></div>";
    }
  }
  $(".texts").empty();
  $(".texts").append(textContainer).html();
}

function load_text_details(idd) {
  selectedText = idd;
  $(".text-editor").show();
  $(".texts").hide();

  var id = document.getElementById(idd);
  var text = $(id).html();
  var ff = $(id).attr("font-family");
  var sff = $(id).css("font-family");
  var fs = $(id).css("font-size");
  var textColor = $(id).css("fill");
  var textStrokeColor = $(id).css("stroke");

  var xPos = parseInt($(id).attr("x"));
  var yPos = parseInt($(id).attr("y"));
  var textEditContainer = `<div class="text-editor-container">
        <i class="fa-solid fa-circle-xmark cursorPointer closeTextX" onclick="closeTextEditor()"})"></i>
        <div class="form-check form-check-inline">
            <input name="zonaPrenda" type="radio" class="form-check-input" id="frente" value="frente" checked>
            <label class="form-check-label" for="frente">Frente</label>
            <input name="zonaPrenda" type="radio" class="form-check-input" id="dorso" value="dorso">
            <label class="form-check-label" for="dorso">Dorso</label>
            <input name="zonaPrenda" type="radio" class="form-check-input" id="mangaizq" value="mangaizq">
            <label class="form-check-label" for="mangaizq">Manga Izq</label>
            <input name="zonaPrenda" type="radio" class="form-check-input" id="mangader" value="mangader">
            <label class="form-check-label" for="mangader">Manga Der</label>
          </div>
        <h1>${idd}</h1>`;
  textEditContainer +=
    '<div class="form-group"><input id="ftext" onchange="changeTeamName(event)" type="text" class="form-control" value="' +
    text +
    '"/></div>';
  var fontFamilies =
    '<select id="ff" onchange="changeTeamName(event)" class="form-control"><option value="">choose font</option>';
  fonts.forEach(function (font) {
    var selected = ff == font ? "selected" : "";
    fontFamilies +=
      "<option " + selected + ' value="' + font + '">' + font + "</option>";
  });
  fontFamilies += "</select>";
  textEditContainer +=
    '<div class="form-group"><label for="ff-list">Font-Family</label>' +
    fontFamilies +
    "</div>";
  textEditContainer +=
    '<div class="form-group"><label for="fs">Font-Size</label><input id="fs" type="text" onchange="changeTeamName(event)" class="form-control" value="' +
    fs +
    '"/></div>' +
    `<div id="colorAndMoveTextContainer" class="form-group">
      <div id="colorPickContainer">
        <p id="colorPickTitle" class="formTitles">Color</p>
        <input type="text" class="colorPickers" id="colorPick" op="fillText"/>
      </div>
      <div id="strokeColorPickContainer">
        <p id="strokeColorPickTitle" class="formTitles">Color del borde</p>
        <input type="text" class="" id="strokeColorPick" op="fillStroke"/>
      </div> 
      <div id="moveTextContainer">
        <p id="moveTextTitle" class="formTitles">Mover</p>
        <i class="fa-solid fa-arrow-up" onclick="update_svg('ypos', -10)"></i>
        <i class="fa-solid fa-arrow-down" onclick="update_svg('ypos', 10)"></i>
        <i class="fa-solid fa-arrow-left" onclick="update_svg('xpos', -10)"></i>
        <i class="fa-solid fa-arrow-right" onclick="update_svg('xpos', 10)"></i>
      </div>
    </div>` +
    "</div>";
  $(".text-editor").empty();
  $(".text-editor").append(textEditContainer).html();
  loadColorPickers(textColor);
  loadTextStrokeColorPickers(textStrokeColor);
}

function closeTextEditor() {
  $(".text-editor").hide();
  $(".texts").show();
  selectedText = null;
  load_texts();
}

function addNewText() {
  selectedText = `nuevaLeyenda`;
  $(".text-editor").show();
  $(".texts").hide();
  var editor = createTextEditor(selectedText);
  $(".text-editor").empty();
  $(".text-editor").append(editor).html();
  loadNuevaLeyendaColorPickers("rgb(0,0,0)");
  loadNuevaLeyendaStrokeColorPickers("rgb(255,255,255)");
}

function createTextEditor(textName) {
  var textEditorContainer = document.createElement("div");
  $(textEditorContainer).html(textName);
  $(textEditorContainer).attr("font-family", "Advent Pro");
  $(textEditorContainer).css("font-family", "Advent Pro");
  $(textEditorContainer).css("font-size", "20px");
  $(textEditorContainer).css("fill", "#000");
  $(textEditorContainer).css("stroke", "#fff");
  // var xPos = parseInt($(id).attr("x"));
  // var yPos = parseInt($(id).attr("y"));
  var editor = `<div class="text-editor-container">
        <i class="fa-solid fa-circle-xmark cursorPointer closeTextX" onclick="closeTextEditor()"})"></i>
        <div class="form-check form-check-inline">
            <input name="zonaPrenda" type="radio" class="form-check-input" id="frente" value="frente" checked>
            <label class="form-check-label" for="frente">Frente</label>
            <input name="zonaPrenda" type="radio" class="form-check-input" id="dorso" value="dorso">
            <label class="form-check-label" for="dorso">Dorso</label>
            <input name="zonaPrenda" type="radio" class="form-check-input" id="mangaizq" value="izquierda">
            <label class="form-check-label" for="mangaizq">Manga Izq</label>
            <input name="zonaPrenda" type="radio" class="form-check-input" id="mangader" value="derecha">
            <label class="form-check-label" for="mangader">Manga Der</label>
          </div>
        <h1>Nueva Leyenda</h1>`;
  editor +=
    '<div class="form-group"><input id="newftext" onchange="" type="text" class="form-control" value="' +
    "Nueva Leyenda" +
    '"/></div>';
  var fontFamilies =
    '<select id="newff" onchange="" class="form-control"><option value="">choose font</option>';
  fonts.forEach(function (font) {
    var selected = "Advent Pro" == font ? "selected" : "";
    fontFamilies +=
      "<option " + selected + ' value="' + font + '">' + font + "</option>";
  });
  fontFamilies += "</select>";
  editor +=
    '<div class="form-group"><label for="ff-list">Font-Family</label>' +
    fontFamilies +
    "</div>";
  editor +=
    '<div class="form-group"><label for="newfs">Font-Size</label><input id="newfs" type="text" onchange="" class="form-control" value="' +
    "20px" +
    '"/></div>' +
    `<div id="colorAndMoveTextContainer" class="form-group">
      <div id="colorPickContainer">
        <p id="colorPickTitle" class="formTitles">Color</p>
        <input type="text" class="" id="nuevaLeyendaColorPick"/>
      </div>
      <div id="strokeColorPickContainer">
        <p id="strokeColorPickTitle" class="formTitles">Color del borde</p>
        <input type="text" class="" id="nuevaLeyendaStrokeColorPick"/>
      </div>
      <!--<div id="moveTextContainer">
        <p id="moveTextTitle" class="formTitles">Mover</p>
        <i class="fa-solid fa-arrow-up" onclick="update_svg('ypos', -10)"></i>
        <i class="fa-solid fa-arrow-down" onclick="update_svg('ypos', 10)"></i>
        <i class="fa-solid fa-arrow-left" onclick="update_svg('xpos', -10)"></i>
        <i class="fa-solid fa-arrow-right" onclick="update_svg('xpos', 10)"></i>
      </div>-->
    </div>` +
    `<div><button onclick="createTextName()">Agregar Leyenda</button></div></div>`;
  return editor;
}

function createTextName(text) {
  //nuevaLeyenda = document.createElementNS("http://www.w3.org/2000/svg", "text");
  nuevaLeyenda = $("<text>");
  var nroDeLeyenda = $("#svgTextContainer text").length;
  nuevoId = "texto_" + nroDeLeyenda;
  $(nuevaLeyenda)[0].id = nuevoId;
  $(nuevaLeyenda)[0].innerHTML = $("#newftext").val();
  $(nuevaLeyenda)[0].setAttribute("font-family", $("#newff").val());
  $(nuevaLeyenda)[0].setAttribute("font-size", $("#newfs").val());
  $(nuevaLeyenda).css(
    "fill",
    $("#nuevaLeyendaColorPick").spectrum("get").toHexString()
  );
  $(nuevaLeyenda).css(
    "stroke",
    $("#nuevaLeyendaStrokeColorPick").spectrum("get").toHexString()
  );
  $(nuevaLeyenda)[0].setAttribute(
    "stroke",
    $("#nuevaLeyendaStrokeColorPick").spectrum("get").toHexString()
  );
  ////////////////////////////////////////////////////// acá
  setTextLocation();
  console.log(nuevaLeyenda);
  $("#svgContainer g").append($(nuevaLeyenda));
  //////////////////////////////////////////////////////////
  update_svg("", "");
  closeTextEditor();
}

function setTextLocation() {
  const location = $("input[name=zonaPrenda]:checked").val();
  $(nuevaLeyenda).data("zona", location);
  setCoordinates(textLocation[location].x, textLocation[location].y);
}

function setCoordinates(x, y) {
  $(nuevaLeyenda).attr("x", x);
  $(nuevaLeyenda).attr("y", y);
}

function changeTeamName(e) {
  update_svg(e.target.id, e.target.value);
}

function setGender(value) {
  gender = value;
  $("#gender").html(value);
  changeProduct();
  render();
}

function setCategory(value) {
  category = value;
  $("#category").html(value);
  changeProduct();
  render();
}
function setProduct(value) {
  product = value;
  $("#product").html(value);
  changeProduct();
  render();
}

function loadColors() {
  var colorContainer = `<i class="fa-solid fa-circle-xmark cursorPointer" onclick="closeColorContainer()"})"></i>
  <h3>Colores</h3><div id="colorPickerContainer">
      <p id="colorPickerTitle" class="formTitles">Color</p>
      <input type="text" class="colorPickers" id="colorPicker" op="color" />
  </div>`;
  $(".color-palete").append(colorContainer).html();
}

function closeColorContainer() {
  $(".color-palete").hide();
  $(".colorZona").not(".active").removeClass("hidden");
}

function setColor(color) {
  update_svg("color", color);
  $(".color-palete").hide();
}

function update_svg(op, value) {
  if (op == "color") {
    $(`#${selectedMaterial}`)[0].setAttribute("fill", value);
  }
  if (op == "ftext") {
    document.getElementById(selectedText).innerHTML = value;
  }
  if (op == "fillText") {
    document.getElementById(selectedText).setAttribute("fill", value);
    document.getElementById(selectedText).style.fill = value;
  }
  if (op == "fillStroke") {
    document.getElementById(selectedText).setAttribute("stroke", value);
    document.getElementById(selectedText).style.stroke = value;
  }
  if (op == "ff") {
    document.getElementById(selectedText).setAttribute("font-family", value);
    document.getElementById(selectedText).style.fontFamily = value;
  }
  if (op == "fs") {
    document.getElementById(selectedText).style.fontSize = value;
  }
  if (op == "xpos") {
    document.getElementById(selectedText).attributes.x.value =
      parseInt(document.getElementById(selectedText).attributes.x.value) +
      value;
  }
  if (op == "ypos") {
    document.getElementById(selectedText).attributes.y.value =
      parseInt(document.getElementById(selectedText).attributes.y.value) +
      value;
  }
  if (op == "fillNuevaLeyenda") {
    document.getElementById(nuevoId).style.fill = value;
  }

  set_materials(function (resp) {
    object.children[0].material = textureMaterial;
    render();
  });
}

function createCircleTexture(color, size, response) {
  var matCanvas = document.createElement("canvas");
  matCanvas.width = matCanvas.height = size;
  var matContext = matCanvas.getContext("2d");
  // create texture object from canvas.
  var texture = new THREE.Texture(matCanvas);
  // Draw a circle
  var center = size / 2;
  matContext.beginPath();
  matContext.arc(center, center, size / 2, 0, 2 * Math.PI, false);
  matContext.closePath();
  matContext.fillStyle = color;
  matContext.fill();
  // need to set needsUpdate
  texture.needsUpdate = true;
  // return a texture made from the canvas
  response(texture);
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
        load_texts();
      }
    }
  });
}
