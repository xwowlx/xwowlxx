<template>
       <div class="header-content">
       <div class="l-content">  
        <el-button @click="handleMenu" icon="el-icon-menu" size="mini" ></el-button>
        <span class="text"></span>
        <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">
    {{ item.label }}
    </el-breadcrumb-item>
</el-breadcrumb>
       </div>
      <div class="r-content">
          <el-dropdown>
        <span class="el-dropdown-link">
          <img class="imgg" src="../image/logo.png">
        </span>
       <el-dropdown-menu slot="dropdown">
       <el-dropdown-item>个人中心</el-dropdown-item>
       <el-dropdown-item @click.native="tuichu">退出</el-dropdown-item>
       </el-dropdown-menu>
       </el-dropdown> 
       </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
import { mapState } from 'vuex'
import { getMenu } from '@/api'

export default {
      data() {
        return {}

        },
        methods:{
         handleMenu(){
          this.$store.commit('CollapseMenu')
         },
         tuichu(){
          Cookies.remove('token')
          this.$router.push("/login")
         }
        },
         computed: {
        ...mapState({
            tags: state => state.tab.tablist
        })
    },
    mounted(){
     console.log(this.tags)
    }

      }
    
    </script>
    <style <style lang="less" scoped>
        .header-content{
            background-color: #333;
            padding: 0 20px;
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{
              color: #fff;
              font-style: 10px;
              margin-left: 10px;
            }
            .l-content{
           
              display: flex;
              align-items: center;
              /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner {
                font-weight: normal;
                &.is-link {
                    color: #666
                }
            }
            &:last-child {
                .el-breadcrumb__inner {
                    color: #fff
                }
            }} }
            .r-content{
            .imgg{
              height: 40px;
              width: 40px;
              border-radius: 50%;

            }
            }
        }

    </style> 
