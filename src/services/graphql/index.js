import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    uri:"https://graphql-pokeapi.vercel.app/api/graphql",
    cache: new InMemoryCache({
        typePolicies:{
            Query:{
                fields:{
                    pokemons:{
                        keyArgs:[],
                        merge(existing, incoming, { args: { offset = 1 }}){
                            // console.log(existing,'existing')
                            // console.log(incoming,'incoming')

                            const merged = existing ? existing.results.slice(0) : [];
                            for (let i = 0; i < incoming.results.length; ++i) {
                                // console.log('a')
                                merged[offset + i] = incoming.results[i];
                            }
                            // console.log(merged,'aa')
                            return {...incoming, results:merged}
                        }
                    }
                }
            }
        }
    })
})

export default client