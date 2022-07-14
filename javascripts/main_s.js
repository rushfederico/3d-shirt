if (!Detector.webgl) Detector.addGetWebGLMessage();
$(document).ready(function () {
  $(".colorPickers").spectrum({
    color: "#f00",
    change: function (color) {
      update_svg($(this).attr("op"), color.toHexString());
    },
  });
});
init();
loadColors();

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
  load_texts();

  $(".materials").empty();
  $(".materials").append(materialContainer).html();
}

function load_texts() {
  var texts = $("#svgContainer text");
  var textContainer = "";
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
  console.log("cheeeeeeeeeeeeeeeeeeeeeeee");

  selectedText = idd;
  load_texts();

  $(".text-editor").show();
  $(".texts").hide();

  var id = document.getElementById(idd);
  var text = $(id).html();
  var ff = $(id).attr("font-family");
  var sff = $(id).css("font-family");
  var fs = $(id).css("font-size");
  var xPos = parseInt($(id).attr("x"));
  var yPos = parseInt($(id).attr("y"));
  var textEditContainer =
    '<div class="text-editor-container"><i class="fa-solid fa-circle-xmark cursorPointer closeTextX" onclick="closeTextEditor()"})"></i><h1>' +
    idd +
    "</h1>";
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
        <input type="text" class="colorPickers" id="strokeColorPick" op="fillStroke"/>
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
  // $("#colorPick").spectrum({
  //   color: $(id).css("fill"),
  //   showInput: true,
  //   className: "full-spectrum",
  //   showInitial: true,
  //   showPalette: true,
  //   showSelectionPalette: true,
  //   maxPaletteSize: 10,
  //   preferredFormat: "rgb",
  //   localStorageKey: "spectrum.demo",

  // });
}

function closeTextEditor() {
  $(".text-editor").hide();
  $(".texts").show();
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
  console.log(color);
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
    // console.log(value);
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
    console.log(
      "X: " + document.getElementById(selectedText).attributes.x.value
    );
  }
  if (op == "ypos") {
    document.getElementById(selectedText).attributes.y.value =
      parseInt(document.getElementById(selectedText).attributes.y.value) +
      value;
    console.log(
      "Y: " + document.getElementById(selectedText).attributes.y.value
    );
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
