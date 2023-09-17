<template>
    <router-view></router-view>
    <!-- 路由匹配到的组件会渲染在这 -->

  </el-row>

</template>

<script>


export default {
  name: 'App',
}
</script>

<style lang="less" scoped>
 *{
  padding: 0;
  margin: 0;
 }
 .el-header, .el-footer {
    background-color:#D3DCE6;
    color: #333;
    text-align: center;
    
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
   
  }
  html,body,h3,p{
    margin: 0;
    padding: 0;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
