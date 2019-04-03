$(document).ready(initializeApp);

function initializeApp() {

}

//pseudo code
//target front of the card to match the same card, and if they match..
// stay front-faced. If they aren't a match, flip backwards.
// only can choose 2 cards at a time.
// Later: if they match... they dissolve
//once all are matched... you win the game, animation screen appears
//if you do not match them all after x amount of fails,
// the night king takes over the screen and turns you into a night walker
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

$('card').on('click', function cardClicked () {
    $('.card').show();
});
