function getControls() {
  controls = new THREE.OrbitControls(camera, container);
  controls.enableKeys = false;
  controls.enablePan = false;
  controls.minDistance = 310;
  controls.maxDistance = 400;
  controls.update();
}
function disableControls() {
  controls.enabled = false;
}

function enableControls() {
  controls.enabled = true;
}
