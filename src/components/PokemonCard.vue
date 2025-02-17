<script setup lang="ts">
import { computed } from 'vue'
import { typeColors } from '@/utils/typeColors'

const props = defineProps<{
  id: number
  name: string
  types: string[]
}>()

const backgroundColor = computed(
  () => typeColors.colors.backgroundCard[props.types[0]] || '#a8d3a0',
)
</script>

<template>
  <div class="pokemon-card" :style="{ backgroundColor }">
    <h6>#{{ id }}</h6>
    <img
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`"
      :alt="props.name"
      class="pokemon-image"
    />
    <h3 class="pokemon-name">{{ props.name }}</h3>
    <div class="pokemon-types">
      <span
        v-for="type in props.types"
        :key="type"
        class="pokemon-type"
        :style="{ backgroundColor: typeColors.colors.boxType[type] }"
      >
        {{ type }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.pokemon-card {
  width: 180px;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  color: white;
  font-weight: bold;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;
}

.pokemon-card:hover {
  transform: scale(1.05);
}

.pokemon-card h6 {
  color: #000;
  text-align: left;
}

.pokemon-image {
  width: 100px;
  height: 100px;
}

.pokemon-name {
  text-transform: capitalize;
  margin: 10px 0;
  font-size: 18px;
}

.pokemon-types {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.pokemon-type {
  padding: 5px 10px;
  border-radius: 8px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  color: white;
}
</style>
