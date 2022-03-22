// Table sizes
const maxLeft       = 955;
const maxTop        = 455;

// Menu BTN
let playBtn         = document.querySelector('#play-btn');
let dificultyBtn    = document.querySelector('#dificulty-btn');
let themesBtn       = document.querySelector('#themes-btn');

// Selectors
let dot             = document.querySelector('#red-dot');
let puntuation      = document.querySelector('#puntuation');
let gameOver        = document.querySelector('#gameOver');
let crono           = document.querySelector('#crono');
let container       = document.querySelector('.container');
let mainMenu        = document.querySelector('#main-menu');
let difMenu         = document.querySelector('#dif-selector');
let themeMenu       = document.querySelector('#themes');
let difBtns         = document.querySelectorAll('.dif-btn');
let themeBtns       = document.querySelectorAll('.theme-btn');

// Dificulty
const dificultyArray= {
    ['easy']:       { initialTime: 60, size: 70, maxFailures: 6 },
    ['medium']:     { initialTime: 30, size: 50, maxFailures: 3 },
    ['hard']:       { initialTime: 10, size: 20, maxFailures: 1 }
}
let actualDificulty = dificultyArray['medium'];
// Themes
const themesArray   = {
    ['classic']: {
        background: '#212121',
        primary: '#ff8c00',
        secondary: '#ff8c0035',
        crono: '#0000aa',
        puntuation: '#00aa00',
        game: '#ff0000',
        dot: '#ff0000'
    },
    ['galaxy']: {
        background: '#1b0021',
        primary: '#b7009b',
        secondary: '#fa71ff35',
        crono: '#b7009b',
        puntuation: '#b7009b',
        game: '#ff92ef',
        dot: '#b7009b'
    },
    ['ligth']: {
        background: '#d0d0d0',
        primary: '#003ffe',
        secondary: '#003ffe35',
        crono: '#003ffe',
        puntuation: '#003ffe',
        game: '#ed0000',
        dot: '#ba0000'
    }
}

// Valirables
let clicked         = false;
let totalPoints     = 0;
let remLives        = 0;
let time            = 0;
let startCrono;



/* GO PLAY */
playBtn.onclick = () => {

    // Tamaño del punto segun dificultad
    dot.style.height        = `${actualDificulty.size}px`;
    dot.style.width         = `${actualDificulty.size}px`;

    // Reinicio los marcadores
    totalPoints             = 0;
    time                    = actualDificulty.initialTime;
    remLives                = actualDificulty.maxFailures;
    gameOver.innerHTML      = `Lives: ${remLives}`;
    puntuation.innerHTML    = '0';
    transformClock(time);

    // Escondo el menu principal para comenzar a jugar
    mainMenu.style.display  ='none';
    container.style.display ='block';

    startCrono = setInterval(() => {
        time--;
        transformClock(time);
        if (time <= 0) gameOverFnc();
    }, 1000);

};

/* SET DIFICULTY */
dificultyBtn.onclick = () => {
    mainMenu.style.display = 'none';
    difMenu.style.display  = 'block';
};

for (i = 0; i < difBtns.length; i++) {
    difBtns[i].addEventListener('click', function() {
        actualDificulty = dificultyArray[this.value];
        difMenu.style.display  = 'none';
        mainMenu.style.display = 'block';
    });
};

/* THEMES */
themesBtn.onclick = () => {
    mainMenu.style.display = 'none';
    themeMenu.style.display= 'block';
};

for (i = 0; i < themeBtns.length; i++) {
    themeBtns[i].addEventListener('click', function() {
        
        let r = document.querySelector(':root');
        
        r.style.setProperty('--background', themesArray[this.value].background);
        r.style.setProperty('--primary',    themesArray[this.value].primary);
        r.style.setProperty('--secondary',  themesArray[this.value].secondary);
        r.style.setProperty('--crono',      themesArray[this.value].crono);
        r.style.setProperty('--puntuation', themesArray[this.value].puntuation);
        r.style.setProperty('--game-over',  themesArray[this.value].game);
        r.style.setProperty('--dot',        themesArray[this.value].dot);
        
        themeMenu.style.display= 'none';
        mainMenu.style.display = 'block';
        
    });
};

/* MAIN GAME */
// Cuando hago click en el punto rojo
dot.addEventListener('click', () => {

    totalPoints+=1;                         // Sumo puntos al marcador.
    time+=2;                                // Añado segundos al tiempo para hacer el juego infinito
    puntuation.innerHTML = totalPoints;     // Actualizo el marcador
    clicked = true;                         // Escondo el punto, lo muevo aleatorio y lo muestro
    // Escondo el marcador para situarlo en una nueva posicion y lo muestro al segundo
    dot.style.display       = 'none';
    dot.style.marginLeft    = `${Math.random()*maxLeft}px`;
    dot.style.marginTop     = `${Math.random()*maxTop}px`;
    setTimeout(() => { clicked = false; }, 2);
    setTimeout(() => { dot.style.display='block'; }, 1000);
});

// Cuando se cliquea en el panel del juego
container.addEventListener('click',() => {

    // Si no se ha clicado en el punto rojo
    setTimeout( () => {
        if (!clicked) {
            remLives--;                           // Añado un fallo
            gameOver.innerHTML = `Lives: ${remLives}`;
            if ( remLives <= 0 ) gameOverFnc();   // Si hay mas de X fallos -> Game Over
        };
    },1);

});

function gameOverFnc() {
    gameOver.innerHTML      = 'Game Over';
    container.style.display = 'none';
    mainMenu.style.display  = 'block';
    clearInterval(startCrono);
};

function transformClock(time) {
    let min = 0, sec = time;
    while (sec>=60) { sec -= 60; min++; }
    crono.innerHTML=`${parseClock(min)}:${parseClock(sec)}`;
}

function parseClock(data) {
    if ( data < 10 ) return '0'+data;
    else return data;
};