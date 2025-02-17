import api from './api'
import type { PokemonResponse } from '@/types/Pokemon'
import type { PokemonDetailResponse } from '@/types/PokemonDetails'

export async function getAllPokemons(limit = 20, offset = 0): Promise<PokemonResponse> {
  const response = await api.get<PokemonResponse>(`/pokemon?limit=${limit}&offset=${offset}`)
  return response.data
}

export async function getPokemonDetails(name: string): Promise<PokemonDetailResponse> {
  const response = await api.get<PokemonDetailResponse>(`/pokemon/${name}`)
  return response.data
}
