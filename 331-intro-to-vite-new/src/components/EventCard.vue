<script setup lang="ts">
import { type Event } from '@/types'
defineProps<{
  event: Event
}>()
</script>

<template>
  <RouterLink
    :to="{ name: 'event-detail-view', params: { id: event.id } }"
    class="inline-block no-underline text-inherit"
  >
    <div
      class="border-2 border-solid border-gray-300 p-5 w-[250px] mb-[18px] bg-white transition-transform hover:scale-[1.01] hover:shadow-[0_3px_12px_rgba(0,0,0,0.2)]"
    >
      <h2 class="text-lg font-semibold">{{ event.title }}</h2>
      <span class="text-gray-600">@{{ event.time }} on {{ event.date }}</span>
    </div>
  </RouterLink>
</template>
