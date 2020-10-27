var quizzCheck = function (quizz, userAnswers) {

    var nbQuestions = 0;
    var nbGoodQuestions = 0;
    var isgoodans = true;

    var cpt = 0;
    var cptans = 0;
    quizz.questions.forEach(function(question) {
        cpt++;
        cptans = 0;
        isgoodans = true;
        question.answers.forEach(function(answers) {
            cptans++;
            if(!((userAnswers["R"+ cpt +"_"+ cptans] && answers.isgood == "true") || (!(userAnswers["R"+ cpt +"_"+ cptans] ) && answers.isgood == "false"))) {
                
                isgoodans = false;
            }
        });
        if(isgoodans){
            nbGoodQuestions++;
        }
    });
    nbQuestions = cpt;


    return (nbGoodQuestions / nbQuestions * 100 >= quizz.seuil)?true:false;
}
exports.quizzCheck = quizzCheck;
