import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { get_detail } from '../services/graphql/queries'
import styled from '@emotion/styled'
import Modal from 'react-modal';
import { MyPokemonContext } from '../App'
import poke from '../poke.webp'


const successModalStyle = {
    content: {
        top: '55%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-45%',
        transform: 'translate(-50%, -50%)',
        color:'black',
        fontWeight:'bolder',
    },
};

const Container = styled.div`
    color:white;
    background-color:${props => props.type === "dragon" ? "#b71c1c ": props.type ===  "ghost" ? "#757575": props.type === "rock" ? "#455a64 ": props.type === "psychic" ? "#d500f9": props.type === "fighting" ? "#004d40": props.type === "fairy" ? "#d81b60": props.type === "ground" ? "#5d4037": props.type === "electric" ? "#fbc02d": props.type === "poison" ? "#512da8": props.type === "normal" ? "#757575" : props.type ==="bug" ? "#7cb342" : props.type === "fire" ? "#bf360c" : props.type ==="grass" ? "#1b5e20" : props.type === "water" ? "#01579b" : "pink"};
    min-height:88.5vh;
    padding:0.7vh 1.2vw;
    display:flex;
    flex-direction:column;
    align-items:center;

    .detail-box-name{
        font-weight:500;
        font-size:1.3rem;
        width:100%;
        font-weight:bolder;
    }

    .detail-box-img{
        position:absolute;
        z-index:1
    }

    .detail-box-info{
        background-color:white;
        width:100%;
        height:100%;
        border-radius:8px;
        position:relative;
        z-index:0;
        margin:18vh 0 0 0;
        padding:10vh 0 0 0;
    }

    .detail-box-types{
        display:flex;
        justify-content:center;
        flex-wrap:wrap;
        margin-top:1vh;
    }

    .detail-box-moves{
        text-align:center;
        font-weight:bolder;
        height:40vh;
        overflow:scroll;
        color: ${props => props.type === "dragon" ? "#b71c1c ": props.type ===  "ghost" ? "#757575": props.type === "rock" ? "#455a64 ": props.type === "psychic" ? "#d500f9": props.type === "fighting" ? "#004d40": props.type === "fairy" ? "#d81b60": props.type === "ground" ? "#5d4037": props.type === "electric" ? "#fbc02d": props.type === "poison" ? "#512da8": props.type === "normal" ? "#757575" : props.type ==="bug" ? "#7cb342" : props.type === "fire" ? "#bf360c" : props.type ==="grass" ? "#1b5e20" : props.type === "water" ? "#01579b" : "pink"};
    }
    
    .moves-text{ 
        color: ${props => props.type === "dragon" ? "#b71c1c ": props.type ===  "ghost" ? "#757575": props.type === "rock" ? "#455a64 ": props.type === "psychic" ? "#d500f9": props.type === "fighting" ? "#004d40": props.type === "fairy" ? "#d81b60": props.type === "ground" ? "#5d4037": props.type === "electric" ? "#fbc02d": props.type === "poison" ? "#512da8": props.type === "normal" ? "#757575" : props.type ==="bug" ? "#7cb342" : props.type === "fire" ? "#bf360c" : props.type ==="grass" ? "#1b5e20" : props.type === "water" ? "#01579b" : "pink"};
        text-align:center;
        font-weight:bolder;
        font-size:1.5rem;
    }

    .detail-box-base-stat{
        color: ${props => props.type === "dragon" ? "#b71c1c ": props.type ===  "ghost" ? "#757575": props.type === "rock" ? "#455a64 ": props.type === "psychic" ? "#d500f9": props.type === "fighting" ? "#004d40": props.type === "fairy" ? "#d81b60": props.type === "ground" ? "#5d4037": props.type === "electric" ? "#fbc02d": props.type === "poison" ? "#512da8": props.type === "normal" ? "#757575" : props.type ==="bug" ? "#7cb342" : props.type === "fire" ? "#bf360c" : props.type ==="grass" ? "#1b5e20" : props.type === "water" ? "#01579b" : "pink"};
        text-align:center;
        font-weight:bolder;
        font-size:1.5rem
    }

    .catch-box{
        position:absolute;
        right:0;
        -webkit-animation: linear infinite;
        -webkit-animation-name: run;
        -webkit-animation-duration: 0.3s;
        }
        @-webkit-keyframes run {
        0% {
            right: 0.6%;
        }
       
    }

    .catch-text{
        color:white; 
        font-weight:bolder; 
        font-size:0.7rem; 
        margin-left:2vw;
    }

   @media only screen and (min-height: 785px), screen and (min-width:1023px){
        min-height:23vh;   
        
        .detail-box-info{
            margin-top:13vh
        }

        .catch-text{
            margin-left:0.5vw;
        }
    } 

    @media only screen and (min-height: 895px){
        min-height:86.5vh;

        .detail-box-info{
            margin-top:11vh
        }
    }


`

