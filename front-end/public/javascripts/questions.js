var nbQuestion = 0;

function handleremove() {
    if (nbQuestion > 1) {
        nbQuestion--;
        var container = document.getElementById("container");
        container.removeChild(container.lastChild);
    }
}

function handleadd(question, help) {

    var question_texte = (typeof question !== 'undefined') ? question : '';
    var help = (typeof help !== 'undefined') ? help : '';

    nbQuestion++;
    const nbReponse = 1;
    var container = document.getElementById("container");

    var stringhtml = '<div id="question" class="question"> \
                                    <div class="block_bleu_foncer petit_bloc "> \
                                        <p>Q' + nbQuestion + '</p> \
                                    </div> \
                                    <div class="Q largeur1"> \
                                        <textarea name="Q' + nbQuestion + '" oninput="textAreaAdjust(this)" style="overflow:hidden">' + question_texte + '</textarea> \
                                    </div> \
                                    <div id="reponse'+ nbQuestion + '" class="largeur1"> \
                                        <div id="' + nbQuestion + '" onclick="handleaddR(this)" class="block_bleu_foncer1 taille boutton_plus_reponse"> \
                                            <img src="/images/icones/ajouter.svg" alt="ajouter"/>  \
                                        </div> \
                                        <div id="S' + nbQuestion + '" onclick="handleremoveR(this)" class="block_bleu_foncer1 taille boutton_plus_reponse"> \
                                            <img src="/images/icones/moins.svg" alt="supprimer" /> \
                                        </div> \
                                    </div> \
                                    <div class="largeur1"> \
                                        <div class="Q reponse"> \
                                            <textarea name="Aide'+ nbQuestion + '" oninput="textAreaAdjust(this)" style="overflow:hidden">'+ help +'</textarea> \
                                        </div> \
                                    </div> \
                                </div>';

    var newQuestion = document.createElement('div');
    newQuestion.innerHTML = stringhtml;
    container.appendChild(newQuestion.firstChild);
    if (typeof question == 'undefined') {
        let bouton;
        bouton = document.getElementsByClassName("boutton_plus_reponse");
        bouton = Array.from(bouton);
        bouton = bouton.find(element => element.id == nbQuestion);
        handleaddR(bouton);
    }

}

function handleremoveR(element) {

    var container = element.parentNode;
    var listReponse = container.getElementsByClassName("rep");
    var lastRep = listReponse[listReponse.length - 1];

    if (listReponse.length > 1) {
        container.removeChild(lastRep);
    }
}


function handleaddR(element, answer, isgood) {
    var reponse = document.getElementById("reponse" + element.id);
    var addButton = document.getElementById(element.id);
    var idQuestion = element.id;
    var container = element.parentNode;
    var listReponse = container.getElementsByClassName("rep");
    var lastRep = listReponse[listReponse.length - 1];
    var nbReponse;
    if (typeof lastRep !== 'undefined') {
        lastRep = lastRep.getElementsByTagName("TEXTAREA")[0];
        nbReponse = lastRep.name.split("_")[1];
    }
    else {
        nbReponse = 0;
    }
    nbReponse++;

    var stringhtml = '  <div class="Q rep"> \
                            <textarea name="R' + idQuestion + '_' + nbReponse + '" oninput="textAreaAdjust(this)" style="overflow:hidden">';
    stringhtml += (typeof answer !== 'undefined') ? answer : "";
    stringhtml += '</textarea> \
                            <input type="checkbox" id="bonne_reponse" name="isgood'+ idQuestion + '_' + nbReponse +'"';
    stringhtml +=             (isgood.localeCompare('true') == 0) ? "checked" : "";            
    stringhtml +=            '> \
                            <label for="bonne_reponse">Bonne Reponse</label> \
                        </div>';
    var newReponse = document.createElement('div');
    newReponse.innerHTML = stringhtml;

    reponse.insertBefore(newReponse.lastChild, addButton);

}

function textAreaAdjust(o) {
    o.style.height = "1px";
    o.style.height = (25 + o.scrollHeight) + "px";
}
document.addEventListener("DOMContentLoaded", function () {
    if (typeof quizz !== 'undefined') {

        quizz.questions.forEach(function (question, index) {
            handleadd(question.question, question.help)
            index++;
            let bouton;
            bouton = document.getElementsByClassName("boutton_plus_reponse");
            bouton = Array.from(bouton);
            bouton = bouton.find(element => element.id == index);
            question.answers.forEach(function (answer) {

                handleaddR(bouton, answer.choice, answer.isgood)

            });
        });
    }
    else {
        handleadd();
    }
});


// if (typeof quizz !== 'undefined') {

//     quizz.questions.forEach(function (answers) {

//         handleaddR(answers.choice, answers.isgood)
//     });
// }
// else {
//     handleaddR("", false);
// }




