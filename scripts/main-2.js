//EJECUTAR ACA TODAS LAS FUNCIONES DE INICIALIZACION NECESARIAS

var isMobile = ![];
var geometries = [], 
svgGroup = [],
container, stats, controls, camera, scene, renderer, light, material, materialCount, selectedMaterial = 'ZONE_x28_base_x29_',
manager = new THREE['LoadingManager'](),
    mixers = [],
    object, operand1, operand2, operator1, operator2, solution, question, answer, textureLoader, map, textureMaterial, mesh, materials = [],
    geometries = [],
    alignTolerance = 0x1,
    pixelRatio = window['devicePixelRatio'],
    width = window['innerWidth'],
    height = window['innerHeight'];

  var canvas = new fabric.Canvas('fabricCanvas',{
      'preserveObjectStacking': true,
      'selection': false
  });
  
  var texture = new THREE.Texture(document.getElementById('fabricCanvas')),   
  canvasTexture = new THREE['CanvasTexture'](document['getElementById']('fabricCanvas')),   
  raycaster = new THREE['Raycaster'](),   
  mouse = new THREE['Vector2'](),   
  onClickPosition = new THREE['Vector2'](), 
  raycastContainer,   
  zoom = 1;

$(document).ready(function () {
  // WebGL compatibility check
  if (!Detector.webgl) Detector.addGetWebGLMessage();

  init();
});

function init(){
  raycastContainer = document['getElementById']('renderer'),
    container = document['createElement']('div'),
    document['getElementById']('container')['appendChild'](container),
    scene = new THREE['Scene']();
    var _0xa5f16b = width / height;
    camera = new THREE['PerspectiveCamera'](30, _0xa5f16b, 100, 1200),
    camera['position']['set'](500, 0, 0);
    window['innerWidth'] < 768 && (camera['fov'] = 10,
								   camera['updateProjectionMatrix']());
    scene['add'](camera),
    controls = new THREE['OrbitControls'](camera,container),
    controls['minDistance'] = 200,
    controls['minZoom'] = 200,
    controls['maxDistance'] = 700,
    controls['maxZoom'] = 700,
    controls['update']();
    var directionalLight, _0x46a9d6;
    scene['add'](new THREE['AmbientLight'](7829367));
    var _13e119 = [{
        'color': 16777215,
        'intensity': 0.35,
        'position': {
            'x': -500,
            'y': 320,
            'z': 500
        },
        'lookAt': {
            'x': 0,
            'y': 0,
            'z': 0
        }
    }, {
        'color': 16777215,
        'intensity': 0.15,
        'position': {
            'x': 200,
            'y': 50,
            'z': 500
        },
        'lookAt': {
            'x': 0,
            'y': 0,
            'z': 0
        }
    }, {
        'color': 16777215,
        'intensity': 0.25,
        'position': {
            'x': 0,
            'y': 100,
            'z': -500
        },
        'lookAt': {
            'x': 0,
            'y': 0,
            'z': 0
        }
    }, {
        'color': 16777215,
        'intensity': 0.15,
        'position': {
            'x': 1,
            'y': 0,
            'z': 0
        },
        'lookAt': {
            'x': 0,
            'y': 0,
            'z': 0
        }
    }, {
        'color': 16777215,
        'intensity': 0.15,
        'position': {
            'x': -1,
            'y': 0,
            'z': 0
        },
        'lookAt': {
            'x': 0,
            'y': 0,
            'z': 0
        }
    }];
    _13e119['forEach'](function(element) {
          var directionLight = new THREE['DirectionalLight'](element['color'],element['intensity'])
          , position = element['position']
          , lookAt = element['lookAt'];
        directionLight['position']['set'](position['x'], position['y'], position['z']),
        directionLight['lookAt'](lookAt['x'], lookAt['y'], lookAt['z']);
        if (element['angle']) {}
        scene['add'](directionLight);
    }),
    object = new THREE['Object3D'](),
    directionalLight = new THREE['DirectionalLight'](16777215,0.2),
    directionalLight['position']['set'](500, 100, 80),
    directionalLight['castShadow'] = true,
    directionalLight['shadow']['mapSize']['width'] = 1024,
    directionalLight['shadow']['mapSize']['height'] = 1024;
    //var 300 = 300;
    directionalLight['shadow']['camera']['left'] = -300,
    directionalLight['shadow']['camera']['right'] = 300,
    directionalLight['shadow']['camera']['top'] = 300,
    directionalLight['shadow']['camera']['bottom'] = -300,
    directionalLight['shadow']['camera']['far'] = 100,
    directionalLight['shadowDarkness'] = 0.5,
    directionalLight['shadowCameraVisible'] = true,
    scene['add'](directionalLight),
    textureLoader = new THREE['TextureLoader'](),
    renderer = new THREE['WebGLRenderer']({
        //'canvas': document['getElementById']('renderer'),
        'antialias': true,
        'alpha': true,
        'preserveDrawingBuffer': true
    }),
    renderer['setPixelRatio'](pixelRatio), //1
    renderer['setSize'](width, height),
    renderer['setClearColor'](0, 0),
    container['appendChild'](renderer['domElement']),
    renderer['gammaInput'] = true,
    renderer['gammaOutput'] = true,
    renderer['shadowMap']['enabled'] = true,
    renderer['shadowMap']['soft'] = true,
    loadObj(),
    window['addEventListener']('resize', onWindowResize, false);
    //loadStyles(),
    animate();
}

