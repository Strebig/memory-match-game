$(document).ready(initializeApp);

function initializeApp() {
    var first_card_clicked = null;
    var second_card_clicked = null;
    var total_possible_matches = 2;
    var match_counter = 0;
    var canClickCard = true;
    var images = ['johnsnow.jpg', 'dragonlady.jpg'];


    function randomizeCards (){
        var doubleImages = images.concat(images);

        for (var i = 0; i < doubleImages.length; i++) {

            var container = $('<div>').addClass('cardContainer');
            var card = $('<div>').addClass('card');
            var back = $('<div>').addClass('back');
            var front = $('<div>').addClass('front');
            var image = $('<img>').addClass('imageMod').attr('src', doubleImages[i]);
            front.append(image);
            card.append(front,back);
            container.append(card);
            $('.mainGame').append(container);
        }

    }

    $('.card').on('click', '.back', function cardClicked (event) {
        if (canClickCard === false){
            return;
        }
// event current target is core javascript... Jquery cant do that
        if (first_card_clicked == null) {
            first_card_clicked = event.currentTarget;
            $(this).hide('.back');
            first_card_clicked.find('.front img').attr('src');
            return first_card_clicked;
        }
        second_card_clicked = event.currentTarget;
        second_card_clicked.find('.front img').attr('src');



        if (first_card_clicked === second_card_clicked) {
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches) {
                return "You have survived for now... but Winter is coming."
            }
        }
        canClickCard = false;
        setTimeout(hideBothCards, 2000);


        function hideBothCards() {
            first_card_clicked = $('.back').show();
            second_card_clicked = $('.back').show();
            first_card_clicked = null;
            second_card_clicked = null;
            canClickCard = true;
        }

    })

}

//pseudo code // .find('.front img').attr('src');
//target front of the card to match the same card, and if they match..
// stay front-faced. If they aren't a match, flip backwards.
// only can choose 2 cards at a time.
// Later: if they match... they dissolve
//once all are matched... you win the game, animation screen appears
//if you do not match them all after x amount of fails,
// the night king takes over the screen and turns you into a night walker

