var _0x6cfc04 = _0x3ff7;
(function (_0x42be0c, _0x4514ab) {
  var _0x6a46c = _0x3ff7,
    _0x17df14 = _0x42be0c();
  while (!![]) {
    try {
      var _0x4e8162 =
        (parseInt(_0x6a46c(0x1b0)) / 0x1) * (parseInt(_0x6a46c(0x1b4)) / 0x2) +
        (parseInt(_0x6a46c(0x1ab)) / 0x3) * (-parseInt(_0x6a46c(0x1d1)) / 0x4) +
        (-parseInt(_0x6a46c(0x18a)) / 0x5) *
          (-parseInt(_0x6a46c(0x18b)) / 0x6) +
        (-parseInt(_0x6a46c(0x1b1)) / 0x7) *
          (-parseInt(_0x6a46c(0x1c0)) / 0x8) +
        (-parseInt(_0x6a46c(0x18e)) / 0x9) *
          (-parseInt(_0x6a46c(0x183)) / 0xa) +
        parseInt(_0x6a46c(0x188)) / 0xb +
        -parseInt(_0x6a46c(0x1c1)) / 0xc;
      if (_0x4e8162 === _0x4514ab) break;
      else _0x17df14["push"](_0x17df14["shift"]());
    } catch (_0x5e4f00) {
      _0x17df14["push"](_0x17df14["shift"]());
    }
  }
})(_0x202f, 0xe3c72);
var canvas = new fabric[_0x6cfc04(0x1c9)](_0x6cfc04(0x1b9));
(canvas[_0x6cfc04(0x18d)] = "yellow"),
  canvas["on"](_0x6cfc04(0x1c6), function () {
    var _0x5e1ccb = _0x6cfc04;
    mesh[_0x5e1ccb(0x1d9)]["map"][_0x5e1ccb(0x1a2)] = !![];
  });
var text = new fabric[_0x6cfc04(0x180)](_0x6cfc04(0x19e), {
  fontSize: 0x28,
  textAlign: _0x6cfc04(0x1ae),
  fontWeight: "bold",
  left: 0x80,
  top: 0x80,
  angle: 0x1e,
  originX: _0x6cfc04(0x1ae),
  originY: _0x6cfc04(0x1ae),
  shadow: _0x6cfc04(0x17d),
});
canvas["add"](text);
var imgElement = document["getElementById"](_0x6cfc04(0x1ca)),
  imageinstance = new fabric[_0x6cfc04(0x1a1)](imgElement, {
    angle: 0x0,
    left: 0x12c,
    opacity: 0x1,
    cornerSize: 0x1e,
  });
canvas[_0x6cfc04(0x1d3)](imageinstance);
var containerHeight = _0x6cfc04(0x19b),
  containerWidth = "512",
  camera,
  renderer,
  container,
  scene,
  texture,
  material,
  geometry;
(scene = new THREE[_0x6cfc04(0x1cc)]()),
  (camera = new THREE[_0x6cfc04(0x1b6)](
    0x3c,
    window[_0x6cfc04(0x1c8)] / window[_0x6cfc04(0x1cb)],
    0x1,
    0x3e8
  )),
  camera[_0x6cfc04(0x1d8)][_0x6cfc04(0x1a8)](0x0, 0x0, 0xa);
var raycaster = new THREE[_0x6cfc04(0x19f)](),
  mouse = new THREE["Vector2"](),
  onClickPosition = new THREE["Vector2"](),
  isMobile = ![];
(container = document["getElementById"](_0x6cfc04(0x1a4))),
  (renderer = new THREE[_0x6cfc04(0x186)]({ antialias: !![] })),
  renderer["setPixelRatio"](window[_0x6cfc04(0x1b7)]),
  renderer[_0x6cfc04(0x17e)](window["innerWidth"], window[_0x6cfc04(0x1cb)]),
  camera[_0x6cfc04(0x1a9)](),
  container[_0x6cfc04(0x1cd)](renderer[_0x6cfc04(0x192)]);
