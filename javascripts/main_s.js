if (!Detector.webgl) Detector.addGetWebGLMessage();

init();
loadColors();

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

function getCanvas() {
  return $(document).ready(function () {
    return $("canvas")[0];
  });
}

function getCanvasContext() {
  return $(document).ready(function () {
    return $("canvas")[0].getContext("2d");
  });
}

function createCanvasEventListener() {
  return $(document).ready(function () {
    const canvas = $("canvas")[0];
    window.onkeydown = (e) => {
      if (e.keyCode != 17) return; // Ctrl
      console.log("Ctrl pressed");
      disableControls();
      canvas.onmousedown = (e) => (draggingOn = true);
      canvas.onmousemove = (e) => dragText(e);
      canvas.onmouseup = (e) => (draggingOn = false);
    };
    window.onkeyup = (e) => {
      if (e.keyCode != 17) return; // Ctrl
      console.log("Ctrl released");
      canvas.onmousedown = null;
      canvas.onmousemove = null;
      canvas.onmouseup = null;
      enableControls();
    };
  });
}

function dragText(e) {
  if (!draggingOn) return;
  console.log(e.clientX, e.clientY);
  let textContainer = $("#svgTextContainer")[0];
  // update_svg

  console.log(textContainer);
}

function init() {
  // no esta usando model_container en ningun lado
  // var modelContainer = document.getElementById("model-container");
  scene = new THREE.Scene();
  getContainer();
  getCamera();
  getControls();

  object = new THREE.Object3D();
  getLights();
  scene.add(camera);
  scene.add(new THREE.AmbientLight(0x666666));
  scene.add(light);

  textureLoader = new THREE.TextureLoader();
  changeProduct();
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);

  container.appendChild(renderer.domElement);
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.soft = true;

  window.addEventListener("resize", onWindowResize, false);
  createCanvasEventListener();

  animate();
}

function onWindowResize() {
  width = window.innerWidth;
  height = window.innerHeight;
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
    var scale = height / 3;
    object.scale.set(scale, scale, scale);
    object.position.set(0, -scale * 1.335, 0);
    object.rotation.set(0, Math.PI / 2, 0);
    object.receiveShadow = true;
    object.castShadow = true;
    scene.add(object);
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
  $.get(
    "assets/" + gender + "/cat" + category + "/prod" + product + "/pattern.svg",
    function (data) {
      var svgData = new XMLSerializer().serializeToString(data.documentElement);
      $("#svgContainer").empty();
      $("#svgContainer").append(svgData).html();
      set_materials(function (resp) {
        response(resp);
      });
    }
  );
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
  // canvas.width = $("#container.lab").width();
  // canvas.height = $("#container.lab").height();
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
}

function load_materials() {
  var paths = $("#svgContainer path");
  var materialContainer = "";
  for (var i = 0; i < paths.length; i++) {
    var bg = $(paths[i]).attr("fill");
    var id = $(paths[i]).attr("id");
    if (bg != undefined && id != undefined) {
      var data = id.split("(")[1].split(")")[0];
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
            <input name="zonaPrenda" type="radio" class="form-check-input" id="frente" value="frente">
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
            <input name="zonaPrenda" type="radio" class="form-check-input" id="frente" value="frente">
            <label class="form-check-label" for="frente">Frente</label>
            <input name="zonaPrenda" type="radio" class="form-check-input" id="dorso" value="dorso">
            <label class="form-check-label" for="dorso">Dorso</label>
            <input name="zonaPrenda" type="radio" class="form-check-input" id="mangaizq" value="mangaizq">
            <label class="form-check-label" for="mangaizq">Manga Izq</label>
            <input name="zonaPrenda" type="radio" class="form-check-input" id="mangader" value="mangader">
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
  nuevaLeyenda = $("#svgTextContainer text").last().clone();
  var nroDeLeyenda = $("#svgTextContainer text").length;
  nuevoId = "texto_" + nroDeLeyenda;
  nuevaLeyenda[0].id = nuevoId;
  nuevaLeyenda[0].innerHTML = $("#newftext").val();
  nuevaLeyenda[0].setAttribute("font-family", $("#newff").val());
  nuevaLeyenda[0].setAttribute("font-size", $("#newfs").val());
  nuevaLeyenda.css(
    "fill",
    $("#nuevaLeyendaColorPick").spectrum("get").toHexString()
  );
  nuevaLeyenda.css(
    "stroke",
    $("#nuevaLeyendaStrokeColorPick").spectrum("get").toHexString()
  );
  nuevaLeyenda[0].setAttribute(
    "stroke",
    $("#nuevaLeyendaStrokeColorPick").spectrum("get").toHexString()
  );

  nuevaLeyenda.attr(
    "x",
    parseInt($("#svgTextContainer text").first().attr("x"))
  );
  nuevaLeyenda.attr(
    "y",
    parseInt($("#svgTextContainer text").first().attr("y")) - 70
  );
  nuevaLeyenda.insertAfter($("#svgContainer text").last());

  update_svg("", "");
  closeTextEditor();
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
    document.getElementById(selectedMaterial).setAttribute("fill", value);
  }
  if (op == "ftext") {
    document.getElementById(selectedText).innerHTML = value;
  }
  if (op == "fillText") {
    console.log(value);
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
