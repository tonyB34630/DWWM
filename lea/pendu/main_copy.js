// Table de mots à deviner
const word_table = ["communication",
                    "embarrassment",
                    "administration",
                    "constellation",
                    "preoccupation",
                    "recommendation",
                    "inappropriate",
                    "discrimination",
                    "consideration",
                    "rehabilitation",
                    "extraterrestrial",
                    "characteristic",
                    "identification",
                    "disappointment",
                    "qualification",
                    "revolutionary",
                    "responsibility",
                    "confrontation",
                    "investigation",
                    "strikebreaker"]

// les différentes images du pendu
var myPix = new Array("img/img1.png", "img/img2.png", "img/img3.png", "img/img4.png", "img/img5.png", "img/img6.png", "img/img7.png", "img/img8.png", "img/img9.png", "img/img10.png");
const alphabet = "abcdefghijklmnopqrstuvwxyz";


var guess_count = 10; // nombre d'essais par lettre cliquée
var submit_count = 3; // nombre d'essais par mot proposé
var guessSubmit = document.getElementById("guessButton");
guessSubmit.style.display = "none";

var history_list = [];
var audioWon = document.getElementById("GameWon");
/* =========================================== */

// Choose random word from list
function chooseWord(word_list) {
    var randomNum = Math.floor(Math.random() * word_list.length);
    var word = word_list[randomNum];
    return word;
}

// Show Hangman
function choosePic () {
    document.getElementById("hangman").src = myPix[guess_count-1];
    //console.log(myPix[guess_count]);
}

// Assign button to word letter
function wordToButton(word) {
    var letter_list = [];
    for(var i in word) {
        var btn_letter = document.createElement("BUTTON");
        btn_letter.style.color = "transparent";
        btn_letter.style.backgroundColor = "transparent";
        btn_letter.style.border = "transparent";
        btn_letter.style.borderBottom = "thick solid white";
        var letter = word[i];
        btn_letter.innerHTML = letter;
        letter_list.push(letter);
        btn_letter.setAttribute("class", letter+" btn-letter");
        document.getElementById("word_guess").appendChild(btn_letter);
    }
    return letter_list;
}



// Assign button to alphabet letter
function keyboard(letter, guess_list) {
    var btn_letter = document.createElement("BUTTON");
    btn_letter.innerHTML = letter;
    btn_letter.setAttribute("id", "btn_"+ letter);
    btn_letter.setAttribute("class", "keyboard_btn btn");
    document.getElementById("keyboard").appendChild(btn_letter);
    btn_letter.className += " " + "btn_outline_light";
    btn_letter.onclick = function() {checkGuess(btn_letter, guess_word, btn_letter.innerText, guess_word)};
    return btn_letter;
  
}

// Désactive le bouton
function disableButton(btn) {
    
    btn.disabled = true;
    
}

// Compte l'occurrence d'une lettre dans un mot
function countOcurrences(str, value) {
    var regExp = new RegExp(value, "gi");
    var k = (str.match(regExp) || []).length;
    return k;
  }

// on vérifie que la lettre est dans le mot pour la faire apparaitre et changer sa couleur au clavier
function letterInWord(str) {
    var history = [];
    console.log("The letter " + str + " is in the word.");
    for (var j = 0; j<k; j++) {
        document.getElementsByClassName(str)[j].style.color='white';
        history.push(str);
    }
    
    document.getElementById("btn_"+str).style.color='green';
    document.getElementById("btn_"+str).style.borderColor='green';
    return history;
}

// si la lettre n'est pas dans le mot, elle apparait en rouge
function letterNotInWord(str) {
    console.log("The letter " + str + " isn't in the word.");
    document.getElementById("btn_"+str).style.color='red';
    document.getElementById("btn_"+str).style.borderColor='red';
    choosePic();
}

// on vérifie que le mot entré par le joueur correspond au mot sélectionné
function checkWord(guess_word) {
    var player_word = window.prompt("Enter your guess: ");
    
    if(submit_count>0) {
        if(player_word == guess_word) {
            
            setGameOver("Congratulations !!! 🎉");
        }
        else {
            alert("Try again ! " + "You have " + submit_count + " life/lives.");
        }
        submit_count--;
    } else {
        if(player_word == guess_word) {
            
            setGameOver("Congratulations !!! 🎉");
        }
        else {
            setGameOver("Game Over ! 💀");
        }
    }
    
}

// initialise la fin du jeu en affichant un msg correspondant à une victoire ou une défaite
function setGameOver(msg) {
    
    if(msg == "Congratulations !!! 🎉") {
        audioWon.play();
        alert(msg + "\n" + " The word was "+ guess_word + "\n"+"Restart the Game ?");
        
    }
    else {
        alert(msg + "\n" + " The word was "+ guess_word + "\n"+"Restart the Game ?");
    }
    document.location.reload();
}

// on vérifie que les lettres entrées au clavier sont bien les mêmes que les lettres du mot
function checkGuess(btn, word, str, guess_word) {
    
    if(guess_count>0) {
        disableButton(btn);
        k=countOcurrences(word, str);
        if(k!=0) {
            history_list += letterInWord(str)
            history_list = history_list.replace(/,/g,"");
            
            if (history_list.length === guess_word.length){
            
                setGameOver("Congratulations !!! 🎉");
            }
            else {
                alert("Well done ! Continue !" + "\n" + "You have " + guess_count + " life/lives left.");
            }
            
        }
        else {
            letterNotInWord(str);
            
            if(history_list.length === guess_word.length) {
                
                setGameOver("Congratulations !!! 🎉");
            }
            else {
                alert("Try again ! " + "\n" + "You have " + guess_count + " life/lives left.");
            }
            
            guess_count--;
        }
        
    }
    else {
        setGameOver("Game Over 💀");
    }
    
}
/* ================================== */

var guess_word = chooseWord(word_table); // mot à deviner, choisi par le jeu

// au clique du bouton start, on initialise un plateau de jeu et on lance une nouvelle partie
var begin_button = document.getElementById("start");
    begin_button.onclick = function start() {
        begin_button.style.display = "none";
        guessSubmit.style.display = "block";
        console.log(guess_word);
        var guess_list = wordToButton(guess_word); // boutons correspondants aux lettres à deviner
        

        for(var i in alphabet) {
            var alpha_btn = keyboard(alphabet[i]);
        }
        guessSubmit.addEventListener("click", function (event) {
            checkWord(guess_word);
         })
        
    }







