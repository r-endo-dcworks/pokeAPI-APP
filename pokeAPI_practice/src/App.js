import './App.css';
import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon.js';
import Card from './components/Card/Card.js';
import Navbar from './Navbar/Navbar.js';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState('');
  const [prevURL, setPrevURL] = useState('');

  useEffect(() => {
    const fetchPokemonDate = async () => {
      //全てのポケモンデータを取得
      const res = await getAllPokemon(initialURL);
      loadPokemon(res.results);
      //次ページに表示するポケモンのURLを取得
      setNextURL(res.next);
      //前ページに表示するポケモンのURLを取得
      setPrevURL(res.previous);
      //「ロード中」の表示を削除
      setLoading(false); // 読み込み終了
    };
    fetchPokemonDate();
  }, []);

  //ポケモンの詳細データを取得し、_pokemonDataにまとめている
  //promise.allで２０種のポケモンの詳細データを取得する処理を同時並行している。
  const loadPokemon = async (data) => {
    const _pokemonData = await Promise.all(
      data.map((pokemon) => {
        const pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      }),
    );
    setPokemonData(_pokemonData);
  };

  //次へボタンを押した時の処理
  const handleNextPage = async () => {
    setLoading(true);
    const data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false); // 読み込み終了
  };

  //前へボタンを押した時の処理（次へとほぼ同じ）
  const handlePrevPage = async () => {
    if (!prevURL) return;
    setLoading(true);
    const data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div class="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
