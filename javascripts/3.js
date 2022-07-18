function getControls() {
  controls = new THREE.OrbitControls(camera, container);
  controls.enableKeys = false;
  controls.minDistance = 310;
  controls.maxDistance = 400;
  controls.update();
}
