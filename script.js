
var randIndex = Math.floor(Math.random() * (words.length - 1));
var wordle = words[randIndex];
var guessWord = '';
var index = 0;
var typeBoxEnable = false;
var round = 0;
var rminInd = 0;
var rmaxInd = 0;
var solvedRow = false;
var win = false;
rminInd += round * 5;
rmaxInd += rminInd + 5;
var congs = " 🥳 Congratulations! \n You cracked the word! 🎉 \n Smart thinking and sharp guessing — you're a Wordle master! \n Play again and keep the streak alive! 🔥🧠"
var gameover = "😢 Out of guesses!\nThe word was [WORD].\nDon't worry — every loss is one step closer to a win! 💪\nGive it another shot and try to beat the next word! 🔄🧩"
function displayMessageBox(text) {
    var $ = document.querySelector('.msg')
    var $p = document.querySelector('.msg .text')
    $p.innerHTML = text;
    $.classList.remove('msg-off');
    $.classList.add('msg-on');
    animateCSS($,'bounceIn')
}
function hideMessageBox() {
    var $ = document.querySelector('.msg')
    var $p = document.querySelector('.msg .text')
    $.classList.remove('msg-on');
    $.classList.add('msg-off');
}
function setBoxchar(n, c) {
    flipBoxX(n);
    document.querySelectorAll("input")[n].value = c.toUpperCase();

    if (guessWord.length < 5) {
        guessWord = guessWord + c;
    }
}

function setBoxcharempty(n) {
    flipBoxY(n);
    document.querySelectorAll("input")[n].value = " ";
    if (guessWord.length >= 0) {
        guessWord = guessWord.slice(0, -1);
    }
}
function setTypeBox(value) {
    typeBoxEnable = value;
    console.log('TypeBox Set to:' + value);
    hideMessageBox();
}
function restart() {

}
function clearGrid(){
    guessWord = '';
    index = 0;
    round = 0;
    rminInd = 0;
    rmaxInd = 0;
    solvedRow = false;
    win = false;
    rminInd += round * 5;
    rmaxInd += rminInd + 5;
    for(var i = 0; i<10;i++){
        document.querySelectorAll("input")[n].value ='';
        
    }

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
function restart(min, max) {
    for (var i = min; i < max; i++) {
        setBoxcharempty(i);
    }
    index = min;
}
function correctWord(min, max) {
    typeBoxEnable = false;
    correctRow(min, max);
    correctRow(min, max);
    setTimeout(() => {
        displayMessageBox(congs);
    }, 1500);
}
function wrongWord(min, max) {
    typeBoxEnable = true;
    wrongRow(min, max);
    wrongRow(min, max);
}
function indexify(s, g, w, e) {
    // Collect all animation promises
    let promises = [];
    for (var i = 0; i < 5; i++) {
        let boxIndex = s + i;
        if (g[i] == w[i] && e) {
            promises.push(animateCSS(document.querySelectorAll('.box')[boxIndex], 'zoomIn').then(() => {
                document.querySelectorAll('.box')[boxIndex].classList.add('solvedBox');
            }));
        } else if (w.includes(g[i]) && e) {
            promises.push(animateCSS(document.querySelectorAll('.box')[boxIndex], 'zoomIn').then(() => {
                document.querySelectorAll('.box')[boxIndex].classList.add('hintBox');
            }));
        } else {
            promises.push(animateCSS(document.querySelectorAll('.box')[boxIndex], 'zoomIn').then(() => {
                document.querySelectorAll('.box')[boxIndex].classList.add('wrongBox');
            }));
        }
    }
    // Return a promise that resolves when all animations are done
    return Promise.all(promises);
}
// function nextRow(){

// }
document.querySelector('.kbrd').addEventListener("keydown", solveRound);
document.addEventListener("click", function () {
    document.querySelector('.kbrd').focus();
})

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
                win = true;
                indexify(rminInd, guessWord, wordle, true).then(() => {
                    correctWord(rminInd, rmaxInd);
                })
                console.log(guessWord + '===' + wordle);

            } else {
                if (!words.includes(guessWord)) {
                    console.log(guessWord + ' does not exits!');
                    win = false;
                    indexify(rminInd, guessWord, wordle, false).then(() => {
                        wrongWord(rminInd, rmaxInd);;
                    }).then(() => {
                        clearRow(rminInd, rmaxInd);
                    });
                } else {
                    solvedRow = true;
                    win = false;
                    indexify(rminInd, guessWord, wordle, true).then(() => {
                        wrongWord(rminInd, rmaxInd);
                    });
                    console.log(guessWord + '!!=' + wordle);
                    guessWord = '';
                }
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
                console.log('adding element at ' + index + ', next index: ' + (index + 1));
                (index < rmaxInd && index >= rminInd) ? setBoxchar(index, event.key) : setBoxcharempty(index)
                if (index < rmaxInd) {
                    index++;
                }
            } else {
                console.log('No change! invalid key: ' + event.keyCode + ' current index: ' + index)
            }

        }

        if (index < rminInd) {
            w
            console.log('adusjusting index ...( ' + index + ' -> ' + rminInd + ')')
            index = rminInd;
        } else if (index >= rmaxInd) {
            console.log('adusjusting index ...( ' + index + ' -> ' + (rmaxInd + 1) + ')')
            index = rmaxInd;
        } else if (index > 30) {
            console.log('game over...');
            displayMessageBox();
            typeBoxEnable = false;
        }
    } else {
        console.log("can't type in box")
    }
}

function flipBoxX(n) {
    var element = document.querySelectorAll('.box')[n];
    animateCSS(element, 'flipInX')
}
function flipBoxY(n) {
    var element = document.querySelectorAll('.box')[n];
    animateCSS(element, 'flipInY')
}
function correctRow(min, max) {
    for (var i = min; i < max; i++) {
        console.log(max);
        var element = document.querySelectorAll('.box')[i];
        animateCSS(element, 'flash')

    }
}
function correctBox(n) {
    var element = document.querySelectorAll('.box')[n];
    animateCSS(element, 'zoomIn');
    element.classList.add('solvedBox');
}
function hintBox(n) {
    var element = document.querySelectorAll('.box')[n];
    animateCSS(element, 'zoomIn');
    element.classList.add('hintBox');
}
function wrongBox(n) {
    var element = document.querySelectorAll('.box')[n];
    animateCSS(element, 'zoomIn');
    element.classList.add('wrongBox');
}
function wrongRow(min, max) {
    for (var i = min; i < max; i++) {
        var element = document.querySelectorAll('.box')[i];
        animateCSS(element, 'shakeX');
    }
}
function clearRow(min, max) {
    for (var i = min; i < max; i++) {

        var element = document.querySelectorAll('.box')[i];
        console.log(i + '...elem:' + element)
        element.classList.remove('wrongBox');
    }
}

const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const node = element;

        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });


const heading = document.querySelector('.heading');
animateCSS(heading, 'rubberBand').then(() => {
    animateCSS(heading, 'bounce');
});
