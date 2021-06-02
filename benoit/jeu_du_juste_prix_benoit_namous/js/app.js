window.onload = choosePic;
let images = new Array("images/casque.png","images/casquette.png","images/chaussure.png","images/sac.png","images/stylo.png");
let valeurObjet = new Array (83,23,75,44,19);
let suppositions = document.querySelector('.suppositions');
let dernierResultat = document.querySelector('.dernierResultat');
let plusOuMoins = document.querySelector('.plusOuMoins');

let boutonValider = document.querySelector('.boutonValider');
let saisieUser = document.querySelector('.saisieUser');

let audiogagne = new Audio('songagne.mp3');
let audioperd = new Audio('sonperd.mp3');
let compteur = 1;
let resetButton= document.querySelector('.boutonReset');


function choosePic() {
   let randomNum = Math.floor(Math.random() * images.length);
   let prixObjet = valeurObjet[randomNum];
    
  
   
   console.log(prixObjet);
   console.log(randomNum);
   document.getElementById("mesimages").src = images[randomNum];
   document.getElementById("prixObjet").value = prixObjet;
   resetButton.style.display='none';   
}

function checkGuess(){
    let userGuess = Number(saisieUser.value);
    let prixObjet = document.getElementById('prixObjet').value;
    if (compteur === 1) {
      suppositions.textContent = 'Valeurs précédentes : ';
    }
    suppositions.textContent += userGuess + '€ ';
  
    if (userGuess == prixObjet) {
      audiogagne.play();
      dernierResultat.textContent = 'Bravo, vous avez trouvé le juste prix !';
      dernierResultat.style.backgroundColor = 'rgb(78, 31, 155';
      plusOuMoins.textContent = '';
      setGameOver();
    } else if (compteur === 10) {
      audioperd.play();
      dernierResultat.textContent = 'PERDU ! Vous avez atteint vos dix tentatives !';
       setGameOver();
    } else {
      dernierResultat.textContent = 'Faux !';
      dernierResultat.style.backgroundColor = 'red';
       if (userGuess < prixObjet) {
         plusOuMoins.textContent = "C'est plus !"; 
       } else if (userGuess > prixObjet) {
         plusOuMoins.textContent = "C'est moins !";
       }
    }
    
    compteur++;
    saisieUser.value = '';
    saisieUser.focus();
  }

  boutonValider.addEventListener('click', checkGuess);

  function setGameOver() {
    saisieUser.disabled = true;
    boutonValider.disabled = true;
    resetButton.disabled=false;
    resetButton.style.display='block';   
   // resetButton = document.getElementsByClassName('boutonReset');
        
    resetButton.addEventListener('click', resetGame);
    
   // if (resetButton.style.display!='block'){
   //  resetButton.style.display = 'block';    
   // document.getElementsByClassName('boutonReset').addEventListener('click', resetGame); 
   }

  

  function resetGame() {
    compteur = 1;
  
    let resetParas = document.querySelectorAll('.paraResult p');
    for (let i = 0 ; i < resetParas.length ; i++) {
      resetParas[i].textContent = '';
    }
  
    resetButton.parentNode.removeChild(resetButton);
  
    saisieUser.disabled = false;
    boutonValider.disabled = false;
    saisieUser.value = '';
    saisieUser.focus();
  
    dernierResultat.style.backgroundColor = '#7ABDFB';

  
    
    document.location.reload();
    
  }


