<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import CategoryOrganizer from '@/components/CategoryOrganizer.vue'
import { type Event } from '@/types'
import EventCard from '@/components/EventCard.vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import nProgress from 'nprogress'

const route = useRoute()
const router = useRouter()

// Reactive state
const events = ref<Event[] | null>(null)
const totalEvents = ref<number>(0)
const customPageSize = ref<number>(3) // ✅ Default to 3

// Props from route
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

// Computed values
const page = computed(() => props.page)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 3) // ✅ Adjusted
  return page.value < totalPages
})

// Update page size via query
const updatePageSize = () => {
  const size = Math.min(Math.max(1, customPageSize.value), 100)
  customPageSize.value = size

  router.push({
    name: 'event-list-view',
    query: { ...route.query, size, page: 1 }
  })
}

// Fetch event data
const fetchEvents = () => {
  nProgress.start()

  EventService.getEvents(3, page.value) // ✅ Fixed to use 3
    .then((response) => {
      events.value = response.data
      totalEvents.value = Number(response.headers['x-total-count']) || 0
    })
    .catch((error) => {
      console.error('There was an error!', error)
      router.push({ name: 'network-error-view' })
    })
    .finally(() => {
      nProgress.done()
    })
}

// Init fetch
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
