// export const getAllPokemon = (url) => {
//   return new Promise((resolve, reject) => {
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => resolve(data));
//   });
// };

//TODO:fetchの理解が不十分
export const getAllPokemon = (url) => {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      return data;
    });
};

// export const getPokemon = (url) => {
//   return new Promise((resolve, reject) => {
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         resolve(data);
//       });
//   });
// };

export const getPokemon = (url) => {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      return data;
    });
};
