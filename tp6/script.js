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

});
