import api from './api';
import type { PokemonResponse } from '@/types/Pokemon';

export async function getAllPokemons(): Promise<PokemonResponse> {
  const response = await api.get<PokemonResponse>('/pokemon');
  return response.data;
}
