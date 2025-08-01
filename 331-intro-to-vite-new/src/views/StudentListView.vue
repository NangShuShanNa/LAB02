<template>
  <div class="flex flex-wrap justify-center gap-4 p-5">
    <div
      v-for="student in students"
      :key="student.id"
      class="w-64 p-4 border border-gray-300 text-center shadow-md rounded-md bg-white"
    >
      <h3 class="text-lg font-semibold mb-2">{{ student.name }} {{ student.surname }}</h3>
      <p class="text-sm text-gray-600">GPA: {{ student.gpa }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StudentService from '@/services/StudentService'

const students = ref<any[]>([])

onMounted(() => {
  StudentService.getStudents()
    .then((response) => {
      students.value = response.data
    })
    .catch((error) => {
      console.error('Failed to fetch students:', error)
    })
})
</script>
