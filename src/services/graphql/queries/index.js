import { gql } from '@apollo/client'

export const get_poke = gql`
    query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
        count
        next
        previous
        nextOffset
        prevOffset
        status
        message
        results {
            url
            name
            image
            }
        }
    }
`


export const get_detail = gql`
    query pokemon($name: String!) {
        pokemon(name: $name) {
        id
        name
        stats {
            stat {
            name
            }
            base_stat
        }
        sprites {
            front_default
        }
        moves {
            move {
            name
            }
        }
        types {
            type {
            name
            }
        }
        }
    }
`