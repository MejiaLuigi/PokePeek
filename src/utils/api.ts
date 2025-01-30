import  getApi  from '../services/getApi'; 
export interface Pokemon {
    name: string,
    id: number,
    weight: number,
    height: number,
    types: {
        slot: number;
        type: {
            name: string
        }
    }[],
    sprites: {
        other: {
            'official-artwork': {
                front_default: string
            }
        }
    };
}

export async function  fetchFn(endpoint:string) {
    const response = await fetch(endpoint);
    return response.json()
}



export async function fetchPokemons(itemsPerPage: number, offset: number) {
  try {
    const responseData = await getApi(itemsPerPage, offset);
    if (!responseData.error) {
      return responseData.results; 
    } else {
      throw new Error('Error getting information'); 
    }
  } catch (error: any) {
    console.error('Error fetching pokemon: ', error);
    throw error; 
  }
}

export async function fetchSearchPokemon(name: string) {
  try {
    if (!name) {
      console.warn("Nombre vacío, retornando null");
      return null; 
    }

    console.log('Fetching Pokémon:', name); 
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    if (!response.ok) {
      console.error('Error status:', response.status); 
       throw { status: response.status, message: `Pokémon no encontrado (Error ${response.status})` };
    }

    const data = await response.json();
    console.log('Fetched data:', data); 
    return data;

  } catch (error: any) {
    console.error('Fetch error:', error.message);
    throw error; 
  }
}