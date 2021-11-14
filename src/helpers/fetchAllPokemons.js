import { PokemonApi } from "../api/PokemonApi"

export const fetchAllPokemons = async() => {
    const response = await PokemonApi("/pokemon?limit=1500");
    const pokemons = response.data.results;

    return transformPokemons(pokemons)
}

const transformPokemons = (pokes) => {

    const newPokemons = [];
    let prevId = 0;
    pokes.map((p) => {
        let id = ++prevId;
        let idImg = p.url.split("/")[6];
        let name = p.name
        let pic = `https://raw.githubusercontent.com/PokeApI/sprites/master/sprites/pokemon/${idImg}.png` 
        newPokemons.push({id, name, pic})
        return newPokemons
     
    })
    
    return newPokemons;
}