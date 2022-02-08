import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { get_detail } from '../services/graphql/queries'
import { useContext } from 'react'
import { MyPokemonContext } from '../App'

const PokeCard = styled.div`
    color:red;
    width:37vw;
    height:22vh;
    margin:2vh 3vw;
    border:2px solid ${props => props.type === "dragon" ? "#b71c1c ": props.type ===  "ghost" ? "#757575": props.type === "rock" ? "#455a64 ": props.type === "psychic" ? "#d500f9": props.type === "fighting" ? "#004d40": props.type === "fairy" ? "#d81b60": props.type === "ground" ? "#5d4037": props.type === "electric" ? "#fbc02d": props.type === "poison" ? "#512da8": props.type === "normal" ? "#757575" : props.type ==="bug" ? "#7cb342" : props.type === "fire" ? "#bf360c" : props.type ==="grass" ? "#1b5e20" : props.type === "water" ? "#01579b" : "pink"};
    display:flex;
    flex-direction:column;
    align-items:center;
    
    .poke-card-box-name{
        background-color:${props => props.type === "dragon" ? "#b71c1c ": props.type ===  "ghost" ? "#757575": props.type === "rock" ? "#455a64 ": props.type === "psychic" ? "#d500f9": props.type === "fighting" ? "#004d40": props.type === "fairy" ? "#d81b60": props.type === "ground" ? "#5d4037": props.type === "electric" ? "#fbc02d": props.type === "poison" ? "#512da8": props.type === "normal" ? "#757575" : props.type ==="bug" ? "#7cb342" : props.type === "fire" ? "#bf360c" : props.type ==="grass" ? "#1b5e20" : props.type === "water" ? "#01579b" : "pink"};
        color:white;
        height:100%;
        text-align:center;
        width:100%;
    }

    @media only screen and (min-height: 767px), screen and (min-width:1023px){
        height:19vh
    }

    @media only screen and (min-height: 895px){
        height:17vh
    }
    
    @media only screen and (min-height: 1079px), screen and (min-width:1919px){
        height:15.8vh;
        width:17vw;
    }

`

const PokeListCard=(props)=>{

    const { myPokeList } = useContext(MyPokemonContext)

    const countMyPoke=()=>{
        let count = myPokeList.filter((value)=>value.name === props.pokemon.name)
        return count.length
    }

    const {data, loading, error} = useQuery(get_detail, {
        variables:{
            name:props.pokemon.name
        }
    })

    if(loading){
        return <div>Loading..</div>
    }

    return(
        <PokeCard type={data.pokemon.types[0].type.name}>
            <img src={props.pokemon.image} width={'96'} height={'96'} alt={props.pokemon.name}/>
            <div className='poke-card-box-name'>
                <div style={{fontWeight:'bolder'}}>{props.pokemon.name}</div>
                <div>owned x{countMyPoke()}</div>
            </div>
        </PokeCard>
    )
}


export default PokeListCard