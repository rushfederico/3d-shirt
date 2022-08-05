//EJECUTAR ACA TODAS LAS FUNCIONES DE INICIALIZACION NECESARIAS
$(document).ready(function () {
  // WebGL compatibility check
  if (!Detector.webgl) Detector.addGetWebGLMessage();
  $(".color-palete").hide();
  configPasos();
  init();
  loadColors();
});
