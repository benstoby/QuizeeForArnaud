/*var reponse = document.getElementById('R<%= cpt %>_<%= cptans %').value;
if(reponse == 'isgood = true'){
   modifierText("resultat", "Bonne réponse:bla bla bla");
   document.getElementById("resultat").style.color="green";
} else {
  modifierText("resultat", " Mauvaise réponse... ");
   document. getElementById("resultat").style.color="red";*/
// }


 /*function forme(event) {
    event.preventDefault();
   
    for (let radio of document.querySelectorAll("input:checked")) {
    }
}*/

/*function verifQuestion(question, answers){
    if(document.getElementById(question).value == ''){
        document.forms['quizz'].elements['question'].style.backgroundColor = "#afd5ff";
    }else if(document.getElementById(answers).value == 'toto'){
        document.forms['quizz'].elements['answers'].style.backgroundColor = "#92fda3";
    }else{
        document.forms['quizz'].elements['answers'].style.backgroundColor = "#ffafaf";
    }
}*/

document.addEventListener("DOMContentLoaded", function() {
    if (isgood == true){
        element.parentElement.style.backgroundColor = 'green';
    }
    else{
        element.parentElement.style.backgroundColor = 'red';
    }
});


 