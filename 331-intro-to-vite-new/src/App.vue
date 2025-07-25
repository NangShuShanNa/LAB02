<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const store = useMessageStore()
const { message } = storeToRefs(store)
</script>

<template>
  <div id="layout">
    <header>
       <div id="flashMessage" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav>
         <RouterLink :to="{ name: 'event-list-view' }">Event</RouterLink>
          <RouterLink :to="{ name: 'about' }">About</RouterLink>
          <RouterLink :to="{ name: 'Students' }">Students</RouterLink>

        </nav>
      </div>
    </header>

    <RouterView/>
  </div>
</template>

<style >
#layout{
  font-family: Avenir,Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
nav{
  padding: 30px;
}

nav a {
  font-weight: bold;
  color:#2c3e50;
}
nav a.router-link-exact-active{
color: #42b983;
}

h2{
  font-size: 20px;
}
.event-card {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px auto;
  width: 300px;
  text-align: center;
}
@keyframes yellowfade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}

#flashMessage {
  animation: yellowfade 3s ease-in-out;
  padding: 10px;
  margin: 10px auto;
  width: fit-content;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

</style>
