//EJECUTAR ACA TODAS LAS FUNCIONES DE INICIALIZACION NECESARIAS
$(document).ready(function () {
  // WebGL compatibility check
  if (!Detector.webgl) Detector.addGetWebGLMessage();

  $(".color-palete").hide();
  configPasos();
  init();
  loadColors();
});

// $(window).on("resize", function () {
//   camera.aspect = $(svg).width() / $(svg).height();
//   camera.updateProjectionMatrix();
//   if (width < height) {
//     height = width;
//   }
//   renderer.setSize(width, height);
// });

$(object).ready(function () {
  $("#sectorRemera").css("background-image", "none");
});

$(window).on("resize", onWindowResize);
