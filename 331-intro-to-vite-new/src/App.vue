<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const store = useMessageStore()
const { message } = storeToRefs(store)
</script>

<template>
  <div class="min-h-screen flex flex-col items-center font-sans text-gray-700 antialiased bg-gray-50">
    <!-- Header -->
    <header class="w-full max-w-4xl text-center">
      <!-- Flash Message -->
      <div
        v-if="message"
        class="bg-yellow-100 text-yellow-800 px-4 py-3 rounded-lg shadow-sm mb-6 mx-auto max-w-md transition-opacity duration-300 animate-[fade-in_0.3s_ease-out,yellowfade_3s_ease-in-out]"
      >
        <h4 class="font-medium">{{ message }}</h4>
      </div>

      <!-- Navigation -->
      <div>
        <nav class="py-6 space-x-4 transition-colors">
          <RouterLink
            class="px-3 py-2 font-bold text-gray-700 hover:text-green-500 transition-colors"
            exact-active-class="text-green-500"
            :to="{ name: 'event-list-view' }"
          >
            Events
          </RouterLink>
          <RouterLink
            class="px-3 py-2 font-bold text-gray-700 hover:text-green-500 transition-colors"
            exact-active-class="text-green-500"
            :to="{ name: 'about' }"
          >
            About
          </RouterLink>
          <RouterLink
            class="px-3 py-2 font-bold text-gray-700 hover:text-green-500 transition-colors"
            exact-active-class="text-green-500"
            :to="{ name: 'Students' }"
          >
            Students
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="w-full max-w-4xl flex-grow px-4 py-6">
      <RouterView class="flex flex-col items-center" />
    </main>
  </div>
</template>

<!-- Tailwind animations via custom keyframes -->
<style>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes yellowfade {
  from { background-color: yellow; }
  to { background-color: transparent; }
}
</style>
