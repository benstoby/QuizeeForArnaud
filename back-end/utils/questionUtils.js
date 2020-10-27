function setReponse(testKey, idQuestion, idAnswer, answer, client) {
    
    client.hmset(testKey, 'question'+idQuestion+'_answer'+idAnswer, answer.choice ,'question'+idQuestion+'_answer'+idAnswer+'_isgood', answer.isgood);

}

var setQuestion = function (testKey, idQuestion, question, client, res) {
    
    client.hmset(testKey, 'question'+idQuestion, question.question, 'help'+idQuestion, question.help);
    for(var i = 0; i < question.answers.length; i++)
    {
        setReponse(testKey, idQuestion, i, question.answers[i], client, res);
    }
}


exports.setQuestion = setQuestion;