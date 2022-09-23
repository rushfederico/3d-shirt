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
  // const found = raycaster.intersectObject(scene, true);
  // console.log(found);
  const intersects = raycaster.intersectObject(scene, true);
  const intersectedMeshes = intersects.map((intersect) => intersect.object);
  const intersectedMaterials = intersectedMeshes.map((mesh) => mesh.material);

  console.log("NEAR: ", raycaster.near);
  console.log("FAR: ", raycaster.far);
  console.log("CAMERA: ", raycaster.camera);
  console.log("LAYERS: ", raycaster.layers);
  console.log("PARAMS: ", raycaster.params);
  console.log("RAY: ", raycaster.ray);
  console.log("INTERSECTS: ", intersects);
  console.log(intersectedMeshes);
  console.log(intersectedMaterials);

  if (intersectedMaterials && intersectedMaterials.length > 0) {
    intersectedMaterials.forEach((material) => {
      if (material.color) {
        material.color.set(
          "#" + Math.floor(Math.random() * 16777215).toString(16)
        );
      }
    });
  }

  // intersectedMeshes.forEach((mesh) => {
  //   mesh.visible = false;
  // });
  // console.log(intersects.length);
  // if (intersects.length > 0) {
  //   for (intersect of intersects) {
  //     // console.log(intersect);
  //   }
  // }
});
