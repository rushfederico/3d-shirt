const textLocation = {
  frente: {
    x: 740,
    y: 790,
  },
  dorso: {
    x: 1710,
    y: 740,
  },
  izquierda: {
    x: 1310,
    y: 790,
  },
  derecha: {
    x: 190,
    y: 790,
  },
};

var colors = [
  "rgb(255, 255, 255)",
  "rgb(255, 248, 241)",
  "rgb(233, 233, 225)",
  "rgb(223, 224, 222)",
  "rgb(197, 205, 210)",
  "rgb(255, 243, 231)",
  "rgb(255, 236, 213)",
  "rgb(237, 210, 171)",
  "rgb(194, 155, 119)",
  "rgb(169, 154, 154)",
  "rgb(144, 118, 113)",
  "rgb(98, 78, 75)",
  "rgb(115, 105, 93)",
  "rgb(118, 47, 21)",
  "rgb(80, 5, 0)",
  "rgb(94, 0, 0)",
  "rgb(255, 234, 92)",
  "rgb(255, 242, 0)",
  "rgb(255, 210, 0)",
  "rgb(237, 183, 48)",
  "rgb(242, 168, 50)",
  "rgb(239, 146, 28)",
  "rgb(232, 78, 46)",
  "rgb(213, 0, 50)",
  "rgb(206, 17, 64)",
  "rgb(230, 28, 62)",
  "rgb(185, 61, 48)",
  "rgb(95, 0, 42)",
  "rgb(117, 0, 48)",
  "rgb(160, 14, 75)",
  "rgb(138, 5, 54)",
  "rgb(188, 35, 101)",
  "rgb(132, 66, 127)",
  "rgb(165, 42, 117)",
  "rgb(227, 3, 140)",
  "rgb(167, 108, 147)",
  "rgb(233, 108, 160)",
  "rgb(229, 152, 168)",
  "rgb(121, 125, 174)",
  "rgb(87, 71, 143)",
  "rgb(84, 53, 112)",
  "rgb(46, 51, 112)",
  "rgb(26, 24, 25)",
  "rgb(59, 59, 60)",
  "rgb(0, 0, 60)",
  "rgb(0, 23, 69)",
  "rgb(0, 38, 87)",
  "rgb(0, 50, 98)",
  "rgb(0, 66, 105)",
  "rgb(0, 107, 163)",
  "rgb(0, 83, 124)",
  "rgb(0, 119, 172)",
  "rgb(0, 152, 196)",
  "rgb(0, 180, 221)",
  "rgb(209, 228, 246)",
  "rgb(0, 166, 219)",
  "rgb(18, 195, 244)",
  "rgb(16, 180, 208)",
  "rgb(0, 157, 179)",
  "rgb(87, 197, 202)",
  "rgb(128, 196, 210)",
  "rgb(0, 181, 173)",
  "rgb(0, 171, 163)",
  "rgb(0, 177, 135)",
  "rgb(175, 219, 190)",
  "rgb(182, 208, 82)",
  "rgb(116, 184, 110)",
  "rgb(80, 176, 112)",
  "rgb(0, 162, 114)",
  "rgb(164, 176, 106)",
  "rgb(0, 105, 119)",
  "rgb(0, 109, 107)",
  "rgb(0, 103, 71)",
  "rgb(0, 85, 59)",
  "rgb(0, 72, 21)",
  "rgb(0, 52, 31)",
];
var fonts = [
  "Abril Fatface",
  "Advent Pro",
  "Arvo",
  "Bahiana",
  "Baloo Da",
  "Bigshot One",
  "Bowlby One",
  "Bungee",
  "Bungee Hairline",
  "Bungee Outline",
  "Bungee Shade",
  "Codystar",
  "Coiny",
  "Creepster",
  "Emblema One",
  "Erica One",
  "Expletus Sans",
  "Fascinate",
  "Finger Paint",
  "Goblin One",
  "Graduate",
  "Iceberg",
  "Impact",
  "Jolly Lodger",
  "Keania One",
  "Kumar One",
  "Kumar One Outline",
  "Krona One",
  "Lalezar",
  "Londrina Solid",
  "Metamorphous",
  "Mogra",
  "Mr Dafoe",
  "Nosifer",
  "Overlock SC",
  "Piedra",
  "Pirata One",
  "Plaster",
  "Rakkas",
  "Raleway",
  "Revalia",
  "Roboto",
  "Ruslan Display",
  "Rye",
  "Sancreek",
  "Sarina",
  "Sedgwick Ave Display",
  "Slackey",
  "Smokum",
  "Sonsie One",
  "Space Mono",
  "Trade Winds",
  "UnifrakturCook",
  "UnifrakturMaguntia",
  "Unlock",
  "Vampiro One",
  "Vibur",
  "Viga",
  "VT323",
  "Wallpoet",
  "Warnes",
  "Wire One",
  "Work Sans",
];

var container, stats, controls;
var camera, scene, renderer, light, material, materialCount;
var selectedMaterial = "cls-1";
var nuevaLeyenda = "";
var nuevoId = "";
var selectedText = "TEXT(team-name)";
var selectedMaterialId = "mat_base";
var animations = [];

var manager = new THREE.LoadingManager();

var mixers = [];
var object, objectLogo;
var operand1, operand2, operator1, operator2, solution, question, answer;
var textureLoader, map, textureMaterial;
var mapLogo, textureLogoMaterial;
var mesh;
var materials = [];
var geometries = [];

var width = $("#container").width();
var height = $("#container").height();
if (width < height) {
  height = width;
}
var pixelRatio = window.devicePixelRatio;
var selectedColors = [];
var light, materials;
var lights = [
  {
    color: 0xffffff,
    intensity: 0.53,
    position: { x: -500, y: 320, z: 500 },
    lookAt: { x: 0, y: 0, z: 0 },
  },
  {
    color: 0xffffff,
    intensity: 0.3,
    position: { x: 200, y: 50, z: 500 },
    lookAt: { x: 0, y: 0, z: 0 },
  },
  {
    color: 0xffffff,
    intensity: 0.4,
    position: { x: 0, y: 100, z: -500 },
    lookAt: { x: 0, y: 0, z: 0 },
  },
  {
    color: 0xffffff,
    intensity: 0.3,
    position: { x: 1, y: 0, z: 0 },
    lookAt: { x: 0, y: 0, z: 0 },
  },
  {
    color: 0xffffff,
    intensity: 0.3,
    position: { x: -1, y: 0, z: 0 },
    lookAt: { x: 0, y: 0, z: 0 },
  },
];
var screen_rate = width / height;
