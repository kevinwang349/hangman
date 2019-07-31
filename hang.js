document.addEventListener("DOMContentLoaded", init);
const answer = 'zebras';
let current = new Array(answer.length).fill('_ ');
let guessed = '';
let input, word, trash, life, butt, status, man;
let alive = true;
let lives = 6;
function init() {
    input = document.getElementById('guess');
    word = document.getElementById('word');
    trash = document.getElementById('trash');
    life = document.getElementById('lives');
    butt = document.getElementById('butt');
    status = document.getElementById('status');
    man = document.getElementById('man');
    trash.innerText = 'Wrong letters: ';
    updateGuess();
    input.addEventListener('input', guess);
}
function updateGuess() {
    word.innerText = current.join('');
}
function guess(e) {
    if (alive) {
        const char = e.data;
        if (!guessed.includes(char)) {
            guessed += char;
        } else {
            status.innerText = 'You already guessed that.';
            return;
        }
        if (answer.includes(char)) {
            status.innerHTML = `<b class='win'>Correct!</b> There are <i>${char}</i>'s in this word.`;
            for (let i = 0; i < answer.length; i++) {
                if (char === answer[i]) {
                    current[i] = char;
                    updateGuess();
                }
            } if (!current.includes('_ ')) {
                butt.innerText = 'Replay?';
                input.placeholder = 'You won!';
                life.innerHTML = `You won with <b>${lives}</b> lives left. <b class='win'>Congratulations!</b>`;
                alive = false;
                input.value = '';
                return;
            }
        } else {
            trash.innerText += char;
            status.innerHTML = `There are <b>no</b> <i>${char}</i>'s in this word.`
            lives--;
            if (lives === 0) {
                butt.innerText = 'Replay?';
                life.innerText = `You lost. Try again!`;
                input.placeholder = 'You lost.';
                man.src = 'dead.png';
                alive = false;
                input.value = '';
                return;
            } else {
                life.innerHTML = `You have <b>${lives}</b> lives left`;
                if (lives === 5) {
                    man.src = '5l.png';
                } else if (lives === 4) {
                    man.src = '4l.png';
                } else if (lives === 3) {
                    man.src = '3l.png';
                } else if (lives === 2) {
                    man.src = '2l.png';
                } else if (lives === 1) {
                    man.src = '1l.png';
                }
            }
        }
        butt.addEventListener("click", restart);
        function restart() {
            location.reload();
        }
        input.value = '';
    } input.value = '';
}