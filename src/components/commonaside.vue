<template>
    <div>
          <el-menu default-active="1-4-1"
           class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose" 
            :collapse="isCollapse"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <h3>{{ isCollapse ? '后台' :'通用后台管理系统'}}</h3>
            <el-menu-item @click="clickmenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name+''">
              <i :class="`el-icon-${item.icon}`"></i>
              <span slot="title">{{item.label}}</span>
            </el-menu-item>
            <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.name+''">
              <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{item.label}}</span>
              </template>
              <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
            
                <el-menu-item @click="clickmenu(subItem)" :index="subItem.label+''">{{subItem.name}}</el-menu-item>
          
              </el-menu-item-group>
      
            </el-submenu>
          </el-menu>   
    </div>
</template>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  
  .el-menu{
    height:111vh;
    border-right:0 ;
      h3{
       color: #fff;
       line-height: 40px;
       text-align: center;
    }
  }
  .el-menu-item{
    text-align: left;
  }
  .el-submenu{
    text-align: left;
  }
</style>
<script>
    export default {
      data() {
        return {
          menuData: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/mall",
          name: "mall",
          label: "信息管理",
          icon: "video-play",
          url: "MallManage/MallManage",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "首页1",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/page2",
              name: "page2",
              label: "首页2",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ]
        };
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        clickmenu(item){
          console.log(item);
          if(this.$route.path!==item.path && !(this.$route.path==='/Home' && (item.path === '/'))){
          this.$router.push(item.path)
          }
          this.$store.commit('selectMenu',item)
        }
      },
      computed:{
        noChildren(){
          return this.menuData.filter(item=> !item.children)},
        hasChildren(){
          return this.menuData.filter(item=> item.children)
          },
          isCollapse(){
           return this.$store.state.tab.isCollapse
          }
        
      }
    }
  </script>
   