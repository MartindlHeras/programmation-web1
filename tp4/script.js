var images = document.getElementsByClassName("image");
var descriptions = document.getElementsByClassName("description");

function afficherTexte(i){
  descriptions[i].style.display = "block";
}

function occulterTexte(i){
  descriptions[i].style.display = "none";
}

for (let i = 0; i < images.length; i++) {
  images[i].addEventListener("mouseover", function(){
    afficherTexte(i);
  });
  images[i].addEventListener("mouseout", function(){
    occulterTexte(i);
  });
}

function Cursus(nom, duration){
  this.nom = nom;
  this.duration = duration;

  this.toString = function(){
    return "Cette cours s'appelle " + nom + " et a une duration de " + duration + " minutes."
  }

  this.toStringHeures = function(){
    return "Cette cours s'appelle " + nom + " et a une duration de " + (duration/60).toFixed(2) + " heures."
  }
}

var c1 = new Cursus("Topologie", 90);
var c2 = new Cursus("Broadway history", 120);

var elt = document.createElement("p");
var content = document.createTextNode(c1.toString());
elt.appendChild(content);
document.getElementById("objets").appendChild(elt);

elt = document.createElement("p");
content = document.createTextNode(c2.toStringHeures());
elt.appendChild(content);
document.getElementById("objets").appendChild(elt);

function afficherNouveauCours(){
  var c3 = new Cursus(document.getElementById("form_nom").value, document.getElementById("form_duration").value);
  document.getElementById("output").innerHTML = c3.toString();
}

var b2 = document.getElementById("creer");
b2.addEventListener("click", function() {
  afficherNouveauCours();
  });
