function addNewText() {
  let text = `Nueva Leyenda`;
  $(".text-editor").show();
  $(".texts").hide();
  let ff = fonts[0];
  let fs = "60";
  let xPos = textLocation.frente.x;
  let yPos = textLocation.frente.y;
  /*var editor = createTextEditor(text, ff, fs, xPos, yPos);
  $(".text-editor").empty();
  $(".text-editor").append(editor).html();
  */
  createTextName();
}

function deleteText(id) {
  $("#texto_" + id).remove();
  $("#text_" + id).remove();
  
  loadTexts();
  update_svg("", "");
}

function loadTexts() {
  var title = `+ Agregar texto`;
  var textContainer = `<h3 class="cursorPointer" onclick="addNewText()">${title}</h3>`;
  var texts = $("#svgContainer text");
  for (var i = 0; i < texts.length; i++) {
    var textId = $(texts[i]).data("index");
    var fill   = $(texts[i]).css("fill");
    var text   = $(texts[i]).text();
    //var selected = selectedText == textId ? "active" : "";
    if (textId != undefined) {
      textContainer += `
        <div id="txt_${textId}" class="xixcust">
          <i class="fa-solid fa-trash molids" onclick="deleteText('${textId}')" style="display: flex; justify-content: center; align-items: center;"></i>
          <span class="molids" style="background: ${fill}" onclick="loadText('${textId}')"></span>
          <span class="d-inline-block text-truncate egseas" style="max-width: 300px;" onclick="loadText('${textId}')">${text}</span>
        </div>`;
    }
  }
  $(".texts").empty();
  $(".texts").append(textContainer);
}

function loadText(textId) {
  $(".text-editor").show();
  $(".texts").hide();

  var textElement = $("#texto_" + textId);
  nuevoId = "texto_" + textId;
  var text = $(textElement).html();
  newText = textElement;
  // var ff = $(textElement).attr("font-family");
  var ff = $(textElement).attr("font-family");
  var fs = $(textElement).attr("font-size");
  var textColor = $(textElement).css("fill");
  var textStrokeColor = $(textElement).css("stroke");

  $(".text-editor input#ftext").val(text);
  //falta setear la fuente, el dato font-family hay que ver como hacemos para que se corresponda con la opción que mostramos en el dropdown
  //$(".text-editor input#ff").val(???);
  //seteo de font size
  $(".text-editor input#fs").val(fs.replace("px", ""));
  //seteo de color pickers
  $("#textColorPick").spectrum("set", textColor);
  $("#textStrokeColorPick").spectrum("set", textStrokeColor);
}
function createTextEditor(text, ff, fs) {
  var textEditorContainer = document.createElement("div");
  $(textEditorContainer).html(text);
  $(textEditorContainer).attr("font-family", "Advent Pro");
  $(textEditorContainer).css("font-family", "Advent Pro");
  $(textEditorContainer).css("font-size", "20px");
  $(textEditorContainer).css("fill", "#000");
  $(textEditorContainer).css("stroke", "#fff");
  var editor = `
    <div class="text-editor-container">
      <i class="fa-solid fa-circle-xmark cursorPointer closeTextX" onclick="${`closeTextEditor()`}"></i>
        <div class="form-check form-check-inline" onchange="${`setTextLocation(newText)`}">
          <input name="zonaPrenda" type="radio" class="form-check-input" id="frente" value="frente" checked>
          <label class="form-check-label" for="frente">Frente</label>
          <input name="zonaPrenda" type="radio" class="form-check-input" id="dorso" value="dorso">
          <label class="form-check-label" for="dorso">Dorso</label>
          <input name="zonaPrenda" type="radio" class="form-check-input" id="mangaizq" value="izquierda">
          <label class="form-check-label" for="mangaizq">Manga Izq</label>
          <input name="zonaPrenda" type="radio" class="form-check-input" id="mangader" value="derecha">
          <label class="form-check-label" for="mangader">Manga Der</label>
        </div>
        <h1>${text}</h1>
        <div class="form-group">
          <input id="ftext" onchange="${`changeTeamName(event)`}" type="text" class="form-control" value="${text}"/>
        </div>`;
  var fontFamilies = `
    <select id="ff" onchange="${`changeTeamName(event)`}" class="form-control">
      <option value="">choose font</option>`;
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
            <label for="fs">Font-Size</label>
            <input id="fs" class="form-range form-control" type="range" min="20" max="200" value="${fs}" onchange="${`updateTextSize(event)`}"/>
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
    `<div>
      <button onclick="closeTextEditor()">Aceptar</button>
    </div>
  </div>`;
  return editor;
}
function closeTextEditor() {
  $(".text-editor").hide();
  $(".texts").show();
  selectedText = null;
  loadTexts();
}
function configTextEditor() {
  $(".text-editor").on("click", ".closeTextX", function (e) {
    closeTextEditor();
  });
  $(".text-editor").on("change", "input[name='zonaPrenda']", function (e) {
    setTextLocation(newText);
  });
  $(".text-editor").on("change", "#ftext, #ff", function (e) {
    changeTeamName(e);
  });

  fonts.forEach(function (font) {
    $("#ff").append(`<option value="${font}">${font}</option>`);
  });

  $(".text-editor").on("change", "#fs", function (e) {
    updateTextSize($(this).val());
  });

  $(".fa-solid.fa-arrow-up").on("click", function (e) {
    update_svg("ypos", -10);
  });
  $(".fa-solid.fa-arrow-down").on("click", function (e) {
    update_svg("ypos", 10);
  });
  $(".fa-solid.fa-arrow-left").on("click", function (e) {
    update_svg("xpos", -10);
  });
  $(".fa-solid.fa-arrow-right").on("click", function (e) {
    update_svg("xpos", 10);
  });

  /*loadTextColorPickers("rgb(0,0,0)");
  loadTextStrokeColorPickers("rgb(255,255,255)");*/
  loadColorPickers("rgb(0,0,0)");

  $("#btnAceptarTexto").on("click", function (e) {
    //createTextName();
    closeTextEditor();
  });
}
function updateTextSize(size) {
  update_svg("fs", `${size}px`);
  console.log(size);
}

function createTextName() {
  newText = $("<text>");
  var nroDeLeyenda = $("#svgTextContainer text").length > 0 ? $("#svgTextContainer text").last().data("index") : -1;
  nroDeLeyenda = (parseInt(nroDeLeyenda) +1);
  nuevoId = "texto_" + nroDeLeyenda;
  $(newText)[0].id = nuevoId;
  $(newText)[0].setAttribute("data-index", nroDeLeyenda );

  $(newText)[0].innerHTML = $("#ftext").val();
  $(newText)[0].setAttribute("font-family", $("#ff").val());
  $(newText)[0].setAttribute("font-size", $("#fs").val());
  $(newText)[0].setAttribute("font-size", $("#fs").val());
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
  // closeTextEditor();
}

function setTextLocation(t) {
  const location = $("input[name=zonaPrenda]:checked").val();
  $(t).data("zona", location);
  setCoordinates(t, textLocation[location].x, textLocation[location].y);
}

function setCoordinates(t, x, y) {
  $(t).attr("x", x);
  $(t).attr("y", y);
  update_svg("", "");
}
function changeTeamName(e) {
  console.log(e.target.id);
  console.log(e.target.value);
  update_svg(e.target.id, e.target.value);
}
