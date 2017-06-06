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
// var player1 = '',
//   player2 = '',
//   player1RoundCount = 0,
//   player2RoundCount = 0;
//
$.get("https://deckofcardsapi.com/api/deck/" + deckID + "/shuffle/").done(function() {
  var curVal = 0;
  var curPlayer = 1;
  var nextCard = 0;
  var player1 = [],
    player2 = [];
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
  var compareCards = function(arr, index, btn, player) {
    var rowSlot = "#p" + player + "s";
    if (btn === "higher" && arr[index] < arr[index + 1] || btn === "lower" && arr[index] > arr[index + 1]) {
      index++;
      //alert("That's right!");
      return index;
    } else {
      //alert("Sorry, wrong answer");
      for (var i = (frozenIndex + 2 || frozenIndex + 1); i < 6; i++) {
        $(rowSlot + i).css('background-image', 'url("images/card_back.jpg")');

      }
      player1 = player1.slice(0, frozenIndex + 1);
      player2 = player2.slice(0, frozenIndex + 1);
      return 0;
    }
  };
  $("#begin").click(begin);

  $(".phs2Btn").click(function() {
    console.log($(event.target));
    var btnValue = $(event.target).attr("value");
    var rowSlot = "#p1s"
    var curPlayer = 2;
    var cardSlot = frozenIndex + 2 + tempIndex;
    switch (btnValue) {
      case "higher":
      case "lower":
        $.get("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1").done(function(data2) {
          nextCard = data2.cards[0];
          //console.log(nextCard);
          nextCardVal = deckMapping[nextCard.value];
          if (curPlayer === 1) {
            player1.push(nextCardVal);
          } else {
            player2.push(nextCardVal);
          }
          //console.log("btnValue is: " + btnValue + "\ncurVal is: " + curVal + "\nnext card val is: " + nextCardVal);
          $(rowSlot + cardSlot).css('background-image', 'url(' + nextCard.image + ')');
          //console.log(btnValue);
          tempIndex = compareCards(player1, frozenIndex + tempIndex, btnValue, curPlayer);
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
        $.get("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1").done(function(dataR) {

          player1[frozenIndex] = deckMapping[dataR.cards[0].value];
        })
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
