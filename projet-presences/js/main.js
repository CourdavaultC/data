/*
    On selectionne 
    -> TOUS les td qui ont la class check (td sur lesquels on peut cliquer pour marquer "présent", "en retard", ou "absent")
    -> la div.admin-view qui contient la balise <table>
    */
var tds = document.querySelectorAll('td.check'); // [<td>, <td>, .....]
var adminView = document.querySelector("div.admin-view");


/*
 PRINCIPE DE L'APPLICATION 
 On part du principe qu'une présence se matérialise par un objet comme suit:
 {
  eleve: { first: "Meryem", last: "FOUGHALI" },
  date: '18-03-2020',
  present: 0
 }
 (0 aucun état, 1 présent, 2 en retard, 3 absent)
 
 Une application de gestion des présences doit donc stocker une liste d'objets présences
 Ici nous allons créer une variable "session" qui contiendra les propriétés :
 1 - eleves (la liste des élèves - un tableau d'objets eleves)
 2 - dates (la liste des dates - un tableau de string date sous la forme 18-03-2020)
 3 - presences (la liste des présences  - un tableau d'objets presences)
*/

/*
   LA DONNEES DE DEMARRAGE
*/
var session = {
 eleves: [
  { first: "Meryem", last: "FOUGHALI" },
  { first: "claude", last: "RIBAC" },
  { first: "Laura", last: "LAMASSOURE" },
  { first: "Leïla", last: "ECH-CHABI" },
  { first: "Christophe", last: "COURDAVAULT" },
  { first: "Yann", last: "YVER" },
  { first: "Frederick", last: "VU" },
  { first: "Ewa", last: "KADZIOLKA" },
  { first: "Sacha", last: "CEGLIA" },
  { first: "Aude", last: "MALA" },
  { first: "Alexis", last: "PALLAIN" },
  { first: "Rubens", last: "TORDJMAN" },
 ],
 dates: ["02-03-2020", "03-03-2020", "04-03-2020", "05-03-2020", "06-03-2020", "09-03-2020", '10-03-2020', "11-03-2020", "12-03-2020", "13-03-2020", "16-03-2020","17-03-2020", "18-03-2020", "19-03-2020", "20-03-2020", "23-03-2020", "24-03-2020", "25-03-2020", "26-03-2020", "27-03-2020", "30-03-2020", "31-03-2020"],
 presences: [
  { id: 'meryem-foughali-18-03-2020', eleve: { first: "Meryem", last: "FOUGHALI" }, date: '18-03-2020', present: 2 },
  { id: 'claude-ribac-17-03-2020', eleve: { first: "claude", last: "RIBAC" }, date: '17-03-2020', present: 3 },
  { id: 'laura-lamassoure-17-03-2020', eleve: { first: "Laura", last: "LAMASSOURE" }, date: '17-03-2020', present: 1 }
 ]
}


/*
  function createTable() 
  role : dessiner le tableau des présences dans la page HTML
         et poser un écouteur d'evt click sur tous les td.check

  2 paramètres : elevesArray, datesArray
  utilisation : executer -> createTable(session.eleves, session.dates);
*/
function createTable(elevesArray, datesArray) {
 // EN-TETE DE LA TABLE (affiche une ligne tr qui contient les noms des eleves)
 var thead = adminView.querySelector('table thead tr');
 thead.innerHTML = '<td>Dates</td>';
 for (var i = 0; i < elevesArray.length; i++) {
  thead.innerHTML += '<td>' + elevesArray[i].first + " " + elevesArray[i].last + "</td>"
 }
 // CORPS DE LA TABLE (affiche une ligne tr par date et chaque ligne contient des cell td par élève)
 var tbody = adminView.querySelector('table tbody');
 for (var j = 0; j < datesArray.length; j++) {
  // Voir la doc createElement() et appendChild()
  var ligne = document.createElement('tr');
  var tdDate = document.createElement('td');
  tdDate.className = 'date';
  var textDate = document.createTextNode(datesArray[j]);
  tdDate.appendChild(textDate);
  ligne.appendChild(tdDate);


  for (var k = 0; k < elevesArray.length; k++) {
   var tdPresence = document.createElement('td');
   tdPresence.className = 'check';
   tdPresence.dataset.id = generateId(elevesArray[k], datesArray[j]);
   tdPresence.dataset.elevefirstname = elevesArray[k].first;
   tdPresence.dataset.elevelastname = elevesArray[k].last;
   tdPresence.dataset.date = datesArray[j];
   tdPresence.dataset.present = '0';
   tdPresence.id = generateId(elevesArray[k], datesArray[j]);
   ligne.appendChild(tdPresence);
  }
  // Insérer la ligne <tr> DANS la balise <tbody>
  tbody.appendChild(ligne);
 } // fin boucle for qui génére les lignes

 // On pose un écouteur de click sur TOUS les td.check
 var tds = document.querySelectorAll('td.check');
 for (var i = 0; i < tds.length; i++) {
  tds[i].addEventListener('click', setPresence);
 }

} // fin function createTable()




/*
  function printPresences()
  role : afficher les icones des présences dans le tableau (absent, présent, en retard)
  paramètre : le tableau des présences (session.presences dans la données globale)
  utilisation: printPresences(session.presences);
*/
function printPresences(presencesArray) {
 // pour chaque présence, REMPLIR LE TD correspondant (aucun état, present, en retard, ou absent)
 for (var i = 0; i < presencesArray.length; i++) {
  // On sélectionne le "bon" <td par son id dans le html>
  var td = document.querySelector('td#' + presencesArray[i].id);
  switch (presencesArray[i].present) {
   case 0:
    // On set la valeur de l'attr data-present (0 Aucun état)
    td.dataset.present = "0";
    td.textContent = 'Aucun état';
    break;
   case 1:
    // On set la valeur de l'attr data-present (1 present)
    td.dataset.present = "1";
    td.textContent = 'Présent';
    break;
   case 2:
    // On set la valeur de l'attr data-present (2 en retard)
    td.dataset.present = "2";
    td.textContent = 'En retard';
    break;
   case 3:
    // On set la valeur de l'attr data-present (3 absent)
    td.dataset.present = "3";
    td.textContent = 'Absent';
    break;
  }
 }
} // fin function printPresences()




/*
  function setPresence()
  role : modifier la donnée session.presences en ajouter/remplaçant un objet presence
         puis réafficher toutes les présences dans le tableau
  utilisation: setPresence(); est exécutée au click de l'utilisateur sur un td.check
*/
function setPresence() {
 console.log(this.dataset);
 // 1 on crée un objet presence {id:..., eleve:..., date:..., present: 1}
 var eleveObject = { first: this.dataset.firstname, last: this.dataset.lastname };
 var presence = {
  id: this.dataset.id,
  eleve: eleveObject,
  date: this.dataset.date,
  present: parseInt(this.dataset.present) == 3 ? 0 : parseInt(this.dataset.present) + 1
 };
 // 2 on recherche l'objet presence (par son id) dans le array session.presences
 // SI il existe on le remplace dans session.presences, sinon on l'ajoute (.splice() ou .push())
 var presenceInSession = session.presences.find(elt => elt.id == this.dataset.id);
 if (presenceInSession != undefined) {
  var index = session.presences.indexOf(presenceInSession);
  session.presences.splice(index, 1, presence);
 }
 else {
  session.presences.push(presence);
 }
 // 3 On réaffiche les présences
 printPresences(session.presences);
 console.log(session.presences);
}


/*********** AU DEMARRAGE **************/
// > on crée le tableau
createTable(session.eleves, session.dates);
// > On affiche les présence
printPresences(session.presences);
