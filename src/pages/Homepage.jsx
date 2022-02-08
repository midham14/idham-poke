import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { get_poke } from '../services/graphql/queries'
import { lazy, Suspense } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const PokeListCard = lazy(() => import('../components/PokeListCard'));


const renderLoader = () => <p>Loading..</p>

const Container = styled.div`
    padding:2vh 3vw;
    .infinite-scroll{
        display:flex;
        flex-wrap:wrap;
    }
`
const Homepage=()=>{
    const { loading, error, data, fetchMore } = useQuery(get_poke,{
        variables:{
            limit:20,
            offset:1
        }
    })

    // console.log(data)


    const loadMorePoke=()=>{
        // console.log('masuk loadMore')
        fetchMore({
            variables:{
                offset: data.pokemons.results.length
            }
        })
    }

    if(loading){
        return <div>Loading...</div>
    }
    if(error){
        return <div>error...</div>
    }


    return(
        <Suspense fallback={renderLoader()}>
            <Container>
                <InfiniteScroll
                dataLength={data.pokemons.results.length}
                next={loadMorePoke}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                className="infinite-scroll"
                >
                    {
                        data.pokemons.results.map((value,index)=>{
                            return(
                                <Link key={index} style={{textDecoration:'none'}} to={`/detail/${value.name}`}>
                                    <PokeListCard pokemon={value}/>
                                </Link>
                            )
                        })
                    }
                </InfiniteScroll>
            </Container>
        </Suspense>
    )
}

export default Homepage