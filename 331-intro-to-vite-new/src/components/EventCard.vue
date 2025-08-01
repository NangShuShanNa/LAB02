<script setup lang="ts">
import { type Event } from '@/types'
defineProps<{
  event: Event
}>()
</script>

<template>
  <RouterLink
    class="event-link"
    :to="{ name: 'event-detail-view', params: { id: event.id } }"
  >
    <!-- Changed border classes for guaranteed visibility -->
    <div class="border-2 border-solid border-gray-300 p-[20px] w-[250px] mb-[18px] hover:scale-[1.01] hover:shadow-[0_3px_12px_rgba(0,0,0,0.2)] bg-white">
      <h2 class="text-lg font-semibold">{{ event.title }}</h2>
      <span class="text-gray-600">@{{ event.time }} on {{ event.date }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.event-link {
  text-decoration: none;
  color: inherit;
  display: inline-block; /* Ensures proper border containment */
}
</style>
