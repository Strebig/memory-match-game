$(document).ready(initializeApp);

var first_card_clicked = null;
var second_card_clicked = null;
var first_card_clicked_src = '';
var second_card_clicked_src = '';
var total_possible_matches = 1;
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
    'images/tryion.jpg'

];
var matches = 0;
var attempts = 0;
var accuracy = 0;
var gamesPlayed = 0;


function initializeApp() {
    displayStats();
    randomizeCards();

    $('.card').on('click', function cardClicked (event) {

        if (canClickCard === false){
            return;
        }

        $(event.currentTarget).find('.back').hide();
        $(event.currentTarget).addClass('flip-scale-up-ver');
        $(event.currentTarget).find('.front').show();

        if (first_card_clicked == null) {
            first_card_clicked = event.currentTarget;
            first_card_clicked_src = $(first_card_clicked).find('.front img').attr('src');
            return;
        }
        else {
            second_card_clicked = event.currentTarget;
            second_card_clicked_src = $(second_card_clicked).find('.front img').attr('src');
            attempts++;
        }

        canClickCard = false;

        if (first_card_clicked_src === second_card_clicked_src) {
            matches++;
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            canClickCard = true;
            if (match_counter === total_possible_matches) {
                // alert("hello");
                $('background-image:url(\'images/Jon-White-Walker-2.gif\')').appendTo('body');
            }
        }
        else {
            setTimeout(hideBothCards, 2000);
        }
        accuracy = matches / attempts + '%';


    })

    $('resetButton').on('click', function () {
        gamesPlayed++;
        resetStats();
        displayStats();
        $('.card').find('.back').show();
        randomizeCards();
    })
}

function displayStats() {
    gamesPlayed = $('.games-played .value');
    attempts = $('.attempts .value');
    accuracy = $('.accuracy .value');
}

function resetStats() {
    accuracy = 0;
    matches = 0;
    attempts = 0;
    displayStats();
}


function randomizeCards () {

    images = images.concat(images);
    var shuffledImages = shuffle(images);
    var container = $('<div>').addClass('row');

    for (var i = 0; i < shuffledImages.length; i++) {

        var card = $('<div>').addClass('card col-md-4');
        var back = $('<div>').addClass('back ');
        var front = $('<div>').addClass('front');
        var image = $('<img>').attr('src', images[i]);
        var backImage = $('<img>').attr('src', 'images/gotlogo.jpg');
        front.append(image);
        back.append(backImage);
        card.append(front);
        card.append(back);
        container.append(card);

    }
    container.find('.front').hide();
    $('.mainGame').append(container);
}


function hideBothCards() {

    $(first_card_clicked).find('.back').show();
    $(second_card_clicked).find('.back').show();

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