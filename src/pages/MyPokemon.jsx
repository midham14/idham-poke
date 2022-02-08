import { MyPokemonContext } from '../App'
import { useState } from 'react'
import { useContext } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

    const ContainerMyPokemon = styled.div`
        display:flex;
        padding:2vh 3vw;
        flex-wrap:wrap;
    `
    const PokeListCard = styled.div`
        background-color:white;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
        width:43vw;
        margin:2vh 2vw;
        height:27vh;
        text-align:center;

        .mypoke-pokename{
            font-weight:bolder;
        }     
        .mypoke-name{
            font-size:0.8rem;
            color:silver
        }

        .mypoke-release-button{
            background-color:red;
            color:white;
            border:transparent;
            width:40vw;
            font-size:0.8rem;
            font-weight:bolder;
            padding:0.4vh 1vw;
            border-radius:3px;
            margin-top:1vh;
        }
        @media only screen and (min-height: 767px), screen and (min-width:1023px){
            height:40vh;
        }
        
        @media only screen and (min-height: 895px){
            height:20vh
        }
        @media only screen and (min-height: 1079px), screen and (min-width:1919px){
            height:18vh;
            width:17vw;

            .mypoke-release-button{
                width:15vw
            }
        }

    `
    const ReleaseToast = styled.div`
    position:absolute;
    top:10vh;
    right:25vw;
    background-color:#66bb6a; 
    color:white; 
    font-weight:bolder; 
    padding:1vh 5vw; 
    font-size:0.7em;
    `
const MyPokemon = () => {

    const [released, setReleased] = useState(false)

    const { myPokeList, myPokeListChange } = useContext(MyPokemonContext)

    const onReleaseClick=(poke)=>{
        const newPokeList = myPokeList.filter((value)=>value.pokeName !== poke.pokeName)
        myPokeListChange(newPokeList)
        localStorage.setItem('mypokelist', JSON.stringify(newPokeList))
        setReleased(true)
        setTimeout(()=>{
            setReleased(false)
        },1500)
    }

    return (
        <ContainerMyPokemon>
            {
                released ?  
                <ReleaseToast>
                    Release Successfully
                </ReleaseToast> 
                :
                null
            }

            {
                myPokeList.length < 1 ? <div>Empty pokemon Go Catch !</div>:null
            }
           
            {
                myPokeList.map((value,index) => {
                    return (
                        <PokeListCard key={index}>
                            <Link to={`/detail/${value.name}`} style={{textDecoration:'none'}}>
                                <img src={value.pokeImg} width={"96"} alt={value.name} />
                                <div className="mypoke-pokename" style={{color:'black'}}>{value.pokeName}</div>
                                <div className="mypoke-name">{value.name}</div>
                            </Link>
                            <button className='mypoke-release-button' onClick={()=>{onReleaseClick(value)}}>release pokemon</button>
                        </PokeListCard>
                    )
                })
            }
        </ContainerMyPokemon>
    )
}

export default MyPokemon