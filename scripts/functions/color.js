function loadColorPickers(initialColor) {
  $(".colorPickers").spectrum({
    color: initialColor,
    change: function (color) {
      update_svg($(this).attr("op"), color.toHexString());
      closeColorContainer();
    },
  });
}

function loadTextColorPickers(initialColor) {
  $("#textColorPick").spectrum({
    color: initialColor,
    change: function (color) {
      closeColorContainer();
    },
  });
}

function loadTextStrokeColorPickers(initialColor) {
  $("#textStrokeColorPick").spectrum({
    color: initialColor,
    change: function (color) {
      update_svg("fillStroke", color.toHexString());
      closeColorContainer();
    },
  });
}

function setColorBk(color) {
  selectedColors.push(color);
  object.traverse(function (node) {
    if (node.isMesh) {
      node.material[selectedMaterial].color.set(color);
    }
  });
  render();
}

function selectMaterial(id) {
  selectedMaterial = id;
  var idd = document.getElementById(id);
  var color = $(idd).css("fill");
  loadColorPickers(color);
  load_materials();
  $(".colorZona").not(".active").addClass("hidden");
  $(".color-palete").show();
}

function load_materials() {
  var paths = $("#svgContainer path");
  var materialContainer = "";

  for (var i = 0; i < paths.length; i++) {
    var id = $(paths[i]).attr("id");
    var bg = $(paths[i]).css("fill");

    if (bg != undefined && id != undefined) {
      var data = id;
      var selected = selectedMaterial == id ? "active" : "";
      materialContainer +=
        '<div id="mat_' +
        data +
        '" class="xixcust colorZona' +
        selected +
        '" onclick="selectMaterial(\'' +
        id +
        '\')"><span class="molids" style="background:' +
        bg +
        '"></span><span class="egseas">' +
        id +
        "</span></div>";
    }
  }
  $(".materials").empty();
  $(".materials").append(materialContainer).html();
}
function closeColorContainer() {
  $(".color-palete").hide();
  $(".colorZona").not(".active").removeClass("hidden");
}

function setColor(color) {
  update_svg("color", color);
  $(".color-palete").hide();
}
function loadColors() {
  var colorContainer = `<i class="fa-solid fa-circle-xmark cursorPointer" onclick="closeColorContainer()"})"></i>
    <h3>Colores</h3><div id="colorPickerContainer">
        <p id="colorPickerTitle" class="formTitles">Color</p>
        <input type="text" class="colorPickers" id="colorPicker" op="color" />
    </div>`;
  $(".color-palete").append(colorContainer).html();
}
