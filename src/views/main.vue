<template>
    <div>
        <el-container>
            <el-aside width=auto><commonaside/></el-aside>
            <el-container>
              <el-header> <commonheader/> </el-header>
              <el-main><router-view></router-view></el-main>
            </el-container>
          </el-container>
        
    </div>
</template>

<script>
import commonaside from '../components/commonaside.vue'
import commonheader from '../components/commonheader.vue'

    export default {
      data() {
        return {
            
        };
      },
      components:{
       commonaside,
       commonheader
      }
    }
    </script>
    <style scoped>
      .el-header{
     padding: 0;
      }
    </style>