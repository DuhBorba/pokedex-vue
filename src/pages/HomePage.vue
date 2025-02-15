<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAllPokemons } from '@/services/pokemonService'

const pokemons = ref<Pokemon[]>([]);

onMounted(async () => {
  try {
    const data = await getAllPokemons();
    pokemons.value = data.results;
    console.log(pokemons.value);
  } catch (error) {
    console.error('Erro ao buscar Pokémons:', error);
  }
});

</script>

<template>
  <ul>
    <li v-for="pokemon in pokemons" :key="pokemon.name">
      {{pokemon.name}}
    </li>
  </ul>
</template>
