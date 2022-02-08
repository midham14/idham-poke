import './App.css';
import { createContext, useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import { lazy, Suspense } from 'react'
import client from './services/graphql/index'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Homepage = lazy(()=>import('./pages/Homepage'))
const MyPokemon = lazy(()=>import('./pages/MyPokemon'))
const DetailPokemon = lazy(()=>import('./pages/DetailPokemon'))
const Header = lazy(()=>import('./components/Header'))
const renderLoader = () => <p>Loading..</p>

export const MyPokemonContext = createContext()

function App() {

  const [myPoke, setMyPoke] = useState(localStorage.getItem('mypokelist') ? JSON.parse(localStorage.getItem('mypokelist')) : [])

  return (
    <Suspense fallback={renderLoader()}>
      <ApolloProvider client={client}>
        <MyPokemonContext.Provider value={{
          myPokeList:myPoke,
          myPokeListChange:(value)=>{setMyPoke(value)}
        }}>
          <BrowserRouter>
              <Header/>
              <Routes>
                <Route path={'/'} element={<Homepage/>}/>
                <Route path={'/mypokemon'} element={<MyPokemon/>}/>
                <Route path={'/detail/:name'} element={<DetailPokemon/>}/>
              </Routes>
            </BrowserRouter>
          </MyPokemonContext.Provider>
      </ApolloProvider>
    </Suspense>
  );
}

export default App;
