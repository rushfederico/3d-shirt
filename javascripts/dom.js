function getContainer() {
  container = document.createElement("div");
  document.getElementById("container").appendChild(container);
}
function getCamera() {
  camera = new THREE.PerspectiveCamera(50, screen_rate, 100, 1200);
  camera.position.set(600, 0, 200);
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