var light = new THREE[_0x6cfc04(0x199)](0xffffff, 0.5);
light[_0x6cfc04(0x1d8)][_0x6cfc04(0x17c)](0xa),
  scene[_0x6cfc04(0x1d3)](light),
  scene[_0x6cfc04(0x1d3)](new THREE["AmbientLight"](0xffffff, 0x1));
var canvasTexture = new THREE[_0x6cfc04(0x17a)](cnvs),
  geometry = new THREE[_0x6cfc04(0x1d4)](0xa, 0xa, 0x14, 0x14);
geometry[_0x6cfc04(0x1c4)][_0x6cfc04(0x181)]((_0x56b6e2) => {
  var _0x325bce = _0x6cfc04;
  _0x56b6e2["z"] =
    Math[_0x325bce(0x1af)](_0x56b6e2["x"]) *
    Math[_0x325bce(0x190)](-_0x56b6e2["y"] * 0.5) *
    0.5;
}),
  geometry[_0x6cfc04(0x1c2)](),
  geometry[_0x6cfc04(0x184)]();
var mesh = new THREE["Mesh"](
  geometry,
  new THREE[_0x6cfc04(0x1bc)]({
    map: canvasTexture,
    metalness: 0.25,
    roughness: 0.25,
  })
);
scene[_0x6cfc04(0x1d3)](mesh);
function animateRandom() {
  var _0x47d4d6 = _0x6cfc04,
    _0x2e2d12 = THREE["Math"][_0x47d4d6(0x196)](0x32, 0xce),
    _0x175657 = THREE[_0x47d4d6(0x1b5)][_0x47d4d6(0x196)](0x32, 0xce);
}
function _0x202f() {
  var _0x211604 = [
    "restorePointerVpt",
    "MeshStandardMaterial",
    "getBoundingClientRect",
    "mouseup",
    "map",
    "728XtKJQO",
    "55667544eRwDUg",
    "computeFaceNormals",
    "Clock",
    "vertices",
    "children",
    "after:render",
    "touches",
    "innerWidth",
    "Canvas",
    "wiki",
    "innerHeight",
    "Scene",
    "appendChild",
    "preventDefault",
    "round",
    "white",
    "752otirZJ",
    "changedTouches",
    "add",
    "PlaneGeometry",
    "mousemove",
    "right",
    "bottom",
    "position",
    "material",
    "screenX",
    "target",
    "CanvasTexture",
    "object",
    "setScalar",
    "blue\x20-5px\x206px\x205px",
    "setSize",
    "intersectObjects",
    "IText",
    "forEach",
    "getPointer",
    "740tSSFwb",
    "computeVertexNormals",
    "width",
    "WebGLRenderer",
    "type",
    "7633131qFYjYn",
    "log",
    "5dGeJfo",
    "8021346bHIZoa",
    "fromArray",
    "backgroundColor",
    "180018asXeVZ",
    "getDelta",
    "sin",
    "_offset",
    "domElement",
    "substr",
    "util",
    "_absolutePointer",
    "randInt",
    "left",
    "length",
    "DirectionalLight",
    "test",
    "512",
    "top",
    "render",
    "Three.js\x0a",
    "Raycaster",
    "upperCanvasEl",
    "Image",
    "needsUpdate",
    "transformUv",
    "renderer",
    "abs",
    "clientX",
    "setFromCamera",
    "set",
    "updateProjectionMatrix",
    "clientY",
    "8208WmeyFb",
    "mousedown",
    "_pointer",
    "center",
    "cos",
    "6nEAILW",
    "112168KKaKTV",
    "height",
    "dispatchEvent",
    "372388zJVoUr",
    "Math",
    "PerspectiveCamera",
    "devicePixelRatio",
    "addEventListener",
    "cnvs",
    "calcOffset",
  ];
  _0x202f = function () {
    return _0x211604;
  };
  return _0x202f();
}
animateRandom(), setInterval(animateRandom, 0x3e8);
var clock = new THREE[_0x6cfc04(0x1c3)](),
  time = 0x0;
