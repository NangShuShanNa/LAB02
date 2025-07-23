<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { type Event } from '@/types'
import EventService from '@/services/EventService'

// Route info
const route = useRoute()
const id = route.params.id as string

// Reactive event state
const event = ref<Event | null>(null)

// Fetch event data on mount
onMounted(() => {
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
      <router-link :to="{ name: 'event-detail-view', params: { id } }">Details</router-link>
      |
      <router-link :to="{ name: 'event-register-view', params: { id } }">Register</router-link>
      |
      <router-link :to="{ name: 'event-edit-view', params: { id } }">Edit</router-link>
    </nav>

    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
    <p>Edit Event</p>
  </div>

</template>
