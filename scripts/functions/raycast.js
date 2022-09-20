const raycaster = new THREE.Raycaster();
const clickMouse = new THREE.Vector2();
const moveMouse = new THREE.Vector2();
let draggable;

$(window).on("click", (event) => {
  let canvas = $(`#container canvas`)[0];
  const rect = renderer.domElement.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  clickMouse.x = (x / canvas.clientWidth) * 2 - 1;
  clickMouse.y = -(y / canvas.clientHeight) * 2 + 1;
  raycaster.setFromCamera(clickMouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);
  console.log(intersects.length);
  if (intersects.length > 0) {
    for (intersect of intersects) {
      console.log(intersect);
    }
  }
});
