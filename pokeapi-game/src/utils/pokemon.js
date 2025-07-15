//TODO:fetchの理解が不十分
export const getAllPokemon = (url) => {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      return data;
    });
};

export const getPokemon = (url) => {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      return data;
    });
};
