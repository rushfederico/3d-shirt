function addNewText() {
  selectedText = `Nueva Leyenda`;
  $(".text-editor").show();
  $(".texts").hide();
  var editor = createTextEditor(selectedText);
  $(".text-editor").empty();
  $(".text-editor").append(editor).html();
  loadNuevaLeyendaColorPickers("rgb(0,0,0)");
  loadNuevaLeyendaStrokeColorPickers("rgb(255,255,255)");
}

function loadTexts() {
  var title = `+ Agregar texto`;
  var textContainer = `<h3 class="cursorPointer" onclick="addNewText()">${title}</h3>`;
  var texts = $("#svgContainer text");
  for (var i = 0; i < texts.length; i++) {
    var textId = $(texts[i]).attr("id");
    var fill = $(texts[i]).css("fill");
    var text = $(texts[i]).text();
    var selected = selectedText == textId ? "active" : "";
    // console.log(textId);
    // console.log(text);
    // console.log(selected);
    // console.log(selectedText);
    // console.log("//////////////////////");
    if (textId != undefined) {
      textContainer += `<div id="txt_${textId}" class="xixcust ${selected}" onclick="loadTextEditor('${textId}')">
            <span class="molids" style="background: ${fill}"></span>
            <span class="d-inline-block text-truncate egseas" style="max-width: 300px;">${text}</span>
          </div>`;
    }
  }
  $(".texts").empty();
  $(".texts").append(textContainer).html();
}

function loadTextEditor(idd) {
  $(".text-editor").show();
  $(".texts").hide();

  var id = document.getElementById(idd);
  var text = $(id).html();
  selectedText = text;
  var ff = $(id).attr("font-family");
  var sff = $(id).css("font-family");
  var fs = $(id).css("font-size");
  var textColor = $(id).css("fill");
  var textStrokeColor = $(id).css("stroke");

  var xPos = parseInt($(id).attr("x"));
  var yPos = parseInt($(id).attr("y"));
  var editor = createTextEditor(text, ff, sff, fs, textColor, textStrokeColort);
  $(".text-editor").empty();
  $(".text-editor").append(editor).html();
  loadColorPickers(textColor);
  loadTextStrokeColorPickers(textStrokeColor);
}
function createTextEditor(text, ff, sff, fs, textColor, textStrokeColort) {
  var textEditorContainer = document.createElement("div");
  $(textEditorContainer).html(text);
  $(textEditorContainer).attr("font-family", "Advent Pro");
  $(textEditorContainer).css("font-family", "Advent Pro");
  $(textEditorContainer).css("font-size", "20px");
  $(textEditorContainer).css("fill", "#000");
  $(textEditorContainer).css("stroke", "#fff");
  // var xPos = parseInt($(id).attr("x"));
  // var yPos = parseInt($(id).attr("y"));
  var editor = `<div class="text-editor-container">
            <i class="fa-solid fa-circle-xmark cursorPointer closeTextX" onclick="closeTextEditor()"})"></i>
            <div class="form-check form-check-inline">
                <input name="zonaPrenda" type="radio" class="form-check-input" id="frente" value="frente" checked>
                <label class="form-check-label" for="frente">Frente</label>
                <input name="zonaPrenda" type="radio" class="form-check-input" id="dorso" value="dorso">
                <label class="form-check-label" for="dorso">Dorso</label>
                <input name="zonaPrenda" type="radio" class="form-check-input" id="mangaizq" value="izquierda">
                <label class="form-check-label" for="mangaizq">Manga Izq</label>
                <input name="zonaPrenda" type="radio" class="form-check-input" id="mangader" value="derecha">
                <label class="form-check-label" for="mangader">Manga Der</label>
              </div>
            <h1>Nueva Leyenda</h1>
            <div class="form-group">
              <input id="ftext" onchange="changeTeamName()" type="text" class="form-control" value="${text}"/>
            </div>`;
  var fontFamilies = `<select id="ff" onchange="changeTeamName()" class="form-control"><option value="">choose font</option>`;
  fonts.forEach(function (font) {
    var selected = ff == font ? "selected" : "";
    fontFamilies += `<option ${selected} value="${font}">${font}</option>`;
  });
  fontFamilies += "</select>";
  editor +=
    `<div class="form-group">
        <label for="ff-list">Font-Family</label>
        ${fontFamilies}
        </div>
        <div class="form-group">
            <label for="newfs">Font-Size</label>
            <input id="newfs" class="form-range form-control" type="range" min="20" max="200"/>
        </div>
        <div id="colorAndMoveTextContainer" class="form-group">
          <div id="colorPickContainer">
            <p id="colorPickTitle" class="formTitles">Color</p>
            <input type="text" class="colorPickers" id="textColorPick" op="fillText"/>
          </div>
          <div id="strokeColorPickContainer">
            <p id="strokeColorPickTitle" class="formTitles">Color del borde</p>
            <input type="text" class="colorPickers" id="textStrokeColorPick" op="fillStroke"/>
          </div>
          <div id="moveTextContainer">
            <p id="moveTextTitle" class="formTitles">Mover</p>
            <i class="fa-solid fa-arrow-up" onclick="update_svg('ypos', -10)"></i>
            <i class="fa-solid fa-arrow-down" onclick="update_svg('ypos', 10)"></i>
            <i class="fa-solid fa-arrow-left" onclick="update_svg('xpos', -10)"></i>
            <i class="fa-solid fa-arrow-right" onclick="update_svg('xpos', 10)"></i>
          </div>
        </div>` +
    `<div><button onclick="createTextName()">Agregar Leyenda</button></div></div>`;
  // <div id="colorAndMoveTextContainer" class="form-group">
  // <div id="colorPickContainer">
  // <p id="colorPickTitle" class="formTitles">Color</p>
  // <input type="text" class="colorPickers" id="colorPick" op="fillText"/>
  // </div>
  // <div id="strokeColorPickContainer">
  // <p id="strokeColorPickTitle" class="formTitles">Color del borde</p>
  // <input type="text" class="" id="strokeColorPick" op="fillStroke"/>
  // </div>
  // <div id="moveTextContainer">
  // <p id="moveTextTitle" class="formTitles">Mover</p>
  // <i class="fa-solid fa-arrow-up" onclick="update_svg('ypos', -10)"></i>
  // <i class="fa-solid fa-arrow-down" onclick="update_svg('ypos', 10)"></i>
  // <i class="fa-solid fa-arrow-left" onclick="update_svg('xpos', -10)"></i>
  // <i class="fa-solid fa-arrow-right" onclick="update_svg('xpos', 10)"></i>
  // </div>
  // </div>
  return editor;
}
function closeTextEditor() {
  $(".text-editor").hide();
  $(".texts").show();
  selectedText = null;
  loadTexts();
}

