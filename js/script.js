const getRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
};

const msgEl = document.getElementById('msg'),
randomNum = getRandomNumber();

console.log('Number:', randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Write what user speaks
const writeMessage = msg => {
    console.log(msg);
    msgEl.innerHTML = `
<div>You said: </div>
<span class="box">${msg}</span>
`;
console.log(msg);
}

// Check msg against number
const checkNumber = msg => {
    const num = +msg;

    // Check if valid number
    if(Number.isNaN(num)){
        msgEl.innerHTML += '<div>That is not a valid number </div>';
        return;
    }

    // Check in range
    if(num > 100 || num < 1){
        msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
        return;
    }

    // Check number
    if(num === randomNum){
        document.body.innerHTML =  `
            <h2> You have guessed the number <br><br>
            It was ${num}</h2>
            <button class="play-again" id="play-again">Play Again</button>
        `;
    } else if (num > randomNum){
        msgEl.innerHTML += '<div>Go Lower</div>'
    } else {
        msgEl.innerHTML += '<div>Go Higher</div>'
    }
}

// Capture user speak
const onSpeak = e => {
    console.log(123);
    
}

// Speak result
recognition.addEventListener('result', (e) => {
    const msg = e.results[0][0].transcript;
    writeMessage(msg);
    checkNumber(msg);
});

// End SR service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
    e.target.id == 'play-again' ? window.location.reload() : null;
})