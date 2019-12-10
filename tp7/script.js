var listedItems = [];
var listedItemsJSON = [];

function ListItem(tache, realise){
  if (typeof(realise) != "boolean") {
    return null;
  }
  this.tache = tache;
  this.realise = realise;
}

$(document).ready(function (){

  $("ul").on("click", ".done", function(){
    $(this).addClass("undone");
    $(this).removeClass("done");
  });

  $("ul").on("click", ".undone", function(){
    $(this).addClass("done");
    $(this).removeClass("undone");
  });

  $("body").on("click", "#ajouter", function(){
    var nouvElement = $("#textField").val();
    $("#textField").val("");
    if (nouvElement != "") {
      var elt = $('<li class="undone"></li>').text(nouvElement);
      $("ul").append(elt);
    }
  });

  $("body").on("click", "#sauvegarder", function(){
    listedItems = [];
    listedItemsJSON = [];
    var auxBool = false;
    $("li").each(function(){
      if ($(this).hasClass("done")) {
        auxBool = true;
      }
      else {
        auxBool = false;
      }
      listedItems.push(new ListItem($(this).text(), auxBool));
    });

    listedItemsJSON = JSON.stringify(listedItems);

    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("listedItems", listedItemsJSON);
    }
  });

  $("body").on("click", "#restaurer", function(){
    listedItemsJSON = localStorage.getItem("listedItems");
    var listedItemsParsed = JSON.parse(listedItemsJSON);

    for (var i = 0; i < listedItemsParsed.length; i++) {
      listedItems[i] = new ListItem();
      Object.assign(listedItems[i], listedItemsParsed[i]);
    }

    $("ul").empty();

    for (var i = 0; i < listedItems.length; i++) {
      if (listedItems[i].realise) {
        var elt = $('<li class="done"></li>').text(listedItems[i].tache);
        $("ul").append(elt);
      }
      else {
        var elt = $('<li class="undone"></li>').text(listedItems[i].tache);
        $("ul").append(elt);
      }
    }
  });

});
