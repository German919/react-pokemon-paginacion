import React,{useState} from 'react';
import Loading from '../components/Loading';
import { usePokemons } from '../hooks/usePokemons';

const HomePages = () => {

    const [paginacion, setPaginacion] = useState(0);
    const [search, setSearch] = useState("");

    const {isLoading, pokemons} = usePokemons();

    const filterPokemons = () => {

        if(search.length === 0) {
            return pokemons.slice(paginacion, parseInt(paginacion + 5 ));
        }

        const filterPokemons = pokemons.filter(poke => poke.name.includes(search));

        return filterPokemons.slice(parseInt(paginacion + 5 ));
    }

    const handleNext = () => {
        if(pokemons.filter(poke => poke.name.includes(search)).length > paginacion + 5){
            setPaginacion((oldPaginacion)=> parseInt(oldPaginacion + 5));
        }
    }

    const handlePrevius = () => {
        if(paginacion > 0) setPaginacion((oldPaginacion)=> parseInt(oldPaginacion - 5));
    }

    const inicioPage = () => {
        if(paginacion > 0) setPaginacion(0);
    }

    const finPage = () => {
        
        let indiceFinal = pokemons.length;
        let inicio = parseInt(indiceFinal - 5);
        setPaginacion(inicio)

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
            <button onClick={inicioPage} className="btn btn-danger">Inicio</button>    
            <button 
                onClick={handlePrevius} 
                className="btn btn-primary">Anterior</button>
            &nbsp;
            &nbsp;
            <button 
                onClick={handleNext} 
                className="btn btn-primary">Proximo</button>
            <button onClick={finPage} className="btn btn-danger">Fin</button>

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