$(document).ready(function (){
  var i = 0;
  $("h1").click(function(){
    alert($(this).text());
    console.log(i);
    i++;
  });

  $("#output").click(function(){
    alert($(this).text());
  });

  $(".image").click(function(){
    alert($(this).text());
  });

  // $(".callback").click(function(){
  //   $(".disparaitre").hide(500);
  //   $(".disparaitre").text("Prevue");
  //   $(".disparaitre").show(500);
  // });

  $(".callback").click(function(){
    $(".disparaitre").hide(500, function(){
      $(".disparaitre").text("Preuve");
      $(".disparaitre").show(500);
    });
  });

  $("#convertir").click(function(){
    var quantite = parseFloat($("#textField").val());
    var type = $("#mySelect").val();
    switch (type) {
      case "pouce":
        quantite = quantite*2.54;
        type = "cm";
        break;
      case "cm":
        quantite = quantite/2.54;
        type = "pouces";
        break;
      case "lb":
        quantite = quantite*453.6;
        type = "g";
        break;
      case "g":
        quantite = quantite/453.6;
        type = "lbs"
        break;
    }

    $("#output").text(quantite.toFixed(2) + " " + type);
  });

});