function loadObj() {
	
	const _0xf67b64 = new THREE['TextureLoader']();
    canvasTexture['anisotropy'] = renderer['capabilities']['getMaxAnisotropy'](); 
	
	const _0x136aaf = _0xf67b64['load']("assets/" + gender + "/cat" + category + "/texture.png");//imagnen de los agujeros de la remera
	
    textureMaterial = new THREE['MeshPhongMaterial'](
		{ 'map': canvasTexture, 'combine': 1 }), 
		
	texture['needsUpdate'] = true; 
	var _0x24d10d = new THREE['OBJLoader2'](manager);
	
    _0x24d10d['load']("assets/" + gender + "/cat" + category + "/model" + ".obj", function(obj) { 
			
		
			object != null && scene['remove'](object);
			object = null, 
			object = obj['detail']['loaderRootNode'], 
			materials = [], 
			object['traverse'](function(_0x1a5e4c) { 
				_0x1a5e4c['isMesh'] && (_0x1a5e4c['material']['map'] = textureMaterial); 
			}),

			object['children'][0]['material'] = textureMaterial, 
			render(); 

      object.scale.set(9, 9, 9);
      object.position.set(0, -75, 0);
      object.rotation.set(0, Math.PI / 2, 0);
      object.receiveShadow = true;
      object.castShadow = true;

			/*
      var scale = height / 5;
			object['scale']['set'](scale, scale, scale), 
			object['position']['set'](0, -scale * 0.2, 0), 
			window['innerWidth'] < 768 && object['position']['set'](0, -scale * 0.3, 0),
			object['rotation']['set'](0, Math['PI'] / 2, 2), 
			object['receiveShadow'] = true, 
			object['castShadow'] = true, 
      */
			canvas['on']('after:render', function() { 
				
				object['children'][0]['material']['map']['needsUpdate'] = true; 
			}),

			scene['add'](object); 
		}, 
			
		function(_0x1155e4) {}); 
}
function render() {
  renderer['render'](scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  controls['update']();
  render();
  initPatch();
}

function initPatch() {
  fabric['Object']['prototype']['transparentCorners'] = ![],
  fabric['Object']['prototype']['cornerColor'] = 'blue',
  fabric['Object']['prototype']['cornerStyle'] = 'square',
  isMobile == !![] ? fabric['Object']['prototype']['cornerSize'] = 15 : fabric['Object']['prototype']['cornerSize'] = 12,
  fabric['Canvas']['prototype']['getPointer'] = function(_0x331827, _0x1b7a7a) {
      var _0x3d0ec5 = _0x8112ba;
      if (this[_0x3d0ec5(0x1e6)] && !_0x1b7a7a)
          return this[_0x3d0ec5(0x1e6)];
      if (this['_pointer'] && _0x1b7a7a)
          return this[_0x3d0ec5(0x2cf)];
      var _0x561c33;
      if (_0x331827[_0x3d0ec5(0x1c9)] != undefined) {
          _0x561c33 = new MouseEvent({
              'touchstart': _0x3d0ec5(0x211),
              'touchmove': 'mousemove',
              'touchend': 'mouseup'
          }[_0x331827[_0x3d0ec5(0x1e2)]],{
              'bubbles': !![],
              'cancelable': !![],
              'view': window,
              'detail': 0x1,
              'screenX': Math[_0x3d0ec5(0x231)](_0x331827['changedTouches'][0x0]['screenX']),
              'screenY': Math[_0x3d0ec5(0x231)](_0x331827[_0x3d0ec5(0x222)][0x0]['screenY']),
              'clientX': Math['round'](_0x331827[_0x3d0ec5(0x222)][0x0][_0x3d0ec5(0x1ea)]),
              'clientY': Math[_0x3d0ec5(0x231)](_0x331827[_0x3d0ec5(0x222)][0x0][_0x3d0ec5(0x277)]),
              'ctrlKey': ![],
              'altKey': ![],
              'shiftKey': ![],
              'metaKey': ![],
              'button': 0x0,
              'relatedTarget': null
          });
          var _0x3e51d0 = fabric[_0x3d0ec5(0x2f5)][_0x3d0ec5(0x26e)](_0x561c33), _0x139359 = this[_0x3d0ec5(0x268)], _0x316279 = _0x139359[_0x3d0ec5(0x216)](), _0x4d4c4d = _0x316279[_0x3d0ec5(0x254)] || 0x0, _0x277615 = _0x316279[_0x3d0ec5(0x1d2)] || 0x0, _0x53cede;
      } else
          var _0x3e51d0 = fabric[_0x3d0ec5(0x2f5)][_0x3d0ec5(0x26e)](_0x331827), _0x139359 = this[_0x3d0ec5(0x268)], _0x316279 = _0x139359[_0x3d0ec5(0x216)](), _0x4d4c4d = _0x316279[_0x3d0ec5(0x254)] || 0x0, _0x277615 = _0x316279[_0x3d0ec5(0x1d2)] || 0x0, _0x53cede;
      (!_0x4d4c4d || !_0x277615) && (_0x3d0ec5(0x25f)in _0x316279 && 'bottom'in _0x316279 && (_0x277615 = Math[_0x3d0ec5(0x1d4)](_0x316279[_0x3d0ec5(0x25f)] - _0x316279[_0x3d0ec5(0x304)])),
      'right'in _0x316279 && _0x3d0ec5(0x2cd)in _0x316279 && (_0x4d4c4d = Math[_0x3d0ec5(0x1d4)](_0x316279[_0x3d0ec5(0x1f4)] - _0x316279[_0x3d0ec5(0x2cd)])));
      this[_0x3d0ec5(0x2fb)](),
      _0x3e51d0['x'] = Math[_0x3d0ec5(0x231)](_0x3e51d0['x']) - this[_0x3d0ec5(0x287)]['left'],
      _0x3e51d0['y'] = Math[_0x3d0ec5(0x231)](_0x3e51d0['y']) - this[_0x3d0ec5(0x287)][_0x3d0ec5(0x25f)];
      if (_0x331827['target'] !== this[_0x3d0ec5(0x268)]) {
          var _0x36d73c;
          isMobile == !![] ? (_0x36d73c = getPositionOnScene(raycastContainer, _0x561c33),
          _0x36d73c && (_0x3e51d0['x'] = _0x36d73c['x'],
          _0x3e51d0['y'] = _0x36d73c['y'])) : (_0x36d73c = getPositionOnScene(raycastContainer, _0x331827),
          _0x36d73c && (_0x3e51d0['x'] = _0x36d73c['x'],
          _0x3e51d0['y'] = _0x36d73c['y']));
      }
      return !_0x1b7a7a && (_0x3e51d0 = this[_0x3d0ec5(0x20e)](_0x3e51d0)),
      _0x4d4c4d === 0x0 || _0x277615 === 0x0 ? _0x53cede = {
          'width': 0x1,
          'height': 0x1
      } : _0x53cede = {
          'width': _0x139359[_0x3d0ec5(0x254)] / _0x4d4c4d,
          'height': _0x139359['height'] / _0x277615
      },
      {
          'x': _0x3e51d0['x'] * _0x53cede[_0x3d0ec5(0x254)],
          'y': _0x3e51d0['y'] * _0x53cede[_0x3d0ec5(0x1d2)]
      };
  }
  ;
}

function onWindowResize() {
  var _0x1339bc = _0x358b34;
  width = window[_0x1339bc(0x2f7)],
  height = window[_0x1339bc(0x1e0)],
  width < height && (height = width),
  camera[_0x1339bc(0x207)] = width / height,
  camera[_0x1339bc(0x2d5)](),
  renderer[_0x1339bc(0x253)](width, height);
}