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

const events = ref<Event[] | null>(null)
const totalEvents = ref<number>(0)
const customPageSize = ref<number>(3)

const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

const page = computed(() => props.page)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 3)
  return page.value < totalPages
})

const updatePageSize = () => {
  const size = Math.min(Math.max(1, customPageSize.value), 100)
  customPageSize.value = size

  router.push({
    name: 'event-list-view',
    query: { ...route.query, size, page: 1 }
  })
}

const fetchEvents = () => {
  nProgress.start()

  EventService.getEvents(3, page.value)
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

onMounted(fetchEvents)
watchEffect(fetchEvents)
</script>

<template>
  <div class="px-4 py-6">
    <h1 class="text-2xl font-bold text-center mb-6">Events For Good</h1>

    <div class="flex items-center gap-2 mb-4">
      <span>Items per page:</span>
      <input
        type="number"
        v-model.number="customPageSize"
        @change="updatePageSize"
        min="1"
        max="100"
        class="w-16 px-2 py-1 border border-gray-300 rounded"
      >
    </div>

    <div class="flex flex-col items-center">
      <div v-for="event in events" :key="event.id" class="w-full max-w-[250px]">
        <EventCard :event="event" />
        <CategoryOrganizer :event="event" />
      </div>
    </div>

    <div class="flex justify-center gap-6 font-bold w-[290px] mt-6 text-gray-800">
      <RouterLink
        id="page-prev"
        :to="{ name: 'event-list-view', query: { ...route.query, page: page - 1 } }"
        rel="prev"
        v-if="page !== 1"
        class="flex-1 text-left no-underline"
      >
        &#60; Prev Page
      </RouterLink>

      <RouterLink
        id="page-next"
        :to="{ name: 'event-list-view', query: { ...route.query, page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        class="flex-1 text-right no-underline"
      >
        Next Page &#62;
      </RouterLink>
    </div>
  </div>
</template>
