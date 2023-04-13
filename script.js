const app = {};

app.randomTime = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

app.randomHole = (holes) => {
    const index = Math.floor(Math.random() * app.holes.length);
    const hole = app.holes[index];
    
    if(hole === app.lastHole) {
        return app.randomHole(holes);
    }
    
    app.lastHole = hole;
    return hole;
}

app.peep = () => {
    const time = app.randomTime(500, 1000);
    const hole = app.randomHole(app.holes);
    hole.classList.add('up');

    setTimeout(() => {
        hole.classList.remove('up');
        if(!app.timeUp) app.peep();
        }, time);
    }

app.startGame = () => {
    app.score.textContent = 0;
    app.timeUp = false; // for restarts
    app.counter = 0; // for restarts
    app.peep();

    setTimeout(() => app.timeUp = true, 10000);
}

app.bonk = (e) => {
    if(!e.isTrusted){
        return; // cheater!
    } else {
        app.counter++;
        this.parentNode.classList.remove('up');
        app.score.textContent = app.counter;
    }
}

app.init = () => {
    app.holes = document.querySelectorAll('.hole');
    app.moles = document.querySelectorAll('.mole');
    app.score = document.querySelector('.score');
    app.button = document.querySelector('.button');

    app.lastHole;
    app.timeUp = false;
    app.counter = 0;
    
    app.moles.forEach = (mole) => {
        mole.addEventListener('click', app.bonk);
    }

    app.button.addEventListener('click', app.startGame);
}

app.init();