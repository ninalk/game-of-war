function war(deck, players) {
  const player1 = players[0];
  const player2 = players[1];
  let winner = null;

  // case if deck array length is zero
  if (deck.length === 0) return players;

  // case if deck array length is one
  if (deck.length === 1) {
    player1.Deck.push(deck[0]);
    return players;
  }

  // deal out cards from deck array
  for (let i = 0; i < deck.length; i++) {
    i % 2 === 0 ? player1.Deck.push(deck[i]) : player2.Deck.push(deck[i]);
  }  
  
  // play rounds of war
  playRounds(player1, player2);    
  
  // return winner
  if (player1.Discard.length === player2.Discard.length) {
    winner = players;
  } else if (player1.Discard.length > player2.Discard.length) {
    winner = player1;
  } else {
    winner = player2;
  }
  return winner;
}

// helper function to play round
function playRounds(player1, player2) {
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
  const suits = ['Clubs', 'Spades', 'Hearts', 'Diamonds'];

  // while player deck length is not zero, compare cards
  while (player1.Deck.length && player2.Deck.length) {
    let card1 = player1.Deck[0].split(' of ');
    let card2 = player2.Deck[0].split(' of ');
    let [value1, suit1] = card1;
    let [value2, suit2] = card2;
    
    // compare values
    if (values.indexOf(value1) === values.indexOf(value2)) {
      // compare suits
      if (suits.indexOf(suit1) > suits.indexOf(suit2)) {
        player1.Discard.push(player1.Deck.shift(), player2.Deck.shift());
      } else {
        player2.Discard.push(player1.Deck.shift(), player2.Deck.shift());
      }
    } else if (values.indexOf(value1) > values.indexOf(value2)) {
      player1.Discard.push(player1.Deck.shift(), player2.Deck.shift());
    } else {
      player2.Discard.push(player1.Deck.shift(), player2.Deck.shift());
    }
  }
}