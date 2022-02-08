import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom'

describe("Header Component Testing", ()=>{
  test("Header should return correct text", ()=>{
    const { getByText } = render(
      <BrowserRouter>
        <Header/>
      </BrowserRouter>
    )

    const exploreNavigation = getByText(/explore/i)
    const myPokemonNavigation = getByText(/mypokemon/i)
    
    expect(exploreNavigation).toBeInTheDocument()
    expect(myPokemonNavigation).toBeInTheDocument()
  })


  // test("myPokemon navigation should change page properly", async ()=>{
  //   const { getByTestId, findByText } = render(
  //     <BrowserRouter>
  //       <Header/>
  //     </BrowserRouter>
  //   )

  //   const myPokemonButton = getByTestId("mypokemon-link")

  //   fireEvent.click(myPokemonButton)

  //   const textEmptyPokemon = await findByText(/empty pokemon/i)
    
  //   expect(textEmptyPokemon).toBeInTheDocument()
  // })
})