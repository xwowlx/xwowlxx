<template>
<div>
   <Search @onSubmit="onSubmitt" 
   @cancelin="cancelinn" 
   :tabledata="tabletable" 
   :table="table" 
   :userForm="userForm" 
   :total="totaltotal"
   :searchfrom="searchfrom"
   ></Search>
  <el-table :data="tabletable" stripe height="600px" style="width: 100%; height: 90%; font-size: 13px;" show-checkbox>
    <el-table-column
      width="150"
      v-for="item in table"
      :key="item.key"
      :label="item.name"
      :prop="item.key"
      :fixed="item.fixed"
      v-if="item.visible"
    >
    <template #default="{ row }">
        <slot v-if="item.key === 'czuo'&& item.isneedslot" :name="item.key" :data="row">
        </slot>
         <slot v-if="item.key==='money'&&item.isneedslot" :name="item.key" :data="row[item.key]">
        </slot>
        <div class="no-wrap-text" v-else>{{ row[item.key] }}</div>
      </template>
    </el-table-column>
  </el-table>
    <div class="pager">
            <div style="display:flex">
           <el-input v-model="pageData.limit" placeholder="条数/页" />
           <el-button type="primary" @click="editPageSizes">应用</el-button>
          <EditDialog :dialogVisible="dialogVisiblee" 
        :editRow="editRoww"
        @submit="submitt"></EditDialog>
           </div>
                <el-pagination
                    layout="prev, pager, next"
                    :total="totaltotal"
                    @current-change="handlePage">
                </el-pagination>
            </div>
            </div>
</template>

<script>
import {getMall} from '../api'
import EditDialog from './editDialog.vue';
import Search from './search.vue'


// import EditDialog from './editDialog.vue'

export default {
   props: {
    table: {
      type: Array,
    },
    tabledata:{
     type:Array
    },
    dialogVisible:{
      type:Boolean
    },
      fixedColumn: {
        type:String
      },
       editRow:{
        type:Object
       },
         searchfrom:{
      type:Array
    },
     
             modalType: {
              type:Boolean
             },// 0表示新增的弹窗， 1表示编辑
            total: {
              type:Number
            }, //当前的总条数
            pageData: {
               type:Object
            },
            userForm: {
              type:Object
            },
    
    
    },
  name: 'ListTable',
  components:{
   EditDialog,
   Search
  },
  watch: {
    dialogVisible(newValue) {
      this.dialogVisiblee = newValue
    },
    editRow(newValue) {
      this.editRoww = newValue
    }
  },
  
    
  
    
 
  data() {
    return {
       tabletable: this.tabledata,   
       totaltotal:this.total ,
       editRoww:this.editRow,
       dialogVisiblee:this.dialogVisible,
       isneedslot:false,
            
      };
    },
    methods:{  
      submitt(){
        this.dialogVisiblee=false,
        this.$emit('submitt', false);
      },
        onSubmitt(data){
         this.tabletable=data.param2,
         this.totaltotal=data.param1
         console.log(this.dialogVisible)
         console.log(this.dialogVisiblee)
         console.log(this.editRoww)
        },
        cancelinn(data){
          this.tabletable=data.param2,
         this.totaltotal=data.param1
        },
              
                getRowData(row){
                this.editRoww=row
                console.log(this.editRoww)
                this.dialogVisiblee = true
                console.log(this.dialogVisiblee)
                },
               submit(){
                this.dialogVisiblee=false
               },
            handleClose(){
             
              this.dialogVisiblee=false
            },
             cancel(){
             
              this.dialogVisiblee=false;
            },
            cancelin(){
              for(let i in this.userForm){
            this.userForm[i]=''
            this.fixedColumn=''
            console.log(this.userForm)
            this.getList()
        }
             },
             getList() {
            // 获取的列表的数据
            getMall({params: {...this.userForm,startDate: this.userForm.stime,
      endDate: this.userForm.etime, ...this.pageData}}).then(({ data }) => {
                console.log(data)
                this.tabletable = data.list
                this.totaltotal= data.count || 0
            })
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
          column.fixed = direction; // 固定到指定方向
        }
      }
    },
    editPageSizes(){
      this.getList()
    },
   
  
         onSubmit() {
            const startDate = this.userForm.time[0];
         const endDate = this.userForm.time[1];
          this.userForm.time = `${startDate} - ${endDate}`;
            console.log(this.userForm)
            console.log(this.fixedColumn)
             console.log(this.userForm.time)
             this.getList()
             this.userForm.time=[]
               console.log(this.props)
        }
            },
            mounted () {
             this.getList();
                this.$emit('update:table',this.table)
              

           
           }
             
           
           
      }
   
</script>
<style scoped>

</style>