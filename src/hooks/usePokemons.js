import { useEffect, useState } from "react"
import { fetchAllPokemons } from "../helpers/fetchAllPokemons";

export const usePokemons = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        fetchAllPokemons().then(poke=>{
            setIsLoading(false)
            setPokemons(poke)
        }) 
    },[])

    return (
        {
            isLoading,
            pokemons
        }
    )
}