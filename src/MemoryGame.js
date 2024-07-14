import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

const MemoryGame = ({ onWin, onLose }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [timer, setTimer] = useState(120); // 2 minutes

  useEffect(() => {
    // Initialize cards (you should have 8 pairs of images)
    const cardImages = [...Array(8).keys()].flatMap(i => [`image${i}.jpg`, `image${i}.jpg`]);
    setCards(shuffleArray(cardImages));
    
    // Timer countdown
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          clearInterval(interval);
          onLose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onLose]);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index)) return;

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedPairs(matchedPairs + 1);
        setFlippedCards([]);
        if (matchedPairs + 1 === cards.length / 2) {
          onWin();
        }
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  return (
    <div className="memory-game">
      <div className="timer">Time left: {timer}s</div>
      <div className="cards-container">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className={`card ${flippedCards.includes(index) ? 'flipped' : ''}`} 
            onClick={() => handleCardClick(index)}
          >
            <div className="front">
              <img src={card} alt="Card" />
            </div>
            <div className="back"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
