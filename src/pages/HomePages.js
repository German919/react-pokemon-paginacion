import React,{useState} from 'react';
import Loading from '../components/Loading';
import { usePokemons } from '../hooks/usePokemons';

const HomePages = () => {

    const [paginacion, setPaginacion] = useState(0);
    const [search, setSearch] = useState("");

    const {isLoading, pokemons} = usePokemons();

    const filterPokemons = () => {

        if(search.length === 0) {
            return pokemons.slice(paginacion,paginacion + 5 );
        }

        const filterPokemons = pokemons.filter(poke => poke.name.includes(search));

        return filterPokemons.slice(paginacion,paginacion + 5 );
    }

    const handleNext = () => {
        if(pokemons.filter(poke => poke.name.includes(search)).length > paginacion + 5){
            setPaginacion((oldPaginacion)=> oldPaginacion + 5);
        }
    }

    const handlePrevius = () => {
        if(paginacion > 0) setPaginacion((oldPaginacion)=> oldPaginacion - 5);
    }

    const handleSearch = (e) => {
        setPaginacion(0)
        setSearch(e.target.value);
        
    }
       
    return(
        <div className="mt-5">
            <h1>Listado de Pokemones</h1>
            <input 
                className="mb-2 form-control" 
                type="text" 
                placeholder="Buscar Pokemon" 
                onChange={handleSearch}
                value={search}
                />
            <button 
                onClick={handlePrevius} 
                className="btn btn-primary">Anterior</button>
            &nbsp;
            &nbsp;
            <button 
                onClick={handleNext} 
                className="btn btn-primary">Proximo</button>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{width:100}}>Id</th>
                        <th style={{width:100}}>Nombre</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filterPokemons().map(({id, name, pic})=> (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td><img src={pic}alt={name} /></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                isLoading && <Loading/>
            }
        
        </div>
    )

}

export default HomePages;