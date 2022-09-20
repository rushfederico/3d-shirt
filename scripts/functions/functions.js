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
  configTextEditor();
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);

  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.soft = true;
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
  raycaster.setFromCamera(pointer, camera);
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
  console.log("model: " + model);
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

function set_materials(response) {
  var baseSvgData = new XMLSerializer().serializeToString(
    $("#svgContainer svg")[0]
  );
  console.log("baseSvgData: " + baseSvgData);
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

      var svgLogo = document
        .getElementById("svgLogoContainer")
        .querySelector("svg");
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
          // textureMaterial.transparent = true;
          // textureMaterial.opacity = 0.5;
          // textureMaterial.needsUpdate = true;
          // textureMaterial.position = 0;
          load_materials();
          response(true);
        };
      };
    };
  };
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
