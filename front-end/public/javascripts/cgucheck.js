const formulaire = document.getElementById('form');

formulaire.addEventListener("submit", function(event){
   
    if(document.getElementById('cgu').checked == false || document.getElementById('confi').checked == false ){
        document.getElementById("check_error").classList.remove('hide');
        event.preventDefault();
    }
    
});