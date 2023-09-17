<template>
  <el-row>
    <el-col :span="8" style="padding-right:10px">
      <el-card class="box-card">
        <div class="user">
         <img src="../image/head.png" alt="">
        <div class="userinfo">
          <p class="name">Admin</p>
          <p class="access">管理员</p>
        </div>
      </div>
        <div  class="text-item">
         <p>上次登录时间<span>2023-6-11</span></p>
         <p>上次登录地点<span>武汉</span></p>
        </div>
            </el-card >
                  <el-card class="data-card">
                  
                    <template>
                <el-table
                  :data="tableData"
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="课程"
                  >
                  </el-table-column>
                  <el-table-column 
                    prop="name"
                    label="今日购买"
                    >
                  </el-table-column><el-table-column
                    prop="name"
                    label="本月购买"
                    >
                  </el-table-column><el-table-column
                    prop="name"
                    label="总购买"
                    >
                  </el-table-column>
                </el-table>
              </template>
              
         </el-card>
  </el-col>
    <el-col :span="16" style="padding-left:10px">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex', padding:0}" >
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
          <div class="detail">
            <p class="p1">{{`￥${item.value}`}}</p>
            <p class="p2">{{item.name}}</p>
          </div>
        </el-card>
        <el-card style="height:220px; width:98%;">
          <div ref="echarts1" style="height:230px"></div>
        </el-card>
        <div class="twotu">
        <el-card class="ltu">
          <div ref="echarts2" style="height:250px"></div>
        </el-card>
        <el-card class="rtu">
          <div ref="echarts3" style="height:250px"></div>
        </el-card>
        </div>
        
    </div></el-col>
  </el-row>
</template>

  <script>
  import {getData} from'../api'
  import *as echarts from 'echarts'
    export default {
      data() {
        return {
          tableData: [],
        countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
        }
      },
      mounted(){
        getData().then(({data})=>{
          const tableData= data.data.tableData
          this.tableData=tableData
          // 初始化echarts实例
        const echarts1=echarts.init(this.$refs.echarts1)
        // 指定图表的配置项和数据
        var xoption ={}
        // 处理数据
        const{orderData}=data.data
       const xAxis = Object.keys(orderData.data[0])//object.keys可以拿出对象所有属性
       const xAxisData={data:xAxis}
          xoption.xAxis=xAxisData
          xoption.yAxis={}
        xoption.legend=xAxisData
        xoption.series=[]
        xAxis.forEach(key=>{
          xoption.series.push({
            name:key,
            data:orderData.data.map(item=>item[key]),
            type:'line'
          })
        })
        //  根据配置显示图表
          echarts1.setOption(xoption)
          const{userData}=data.data
            const echarts2 = echarts.init(this.$refs.echarts2)
              const eachrts2Option = {
                  legend: {
                      // 图例文字颜色
                      textStyle: {
                      color: "#333",
                      },
                  },
                  grid: {
                      left: "20%",
                  },
                  // 提示框
                  tooltip: {
                      trigger: "axis",
                  },
                  xAxis: {
                      type: "category", // 类目轴
                      data: userData.map(item => item.date),
                      axisLine: {
                      lineStyle: {
                          color: "#17b3a3",
                      },
                      },
                      axisLabel: {
                      interval: 0,
                      color: "#333",
                      },
                  },
                  yAxis: [
                      {
                      type: "value",
                      axisLine: {
                          lineStyle: {
                          color: "#17b3a3",
                          },
                      },
                      },
                  ],
                  color: ["#2ec7c9", "#b6a2de"],
                  series: [
                      {
                          name: '新增用户',
                          data: userData.map(item => item.new),
                          type: 'bar'
                      },
                      {
                          name: '活跃用户',
                          data: userData.map(item => item.active),
                          type: 'bar'
                      }
                  ],
              }
              echarts2.setOption(eachrts2Option)

              // 饼状图
              const {videoData}=data.data
              const echarts3 = echarts.init(this.$refs.echarts3)
              const eachrts3Option = {
                  tooltip: {
                      trigger: "item",
                  },
                  color: [
                      "#0f78f4",
                      "#dd536b",
                      "#9462e5",
                      "#a6a6a6",
                      "#e1bb22",
                      "#39c362",
                      "#3ed1cf",
                  ],
                  series: [
                      {
                          data: videoData,
                          type: 'pie'
                      }
                  ],
              }
              echarts3.setOption(eachrts3Option)
          })
          
          
          

        }
      }
      
  </script>
    
    <style lang="less" scoped>
    .user{
      display: flex;
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      align-items: center;
      img {
        width: 150px;
        margin-right: 40px;
        height: 150px;
        border-radius: 50%
      }
      .userinfo{
       
       .name{
        font-size: 32px;
        margin-bottom: -10px;
       }
       .access{
        color:#999999;
         font-size:14px;
         text-align: center;
       }
       
      }
    }
      .text-item{
         p{
          line-height: 15px;
          font-size: 14px;
          color:#999999;
          

          span{
          padding-left:90px;
           }
        }
        
      }
      .data-card{
        margin-top: 20px;
        height: 385px;
       
      }
      .num{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        height: 200px;
        margin-left: 15px;
        .detail{
         display: flex;
         flex-direction: column;
         justify-content: center;
        width: 100px;
         .p1{
          font-size: 27px;
          margin: 0px;
          margin-bottom: 10px;
          line-height: 30px;
         }
         .p2{
          font-size: 10px;
          margin: 0;
          text-align: center;
          color: #999;
         }
        }
        .icon{
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
        float: left;
        }
        .el-card{
          width: 32%;
          
          margin-bottom: 20px;
        }
        .twotu{
          width: 98%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .ltu{
          width: 395px;
          height: 250px;
          }
          .rtu{
            width: 395px;
          height: 250px;
          }
        }
      }
        
      
      

    </style>
    