const PokemonTypesCard = styled.div`
    border-radius: 20px;
    margin: 1vw 1vh;
    font-size: 1rem;
    font-weight: bolder;
    padding: 1vh 10vw;
    color: white;
    background-color: ${props => props.type === "dragon" ? "#b71c1c ": props.type ===  "ghost" ? "#757575": props.type === "rock" ? "#455a64 ": props.type === "psychic" ? "#d500f9": props.type === "fighting" ? "#004d40": props.type === "fairy" ? "#d81b60": props.type === "ground" ? "#5d4037": props.type === "electric" ? "#fbc02d": props.type === "poison" ? "#512da8": props.type === "normal" ? "#757575" : props.type ==="bug" ? "#7cb342" : props.type === "fire" ? "#bf360c" : props.type ==="grass" ? "#1b5e20" : props.type === "water" ? "#01579b" : "pink"};
`

const PokemonStatsCard = styled.div`
    display: flex;
    font-size: 0.7rem;
    align-items:center;
    justify-content:center;
    color: black;

    .stat-name{
        width:50vw;
        text-align:left;
    }

    .stat-score{
        width:10vw;
    }
`

const PokeMovesCard = styled.div`
    color: white; 
    background-color: silver; 
    border-radius: 10px; 
    font-size: 0.7rem; 
    width: 25.5vw; 
    height: 3vh; 
    padding: 1vh 1vw; 
    margin: 1vh 2vw; 
    text-align: center;
`

const DetailPokemon = () => {

    let { myPokeList, myPokeListChange } = useContext(MyPokemonContext)
    
    let params = useParams()
    let { data, loading, error } = useQuery(get_detail, { variables: { name: params.name } })



    let [successModalOpen, setSuccessModalOpen] = useState(false)
    let [failedModalOpen, setFailedModalOpen] = useState(false)

    let [input, setInput] = useState("")
    let [warningDupe, setWarningDupe] = useState(false)

    const onGatchaClick = () => {
        let chance = Math.floor(Math.random() * 2)

        if (chance) {
            setSuccessModalOpen(true)
        } else {
            setFailedModalOpen(true)
        }
    }

    const onChangeHandle = (e) => {
        setInput(e.target.value)
    }

    const onClickSave = (e) => {

        let duplicateCheck = myPokeList.filter((value) => value.pokeName === input)

        if (duplicateCheck.length) {
            setWarningDupe(true)
        } else {
            myPokeListChange(myPokeList.concat({ name: data.pokemon.name, pokeName: input, pokeImg: data.pokemon.sprites.front_default }))
            localStorage.setItem('mypokelist', JSON.stringify(myPokeList.concat({ name: data.pokemon.name, pokeName: input, pokeImg: data.pokemon.sprites.front_default })))
            setSuccessModalOpen(false)
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>error...</div>
    }

    return (
        <Container type={data.pokemon.types[0].type.name}>
            <Modal
                isOpen={successModalOpen}
                style={successModalStyle}
                ariaHideApp={false}
            >
                <div>Congratulation success catcha pokemon</div>
                {
                    warningDupe ? <div style={{ color: 'red' }} >name already registered !</div> : null
                }
                <div style={{marginTop:'3vh'}}>
                    <input onChange={(e) => onChangeHandle(e)} placeholder="pokemon name"/>
                    <button onClick={(e) => onClickSave(e)}>Save</button>
                    <button onClick={() => setSuccessModalOpen(false)} >Release</button>
                </div>
            </Modal>
            <Modal                
                isOpen={failedModalOpen}
                style={successModalStyle}
                ariaHideApp={false}
            >
                <div style={{textAlign:'center'}}>Failed</div>
                <img src={`https://www.kindpng.com/picc/m/102-1024078_pokemon-snorlax-png-transparent-png.png`} height={"75"} alt="failed"/>
                <div>
                    <button onClick={()=>{setFailedModalOpen(false)}}>Try Again</button>
                </div>
            </Modal>
            <div className='detail-box-name'>{data.pokemon.name}</div>
            <img className='detail-box-img' src={data.pokemon.sprites.front_default} width={220} alt="data.pokemon.name" />
            <div className='detail-box-info'>
                <div className='detail-box-types'>
                    {data.pokemon.types.map((value, index) => {
                        return (
                            <PokemonTypesCard key={index} type={data.pokemon.types[0].type.name}>
                                {value.type.name}
                            </PokemonTypesCard>
                        )
                    })}
                </div>
                <div className='detail-box-base-stat'>
                    <div>Base Stat</div>
                    {
                        data.pokemon.stats.map((value, index) => {
                            return (
                                <PokemonStatsCard key={index}>
                                    <div className="stat-name">{value.stat.name}</div>
                                    <div className="stat-score">{value.base_stat}</div>
                                </PokemonStatsCard>
                            )
                        })
                    }
                </div>
                <div >
                    <div className="moves-text">Moves</div>
                    <div className='detail-box-moves'>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {
                                data.pokemon.moves.map((value, index) => {
                                    return (
                                        <PokeMovesCard key={index}>
                                            {value.move.name.replace('-', ' ')}
                                        </PokeMovesCard>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="catch-box">
                <img src={poke} width={60} style={{ opacity: 1, marginRight:'2vw' }} onClick={() => { onGatchaClick() }} alt="gatcha" />
                <div className="catch-text">Catch!!</div>
            </div>
        </Container>
    )
}


export default DetailPokemon

