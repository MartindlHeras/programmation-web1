var arrayNotes = [10,15,6,14,14,13,19,10,17,9];

function afficherTable(table){
  var contenu = "for: <br>";
  for (let i = 0; i < table.length; i++){
    contenu += table[i] + ", ";
  }
  contenu += "<br>while: <br>"
  var i = 0;
  while (i < table.length) {
    contenu += table[i] + ", ";
    i++;
  }
  document.getElementById("output").innerHTML = contenu;
}

function afficherTableBoolean(table, bool){
  var contenu = "for: <br>";
  for (let i = 0; i < table.length; i++){
    if (bool) {
      contenu += table[i] + ", ";
    }
    else if (table[i] >= 15) {
      contenu += table[i] + ", ";
    }
  }
  contenu += "<br>while: <br>"
  var i = 0;
  while (i < table.length) {
    if (bool) {
      contenu += table[i] + ", ";
    }
    else if (table[i] >= 15) {
      contenu += table[i] + ", ";
    }
    i++;
  }
  document.getElementById("output").innerHTML = contenu;
}

function afficherTableBooleanCheck(table, bool){
  if (typeof(bool) != "boolean") {
    window.alert("Ceci n'est pas un boolean");
    document.getElementById("output").innerHTML = "";
    return;
  }
  var contenu = "for: <br>";
  for (let i = 0; i < table.length; i++){
    if (bool) {
      contenu += table[i] + " ";
    }
    else if (table[i] >= 15) {
      contenu += table[i] + " ";
    }
  }
  contenu += "<br>while: <br>"
  var i = 0;
  while (i < table.length) {
    if (bool) {
      contenu += table[i] + " ";
    }
    else if (table[i] >= 15) {
      contenu += table[i] + " ";
    }
    i++;
  }
  document.getElementById("output").innerHTML = contenu;
}

function convertir(){
  var quantite = document.getElementById("textField").value;
  var type = document.getElementById("mySelect").value;

  quantite = parseFloat(quantite);
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
  document.getElementById("output").innerHTML = quantite.toFixed(2) + " " + type;
}
document.getElementById("convertir").addEventListener("click", convertir);
