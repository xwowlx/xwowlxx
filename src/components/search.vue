<template>
    <div class="search-form" >
    <el-dropdown>
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="custom-dropdown">
        <el-dropdown-item v-for="item in table" :key="item.key">
          <div class="dropdown-item-container">
            <span class="column-name">{{ item.name }}</span>
            <el-button-group>
              <el-checkbox v-model="item.visible"></el-checkbox>
              <el-button type="text" icon="el-icon-caret-left" :class="{ 'active': item.fixed === 'left' }"
                         @click="toggleFixed(item.key, 'left')"></el-button>
              <el-button type="text" icon="el-icon-caret-right" :class="{ 'active': item.fixed === 'right' }"
                         @click="toggleFixed(item.key, 'right')"></el-button>
            </el-button-group>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
     <el-dropdown>
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="custom-dropdown">
        <el-dropdown-item v-for="item in table" :key="item.key">
          <div class="dropdown-item-container">
            <span class="column-name">{{ item.name }}</span>
              <el-checkbox v-model="item.isneedslot"></el-checkbox>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div v-for="item in searchfrom">
  <template v-if="item.type === 'input'">
     <el-input  
    :placeholder="item.placeholder" 
    style="width:130px" 
    v-model="userForm[item.key]"
    >
    </el-input>
  </template>
  <template v-if="item.type === 'daterange'">
    <el-date-picker
    unlink-panels
     style="width:300px"
      v-model="userForm[item.key]"
      :type="item.type"
      range-separator="To"
      :start-placeholder="item.startplaceholder"
      :end-placeholder="item.endplaceholder"
       @change="GetTime"
     >
    </el-date-picker>
     </template>
</div>
  <div>
  <el-button type="primary" @click="onSubmit" >查询</el-button>
  <el-button @click="cancelin">重置</el-button>
  </div>
 
 </div>
</template>
<script>
import {getMall} from '../api'
export default {
   props: {
    table: {
      type: Array,
      required: true
    },
    searchfrom:{
      type:Array
    },
    tabledata:{
     type:Array,
     required: true
    },
      fixedColumn: {
        type:String
      },
       editRow:{
        type:Object
       },
            total: {
              type:Number,
              required: true
            }, //当前的总条数
            pageData: {
               type:Object
            },
            userForm: {
              type:Object
            },
    
    
    },
    name:"Search",
    data(){
      return{
        Time:'',
        tabletable:this.tabledata,
        totaltotal:this.total,
        fixedColumnn:this.fixedColumn
      }
    },
    methods:{

             GetTime() {
				 console.log(this.userForm)
				// if (this.Time != null) {
				// 	this.userForm.stime = this.Time[0]
				// 	this.userForm.etime= this.Time[1]
				// }
			},
            cancelin(){
              for(let i in this.userForm){
            this.userForm[i]=''
            this.getList().then(() => {
              const data ={param1:this.totaltotal,param2:this.tabletable}
             this.$emit("cancelin",data);
      });
        }
             },
    //              getList() {
    //         // 获取的列表的数据
    //         getMall({params: {...this.userForm,startDate: this.userForm.time[0],
    //   endDate: this.userForm.time[1], ...this.pageData}}).then(({ data }) => {
    //             console.log(data)
    //             this.tabledata = data.list
    //             this.total = data.count || 0
    //         })
    //     },
             getList() {
        return new Promise((resolve) => {
          getMall({
            params: {
              ...this.userForm,
              stime: this.userForm.stime,
             etime: this.userForm.etime,
              s_time:this.userForm.s_time,
              e_time:this.userForm.e_time,
              ...this.pageData
            }
          })
            .then(({ data }) => {
              this.tabletable = data.list;
              this.totaltotal = data.count || 0;
              resolve(); // 数据请求完成后 resolve
            })
            .catch(() => {
              resolve(); // 数据请求失败也要 resolve
            });
        });
      },
         handlePage(val) {
            this.pageData.page = val
            this.getList()
        },
           toggleFixed(columnId, direction) {
      const column = this.table.find(item => item.key === columnId);
      if (column) {
        // 切换固定状态
        if (column.fixed === direction) {
          column.fixed = false; // 取消固定
        } else {
          column.fixed = direction;
          this.$emit('update:table',this.table) // 固定到指定方向
        }
        
      }
    },
    editPageSizes(){
      this.getList()
    },
   
  
      //  onSubmit() {
//       const daterange = this.searchfrom.filter(item => item.type === "daterange");
//         for (let i = 0; i < daterange.length; i++) {
//     const keyValues = daterange[i].key;
//     const values = this.userForm[keyValues];

//     const startDate = values[0];
//     const endDate = values[1];
     
//     console.log(startDate);
//     console.log(endDate);
//   }

//       if (startDate ) { 
//   const moment = require('moment');
//   const startDate = values[0].toLocaleString();
//       const endDate = values[1].toLocaleString();
//       const startdate = moment(startDate, 'YYYY/M/D HH:mm:ss').format('YYYY-MM-DD');
// const enddate = moment(endDate, 'YYYY/M/D HH:mm:ss').format('YYYY-MM-DD');
//   this.userForm.stime = `${startdate} `; 
//   this.userForm.etime=`${enddate} `;
// } 
//      if (startTime ) { 
//   const moment = require('moment');
//   const startTime = values2[0].toLocaleString();
//       const endTime = values2[1].toLocaleString();
//       const starttime = moment(startTime, 'YYYY/M/D HH:mm:ss').format('YYYY-MM-DD');
// const endtime = moment(endTime, 'YYYY/M/D HH:mm:ss').format('YYYY-MM-DD');
//   this.userForm.s_time = `${starttime}`;
//   this.userForm.e_time=`${endtime}`
// }
onSubmit() {
  const daterange = this.searchfrom.filter(item => item.type === "daterange");

  daterange.forEach(item => {
  item.key.forEach((p, pindex) => {
   console.log("p:", p);
    console.log("pindex:", pindex);
    // const keyValues = daterange[pindex].key;
    // const values = this.userForm[keyValues];
    let newdata=this.userForm
    console.log(newdata)
    if (newdata[item.key]) {
      // const startDateTime = values[0].toLocaleString();
      // const endDateTime = values[1].toLocaleString();
      // const startDate = moment(startDateTime, 'YYYY/M/D HH:mm:ss').format('YYYY-MM-DD');
      // const endDate = moment(endDateTime, 'YYYY/M/D HH:mm:ss').format('YYYY-MM-DD');
      newdata[p]=newdata[item.key][pindex]/1000
      console.log(this.userForm)
      // console.log(newdata[item.key]) 
      // console.log(newdata[item.key][pindex])
      if (pindex == item.key.length - 1){
      delete newdata[item.key]
      console.log(this.userForm)
      }
    }
    
  });
});
   
      console.log(this.userForm.stime)

      this.getList().then(() => {
        const data ={param1:this.totaltotal,param2:this.tabletable}
             this.$emit("onSubmit", data);
             console.log(data)
      });
    },
  
            },
             created() {
            this.cancelin()
         
           
           }
           
           
    }

</script>
<style scoped>
.search-form{
    display: flex;
    justify-content: space-around;
    width: 80%;
}
.active {
  color:red;
}
</style>
