<template>
  <div class="category-organizer">
    <div>{{ event.category }}</div>
    <div>{{ event.organizer }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '@/types'

defineProps<{
  event: Event
}>()
</script>

<style scoped>
.category-organizer {
  text-align: right;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  width: 100%;
  padding-right: 1rem;
}
</style>
