export const typesColors = {
  normal: 'lightgray',
  fighting: 'darkred',
  flying: 'indigo',
  poison: 'darkorchid',
  ground: 'goldenrod',
  rock: 'wheat',
  bug: 'lime',
  ghost: 'violet',
  steel: 'trueGray',
  fire: 'orangered',
  water: 'skyblue',
  grass: 'green',
  electric: 'khaki',
  psychic: 'pink',
  ice: 'lightblue',
  dragon: 'purple',
  dark: 'dimgray',
  fairy: 'deeppink',
  unknown: 'lightgray',
  shadow: 'gray',
};
export const typesBGColors = {
    normal: 'lightgray',
    fighting: 'salmon',
    flying: 'slateblue',
    poison: 'lavender',
    ground: 'lightgoldenrodyellow',
    rock: 'wheat',
    bug: 'lightgreen',
    ghost: 'plum',
    steel: 'lightgray',
    fire: 'lightcoral',
    water: 'lightskyblue',
    grass: 'lightgreen',
    electric: 'lightyellow',
    psychic: 'lightpink',
    ice: 'lightcyan',
    dragon: 'thistle',
    dark: 'dimgray',
    fairy: 'mistyrose',
    unknown: 'lightgray',
    shadow: 'gray',
};

export const getTypeColor = (type: string) => {
  return typesColors[type as keyof typeof typesColors] || 'light';
};
export const getTypeBGColor = (type: string) => {
  return typesBGColors[type as keyof typeof typesBGColors] || 'light';
};

// formats number to three digits
export const formatNumber = (num: number) => {
  return num.toString().padStart(3, '0');
};