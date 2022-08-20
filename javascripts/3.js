function getControls() {
  controls = new THREE.OrbitControls(camera, container);
  controls.enableKeys = false;
  controls.enablePan = false;
  controls.minDistance = 110;
  controls.maxDistance = 400;
  controls.update();
}
