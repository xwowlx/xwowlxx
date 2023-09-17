
<template>
<div>
        <el-dialog
         title="编辑"
         :visible.sync="dialogVisible"
         width="62%"
         :before-close="handleClose"        
         :append-to-body="true"
         >
         <el-form ref="editRow" :inline="true" :model="editRow" label-width="200px">
            <el-form-item label="id" prop="id">
              <el-input v-model="editRow.id"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="count">
              <el-input v-model="editRow.count"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="editRow.phone"></el-input>
            </el-form-item>
            <el-form-item label="账户状态" prop="ztai">
              <el-input v-model="editRow.ztai"></el-input>
            </el-form-item>
            <el-form-item label="注册ip" prop="zid">
              <el-input v-model="editRow.zid"></el-input>
            </el-form-item>
            <el-form-item label=" 注册时间" prop="ztime">
              <el-input v-model="editRow.ztime"></el-input>
            </el-form-item>
            <el-form-item label="金币" prop="coin">
              <el-input v-model="editRow.coin"></el-input>
            </el-form-item>
            <el-form-item label="充值金额" prop="money">
              <el-input v-model="editRow.money"></el-input>
            </el-form-item>
            <el-form-item label="上级" prop="lastj">
              <el-input v-model="editRow.lastj"></el-input>
            </el-form-item>
            <el-form-item label="顶级" prop="dji">
              <el-input v-model="editRow.dji"></el-input>
            </el-form-item>
            <el-form-item label="VIP" prop="vip">
              <el-input v-model="editRow.vip"></el-input>
            </el-form-item>
             <el-form-item label="层级" prop="cengj">
              <el-input v-model="editRow.cengj"></el-input>
            </el-form-item>
             <el-form-item label="在线状态" prop="online">
              <el-input v-model="editRow.online"></el-input>
            </el-form-item>
             <el-form-item label="操作" prop="czuo">
              <el-input v-model="editRow.czuo"></el-input>
            </el-form-item>
            </el-form>
            <span  class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="submit">确 定</el-button>
              <button @click="aaa">aaa</button>
            </span>
          </el-dialog>
          </div>
</template>

<script>
import {getMall} from '../api'
export default {
     props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    editRow:{
        type:Object,
        required: true
    }},

  name: 'EditDialog',
  // watch: {
  //   dialogVisible(newValue) {
  //     this.dialogVisiblee = newValue,
  //     this.dialogVisible= true
  //   },
  // },
  data(){
    return{
      dialogVisiblee:this.dialogVisible,
      editRoww:this.editRow
    }
  },
  // data() {
  //     return {
  //       fixedColumn: 'id',
      
        
  //        form: {
  //               id: '',
  //               count: '',
  //               phone: '',
  //               ztai: '',
  //               zid: '',
  //               ztime: '',
  //               coin: '',
  //               money: '',
  //               lastj: '',
  //               dji:'',
  //                vip: '',
  //                cengj: '',
  //                online: '',
  //                czuo:''

  //           },
  //           table:[
  //             {name:'id',
  //             id:'id',
  //             fixed:'left'
  //             , visible: true},
  //             {name:'账号'
  //               ,id:'count',
  //             fixed:false , visible: true},
  //             {name:'手机号',id:'phone',
  //             fixed:false, visible: true},
  //             {name:'账户状态',id:'ztai',
  //             fixed:false, visible: true},
  //             {name:'注册ip',id:'zid',
  //             fixed:false, visible: true},
  //             {name:'注册时间',id:'ztime',
  //             fixed:false, visible: true},
  //             {name:'金币',id:'coin',
  //             fixed:false, visible: true},
  //             {name:'充值金额',id:'money',
  //             fixed:false, visible: true},
  //             {name:'上级',id:'lastj',
  //             fixed:false, visible: true},
  //             {name:'顶级',id:'dji',
  //             fixed:false, visible: true},
  //             {name:'VIP',id:'vip',
  //             fixed:false, visible: true},
  //             {name:'层级',id:'cengj',
  //             fixed:false, visible: true},
  //             {name:'在线状态',id:'online',
  //             fixed:false, visible: true},
  //             {name:'操作',id:'czuo',
  //             fixed:false, visible: true}
  //           ],
  //           tabledata: [],
  //            modalType: 0, // 0表示新增的弹窗， 1表示编辑
  //           total: 0, //当前的总条数
  //           pageData: {
  //               page: 1,
  //               limit: 10
  //           },
  //           userForm: {
  //               id: '',
  //               count:'',
  //               phone:'',
  //               time:[],
                
  //           },
            
       
      
  //     };
  //   },
    methods:{
      aaa(){
      console.log(this.editRow)
      },

                getRowData(row){
                this.editRoww=row
                console.log(this.editRow)
                this.$emit('update:dialogVisible',true);
                // this.dialogVisible = true
                },
               submit(){
                this.dialogVisiblee=false
                this.$emit('submit', false);
               },
            handleClose(){
             
              this.dialogVisiblee=false
              this.$emit('submit', false);
              console.log(this.dialogVisible)
            },
             cancel(){
              this.dialogVisiblee=false
             this.$emit('submit', false);
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
            getMall({params: {...this.userForm,startDate: this.userForm.time[0],
      endDate: this.userForm.time[1], ...this.pageData}}).then(({ data }) => {
                console.log(data)
                this.tabledata = data.list
                this.total = data.count || 0
            })
        },
         handlePage(val) {
            this.pageData.page = val
            this.getList()
        },
           toggleFixed(columnId, direction) {
      const column = this.table.find(item => item.id === columnId);
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
   
   
  
        //  onSubmit() {
        //     const startDate = this.userForm.time[0];
        //  const endDate = this.userForm.time[1];
        //   this.userForm.time = `${startDate} - ${endDate}`;
        //     console.log(this.userForm)
        //     console.log(this.fixedColumn)
        //      console.log(this.userForm.time)
        //      this.getList()
        //      this.userForm.time=[]
        // }
            },
           
}
</script>
<style scoped>

</style>