<template>
  <div class="w-full text-right text-sm mt-2 pr-4">
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
