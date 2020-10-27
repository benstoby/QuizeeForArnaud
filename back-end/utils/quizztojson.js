var quizztojson = function(results)
{
    // username_
    var ret = {"quizz":{}};
    ret.quizz.id        = results.id
    ret.quizz.title     = results.title;
    ret.quizz.info      = results.info;
    ret.quizz.nbtry     = results.nbtry;
    ret.quizz.nbsuccess = results.nbsuccess;
    ret.quizz.seuil     = results.seuil;
    ret.quizz.creation  = results.creation;
    ret.quizz.lastmodif = results.lastmodif;
    ret.quizz.subject   = results.subject;
    ret.quizz.lastsend  = results.lastsend;
    ret.quizz.nextsend  = results.nextsend;
    ret.quizz.questions = [];


    var cpt = 0;
    
    while (results["question" + cpt] != undefined)
    {
        ret.quizz.questions[cpt] = {};
        ret.quizz.questions[cpt]['question'] = results["question" + cpt];
        ret.quizz.questions[cpt]['help'] = results["help" + cpt];

        ret.quizz.questions[cpt]['answers'] = [];
        var cptAnswer = 0;
        while (results["question" + cpt + "_answer" + cptAnswer])
        {
            //code ici
            ret.quizz.questions[cpt]['answers'][cptAnswer] = {};
            ret.quizz.questions[cpt]['answers'][cptAnswer]['choice'] = results["question" + cpt + "_answer" + cptAnswer];
            ret.quizz.questions[cpt]['answers'][cptAnswer]['isgood'] = results["question" + cpt + "_answer" + cptAnswer + "_isgood"];


            cptAnswer++;
        }
        
        cpt++;
    }
    return ret;
}
exports.quizztojson = quizztojson;