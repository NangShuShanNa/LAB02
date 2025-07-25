<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { toRefs } from 'vue'
import type { Event } from '@/types'

// Props
const props = defineProps<{
  event: Event
}>()

const { event } = toRefs(props)
const router = useRouter()
const messageStore = useMessageStore()

const saveChanges = () => {
  // Simulate update logic here (e.g., API call)

  // Show flash message
  messageStore.updateMessage('The data has been updated')

  // Redirect to event detail view
  router.push({ name: 'event-detail-view', params: { id: event.value.id } })
}
</script>

<template>
  <div>
    <p>Edit Event Here</p>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>

    <!-- Button to simulate save + navigate -->
    <button @click="saveChanges">Save & Go to Details</button>
  </div>
</template>
