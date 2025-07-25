<script setup lang="ts">
import { toRefs, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMessageStore } from '@/stores/message'
import type { Event } from '@/types'

const props = defineProps<{
  event: Event
}>()

const { event } = toRefs(props)

// Flash message store
const messageStore = useMessageStore()
const { message } = storeToRefs(messageStore)

// Auto-clear the flash message after 3 seconds
onMounted(() => {
  if (message.value) {
    setTimeout(() => {
      messageStore.resetMessage()
    }, 3000)
  }
})
</script>

<template>
  <div>
    <!-- ✅ Flash message display -->
    <div v-if="message" class="flash-message">
      {{ message }}
    </div>

    <!-- Event Details -->
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<style scoped>
.flash-message {
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 10px 15px;
  margin-bottom: 20px;
  border-left: 5px solid #66bb6a;
  border-radius: 4px;
  animation: fadeOut 3s ease-in-out forwards;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    background-color: #e8f5e9;
  }
  100% {
    opacity: 0;
    background-color: transparent;
  }
}
</style>
