Card Sharks, a reimagining of the TV game show by Tom Martin

This is a two player game based on an old game show that has run numerous times on TV. There are three phases to the game.

Phase 1:
In this phase, one player is asked a question based on survey results. For example, "In the 1600's, men required their wives to wear chastity belts to ensure fidelity. Out of 100 women today, how many women said they would wear a chastity belt if their husband asked?" The player asked responds with a number. The other player is then asked whether they think the actual number is higher or lower than the first person's guess. If player 2 guesses higher/lower correctly, they get to go in phase 2. If they're wrong, player 1 goes in phase 2. (Note that each time play returns to this phase, the initial player asked the question alternates.) Rather than writing the trivia/poll questions with responses, this is being simulated by generating a random number between 1 and 100 and asking the players to guess at that.

Phase 2:
Whoever won phase 1 gets to play in this round. In this phase, each player has a row of 5 cards dealt face down. The first card for the player gets flipped over. Based on what that card is, the player can do one of two things; guess whether the next card is higher or lower than the first, OR they can ask for a different card as the first card. If they replace the card, they must play the new card. When they play the card (regardless of whether or not they replaced it), the second card in their row is flipped over. If they guessed higher/lower wrong, the new card is discarded and replaced with another card face down and the other player gets a chance to play. This process repeats until the player gets to the end of the row (in which case they win the round), or they "freeze" the card. Freezing means that the player cannot lose progress before that card, but it also ends the phase and returns it back to phase 1.

Replacing a card can be done once per player's turn, but only if the card is frozen. Technically, the first card of the row is frozen; that's why the player can replace that card initially.

Phases 1 and 2 repeat until one player wins phase 2 twice (best 2 out of three). That player moves on to phase 3.

As of 6/9/17, phase 3 has not been implemented.

Phase 3:
This is the "winner's circle". In this phase, there are 3 rows of cards laid out as follows:

##
###
####

The player starts out on the bottom row with 200 points. The first card gets flipped over and the player bets on whether the next card is higher or lower than the previous. If they guess correctly, they earn the points they bet; if they guess incorrectly, they lose the points they bet. They cannot freeze during this phase, but the can replace a card once per row. If they make it to the end of the row successfully, the last card of that row becomes the first card of the next. On row 2, 300 points get awarded to the player. Likewise, on row 4, 400 points get awarded. The round ends when the player reaches the final card or they run out of points, whichever comes first.