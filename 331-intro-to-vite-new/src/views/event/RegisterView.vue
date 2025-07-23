<script setup lang="ts">
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { type Event } from '@/types'

// Define props for event and id
const props = defineProps<{
  event: Event
  id: string
}>()

// Extract refs from props
const { event, id } = toRefs(props)

// Create router instance
const router = useRouter()

// Register handler
const register = () => {
  // If the registration API call successful (simulate here)
  // Push back to the event details view
  router.push({ name: 'event-detail-view', params: { id: id.value } })
}
</script>

<template>
  <div>
    <p>Register event here</p>
    <button @click="register">Register</button>
  </div>
</template>
