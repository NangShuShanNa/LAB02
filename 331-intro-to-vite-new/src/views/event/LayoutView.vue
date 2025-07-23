<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { type Event } from '@/types'
import EventService from '@/services/EventService'

// Setup
const route = useRoute()
const event = ref<Event | null>(null)

onMounted(() => {
  const id = route.params.id as string
  EventService.getEvent(parseInt(id))
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>

    <nav>
      <RouterLink :to="{ name: 'event-detail-view' }">Details</RouterLink>
      |
      <RouterLink :to="{ name: 'event-register-view' }">Register</RouterLink>
      |
      <RouterLink :to="{ name: 'event-edit-view' }">Edit</RouterLink>
    </nav>

    <!-- Render child component -->
    <RouterView :event="event" />
  </div>
</template>
