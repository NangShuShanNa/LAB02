<script setup lang="ts">
import { type Event } from '@/types'  // Ensure this path matches your project
defineProps<{
  event: Event
}>()
</script>

<template>
  <RouterLink
    class="event-link"
    :to="{ name: 'event-detail-view', params: { id: event.id } }"
  >
    <div class="event-card">
      <h2>{{ event.title }}</h2>
      <span>@{{ event.time }} on {{ event.date }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.event-card {
  padding: 1rem;        /* Tailwind's p-4 ≈ 16px */
  width: 16rem;         /* Tailwind's w-64 ≈ 256px */
  cursor: pointer;
  border: 1px solid #4b5563;  /* Tailwind's border-gray-600 */
  margin-bottom: 1.5rem; /* Tailwind's mb-6 ≈ 24px */
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-link {
  text-decoration: none;
  color: #2c3e50;
}
</style>
