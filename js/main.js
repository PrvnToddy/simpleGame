let scores, roundScore, activeScore, gamePlaying, lastDice, assign;
let init = () => {
  scores = [0, 0];
  roundScore = 0;
  activeScore = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById(`name-0`).textContent = 'Player 1';
  document.getElementById(`name-1`).textContent = 'Player 2';
  document.querySelector(`.player-0-panel`).classList.remove('winner');
  document.querySelector(`.player-1-panel`).classList.remove('winner');
  document.querySelector(`.player-0-panel`).classList.add('active');
  document.querySelector(`.player-1-panel`).classList.remove('active');
};
init();
document.querySelector('.btn-roll').addEventListener('click', () => {
  if (gamePlaying) {
    let dice = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    console.log(dice);
    console.log(dice2);
    let diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = `./images/dice-${dice}.png`;

    let diceDom2 = document.querySelector('.dice2');
    diceDom2.style.display = 'block';
    diceDom2.src = `./images/dice-${dice2}.png`;

    if (dice === 6 && lastDice === 6) {
      scores[activeScore] = 0;
      document.getElementById(`score-${activeScore}`).textContent = '0';
      document.getElementById(`current-${activeScore}`).textContent = '0';
      nextPlayer();
    }
    if (dice !== 1 && dice2 !== 1) {
      roundScore += dice + dice2;
      document.getElementById(
        `current-${activeScore}`
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
    lastDice = dice;
  }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  if (gamePlaying) {
    scores[activeScore] += roundScore;
    document.getElementById(`score-${activeScore}`).textContent =
      scores[activeScore];

    assign = document.getElementById('text').value;
    console.log(assign);

    if (assign) {
      var winningScore = assign;
    } else {
      winningScore = 100;
    }

    if (scores[activeScore] >= winningScore) {
      document.getElementById(`name-${activeScore}`).textContent = `Winner!`;
      document.querySelector('.dice').style.display = 'none';
      document.getElementById(`name-${activeScore}`).classList.add('winner');
      document
        .querySelector(`.player-${activeScore}-panel`)
        .classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

let nextPlayer = () => {
  activeScore === 0 ? (activeScore = 1) : (activeScore = 0);
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
};
