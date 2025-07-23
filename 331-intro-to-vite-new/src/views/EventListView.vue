<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import EventService from '@/services/EventService'
import CategoryOrganizer from '@/components/CategoryOrganizer.vue'
import {type Event} from '@/types'
import EventCard from '@/components/EventCard.vue'

// Reactive state
const events = ref<Event[] | null>(null)

// Props from route
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

// Computed page number
const page = computed(() => props.page)

// Load events on mount
onMounted(() => {
  EventService.getEvents(2, page.value) // 2 items per page
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

    <div class="pagination">
      <RouterLink
        :to="{ name: 'event-list-view', query: { page: page - 1 } }"
        rel="prev"
        v-if="page !== 1"
      >
        Prev Page
      </RouterLink>

      <RouterLink
        :to="{ name: 'event-list-view', query: { page: page + 1 } }"
        rel="next"
      >
        Next Page
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.event-item {
  width: 100%;
  max-width: 250px;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  font-weight: bold;
}
</style>
