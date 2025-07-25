<script setup lang="ts">
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { type Event } from '@/types'
import { useMessageStore } from '@/stores/message'



// Define props for event and id

const props = defineProps<{
  event: Event
  id: string
}>()

// Extract refs from props
const { event, id } = toRefs(props)

// Create router instance
const router = useRouter()
const store = useMessageStore()
// Register handler
const register = () => {
   store.updateMessage('You are successfully registered for ' + props.event.title)

  // ✅ Reset the message after 3 seconds
  setTimeout(() => {
    store.resetMessage()
  }, 3000)

  // ✅ Navigate to event details page
  router.push({
    name: 'event-detail-view',
    params: { id: props.event.id }
  })
}
</script>

<template>
  <div>
    <p>Register event here</p>
    <button @click="register">Register</button>
  </div>
</template>
