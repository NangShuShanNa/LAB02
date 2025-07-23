<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import EventService from '@/services/EventService'
import CategoryOrganizer from '@/components/CategoryOrganizer.vue'
import {type Event} from '@/types'
import EventCard from '@/components/EventCard.vue'
import { watchEffect } from 'vue'

// Reactive state
const events = ref<Event[] | null>(null)
const totalEvents = ref<number>(0) // Initialize with 0 or appropriate default
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2) // Assuming 2 items per page
  return page.value < totalPages
})
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
  watchEffect(() => {
  events.value = []
  EventService.getEvents(2, page.value)
    .then((response) => {
      events.value = response.data
      totalEvents.value = response.headers['x-total-count']
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
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
        id="page-prev"
        :to="{ name: 'event-list-view', query: { page: page - 1 } }"
        rel="prev"
        v-if="page !== 1"
      >
        &#60; Prev Page
      </RouterLink>

      <RouterLink
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page &#62;
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

/* ➕ New pagination layout */
.pagination {
  display: flex;
  width: 290px;
}

/* ➕ Style individual links */
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
}

/* ➕ Positioning left/right */
#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
