//EJECUTAR ACA TODAS LAS FUNCIONES DE INICIALIZACION NECESARIAS
$(document).ready(function () {
  // WebGL compatibility check
  if (!Detector.webgl) Detector.addGetWebGLMessage();

  $(".color-palete").hide();
  configPasos();
  init();
  loadColors();
});

$(window).on("resize", onWindowResize);

// THREEJS FUNCTIONS
manager.onLoad = function () {
  animate();
  container.appendChild(renderer.domElement);
  $("#sectorRemera").css("background-image", "none");
};
