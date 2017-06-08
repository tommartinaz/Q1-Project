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
//var curVal;
var tempIndex = 0;

function Player(id, name, deck) {
    this.id = id;
    this.name = name;
    this.deck = deck;
    this.cardArray = [];
    this.replaceable = true;
    this.frozenIndex = 0;
    this.rowID = "#p" + id + "s";
    this.rounds = 0;
};

function Game() {
    this.player1 = new Player(1, prompt("Please enter the name of player 1", "Player1"), new Deck('268n4fwya9nq'));
    this.player2 = new Player(2, prompt("Please enter the name of player 2", "Player2"), new Deck("gzajszt1jhvy"));
    this.state = true;
}

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

//                curVal = deckMapping[data.cards[0].value];
                this.curCard = data.cards[0];
                //               console.log(this.curCard)

            }
        })
    }
}

function resetCards(player) {
    player.rounds++;
    player1.frozenIndex = 0;
    player1.cardArray = [];
    player1.replaceable = true;
    //player1.deck.shuffle();
    player2.frozenIndex = 0;
    player2.cardArray = [];
    player2.replaceable = true;
    tempIndex = 0;
    //player2.deck.shuffle();
    //curVal
    redrawCardBacks(player1, 1);
    redrawCardBacks(player2, 1);
    $(".rowCards").css("border", "none");
    $("#begin").show();
};

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
        //alert("That's right!");
        indx++;
        return indx;
    } else {
        //alert("Sorry, wrong answer");
        return 0;
    }
}





function beginRow(player) {
    if (player.cardArray.length===0) {
        player.deck.shuffle();
    };
    player.deck.drawCard().then(function () {
        player.cardArray.push(deckMapping[player.deck.curCard.value]);
        console.log(player.cardArray);
        drawCardsOnScreen(player, curCard, 1);
        $(player.rowID + 1).css({
            'border': '3px solid blue',
            'border-radius': '10px'
        });

    });
};
$("#begin").click(function () {
    var firstUp = Math.floor(Math.random() * 2);
    alert("in begin click function");
    if (firstUp < 1) {
        curPlayer = player1;
    } else {
        curPlayer = player2;
    }
    console.log(curPlayer.id, curPlayer.cardArray);
    beginRow(curPlayer);

    $("#begin").hide();
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
                drawCardsOnScreen(curPlayer, curCard, cardSlot + 1);
                //console.log("btnValue is: " + btnValue + "\ncurVal is: " + curVal + "\nnext card val is: " + nextCardVal);
                if (compareCards(curPlayer.cardArray, curPlayer.frozenIndex + tempIndex, btnValue)) {
                    tempIndex++;
                    $("#cardInfo").css("background-image", "none");
                    if (curPlayer.cardArray.length === 5) {
                        alert(curPlayer.name + " wins!");
                        resetCards(curPlayer);
                    }
                } else {
                    tempIndex = 0;
                    redrawCardBacks(curPlayer, curPlayer.frozenIndex + 2);
                    curPlayer.cardArray = curPlayer.cardArray.slice(0, curPlayer.frozenIndex + 1);
                    $("#cardInfo").css("background-image", "url('" + curCard.image + "')");
                    if (curPlayer.id === 1) {
                        curPlayer = player2;
                    } else {
                        curPlayer = player1;
                    }
                    if (curPlayer.cardArray.length === 0) {
                        beginRow(curPlayer);
                    };
                }
                console.log(tempIndex);
            });

            break;
        case "freeze":
            console.log("Frozen");
            $(".rowCards" + curPlayer.id).css('border', 'none');
            curPlayer.frozenIndex += tempIndex;
            $(curPlayer.rowID + (curPlayer.frozenIndex + 1)).css({
                'border': '3px solid blue',
                'border-radius': '10px'
            });
            curPlayer.replaceable = true;
            tempIndex = 0;
            break;
        case "replace":
            console.log("Replacing");
            if (tempIndex > 0 || curPlayer.replaceable === false) {
                alert("Sorry, you can only replace the frozen card, and only once per turn in this phase.");
                break;
            } else {
                curPlayer.deck.drawCard().then(function () {
                    curPlayer.cardArray[curPlayer.frozenIndex] = deckMapping[curPlayer.deck.curCard.value];
                    console.log(curPlayer.cardArray);
                    curPlayer.replaceable = false;
                    drawCardsOnScreen(curPlayer, curCard, curPlayer.frozenIndex + 1);
                });
                break;
            }
    };



});

player1 = new Player(1, prompt("Please enter the name of player 1", "Player1"), new Deck('268n4fwya9nq'));
player2 = new Player(2, prompt("Please enter the name of player 2", "Player2"), new Deck("gzajszt1jhvy"));

//console.log(player1, player2);