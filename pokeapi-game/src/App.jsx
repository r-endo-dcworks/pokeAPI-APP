import './App.css';
import { useEffect, useState } from 'react';
import { EasyMode } from './components/Card/Card.jsx';
import { random, shuffleArray } from './utils/random.js';

const App = () => {
  const [easyCards, setEasyCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]);
  const [openedCards, setOpenedCards] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setIsStart(false);
  }, [isStart]);

  // Easyモードの初期状態
  const easyGame = async () => {
    setLoading(true);
    setIsCompleted(false);
    setOpenedCards([]);
    const detailed = await random();
    // 各ポケモンを2枚にしてシャッフル
    //同じものを2つずつ用意する
    const pairedCards = [];
    detailed.forEach((poke) => {
      const card1 = { ...poke, id: `${poke.id}-a` };
      const card2 = { ...poke, id: `${poke.id}-b` };
      pairedCards.push(card1, card2);
    });
    const shuffled = shuffleArray(pairedCards);
    setEasyCards(shuffled);
    setLoading(false);
  };

  // クリック時に裏表をstateに割り当て
  const handleClick = (id) => {
    if (openedCards.includes(id) || flippedCards.length >= 2) {
      return;
    }
    if (!flippedCards.includes(id)) {
      setFlippedCards([...flippedCards, id]);
    } else {
      setFlippedCards(
        flippedCards.filter((flippedCards) => flippedCards !== id),
      );
    }
  };

  useEffect(() => {
    if (flippedCards.length !== 2) return;

    //ハイフンでidを分割して配列の形にし、「100-a」などの”100”の部分を[0]とする
    const getBaseId = (id) => id.split('-')[0];
    if (getBaseId(flippedCards[0]) === getBaseId(flippedCards[1])) {
      console.log('カードが一致しました。');
      setOpenedCards((prev) => [...prev, ...flippedCards]);

      console.log('openedCardsの中身：', openedCards);
      setFlippedCards([]);

      openedCards.length >= 10 && setIsCompleted(true);
      console.log('isCompleted:', isCompleted);
    } else {
      console.log('カードが一致しませんでした');
      setTimeout(() => {
        setFlippedCards([]);
      }, 2000);
    }
  }, [flippedCards]);

  return (
    <>
      <nav>ポケモン神経衰弱ゲーム</nav>
      <div className="mode">
        <div>難易度選択:</div>
        <button onClick={easyGame}>EASY</button>
        <button>HARD</button>
      </div>
      <div className="start">
        <button onClick={easyGame}>START</button>
        <button onClick={() => setIsStart((prev) => !prev)}>RESET</button>
      </div>

      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <EasyMode
              cards={easyCards}
              handleClick={handleClick}
              flippedCards={flippedCards}
              openedCards={openedCards}
              isCompleted={isCompleted}
            />
          </>
        )}
      </div>
    </>
  );
};

export default App;
