$(document).ready(initializeApp);

var first_card_clicked = null;
var second_card_clicked = null;
var first_card_clicked_src = null;
var second_card_clicked_src = null;
var total_possible_matches = 10;
var match_counter = 0;
var canClickCard = true;
var images = [
    'images/johnsnow.jpg',
    'images/dragonlady.jpg',
    'images/arya.jpg',
    'images/cerlannister.jpg',
    'images/jaime.jpg',
    'images/missingbody.jpg',
    'images/redbeard.jpg',
    'images/redlady.jpg',
    'images/tryion.jpg',
    'images/nightwalker.jpg'

];
var gamesPlayed = 0;
var accuracy = 0;
var attempts = 0;
var wins = 0;

function initializeApp() {

    randomizeCards();

    $('.resetButton').on('click', function () {
        gamesPlayed++;
        resetStats();
        displayStats();
        $('.mainGame').empty();
        randomizeCards();
    });
}

function displayStats() {
    $('.games-played .value').text(gamesPlayed);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy + "%");
}

function resetStats() {
    accuracy = 0;
    attempts = 0;
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
        var col = $('<div>').addClass('col-md-3 text-center mb-3');
        var card = $('<div>').addClass('got-card');
        var back = $('<div>').addClass('back');
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
        $(event.currentTarget).find('.back').hide();
        $(event.currentTarget).find('.front').show();

        if (first_card_clicked == null) {
            first_card_clicked = event.currentTarget;
            first_card_clicked_src = $(first_card_clicked).find('.front img').attr('src');
            return;
        }
        else if (first_card_clicked === event.currentTarget)  {
            return;
        }
        else {
            second_card_clicked = event.currentTarget;
            second_card_clicked_src = $(second_card_clicked).find('.front img').attr('src');
        }
        canClickCard = false;
        attempts++;
        if (first_card_clicked_src === second_card_clicked_src) {
            match_counter++;
            wins++;
            first_card_clicked = null;
            second_card_clicked = null;
            canClickCard = true;
            if (match_counter === total_possible_matches) {
                $("#win-game-modal").modal('show');
            }
        }
        else if (attempts === 1) {
            setTimeout(function () {
                $("#lost-game-modal").modal('show');
                gamesPlayed++;
                resetStats();
                displayStats();
                $('.mainGame').empty();
                randomizeCards();
            }, 1000);
        }
        else {
            setTimeout(hideBothCards, 2000);
        }
        accuracy = Math.ceil((wins / attempts) * 100);
        displayStats();

    })
}


function hideBothCards() {

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