/* Auteurs: Bouha Maaye et Martin de las Heras */

var grille = [];
var jeu_fini = false;
var debug_actif = false;
var celules_pour_reveler = 0;

var lignes = 0;
var colonnes = 0;
var nb_mines = 0;

var aux;

function Cellule(valeur, revele){
  if (valeur < 10) {
    this.valeur = valeur;
    this.revele = revele;
  }
  else {
    return null;
  }
}

function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*(max-min))+min;
}

$(document).ready(function (){

  function creer_grille(nb_mines, lignes, colonnes) {
    if (nb_mines > lignes*colonnes) {
      return -1;
    }

    for (var i = 0; i < lignes; i++) {
      var ligne_html = $('<div class="ligne"></div>');
      ligne_alg = [];
      for (var j = 0; j < colonnes; j++) {
        var cellule_html = $('<div class="cellule"> </div>');
        ligne_html.append(cellule_html);
        ligne_alg.push(new Cellule(0, false));
      }
      grille.push(ligne_alg);
      $("#grille").append(ligne_html);
    }
  }

  function placer_mines(nb_mines, lignes, colonnes){
    var rand_ligne;
    var rand_colonne;
    for (var i = 0; i < nb_mines; i++) {
      rand_ligne = getRandomInt(0, lignes);
      rand_colonne = getRandomInt(0, colonnes);
      if (grille[rand_ligne][rand_colonne].valeur == 9) {
        i--;
      }
      else {
        grille[rand_ligne][rand_colonne].valeur = 9;
      }
    }
  }

  function voisinage(){
    for (var i = 0; i < lignes; i++) {
      for (var j = 0; j < colonnes; j++) {
        if (grille[i][j].valeur != 9) {
          if (i != 0 && j != 0) {
            if (grille[i-1][j-1].valeur == 9) {
              grille[i][j].valeur++;
            }
          }
          if (i != 0) {
            if (grille[i-1][j].valeur == 9) {
              grille[i][j].valeur++;
            }
          }
          if (i != 0 && j != colonnes-1) {
            if (grille[i-1][j+1].valeur == 9) {
              grille[i][j].valeur++;
            }
          }
          if (j != 0) {
            if (grille[i][j-1].valeur == 9) {
              grille[i][j].valeur++;
            }
          }
          if (j != colonnes-1) {
            if (grille[i][j+1].valeur == 9) {
              grille[i][j].valeur++;
            }
          }
          if (i != lignes-1 && j != 0) {
            if (grille[i+1][j-1].valeur == 9) {
              grille[i][j].valeur++;
            }
          }
          if (i != lignes-1) {
            if (grille[i+1][j].valeur == 9) {
              grille[i][j].valeur++;
            }
          }
          if (i != lignes-1 && j != colonnes-1) {
            if (grille[i+1][j+1].valeur == 9) {
              grille[i][j].valeur++;
            }
          }
        }
      }
    }
  }

  $("body").on("click", "#newgame", function(){
    lignes = $("#nblignes").val();
    colonnes = $("#nbcolonnes").val();
    nb_mines = $("#mines").val();
    celules_pour_reveler = lignes*colonnes;

    grille = [];
    jeu_fini = false;
    debug_actif = false;
    $("#debug").prop("checked", false);
    $("#grille").empty();

    if (creer_grille(nb_mines, lignes, colonnes) == -1 || lignes > 20 || colonnes > 20) {
      $("#partie").text("Erreur");
      return;
    }
    placer_mines(nb_mines, lignes, colonnes);
    voisinage();
    $("#partie").text("Partie en cours");
  });

  function la_fonction (ligne, colonne){
    var ligne_html = $(".ligne").eq(ligne).children();
    return ligne_html.slice(colonne, colonne+1);
  }

  $("body").on("click", "#debug", function(){
    for (var i = 0; i < lignes; i++) {
      for (var j = 0; j < colonnes; j++) {
        if ($("#debug").prop("checked") == true && grille[i][j].revele == false) {
          if (grille[i][j].valeur == 9) {
            la_fonction(i,j).html('<img src="mine.png" alt="Mine" width="50px">');
          }
          else {
            la_fonction(i,j).text(grille[i][j].valeur);
          }
        }
        else if ($("#debug").prop("checked") == false && grille[i][j].revele == false) {
          la_fonction(i,j).text("");
        }
      }
    }
  });

  $("body").on("click", ".cellule", function(){
    if (jeu_fini == false) {
      if (reveler_cellule(this) == 1) {
        jeu_fini = true;
        $("#partie").text("Vous avez perdu :(");
      }
      else if (celules_pour_reveler == nb_mines) {
        jeu_fini = true;
        $("#partie").text("Vous avez gagné :)");
      }
    }
  });

  // function reveler_cellule(cellule_html){
  //   var ligne = $(".ligne").index($(cellule_html).parent());
  //   var colonne = $(".cellule").index(cellule_html)%colonnes;
  //
  //   if (grille[ligne][colonne].revele == false) {
  //     celules_pour_reveler--;
  //     grille[ligne][colonne].revele = true;
  //     $(cellule_html).addClass("revele");
  //     if (grille[ligne][colonne].valeur != 9) {
  //       $(cellule_html).text(grille[ligne][colonne].valeur);
  //       return 0;
  //     }
  //     else {
  //       $(cellule_html).html('<img src="mine.png" alt="Mine" width="50px">');
  //       return 1;
  //     }
  //   }
  // }

  function reveler_cellule(cellule_html){
    var ligne = $(".ligne").index($(cellule_html).parent());
    var colonne_raw = $(".cellule").index(cellule_html);
    var colonne = colonne_raw%colonnes;

    if (grille[ligne][colonne].revele == false) {
      celules_pour_reveler--;
      grille[ligne][colonne].revele = true;
      $(cellule_html).addClass("revele");
      if (grille[ligne][colonne].valeur == 0) {
          $(cellule_html).text(grille[ligne][colonne].valeur);
          if (ligne != 0 && colonne != 0) {
            reveler_cellule(la_fonction(ligne-1,colonne-1));
          }
          if (ligne != 0) {
            reveler_cellule(la_fonction(ligne-1,colonne));
          }
          if (ligne != 0 && colonne != colonnes-1) {
            reveler_cellule(la_fonction(ligne-1,colonne+1));
          }
          if (colonne != 0) {
            reveler_cellule(la_fonction(ligne,colonne-1));
          }
          if (colonne != colonnes-1) {
            reveler_cellule(la_fonction(ligne,colonne+1));
          }
          if (ligne != lignes-1 && colonne != 0) {
            reveler_cellule(la_fonction(ligne+1,colonne-1));
          }
          if (ligne != lignes-1) {
            reveler_cellule(la_fonction(ligne+1,colonne));
          }
          if (ligne != lignes-1 && colonne != colonnes-1) {
            reveler_cellule(la_fonction(ligne+1,colonne+1));
          }
          return 0;
      }
      else if (grille[ligne][colonne].valeur != 9) {
        $(cellule_html).text(grille[ligne][colonne].valeur);
        return 0;
      }
      else {
        $(cellule_html).html('<img src="mine.png" alt="Mine" width="50px">');
        return 1;
      }
    }
  }

});
