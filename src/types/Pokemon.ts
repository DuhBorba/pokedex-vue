export interface Pokemon {
  name: string
  url: string
}

export interface PokemonResponse {
  count: number | null
  next: string | null
  previous: string | null
  results: Pokemon[]
}
