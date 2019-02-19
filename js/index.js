'use strict';

var newgame = document.getElementById("button")
var rock = document.getElementById("button1");
var paper = document.getElementById("button2");
var scissors = document.getElementById("button3");
var cScorepoints = document.getElementById("cscore");
var pScorepoints = document.getElementById("pscore");
var tablemaker = document.querySelector('.tablepoint');
var params = {
    cpoint: 0,
    ppoint: 0,
    rounds: 0,
    roundsCounter: 0,
    progress: []
};
var rounds;
var howmanyrounds = document.getElementById("rounds1");
var gamebtn = document.querySelectorAll(".player-move");


for (var i = 0; i < gamebtn.length; i++) {
    gamebtn[i].addEventListener("click", function () {
        var btnchoice = this.getAttribute("data-move");
        playerMove(btnchoice);
    });
};

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
        params.roundsCounter++;
        params.winner = "Remis";
    } else if (
        (playerMove === "ROCK" && computerMove === "PAPER") ||
        (playerMove === "SCISSORS" && computerMove === "ROCK") ||
        (playerMove === "PAPER" && computerMove === "SCISSORS")
    ) {
        output.innerHTML = 'Komputer zdobywa punkt! Wybrałeś: ' + playerMove + ' komputer wybrał: ' + computerMove;
        params.cpoint++;
        params.roundsCounter++;
        params.lost++;
        params.winner = "Komputer";
    } else {
        output.innerHTML = 'Zdobywasz punkt! Wybrałeś: ' + playerMove + ' komputer wybrał: ' + computerMove;
        params.ppoint++;
        params.roundsCounter++;
        params.wins++;
        params.winner = "Gracz";
    }
    params.progress.push({
        gameRounds: params.roundsCounter,
        gamePlayerMove: playerMove,
        gameComputerMove: computerMove,
        roundWinner: params.winner,
        finalResult: params.wins + ' - ' + params.lost
    })
    points();
    gameover();
};

function points() {
    cScorepoints.innerHTML = params.cpoint;
    pScorepoints.innerHTML = params.ppoint;
};

newgame.addEventListener("click", gamestart);

function gamestart() {
    params.rounds = prompt("Ile rund?");
    if (isNaN(params.rounds)) {
        output.innerHTML = 'Wpisz liczbę rund';
    } else if (params.rounds <= 0) {
        output.innerHTML = 'Liczba rund musi być więkasza od zera';
    } else {
        output.innerHTML = 'Powodzenia!';
        params.ppoint = 0;
        params.cpoint = 0;
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
    refresh()
};

function round() {
    howmanyrounds.innerHTML = params.rounds;
};

function gameover() {
    var header = document.querySelector('.header');
    if (params.ppoint == params.rounds) {
        header.innerHTML = 'Wygrałeś! Zdobyłeś: ' + params.ppoint + ' ptk';
        rock.disabled = true;
        rock.classList.toggle('btn-disabled');
        paper.disabled = true;
        paper.classList.toggle('btn-disabled');
        scissors.disabled = true;
        scissors.classList.toggle('btn-disabled');
        showModal()
    } else if (params.cpoint == params.rounds) {
        header.innerHTML = 'Niestety tym razem się nie udało! Wygrywa Komputer!';
        rock.disabled = true;
        rock.classList.toggle('btn-disabled');
        paper.disabled = true;
        paper.classList.toggle('btn-disabled');
        scissors.disabled = true;
        scissors.classList.toggle('btn-disabled');
        showModal()
    }
};

//modal
function showModal(){
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.add('show');
    var modal = document.querySelector('.modal');
    modal.classList.add('show');
    buildTable()
}

var hideModal = function (event) {
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal .close');
for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', hideModal);
}

document.querySelector('#modal-overlay').addEventListener('click', hideModal);

var modals = document.querySelectorAll('.modal');

for (var i = 0; i < modals.length; i++) {
    modals[i].addEventListener('click', function (event) {
        event.stopPropagation();
    });
}

//table
function refresh() {
    params.wins = params.lost = 0;
    params.roundsCounter = 0;
    params.winner = 0;
    params.progress = [];
  }

function buildTable() {
    var tableCode = '<thead><tr><th>runda</th><th>Ruch gracza</th><th>Ruch Komputera</th><th>Zwycięzca</th><th>Wynik</th></tr></thead>';
    for (var i = 0; i < params.progress.length; i++)
    {
        var tabletd = '<tbody><tr><td>' + params.roundsCounter + '</td><td>' + playerMove + '</td><td>' + computerMove + '</td><td>' + params.Winner + '</td><td>' + params.wins + ' - ' + params.lost + '</td></tr></tbody>';
    }
    tablemaker.innerHTML = tableCode + tabletd;
}