function updateTextSize(event) {
  update_svg("fs", `${event.target.value}px`);
  console.log(event.target.value);
}

function createTextName(text) {
  //nuevaLeyenda = document.createElementNS("http://www.w3.org/2000/svg", "text");
  newText = $("<text>");
  var nroDeLeyenda = $("#svgTextContainer text").length;
  nuevoId = "texto_" + nroDeLeyenda;
  $(newText)[0].id = nuevoId;
  $(newText)[0].innerHTML = $("#newftext").val();
  $(newText)[0].setAttribute("font-family", $("#newff").val());
  $(newText)[0].setAttribute("font-size", $("#newfs").val());
  $(newText).css("fill", $("#textColorPick").spectrum("get").toHexString());
  $(newText).css(
    "stroke",
    $("#textStrokeColorPick").spectrum("get").toHexString()
  );
  $(newText)[0].setAttribute(
    "stroke",
    $("#textStrokeColorPick").spectrum("get").toHexString()
  );
  ////////////////////////////////////////////////////// acá
  setTextLocation(newText);
  $("#svgContainer g").append($(newText));
  //////////////////////////////////////////////////////////
  update_svg("", "");
  closeTextEditor();
}

function setTextLocation(t) {
  const location = $("input[name=zonaPrenda]:checked").val();
  $(t).data("zona", location);
  setCoordinates(textLocation[location].x, textLocation[location].y);
}

function setCoordinates(x, y) {
  $(newText).attr("x", x);
  $(newText).attr("y", y);
}
function changeTeamName(e) {
  console.log(e.target.id, e.target.value);
  console.log(typeof e.target.id, typeof e.target.value);
  update_svg(e.target.id, e.target.value);
}

// var textEditContainer = `<div class="text-editor-container">
// <i class="fa-solid fa-circle-xmark cursorPointer closeTextX" onclick="closeTextEditor()"})"></i>
// <div class="form-check form-check-inline">
//     <input name="zonaPrenda" type="radio" class="form-check-input" id="frente" value="frente" checked>
//     <label class="form-check-label" for="frente">Frente</label>
//     <input name="zonaPrenda" type="radio" class="form-check-input" id="dorso" value="dorso">
//     <label class="form-check-label" for="dorso">Dorso</label>
//     <input name="zonaPrenda" type="radio" class="form-check-input" id="mangaizq" value="mangaizq">
//     <label class="form-check-label" for="mangaizq">Manga Izq</label>
//     <input name="zonaPrenda" type="radio" class="form-check-input" id="mangader" value="mangader">
//     <label class="form-check-label" for="mangader">Manga Der</label>
//   </div>
// <h1>${idd}</h1>
// <div class="form-group">
//   <input id="ftext" onchange="changeTeamName()" type="text" class="form-control" value="${text}">
// </div>`;
// var fontFamilies =
// '<select id="ff" onchange="changeTeamName(event)" class="form-control"><option value="">choose font</option>';
// fonts.forEach(function (font) {
// var selected = ff == font ? "selected" : "";
// fontFamilies += `<option ${selected} value="${font}">${font}</option>`;
// });
// fontFamilies += "</select>";
// textEditContainer += `<div class="form-group"><label for="ff-list">Font-Family</label> ${fontFamilies}</div>
// <div class="form-group">
// <label for="newfs">Font-Size</label>
// <input id="newfs" class="form-range form-control" type="range" min="20" max="200" onchange="updateTextSize(event)"/>
// </div>
// <div id="colorAndMoveTextContainer" class="form-group">
// <div id="colorPickContainer">
// <p id="colorPickTitle" class="formTitles">Color</p>
// <input type="text" class="colorPickers" id="colorPick" op="fillText"/>
// </div>
// <div id="strokeColorPickContainer">
// <p id="strokeColorPickTitle" class="formTitles">Color del borde</p>
// <input type="text" class="" id="strokeColorPick" op="fillStroke"/>
// </div>
// <div id="moveTextContainer">
// <p id="moveTextTitle" class="formTitles">Mover</p>
// <i class="fa-solid fa-arrow-up" onclick="update_svg('ypos', -10)"></i>
// <i class="fa-solid fa-arrow-down" onclick="update_svg('ypos', 10)"></i>
// <i class="fa-solid fa-arrow-left" onclick="update_svg('xpos', -10)"></i>
// <i class="fa-solid fa-arrow-right" onclick="update_svg('xpos', 10)"></i>
// </div>
// </div>
// </div>`;
