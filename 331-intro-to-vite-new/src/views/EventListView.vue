<script setup lang="ts">
  import EventCard from '@/components/EventCard.vue';
  import CategoryOrganizer from '@/components/CategoryOrganizer.vue';
  import type { Event } from '@/type'

import { ref, onMounted } from 'vue'
import axios from 'axios'

const events = ref<Event[]>()

onMounted(() => {
  axios
    .get('https://my-json-server.typicode.com/NangShuShanNa/CompoNewLab02/events')
    .then((response) => {
      events.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})

</script>

<template>
    <h1>Events For Good</h1>
    <!--new element-->
  <div class="events">
    <div v-for="event in events" :key="event.id" class="event-item">
      <EventCard :event="event"/>
      <CategoryOrganizer :event="event"/>
    </div>
  </div>
</template>

<style scoped>
.events {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;  /* Added for better spacing */
}

.event-item {
  width: 100%;
  max-width: 250px; /* Should match your EventCard width */
}
</style>
