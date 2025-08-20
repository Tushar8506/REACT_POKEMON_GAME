import { useEffect } from "react"
import "/src/index.css"
import { useState } from "react"
import { PokemonCard } from "./PokemonCard"
export const Pokemon = () => {
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)
    const[error,setError]=useState(null)
    const[search, setSearch]=useState("")

    const API = "https://pokeapi.co/api/v2/pokemon?limit=523"

    const fetchPokemon = async () => {
        try {
            const res = await fetch(API)
            const data = await res.json()
            // console.log(data)
            const detailedPokemonData = data.results.map(async (curPokemon) => {
                const res = await fetch(curPokemon.url)
                const data = await res.json()
                return data
            })

            const detailResponseData = await Promise.all(detailedPokemonData)
            // console.log(detailResponseData)
            setPokemon(detailResponseData)
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(error)
        }

    }

    useEffect(() => {
        fetchPokemon()
    }, [])

const SearchData = pokemon.filter((curPokemon)=>curPokemon.name.toLowerCase().includes(search.toLowerCase()))
    if(loading){
        return(
            <h1>Loading...</h1>
        )
    }
    if(error){
        return(
            <h1>{error.message}</h1>
        )
    }
    return (
        <>
            <section className="container">
                <header>
                    <h1>Lets Catch Pokemon</h1>
                </header>
                <div className="pokemon-search">
                    <input type="text"  placeholder="Search Pokemon" 
                    value={search} onChange={(e)=>setSearch(e.target.value)}/>
                </div>
                <div>
                    <ul className="cards">
                        {/* {pokemon.map((curPokemon) => { */}
                        {SearchData.map((curPokemon) => {
                            return <PokemonCard key={curPokemon.id} pokemonData={curPokemon} />
                        })}
                    </ul>
                </div>
            </section>
        </>
    )
}