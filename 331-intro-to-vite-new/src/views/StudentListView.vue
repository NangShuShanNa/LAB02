<template>
  <div class="students">
    <div v-for="student in students" :key="student.id" class="student-card">
      <h3>{{ student.name }} {{ student.surname }}</h3>
      <p>GPA: {{ student.gpa }}</p>
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

<style scoped>
.students {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px;
  justify-content: center;
}

.student-card {
  border: 1px solid #ccc;
  padding: 16px;
  width: 250px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
</style>
