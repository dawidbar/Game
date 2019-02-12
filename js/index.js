'use strict';

var newgame = document.getElementById("button")
var rock = document.getElementById("button1");
var paper = document.getElementById("button2");
var scissors = document.getElementById("button3");
var cScorepoints = document.getElementById("cscore");
var pScorepoints = document.getElementById("pscore");
var cpoint = 0;
var ppoint = 0;
var rounds;
var howmanyrounds = document.getElementById("rounds1");


paper.addEventListener("click", function () {
    playerMove("PAPER");
});
rock.addEventListener("click", function () {
    playerMove("ROCK");
});
scissors.addEventListener("click", function () {
    playerMove("SCISSORS");
});

function playerMove(playerPick) {
    result(playerPick, computerMove());
}

function computerMove() {
    var cMove = Math.floor(Math.random() * 3 + 1);
    if (cMove == 1) {
        return 'PAPER';
    } else if (cMove == 2) {
        return 'ROCK';
    } else if (cMove == 3) {
        return 'SCISSORS';
    }
}

function result(playerMove, computerMove) {
    if (playerMove === computerMove) {
        output.innerHTML = 'Remis! Wybrałeś: ' + playerMove + ' komputer wybrał: ' + computerMove;
    } else if (
        (playerMove === "ROCK" && computerMove === "PAPER") ||
        (playerMove === "SCISSORS" && computerMove === "ROCK") ||
        (playerMove === "PAPER" && computerMove === "SCISSORS")
    ) {
        output.innerHTML = 'Komputer zdobywa punkt! Wybrałeś: ' + playerMove + ' komputer wybrał: ' + computerMove;
        cpoint++;
    } else {
        output.innerHTML = 'Zdobywasz punkt! Wybrałeś: ' + playerMove + ' komputer wybrał: ' + computerMove;
        ppoint++;
    }
    points();
    gameover();
};

function points() {
    cScorepoints.innerHTML = cpoint;
    pScorepoints.innerHTML = ppoint;
};

newgame.addEventListener("click", gamestart);

function gamestart() {
    rounds = prompt("Ile rund?");
    if (isNaN(rounds)) {
        output.innerHTML = 'Wpisz liczbę rund';
    } else if (rounds <= 0) {
        output.innerHTML = 'Liczba rund musi być więkasza od zera';
    } else {
        output.innerHTML = 'Powodzenia!';
        ppoint = 0;
        cpoint = 0;
        cScorepoints.innerHTML = 0;
        pScorepoints.innerHTML = 0;
        rock.disabled = false;
        rock.classList.toggle('btn-disabled');
        paper.disabled = false;
        paper.classList.toggle('btn-disabled');
        scissors.disabled = false;
        scissors.classList.toggle('btn-disabled');
    }
    round();
};

function round() {
    howmanyrounds.innerHTML = rounds;
};

function gameover() {
    if (ppoint == rounds) {
        output.innerHTML = 'Wygrałeś! Zdobyłeś: ' + ppoint + ' ptk';
        rock.disabled = true;
        rock.classList.toggle('btn-disabled');
        paper.disabled = true;
        paper.classList.toggle('btn-disabled');
        scissors.disabled = true;
        scissors.classList.toggle('btn-disabled');
    } else if (cpoint == rounds) {
        output.innerHTML = 'Niestety tym razem się nie udało! Wygrywa Komputer!';
        rock.disabled = true;
        rock.classList.toggle('btn-disabled');
        paper.disabled = true;
        paper.classList.toggle('btn-disabled');
        scissors.disabled = true;
        scissors.classList.toggle('btn-disabled');
    }
};