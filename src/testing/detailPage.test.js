import { fireEvent, render, waitFor } from '@testing-library/react';
import App from '../App';
import { MyPokemonContext } from '../App'
import { ApolloProvider } from '@apollo/client'
import client from '../services/graphql/index'
import { Suspense, lazy} from 'react'

const DetailPokemon = lazy(() => import('./pages/DetailPokemon'))


describe("Detail Pokemon Testing",  ()=>{
    test("Detail Pokemon should show loading", ()=>{
      const { getByText } = render(
        <ApolloProvider client={client}>
          <MyPokemonContext.Provider value={{
            myPokeList:[],
          }}>
            <Suspense fallback={<p>Loading...</p>}>
              <DetailPokemon/>
            </Suspense>
          </MyPokemonContext.Provider>
        </ApolloProvider>
      )

      const loadingText = getByText(/loading/i)
      expect(loadingText).toBeInTheDocument()

    })

  // test("Detail Pokemon should have catch button", async ()=>{
  //   const { getByText } = render(
  //     <ApolloProvider client={client}>
  //       <MyPokemonContext.Provider value={{
  //         myPokeList:[],
  //       }}>
  //         <Suspense fallback={<p>Loading...</p>}>
  //           <DetailPokemon/>
  //         </Suspense>
  //       </MyPokemonContext.Provider>
  //     </ApolloProvider>
  //   )

  //   const catchText = await waitFor(()=>{
  //     return getByText(/catch/i)
  //   }) 

  //   expect(catchText).toBeInTheDocument()
  // })
})