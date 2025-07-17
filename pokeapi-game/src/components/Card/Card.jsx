import './Card.css';

export const EasyMode = (props) => {
  const { cards, handleClick, flippedCards, isCompleted, openedCards } = props;

  return (
    <>
      {isCompleted && (
        <div>
          <h1>おめでとう！クリアしました🎉</h1>
        </div>
      )}
      <div className="pokemon-card-container">
        {cards.map((pokemon) => (
          <div
            key={pokemon.id}
            className={`card ${
              openedCards.includes(pokemon.id) ||
              flippedCards.includes(pokemon.id)
                ? 'is-flipped'
                : ''
            }`}
            onClick={() => handleClick(pokemon.id)}
          >
            <div key={pokemon.id} className="card-face front-side">
              <img
                className="cardImg"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
              <h3 className="cardName">{pokemon.name}</h3>
            </div>

            <div className="card-face back-side">
              <h1>?</h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EasyMode;
