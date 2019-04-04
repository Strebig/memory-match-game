$(document).ready(initializeApp);

function initializeApp() {
    var first_card_clicked = null;
    var second_card_clicked = null;
    var total_possible_matches = 2;
    var match_counter = 0;

    $('.card').on('click', '.back', function cardClicked (event) {
        event.currentTarget === this;
        $(this).hide('.back');

        if (first_card_clicked) {
            first_card_clicked = $(this).currentTarget;
            return first_card_clicked;
        }
        second_card_clicked = $(this).currentTarget;


        if (first_card_clicked === second_card_clicked) {
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches) {
                return "You have survived for now... but Winter is coming."
            } else {
                setTimeout(function () {
                }, 2000);
                first_card_clicked = $('.back').show();
                second_card_clicked = $('.back').show();
                first_card_clicked = null;
                second_card_clicked = null;

            }
        }
    })

}

//pseudo code
//target front of the card to match the same card, and if they match..
// stay front-faced. If they aren't a match, flip backwards.
// only can choose 2 cards at a time.
// Later: if they match... they dissolve
//once all are matched... you win the game, animation screen appears
//if you do not match them all after x amount of fails,
// the night king takes over the screen and turns you into a night walker

