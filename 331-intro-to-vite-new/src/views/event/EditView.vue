<script setup lang="ts">
import { useRoute } from 'vue-router'
import { type Event } from '@/types'
import { toRefs } from 'vue'

// Route info
const props = defineProps<{
  event: Event
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)

</script>

<template>
  <p>Edit Event Here</p>

</template>
