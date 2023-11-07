<template>
  <div aria-label="A complete example of page header" id="header-all">
    <el-page-header @back="onBack" class="header">
      <template #breadcrumb class="top-router">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">
            homepage
          </el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="./page-header.html">route 1</a></el-breadcrumb-item
          >
          <el-breadcrumb-item>route 2</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <template #content class="top-content">
        <div class="flex items-center">
          <el-avatar
            class="mr-3"
            :size="32"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <span class="text-large font-600 mr-3"> 动态组件demo </span>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <el-button style="border: solid salmon;">Print</el-button>
          <router-link to="/"><el-button type="primary" class="ml-2">Edit</el-button></router-link>
        </div>
      </template>
    </el-page-header>
  </div>
</template>

<script setup lang="ts">
import { ElNotification as notify } from 'element-plus'

const onBack = () => {
  notify('Back')
}
</script>
<style lang="scss" scoped>
#header-all{
  padding: 0;
width: 99.8%;
background-color: rgb(255, 210, 210);
border: 0.5px solid rgb(201, 136, 136);
.ml-2{
  background-color: pink;
  border: solid salmon;
}
:deep(.el-breadcrumb){
  padding:0px 50px;
}
:deep(.el-page-header__header){
    padding:0px 50px;
  }
  .font-600{
    text-align: center;
    display:flex;
    width: 159px;
    height: 33px;
    align-items: center;
  }
  .flex.items-center{
    display: flex;
  } 
}

</style>