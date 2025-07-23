<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    resource: string
  }>(),
  {
    resource: 'page'
  }
)
</script>

<template>
  <div>
    <h1>Opps!</h1>
    <h3>The page uou are looking for is not here</h3>
    <router-link :to="{ name: 'event-list-view' }">Back to Home Page</router-link>
  </div>
</template>
