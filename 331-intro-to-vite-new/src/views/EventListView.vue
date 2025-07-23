<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventService'
import CategoryOrganizer from '@/components/CategoryOrganizer.vue'
import type { Event } from '@/type'
import EventCard from '@/components/EventCard.vue'


// ✅ Always start with an empty array to avoid undefined access
const events = ref<Event[]>([])

onMounted(() => {
  EventService.getEvents()
    .then((response) => {
      events.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <div>
    <h1>Events For Good</h1>
    <div class="events">
      <div v-for="event in events" :key="event.id" class="event-item">
        <EventCard :event="event" />
        <CategoryOrganizer :event="event" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.event-item {
  width: 100%;
  max-width: 250px;
}
</style>
