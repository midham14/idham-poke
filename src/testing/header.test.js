import { fireEvent, render, waitFor } from '@testing-library/react';
import Header from '../components/Header';
import { BrowserRouter } from 'react-router-dom'


describe("Header Component Testing", () => {
  test("Header should return correct text", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    const exploreNavigation = getByText(/explore/i)
    const myPokemonNavigation = getByText(/mypokemon/i)
    expect(exploreNavigation).toBeInTheDocument()
    expect(myPokemonNavigation).toBeInTheDocument()
  })

  test("Header should have correct height", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    const headerContainer = getByTestId("container-header")
    expect(headerContainer).toHaveStyle("height:10vh;")
  })


  // test("myPokemon navigation should change page properly", async ()=>{
    // const { getByTestId, findByText } = render(<App/>)

    // const myPokemonButton = getByTestId("mypokemon-link")
    // console.log(myPokemonButton)

    // fireEvent.click(myPokemonButton)

    // const textEmptyPokemon = await findByText(/empty pokemon/i)

    // expect(textEmptyPokemon).toBeInTheDocument()
  // })
})