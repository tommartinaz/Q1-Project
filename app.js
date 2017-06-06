const deckID = '268n4fwya9nq'
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

$.get("https://deckofcardsapi.com/api/deck/" + deckID + "/shuffle/").done(function() {
  var curVal = 0;
  var nextCard = 0;
  var player1 = [{
      name: "Tom",
      id: 1
    }],
    player2 = [{
      name: "Aaron",
      id: 2
    }];
  var slotCounter = 1;
  var tempIndex = 0;
  var frozenIndex = 0;
  var begin = function() {
    $.get("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1").done(function(data) {
      //var cardArray = data.cards;
      //console.log(cardArray);
      $("#p1s1").css('background-image', 'url(' + data.cards[0].image + ')');
      curVal = deckMapping[data.cards[0].value];
      player1.push(curVal);
      console.log(curVal);
    })
  };
  var compareCards = function(arr, index, btn) {
    var rowSlot = "#p" + arr[0].id + "s";
    if (btn === "higher" && arr[index + 1] < arr[index + 2] || btn === "lower" && arr[index + 1] > arr[index + 2]) {
      alert("That's right!");
      return index + 1;
    } else {
      alert("Sorry, wrong answer");

      //arr = arr.slice(0, frozenIndex + 2);
      return 0;
    }
  };
  $("#begin").click(begin);
  var redrawCardBacks = function(player, slot) {
    for (var j = (slot || 2); j < 6; j++) {
      $("#p" + player[0].id + "s" + j).css('background-image', 'url("images/card_back.jpg")');
    };
  };

  $(".phs2Btn").click(function() {
    console.log($(event.target));
    var btnValue = $(event.target).attr("value");
    var rowSlot = "#p1s"
    curPlayer = player1;
    var cardSlot = frozenIndex + 1 + tempIndex;
    switch (btnValue) {
      case "higher":
      case "lower":
        $.get("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1").done(function(data2) {
          nextCard = data2.cards[0];
          //console.log(nextCard);
          nextCardVal = deckMapping[nextCard.value];
          curPlayer.push(nextCardVal);
          //console.log("btnValue is: " + btnValue + "\ncurVal is: " + curVal + "\nnext card val is: " + nextCardVal);
          $(rowSlot + (cardSlot + 1)).css('background-image', 'url(' + nextCard.image + ')');
          //console.log(btnValue);
          if (compareCards(curPlayer, frozenIndex + tempIndex, btnValue)) {
            tempIndex++;
          } else {
            tempIndex = 0;
            redrawCardBacks(curPlayer, frozenIndex);
            curPlayer = curPlayer.slice(0, frozenIndex + 2);
          }
          console.log(tempIndex);
        });
        break;
      case "freeze":
        console.log("Frozen");
        frozenIndex = tempIndex;
        tempIndex = 0;
        break;
      case "replace":
        console.log("Replacing");
        if (tempIndex > 0) {
          alert("Sorry, you cannot replace the frozen card once you've success");
          break;
        }
        $.get("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1").done(function(dataR) {
          $(rowSlot + (frozenIndex + 1)).css('background-image', 'url(' + dataR.cards[0].image + ')');
          player1[frozenIndex] = deckMapping[dataR.cards[0].value];
        });
        break;
    };

  });
});

// $.get("https://deckofcardsapi.com/api/deck/" + deckID + "/shuffle/");
// $.get("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1").then(function(data) {
//   console.log(data);
//   var cards = data.cards;
//   console.log(cards[0].value, deckMapping[cards[0]["value"]]);
//
//
// });
// });
