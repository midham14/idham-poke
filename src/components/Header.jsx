import { Link } from "react-router-dom";
import styled from '@emotion/styled'
import pokeLogo from '../poke-logo.webp'
const Header = () => {
    const ContainerHeader = styled.div`
        display:flex;
        justify-content:space-between;
        padding:2vh 4vw 0 4vw;
        height:10vh;

        .header-navigation{
            padding-top:3vh
        }

        .header-navigation > a { 
            margin:0 2vw;
            text-decoration:none;
            color:black;
            font-weight:bolder;
            
        }
    `
    return (
        <ContainerHeader data-testid="container-header">
            <Link to="/"><img src={pokeLogo} height={"47"} width={"128"} alt="logo" /></Link>
            <div className="header-navigation">
                <Link to="/">Explore</Link>
                <Link to="/mypokemon" data-testid="mypokemon-link">MyPokemon</Link>
                <a href="https://github.com/midham14/idham-poke" target="_blank">Github</a>
            </div>
        </ContainerHeader>
    )
}


export default Header