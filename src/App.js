import React, { useState, useEffect } from 'react';
import './App.css';
import './MemoryGame.css'; // Import MemoryGame CSS
import MemoryGame from './MemoryGame'; // Import MemoryGame component

const choices = ['bread', 'jelly', 'peanut'];

function App() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerWins, setPlayerWins] = useState({ bread: false, jelly: false, peanut: false });
  const [computerWins, setComputerWins] = useState({ bread: false, jelly: false, peanut: false });
  const [showMemoryGame, setShowMemoryGame] = useState(true);

  const handlePlayerChoice = (choice) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);
    determineResult(choice, computerChoice);
  };

  const determineResult = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) {
      setResult('draw');
    } else if (
      (playerChoice === 'bread' && computerChoice === 'peanut') ||
      (playerChoice === 'jelly' && computerChoice === 'bread') ||
      (playerChoice === 'peanut' && computerChoice === 'jelly')
    ) {
      setResult('win');
      handleWin(playerChoice, 'player');
    } else {
      setResult('lose');
      handleWin(computerChoice, 'computer');
    }
  };

  const handleWin = (choice, winner) => {
    if (winner === 'player') {
      setPlayerScore(prevScore => prevScore + 1);
      setPlayerWins(prevWins => ({ ...prevWins, [choice]: true }));
    } else {
      setComputerScore(prevScore => prevScore + 1);
      setComputerWins(prevWins => ({ ...prevWins, [choice]: true }));
    }

    checkGameWinner();
  };

  const checkGameWinner = () => {
    if (
      playerWins.bread && playerWins.jelly && playerWins.peanut &&
      !computerWins.bread && !computerWins.jelly && !computerWins.peanut
    ) {
      setResult('win');
    } else if (
      computerWins.bread && computerWins.jelly && computerWins.peanut &&
      !playerWins.bread && !playerWins.jelly && !playerWins.peanut
    ) {
      setResult('lose');
      setShowMemoryGame(true); // Show memory game when computer wins
    }
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerWins({ bread: false, jelly: false, peanut: false });
    setComputerWins({ bread: false, jelly: false, peanut: false });
    setShowMemoryGame(false);
  };

  const handleMemoryGameWin = () => {
    setShowMemoryGame(false);
    setComputerWins({ bread: false, jelly: false, peanut: false }); // Reset computer's wins
  };

  const handleMemoryGameLose = () => {
    setShowMemoryGame(false);
    // Optionally, add additional logic for handling loss in memory game
  };

  useEffect(() => {
    if (result === 'win' || result === 'lose') {
      checkGameWinner();
    }
  }, [playerWins, computerWins]);

  return (
    <div className="App">
      <h1>Peanut Butter, Jelly, & Bread - Memory Card Game</h1>

      <div className="game-container">
        <div className="circles-container">
          <a href="#!" onClick={() => handlePlayerChoice('bread')} className={`circle circle1 ${playerChoice === 'bread' ? 'chosen' : ''}`}>
            <span className="sr-only"></span>
          </a>
          <a href="#!" onClick={() => handlePlayerChoice('jelly')} className={`circle circle2 ${playerChoice === 'jelly' ? 'chosen' : ''}`}>
            <span className="sr-only"></span>
          </a>
          <a href="#!" onClick={() => handlePlayerChoice('peanut')} className={`circle circle3 ${playerChoice === 'peanut' ? 'chosen' : ''}`}>
            <span className="sr-only"></span>
          </a>

          <div className="line line1"></div>
          <div className="line line2"></div>
          <div className="line line3"></div>
        </div>

        {playerChoice && computerChoice && (
          <div className="result">
            <div className="choices">
              <p>Your Choice: {playerChoice}</p>
              <p>Computer's Choice: {computerChoice}</p>
            </div>
          </div>
        )}

        <div className="player-score">
          <p>Player Ingredients Left:</p>
          <p>{!playerWins.bread && 'Bread, '}{!playerWins.jelly && 'Jelly, '}{!playerWins.peanut && 'Peanut Butter'}</p>
        </div>
        <div className="computer-score">
          <p>Computer Ingredients Left:</p>
          <p>{!computerWins.bread && 'Bread, '}{!computerWins.jelly && 'Jelly, '}{!computerWins.peanut && 'Peanut Butter'}</p>
        </div>

        <button onClick={resetGame} className="reset-button">Reset Game</button>
      </div>

      {showMemoryGame && <MemoryGame onWin={handleMemoryGameWin} onLose={handleMemoryGameLose} />}
    </div>
  );
}

export default App;


