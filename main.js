$(document).ready(initializeApp);

var first_card_clicked = null;
var second_card_clicked = null;
var first_card_clicked_src = '';
var second_card_clicked_src = '';
var total_possible_matches = 2;
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

function initializeApp() {

    randomizeCards();

    $('.card').on('click', function cardClicked (event) {
        if (canClickCard === false){
            return;
        }
        //Hide the back of the card
        $(event.currentTarget).find('.back').hide();
        $(event.currentTarget).find('.front').show();

        if (first_card_clicked == null) {
            first_card_clicked = event.currentTarget;
            first_card_clicked_src = $(first_card_clicked).find('.front img').attr('src');
            return;
        }
        else {
            second_card_clicked = event.currentTarget;
            second_card_clicked_src = $(second_card_clicked).find('.front img').attr('src');
        }

        canClickCard = false;

        if (first_card_clicked_src === second_card_clicked_src) {
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            canClickCard = true;
            if (match_counter === total_possible_matches) {
                //window.alert("You have survived for now... but Winter is coming.")
            }
        }
        else {
            setTimeout(hideBothCards, 2000);
        }

    })


}

function randomizeCards () {

    images = images.concat(images);
    var shuffledImages = shuffle(images);
    var container = $('<div>').addClass('row');

    for (var i = 0; i < shuffledImages.length; i++) {

        var card = $('<div>').addClass('card col-md-4');
        var back = $('<div>').addClass('back');
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

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}