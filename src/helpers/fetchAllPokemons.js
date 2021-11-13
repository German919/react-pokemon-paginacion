import { PokemonApi } from "../api/PokemonApi"

export const fetchAllPokemons = async() => {
    const response = await PokemonApi("/pokemon?limit=1500");
    const pokemons = response.data.results;

    return transformPokemons(pokemons)
}

const transformPokemons = (pokes) => {

    const newPokemons = []
    
    pokes.map((p) => {

        let id = p.url.split("/")[6];
        let pic = `https://raw.githubusercontent.com/PokeApI/sprites/master/sprites/pokemon/${id}.png` 
        newPokemons.push({id, name:p.name, pic})
        return newPokemons
     
    })
    
    return newPokemons;
}