<template>
    <div class="body">
        <div class="main">
           <loginin></loginin>
        </div>
    </div>
</template>
 
<script setup lang="ts">
 import loginin from '../login/loginin.vue'
</script>
 
<style scoped >
*, *::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
  }
 
.body {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Montserrat", sans-serif;
    font-size: 12px;
    background-color: #f3ecf1;
    color: #a43493;
  }
  
.main {
    position: relative;
    width: 1000px;
    min-width: 1000px;
    min-height: 600px;
    height: 600px;
    padding: 25px;
    background-color: #fceff3;
    box-shadow: 10px 10px 10px #f8e3e3, -10px -10px 10px #f9f9f9;
    border-radius: 20px;
    overflow: hidden;
  }
  
</style>