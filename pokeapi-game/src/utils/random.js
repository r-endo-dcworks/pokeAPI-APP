import { getAllPokemon, getPokemon } from './pokemon.js';
const initialURL = 'https://pokeapi.co/api/v2/pokemon?limit=100';

//ポケモンをランダムに６種類の詳細情報を取得する処理
export const random = async () => {
  const res = await getAllPokemon(initialURL);
  const allPokemon = res.results;

  // ランダムに6種類選ぶ
  const selected = []; //空配列を用意
  const usedIndices = new Set(); //重複を防ぐためにSetを作成
  while (selected.length < 6) {
    //ランダムのインデックスを生成し、振り分け
    const i = Math.floor(Math.random() * allPokemon.length);
    if (!usedIndices.has(i)) {
      //usedIndicesの中にすでにインデックスが存在するか（t/f）
      usedIndices.add(i); //usedIndicesに追加
      selected.push(allPokemon[i]); //配列に追加
    }
  }

  // 詳細データを取得
  const detailed = await Promise.all(selected.map((p) => getPokemon(p.url)));
  return detailed;
};

// 配列をシャッフルする関数（フィッシャー–イェーツシャッフル）
//array.sort(() => Math.random() - 0.5)
//上記のような書き方はよく混ざっていない
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