function _0x3ff7(_0x3b0d3d, _0x46d401) {
  var _0x202f80 = _0x202f();
  return (
    (_0x3ff7 = function (_0x3ff7bf, _0x4b14d5) {
      _0x3ff7bf = _0x3ff7bf - 0x179;
      var _0x365f0d = _0x202f80[_0x3ff7bf];
      return _0x365f0d;
    }),
    _0x3ff7(_0x3b0d3d, _0x46d401)
  );
}
function render() {
  var _0x59195f = _0x6cfc04;
  requestAnimationFrame(render),
    (time += clock[_0x59195f(0x18f)]()),
    renderer[_0x59195f(0x19d)](scene, camera);
}
render(),
  (fabric[_0x6cfc04(0x1c9)]["prototype"][_0x6cfc04(0x182)] = function (
    _0x2fd889,
    _0x112d2f
  ) {
    var _0x478148 = _0x6cfc04;
    if (this[_0x478148(0x195)] && !_0x112d2f) return this[_0x478148(0x195)];
    if (this[_0x478148(0x1ad)] && _0x112d2f) return this[_0x478148(0x1ad)];
    var _0x49c1c2;
    if (_0x2fd889[_0x478148(0x1c7)] != undefined) {
      _0x49c1c2 = new MouseEvent(
        {
          touchstart: _0x478148(0x1ac),
          touchmove: _0x478148(0x1d5),
          touchend: _0x478148(0x1be),
        }[_0x2fd889[_0x478148(0x187)]],
        {
          bubbles: !![],
          cancelable: !![],
          view: window,
          detail: 0x1,
          screenX: Math["round"](
            _0x2fd889[_0x478148(0x1d2)][0x0][_0x478148(0x1da)]
          ),
          screenY: Math[_0x478148(0x1cf)](
            _0x2fd889[_0x478148(0x1d2)][0x0]["screenY"]
          ),
          clientX: Math[_0x478148(0x1cf)](
            _0x2fd889[_0x478148(0x1d2)][0x0][_0x478148(0x1a6)]
          ),
          clientY: Math[_0x478148(0x1cf)](
            _0x2fd889[_0x478148(0x1d2)][0x0][_0x478148(0x1aa)]
          ),
          ctrlKey: ![],
          altKey: ![],
          shiftKey: ![],
          metaKey: ![],
          button: 0x0,
          relatedTarget: null,
        }
      );
      var _0x305925 = fabric[_0x478148(0x194)]["getPointer"](_0x49c1c2),
        _0x1d2264 = this["upperCanvasEl"],
        _0x50f9ea = _0x1d2264[_0x478148(0x1bd)](),
        _0x481a5f = _0x50f9ea[_0x478148(0x185)] || 0x0,
        _0x2f2f25 = _0x50f9ea[_0x478148(0x1b2)] || 0x0,
        _0x2dd35c;
    } else
      var _0x305925 = fabric[_0x478148(0x194)]["getPointer"](_0x2fd889),
        _0x1d2264 = this[_0x478148(0x1a0)],
        _0x50f9ea = _0x1d2264["getBoundingClientRect"](),
        _0x481a5f = _0x50f9ea[_0x478148(0x185)] || 0x0,
        _0x2f2f25 = _0x50f9ea["height"] || 0x0,
        _0x2dd35c;
    (!_0x481a5f || !_0x2f2f25) &&
      ("top" in _0x50f9ea &&
        _0x478148(0x1d7) in _0x50f9ea &&
        (_0x2f2f25 = Math[_0x478148(0x1a5)](
          _0x50f9ea[_0x478148(0x19c)] - _0x50f9ea["bottom"]
        )),
      _0x478148(0x1d6) in _0x50f9ea &&
        _0x478148(0x197) in _0x50f9ea &&
        (_0x481a5f = Math[_0x478148(0x1a5)](
          _0x50f9ea[_0x478148(0x1d6)] - _0x50f9ea[_0x478148(0x197)]
        )));
    this[_0x478148(0x1ba)](),
      (_0x305925["x"] =
        _0x305925["x"] - this[_0x478148(0x191)][_0x478148(0x197)]),
      (_0x305925["y"] =
        _0x305925["y"] - this[_0x478148(0x191)][_0x478148(0x19c)]);
    if (_0x2fd889[_0x478148(0x179)] !== this["upperCanvasEl"]) {
      var _0x48231a;
      isMobile == !![]
        ? ((_0x48231a = getPositionOnSceneTouch(container, _0x2fd889)),
          _0x48231a &&
            (console[_0x478148(0x189)](_0x48231a),
            (_0x305925["x"] = _0x48231a["x"]),
            (_0x305925["y"] = _0x48231a["y"])))
        : ((_0x48231a = getPositionOnScene(container, _0x2fd889)),
          _0x48231a &&
            (console[_0x478148(0x189)](_0x48231a),
            (_0x305925["x"] = _0x48231a["x"]),
            (_0x305925["y"] = _0x48231a["y"])));
    }
    return (
      !_0x112d2f && (_0x305925 = this[_0x478148(0x1bb)](_0x305925)),
      _0x481a5f === 0x0 || _0x2f2f25 === 0x0
        ? (_0x2dd35c = { width: 0x1, height: 0x1 })
        : (_0x2dd35c = {
            width: _0x1d2264["width"] / _0x481a5f,
            height: _0x1d2264[_0x478148(0x1b2)] / _0x2f2f25,
          }),
      {
        x: _0x305925["x"] * _0x2dd35c[_0x478148(0x185)],
        y: _0x305925["y"] * _0x2dd35c["height"],
      }
    );
  }),
  container["addEventListener"](_0x6cfc04(0x1ac), onMouseEvt, ![]);
