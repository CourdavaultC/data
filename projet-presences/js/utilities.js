/*
  funtion capitalize
  role : retourne une chaine de caractère formatée avec la 1ere lettre en majuscule
*/
function capitalize(s) {
 return s.charAt(0).toUpperCase() + s.slice(1)
}

/*
  generateId()
  Comme nous créons un système d'id sur les balises <td>
  sous la forme <td id="fred-loss-15-03-2020">
 
  Role : Nous avons besoin d'une fonction qui génère un id formaté en fonction : du nom de l'élève et de la date
  
  Cette fonction peut être utilisée où on en a besoin.
  exemple : generateId(session.eleves[1], session.dates[3])
  retourne : string sour la forme "fred-lossignol-20-03-2020"
*/
function generateId(eleve, date) {
 return eleve.first.toLowerCase() + "-" + eleve.last.toLowerCase() + "-" + date;
}
