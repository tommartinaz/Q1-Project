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
  var player1 = [],
    player2 = [];
  var slotCounter = 1;
  var tempIndex = 0;
  var frozenIndex = 0;
  var begin = function() {
    $.get("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1").done(function(data) {
      //var cardArray = data.cards;
      //console.log(cardArray);
      $("#p1s1").css({'background-image': 'url(' + data.cards[0].image + ')','border':'3px solid blue','border-radius': '10px'});
      curVal = deckMapping[data.cards[0].value];
      player1.push(curVal);
      console.log(curVal);
    })
  };
  var compareCards = function(arr, index, btn) {
    var rowSlot = "#p1s";
    if (btn === "higher" && arr[index] < arr[index + 1] || btn === "lower" && arr[index] > arr[index + 1]) {
      //alert("That's right!");
      index++;
      return index;
    } else {
      //alert("Sorry, wrong answer");

      //arr = arr.slice(0, frozenIndex + 2);
      return 0;
    }
  };
  $("#begin").click(begin);
  var redrawCardBacks = function(slot) {
    for (var j = (slot || 2); j < 6; j++) {
      $("#p1s" + j).css({'background-image': 'url("images/card_back.jpg")'});
    };
  };

  $(".phs2Btn").click(function() {
    console.log($(event.target));
    var btnValue = $(event.target).attr("value");
    var rowSlot = "#p1s"
    var cardSlot = frozenIndex + 1 + tempIndex;
    switch (btnValue) {
      case "higher":
      case "lower":
        $.get("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1").done(function(data2) {
          nextCard = data2.cards[0];
          //console.log(nextCard);
          nextCardVal = deckMapping[nextCard.value];
          player1.push(nextCardVal);
          //console.log("btnValue is: " + btnValue + "\ncurVal is: " + curVal + "\nnext card val is: " + nextCardVal);
          $(rowSlot + (cardSlot + 1)).css('background-image', 'url(' + nextCard.image + ')')
          if (compareCards(player1, frozenIndex + tempIndex, btnValue)) {
            tempIndex++;
            null;
          } else {
            tempIndex = 0;
            redrawCardBacks(frozenIndex + 2);
            player1 = player1.slice(0, frozenIndex + 1);
          }
          console.log(tempIndex);

        });
        break;
      case "freeze":
        console.log("Frozen");
        $(".rowCards").css('border', 'none');
        frozenIndex += tempIndex;
        $("#p1s" + (frozenIndex+1)).css({'border':'3px solid blue','border-radius': '10px'});
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
