const deckMapping = {
    ACE: 14,
    KING: 13,
    QUEEN: 12,
    JACK: 11,
    "10": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2
}
var curPlayer;
var curVal;
var tempIndex = 0;

function Player(id, name, deck) {
    this.id = id;
    this.name = name;
    this.deck = deck;
    this.cardArray = [];
    this.frozenIndex = 0;
    this.rowID = "#p" + id + "s";
};

function Deck(deckID) {
    this.curCard = 0;
    //this.id = deckID;
    this.shuffle = function () {
        $.get("https://deckofcardsapi.com/api/deck/" + deckID + "/shuffle/").done(function () {
            console.log("shuffled")
        });
    }

    this.drawCard = function () {
        return $.ajax({
            url: "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1",
            type: "get",
            context: this,
            success: function (data) {
                curCard = data.cards[0];

                curVal = deckMapping[data.cards[0].value];
                this.curCard = data.cards[0];
                console.log(this.curCard)

            }
        })
    }
}

function drawCardsOnScreen(player, card, slot) {

    $(player.rowID + slot).css({
        'background-image': 'url("' + card.image + '")'
    });
}

function redrawCardBacks(player, slot) {
    for (var j = (slot || 2); j < 6; j++) {
        $(player.rowID + j).css({
            'background-image': 'url("images/card_back.jpg")'
        });
    };
};


function compareCards(arr, indx, btn) {
    if (btn === "higher" && arr[indx] < arr[indx + 1] || btn === "lower" && arr[indx] > arr[indx + 1]) {
        alert("That's right!");
        indx++;
        return indx;
    } else {
        alert("Sorry, wrong answer");
        return 0;
    }
}



$("#begin").click(function () {
    curPlayer.deck.shuffle();
    curPlayer.deck.drawCard().then(function () {
        curPlayer.cardArray.push(deckMapping[curPlayer.deck.curCard.value]);
        console.log(curPlayer.cardArray);
        drawCardsOnScreen(curPlayer, curCard, 1);
    });
})

$(".phs2Btn").click(function () {
    console.log($(event.target));
    
    var btnValue = $(event.target).attr("value");
    var cardSlot = curPlayer.frozenIndex + 1 + tempIndex;
    switch (btnValue) {
        case "higher":
        case "lower":
            curPlayer.deck.drawCard().then(function () {
                curPlayer.cardArray.push(deckMapping[curPlayer.deck.curCard.value]);
                console.log(curPlayer.cardArray);
                drawCardsOnScreen(curPlayer, curCard, cardSlot+1);
                //console.log("btnValue is: " + btnValue + "\ncurVal is: " + curVal + "\nnext card val is: " + nextCardVal);
                if (compareCards(curPlayer.cardArray, curPlayer.frozenIndex + tempIndex, btnValue)) {
                    tempIndex++;
                } else {
                    tempIndex = 0;
                    redrawCardBacks(curPlayer, curPlayer.frozenIndex + 2);
                    curPlayer.cardArray = curPlayer.cardArray.slice(0, curPlayer.frozenIndex + 1);
                }
                console.log(tempIndex);
            });

            break;
        case "freeze":
            console.log("Frozen");
            $(".rowCards").css('border', 'none');
            curPlayer.frozenIndex += tempIndex;
            $(curPlayer.rowID + (curPlayer.frozenIndex + 1)).css({
                'border': '3px solid blue',
                'border-radius': '10px'
            });
            tempIndex = 0;
            break;
        case "replace":
            console.log("Replacing");
            if (tempIndex > 0) {
                alert("Sorry, you cannot replace the frozen card once you've success");
                break;
            } else {
                curPlayer.deck.drawCard().then(function () {
                    curPlayer.cardArray[curPlayer.frozenIndex] = deckMapping[curPlayer.deck.curCard.value];
                    console.log(curPlayer.cardArray);
                    drawCardsOnScreen(curPlayer, curCard, curPlayer.frozenIndex+1);
                });
                break;
            }
    };

});

var player1 = new Player(1, prompt("Please enter the name of player 1", "Player1"), new Deck('268n4fwya9nq'));
var player2 = new Player(2, prompt("Please enter the name of player 2", "Player2"), new Deck("gzajszt1jhvy"));
curPlayer = player2;
console.log(player1, player2);