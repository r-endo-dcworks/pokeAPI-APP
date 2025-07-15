import React from 'react';
import './Card.css';

export const EasyMode = (props) => {
  const { cards, handleClick, flippedCards, isCompleted, openedCards } = props;

  return (
    <>
      {isCompleted && (
        <div>
          <h1>クリアしました🎉</h1>
        </div>
      )}
      <div className="pokemonCardContainer">
        {cards.map((pokemon) => (
          <div key={pokemon.id} onClick={() => handleClick(pokemon.id)}>
            {openedCards.includes(pokemon.id) ||
            flippedCards.includes(pokemon.id) ? (
              <div key={pokemon.id} className="cardFront">
                <img
                  className="cardImg"
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                />
                <h3 className="cardName">{pokemon.name}</h3>
              </div>
            ) : (
              <div className="cardBack">
                <h1>?</h1>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default EasyMode;
