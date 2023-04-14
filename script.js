const game = {};

game.randomTime = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

game.randomHole = (holes) => {
    const index = Math.floor(Math.random() * game.holesArray.length);
    const hole = game.holesArray[index];
    
    if (hole === game.lastHole) {
        return game.randomHole(hole);
    } //prevents repeating holes
    
    game.lastHole = hole;
    return hole;
}

game.peep = () => {
    const time = game.randomTime(500, 1000);
    const hole = game.randomHole(game.holesArray);
    hole.classList.add('up');

    setTimeout(() => {
        hole.classList.remove('up');
        if (!game.timeUp) game.peep();
        }, time);
    }

game.startGame = () => {
    game.score.textContent = 0; // for restarts
    game.timeUp = false; // for restarts
    game.counter = 0; // for restarts
    game.peep();

    setTimeout(() => game.timeUp = true, 10000);
}

game.clickHandler = (event) => {
    
    if(event.isTrusted === false){
        return; // cheating cheaters
    } else {
        game.counter++;
        event.currentTarget.classList.remove('up'); // .up is removed from .hole
        game.score.textContent = game.counter;
    }
}

game.init = () => {
    game.holesArray = Array.from(document.querySelectorAll('.hole'));
    game.digArray = Array.from(document.querySelectorAll('.dig'));
    game.score = document.querySelector('.score');
    game.button = document.querySelector('.button');

    game.lastHole;
    game.timeUp = false;
    game.counter = 0;

    game.button.addEventListener('click', game.startGame);

    game.digArray.forEach(dig => dig.addEventListener('click', game.clickHandler));
}

game.init();