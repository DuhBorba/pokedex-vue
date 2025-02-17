<script setup lang="ts">
import PokemonCard from '@/components/PokemonCard.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { getAllPokemons, getPokemonDetails } from '@/services/pokemonService'

const pokemons = ref<Pokemon[]>([])
const limit = 50
const offset = ref(0)
const isLoading = ref(false)

const loadPokemons = async () => {
  if (isLoading.value) return
  isLoading.value = true

  try {
    const data = await getAllPokemons(limit, offset.value)

    const detailedPokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        const details = await getPokemonDetails(pokemon.name)
        return {
          id: details.id,
          name: details.name,
          types: details.types.map((t) => t.type.name),
        }
      }),
    )

    pokemons.value = [...pokemons.value, ...detailedPokemons]
    offset.value += limit
  } catch (error) {
    console.error('Erro ao buscar Pokémons:', error)
  } finally {
    isLoading.value = false
  }
}

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadPokemons()
  }
}

onMounted(() => {
  loadPokemons()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="pokemon-list">
    <PokemonCard
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :id="pokemon.id"
      :name="pokemon.name"
      :types="pokemon.types"
    />
  </div>
  <p v-if="isLoading" class="loading">Carregando mais Pokémon...</p>
</template>

<style scoped>
.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  padding: 16px;
}

.loading {
  text-align: center;
  font-size: 18px;
  margin: 20px;
}
</style>
