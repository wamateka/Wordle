var randIndex = Math.floor(Math.random() * (words.length - 1));
var wordle = words[randIndex];
var guessWord = '';
var index = 0;
var typeBoxEnable = false;
var round = 0;
var rminInd = 0;
var rmaxInd = 0;
var solvedRow = false;
rminInd += round * 5;
rmaxInd += rminInd + 5;

function setBoxchar(n, c) {
    document.querySelectorAll("input")[n].value = c.toUpperCase();
    if (guessWord.length < 5) {
        guessWord = guessWord + c.toUpperCase()
    }
}

function setBoxcharempty(n) {
    document.querySelectorAll("input")[n].value = " ";
    if (guessWord.length >= 0) {
        guessWord = guessWord.slice(0, -1);
    }
}
function setTypeBox(value) {
    typeBoxEnable = value;
    console.log('TypeBox Set to:' + value)
}
function clearRow(min, max) {
    for (var i = min; i < max + 1; i++) {
        setBoxcharempty(i);
    }
}
function checkWord(word1, word2) {
    return word1 === word2;
}
function validWord() {
    return words.includes(guessWord);
}
// function indexify(){
//     for(var i = 0; i<5; i++){
//         if(guessWord[i]==wordle[i]){

//         }
//     }
// }
// function nextRow(){

// }
document.addEventListener("keydown", solveRound);


function solveRound(event) {
    if (solvedRow) {
        console.log('Updating range .. (->,->)')
        round++;
        solvedRow = false;
        rminInd = round * 5;
        rmaxInd = rminInd + 5;
        console.log('Updating range .. (->,->)')
    }
    console.log('Row range: (' + rminInd + ' , ' + rmaxInd + ') ');
    if (typeBoxEnable) {
        if (event.key == "Enter") {
            if (checkWord(guessWord, wordle)) {
                solvedRow = true;
                console.log(guessWord + '===' + wordle);

            } else {
                solvedRow = true;
                console.log(guessWord + '!!=' + wordle);
            }
        }


        if (event.key == "Backspace") {
            console.log('removing element at ' + index + ' next index: ' + (index - 1));
            if (index > rminInd) {
                index--;
                setBoxcharempty(index);

            }

        } else {
            if (event.keyCode >= 65 && event.keyCode <= 95) {
                console.log('adding element at ' + index + ', next index: ' + (index+1));
                (index<rmaxInd && index>=rminInd)? setBoxchar(index, event.key):setBoxcharempty(index)
                if (index < rmaxInd) {
                    index++;
                }
            } else {
                console.log('No change! invalid key: ' + event.keyCode +' current index: '+index)
            }

        }

        if (index < rminInd) {
            console.log('adusjusting index ...( '+index+' -> '+rminInd+')')
            index = rminInd;
        } else if (index >= rmaxInd) {
            console.log('adusjusting index ...( '+index+' -> '+(rmaxInd+1)+')')
            index = rmaxInd;
        }else if (index>30){
            console.log('game over...')
            typeBoxEnable = false;
        }
    } else {
        console.log("can't type in box")
    }
}