(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i[
  _0x6cfc04(0x19a)
](navigator["userAgent"]) ||
  /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[
    _0x6cfc04(0x19a)
  ](navigator["userAgent"][_0x6cfc04(0x193)](0x0, 0x4))) &&
  ((isMobile = !![]), container[_0x6cfc04(0x1b8)]("touchstart", onTouch, ![]));
function onTouch(_0x2c7070) {
  var _0x3bf713 = _0x6cfc04;
  _0x2c7070[_0x3bf713(0x1ce)]();
  const _0x5bff07 = getPositionOnSceneTouch(container, _0x2c7070);
  if (_0x5bff07) {
    const _0x10895f = canvas[_0x3bf713(0x191)],
      _0x53a8fa = new MouseEvent(_0x2c7070[_0x3bf713(0x187)], {
        clientX: _0x10895f[_0x3bf713(0x197)] + _0x5bff07["x"],
        clientY: _0x10895f[_0x3bf713(0x19c)] + _0x5bff07["y"],
      });
    canvas[_0x3bf713(0x1a0)][_0x3bf713(0x1b3)](_0x53a8fa);
  }
}
function getPositionOnSceneTouch(_0x7b52e8, _0xd8dbfe) {
  var _0x56c3c7 = _0x6cfc04,
    _0x503c0b = getMousePosition(
      _0x7b52e8,
      _0xd8dbfe["changedTouches"][0x0][_0x56c3c7(0x1a6)],
      _0xd8dbfe["changedTouches"][0x0][_0x56c3c7(0x1aa)]
    );
  onClickPosition[_0x56c3c7(0x18c)](_0x503c0b),
    console[_0x56c3c7(0x189)](scene);
  var _0x55333c = getIntersects(onClickPosition, scene["children"]);
  if (_0x55333c[_0x56c3c7(0x198)] > 0x0 && _0x55333c[0x0]["uv"]) {
    var _0x4e3f5f = _0x55333c[0x0]["uv"];
    _0x55333c[0x0][_0x56c3c7(0x17b)][_0x56c3c7(0x1d9)][_0x56c3c7(0x1bf)][
      _0x56c3c7(0x1a3)
    ](_0x4e3f5f);
    var _0x25aed7 = new fabric["Circle"]({
      radius: 0x3,
      left: getRealPosition("x", _0x4e3f5f["x"]),
      top: getRealPosition("y", _0x4e3f5f["y"]),
      fill: _0x56c3c7(0x1d0),
    });
    return (
      (getUv = _0x4e3f5f),
      {
        x: getRealPosition("x", _0x4e3f5f["x"]),
        y: getRealPosition("y", _0x4e3f5f["y"]),
      }
    );
  }
  return null;
}
function onMouseEvt(_0x50244e) {
  var _0x26694d = _0x6cfc04;
  _0x50244e[_0x26694d(0x1ce)]();
  const _0x72352f = getPositionOnScene(container, _0x50244e);
  if (_0x72352f) {
    const _0x50eaa8 = canvas[_0x26694d(0x191)],
      _0xeeadcf = new MouseEvent(_0x50244e[_0x26694d(0x187)], {
        clientX: _0x50eaa8["left"] + _0x72352f["x"],
        clientY: _0x50eaa8[_0x26694d(0x19c)] + _0x72352f["y"],
      });
    console[_0x26694d(0x189)](_0xeeadcf),
      canvas[_0x26694d(0x1a0)]["dispatchEvent"](_0xeeadcf);
  }
}
function getPositionOnScene(_0x205558, _0x53ea00) {
  var _0x3cca8e = _0x6cfc04;
  console[_0x3cca8e(0x189)](_0x53ea00), console[_0x3cca8e(0x189)](scene);
  var _0x2dbfc3 = getMousePosition(
    container,
    _0x53ea00[_0x3cca8e(0x1a6)],
    _0x53ea00["clientY"]
  );
  onClickPosition["fromArray"](_0x2dbfc3);
  var _0x3f7783 = getIntersects(onClickPosition, scene[_0x3cca8e(0x1c5)]);
  if (_0x3f7783[_0x3cca8e(0x198)] > 0x0 && _0x3f7783[0x0]["uv"]) {
    var _0xc43813 = _0x3f7783[0x0]["uv"];
    return (
      _0x3f7783[0x0]["object"]["material"][_0x3cca8e(0x1bf)][_0x3cca8e(0x1a3)](
        _0xc43813
      ),
      {
        x: getRealPosition("x", _0xc43813["x"]),
        y: getRealPosition("y", _0xc43813["y"]),
      }
    );
  }
  return null;
}
function getRealPosition(_0x257037, _0x14116f) {
  var _0x1cd84f = _0x6cfc04;
  let _0x557377 = _0x257037 === "x" ? 4.5 : 5.5;
  return Math[_0x1cd84f(0x1cf)](_0x14116f * 0x200) - _0x557377;
}
var getMousePosition = function (_0x3430ce, _0x5aa9f9, _0x516fdc) {
    var _0x2d762d = _0x6cfc04,
      _0x5021f7 = _0x3430ce[_0x2d762d(0x1bd)]();
    return [
      (_0x5aa9f9 - _0x5021f7["left"]) / _0x5021f7[_0x2d762d(0x185)],
      (_0x516fdc - _0x5021f7[_0x2d762d(0x19c)]) / _0x5021f7["height"],
    ];
  },
  getIntersects = function (_0x22e88c, _0x46e71c) {
    var _0xf996fe = _0x6cfc04;
    return (
      mouse[_0xf996fe(0x1a8)](
        _0x22e88c["x"] * 0x2 - 0x1,
        -(_0x22e88c["y"] * 0x2) + 0x1
      ),
      raycaster[_0xf996fe(0x1a7)](mouse, camera),
      raycaster[_0xf996fe(0x17f)](_0x46e71c)
    );
  };
