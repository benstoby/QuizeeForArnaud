var secucheck = require('../utils/secucheck');

var jsontoback = function (req) {

    var verif = true;
    var goodAnswer = false;
    var tmpDate = JSON.stringify(new Date());
    var ret = { "quizz": {} };

    if (!secucheck.verifchamp(req.body.titre) ||
        !secucheck.verifchamp(req.body.sujet) ||
        !secucheck.verifchamp(req.body.info) || 
        !(req.body.seuildereussite <= 100 && req.body.seuildereussite >= 0)) 

    {
        verif = false;
    }
    else {
        ret.quizz.username = req.session.user;
        ret.quizz.title = req.body.titre;
        ret.quizz.subject = req.body.sujet;
        ret.quizz.info = req.body.info;
        ret.quizz.seuil = req.body.seuildereussite;
        ret.quizz.lastmodif = tmpDate;
        ret.quizz.creation = tmpDate;
        ret.quizz.lastsend = tmpDate;
        ret.quizz.nextsend = tmpDate;
        ret.quizz.questions = [];

        var cpt = 0;
        var cptAnswer = 0;
        // une boucle qui stocke dans le tableau  ret.quizz.questions les texte de la question pour chaque question
        while (req.body["Q" + (cpt + 1)] != undefined &&
            req.body["Aide" + (cpt + 1)] != undefined) {

            if (!secucheck.verifchamp(req.body["Q" + (cpt + 1)]) ||
                !secucheck.verifchamp(req.body["Aide" + (cpt + 1)])) {
                verif = false;
                break;
            }
            else {
                ret.quizz.questions[cpt] = {};
                ret.quizz.questions[cpt]['question'] = req.body["Q" + (cpt + 1)];
                ret.quizz.questions[cpt]['help'] = req.body["Aide" + (cpt + 1)];
                ret.quizz.questions[cpt]['answers'] = [];
            }
            var cpttab = 0;
            goodAnswer = false;
            cptAnswer = 0;
            while (req.body["R" + (cpt + 1) + "_" + (cptAnswer + 1)] != undefined) {
                if (!secucheck.verifchamp(req.body["R" + (cpt + 1) + "_" + (cptAnswer + 1)])) {
                    verif = false;
                    break;
                }
                else {
                    ret.quizz.questions[cpt]['answers'][cpttab] = {};
                    ret.quizz.questions[cpt]['answers'][cpttab]['choice'] = req.body["R" + (cpt + 1) + "_" + (cptAnswer + 1)];
                    //ret.quizz.questions[cpt]['answers'][cptAnswer]['isgood'] = req.body["" + cpt + "_answer" + cptAnswer + "_isgood"];
                    if (req.body["isgood" + (cpt + 1) + "_" + (cptAnswer + 1)]) {
                        ret.quizz.questions[cpt]['answers'][cpttab]['isgood'] = 'true';
                        goodAnswer = true;
                    }
                    else {
                        ret.quizz.questions[cpt]['answers'][cpttab]['isgood'] = 'false';
                    }
                }
                cpttab++;
                cptAnswer++;
            }
            if(!goodAnswer)
            {
                verif = false;
                break;
            }

            cpt++;
        }
    }


    if (verif) {
        return ret;
    }
    
    return null;
}






exports.jsontoback = jsontoback;
