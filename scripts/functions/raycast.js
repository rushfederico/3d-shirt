const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const objects = [];
const intersects = [];
window.onPointerMove = (event) => {
  onPointerMove(event);
};
function onPointerMove(event) {
  pointer.x = (event.clientX / width) * 2 - 1;
  pointer.y = -(event.clientY / height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  intersects.length = 0;
  raycaster.intersectObjects(objects, true, intersects);
  if (intersects.length > 0) {
    const intersect = intersects[0];
    const object = intersect.object;
    if (object.userData.onHover) {
      object.userData.onHover();
      console.log("hover");
    }
  }
}
