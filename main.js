$(document).ready(initializeApp);

let first_card_clicked = null;
let second_card_clicked = null;
let first_card_clicked_src = null;
let second_card_clicked_src = null;
const total_possible_matches = 9;
let match_counter = 0;
let canClickCard = true;
let gamesPlayed = 0;
let accuracy = 0;
let attempts = 0;
let attemptsRemaining = 15;
let wins = 0;
const images = [
    'images/johnsnow.jpg',
    'images/dragonlady.jpg',
    'images/arya.jpg',
    'images/jaime.jpg',
    'images/missingbody.jpg',
    'images/redbeard.jpg',
    'images/redlady.jpg',
    'images/tryion.jpg',
    'images/nightwalker.jpg'
];

function initializeApp() {
    randomizeCards();
    $('.resetButton').on('click', function () {
        if (first_card_clicked || second_card_clicked){
            hideBothCards();
        }
        if (attempts > 0) {
            gamesPlayed++;
        }
        resetStats();
        displayStats();
        $('.mainGame').empty();
        randomizeCards();
    });
}

function displayStats() {
    $('.games-played .value').text(gamesPlayed);
    $('.attempts .value').text(attempts);
    $('.attemptsRemaining .value').text(attemptsRemaining);
    $('.accuracy .value').text(accuracy + "%");
}

function resetStats() {
    accuracy = 0;
    attempts = 0;
    attemptsRemaining = 15;
    wins = 0;
    canClickCard = true;
    first_card_clicked = null;
    second_card_clicked = null;
    first_card_clicked_src = null;
    second_card_clicked_src = null;
}

function randomizeCards() {
    var shuffledImages = images.concat(images);
    shuffledImages = shuffle(shuffledImages);
    var container = $('<div>').addClass('row');
    for (var i = 0; i < shuffledImages.length; i++) {
        var col = $('<div>').addClass('col-4 col-sm-3 col-lg-2 text-center mb-3 cardContainer');
        var card = $('<div>').addClass('got-card');
        var back = $('<div>').addClass('back pointer');
        var front = $('<div>').addClass('front flip-scale-up-ver');
        var image = $('<img>').attr('src', shuffledImages[i]).addClass('img-fluid');
        var backImage = $('<img>').attr('src', 'images/gotlogo.jpg').addClass('img-fluid');
        front.append(image);
        back.append(backImage);
        card.append(front);
        card.append(back);
        col.append(card);
        container.append(col);
    }

    container.find('.front').hide();
    $('.mainGame').append(container);
    $('.got-card').on('click', function cardClicked (event) {
        if (canClickCard === false){
            return;
        } 
        else {
            $(event.currentTarget).find('.back').hide();
            $(event.currentTarget).find('.front').show();
        }

        if (first_card_clicked === null && $(event.currentTarget).find('.got-card').prevObject[0].className === 'got-card') {
            first_card_clicked = event.currentTarget;
            first_card_clicked_src = $(first_card_clicked).find('.front img').attr('src');
            $(first_card_clicked).removeClass('got-card');
            return;
        } 
        else if (first_card_clicked === event.currentTarget || $(event.currentTarget).find('.got-card').prevObject[0].className !== 'got-card') {
            return;
        }
        else {
            second_card_clicked = event.currentTarget;
            second_card_clicked_src = $(second_card_clicked).find('.front img').attr('src');
            $(second_card_clicked).removeClass('got-card');
        }
        canClickCard = false;
        attempts++;
        attemptsRemaining--;
        if (first_card_clicked_src === second_card_clicked_src) {
            match_counter++;
            wins++;
            first_card_clicked = null;
            second_card_clicked = null;
            first_card_clicked_src = null;
            second_card_clicked_src = null;
            canClickCard = true;
        } else {
            if (attempts < 15) {
                setTimeout(hideBothCards, 600);
            }
        }

        if (match_counter === total_possible_matches) {
            $("#win-game-modal").modal('show');
        }
        else if (attempts === 15) {
            setTimeout(function () {
                $("#lost-game-modal").modal('show');
                for (i = 0; i < shuffledImages.length; i++) {
                    $(container).find('.front').show();
                    $(container).find('.back').hide();
                    canClickCard = false;
                }
            }, 1500);
        }

        accuracy = Math.ceil((wins / attempts) * 100);
        displayStats();

    })
}


function hideBothCards() {
    $(first_card_clicked).addClass('got-card');
    $(second_card_clicked).addClass('got-card');

    $(first_card_clicked).find('.back').show();
    $(second_card_clicked).find('.back').show();

    $(first_card_clicked).find('.front').hide();
    $(second_card_clicked).find('.front').hide();

    first_card_clicked = null;
    second_card_clicked = null;
    canClickCard = true;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}