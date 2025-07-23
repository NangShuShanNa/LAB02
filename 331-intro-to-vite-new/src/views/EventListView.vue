<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import CategoryOrganizer from '@/components/CategoryOrganizer.vue'
import { type Event } from '@/types'
import EventCard from '@/components/EventCard.vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Reactive state
const events = ref<Event[] | null>(null)
const totalEvents = ref<number>(0)
const customPageSize = ref<number>(Number(route.query.size) || 2) // Default to 2

// Props from route
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

// Computed properties
const page = computed(() => props.page)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / customPageSize.value)
  return page.value < totalPages
})

// Function to update page size
const updatePageSize = () => {
  // Validate input (minimum 1, maximum 100)
  const size = Math.min(Math.max(1, customPageSize.value), 100)
  customPageSize.value = size

  router.push({
    name: 'event-list-view',
    query: { ...route.query, size, page: 1 } // Reset to page 1 when changing size
  })
}

// Fetch events function
const fetchEvents = () => {
  events.value = []
  EventService.getEvents(customPageSize.value, page.value)
    .then((response) => {
      events.value = response.data
      totalEvents.value = Number(response.headers['x-total-count']) || 0
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
}

// Load events on mount and when page/size changes
onMounted(fetchEvents)
watchEffect(fetchEvents)
</script>

<template>
  <div>
    <h1>Events For Good</h1>

    <div class="page-size-selector">
      <span>Items per page: </span>
      <input
        type="number"
        v-model.number="customPageSize"
        @change="updatePageSize"
        min="1"
        max="100"
        class="page-size-input"
      >
    </div>

    <div class="events">
      <div v-for="event in events" :key="event.id" class="event-item">
        <EventCard :event="event" />
        <CategoryOrganizer :event="event" />
      </div>
    </div>

    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'event-list-view', query: { ...route.query, page: page - 1 } }"
        rel="prev"
        v-if="page !== 1"
      >
        &#60; Prev Page
      </RouterLink>

      <RouterLink
        id="page-next"
        :to="{ name: 'event-list-view', query: { ...route.query, page: page + 1 } }"
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
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}

.page-size-selector {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.page-size-input {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 60px;
}
</style>
