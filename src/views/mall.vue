<template>
<div style="height:95%">
<div style="display:flex;width:100%;height:40px">
    <div style="width:20%">
    </div>
<div class="search-form" >
    <el-dropdown>
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="custom-dropdown">
        <el-dropdown-item v-for="item in table" :key="item.id">
          <div class="dropdown-item-container">
            <span class="column-name">{{ item.name }}</span>
            <el-button-group>
              <el-checkbox v-model="item.visible"></el-checkbox>
              <el-button type="text" icon="el-icon-caret-left" :class="{ 'active': item.fixed === 'left' }"
                         @click="toggleFixed(item.id, 'left')"></el-button>
              <el-button type="text" icon="el-icon-caret-right" :class="{ 'active': item.fixed === 'right' }"
                         @click="toggleFixed(item.id, 'right')"></el-button>
            </el-button-group>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
     <el-input v-model="userForm.count" clearable placeholder="账号"  style="width:130px"></el-input>
  <el-input v-model="userForm.id" placeholder="ip" style="width:130px"></el-input>
  <el-input v-model="userForm.phone" placeholder="手机尾号" style="width:130px"></el-input>
   <div class="block">
    <el-date-picker
    unlink-panels
     style="width:230px"
      v-model="userForm.time"
      type="daterange"
      range-separator="To"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
       format="yyyy 年 MM 月 dd 日"
       value-format="yyyy-MM-dd">
    </el-date-picker>
  </div>
 
  <div>
    <el-form :inline="true" :model="userForm">
      <el-form-item>
  <el-button type="primary" @click="onSubmit" >查询</el-button>
  </el-form-item>
  <el-button @click="cancelin">重置</el-button>
  </el-form>
  </div>
 </div>
 </div>
 <div class="common-tabel">
            <el-table
               :data="tabledata"
                stripe
                height="90%"
                style="width:100%;height:90%;font-size:3px;"
                show-checkbox
                >
                
               <el-table-column width="150" v-for="item in table"
                :label="item.name" :prop="item.id" :fixed="item.fixed"  v-if="item.visible" >
                  <template #default="{ row }">
                      <slot v-if="item.id === 'czuo'">
                        
                        <el-button size="small" type="success" @click="getRowData(row)">详情</el-button>
                        <el-dialog
                        title="编辑"
                        :visible.sync="dialogVisible"
                        width="62%"
                      :before-close="handleClose"
                      
                      :append-to-body="true"
                      >
         <el-form ref="editRow" :inline="true" :model="editRow" label-width="200px" >
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
            </span>
          </el-dialog>
          
                      </slot>
                      <div class="no-wrap-text" v-else>
                        {{ row[item.id] }}
                      </div>
                    </template>
               </el-table-column>
            </el-table>
          <div class="pager">
            <div style="display:flex">
           <el-input v-model="pageData.limit" placeholder="条数/页" />
           <el-button type="primary" @click="editPageSizes">应用</el-button>
           </div>
                <el-pagination
                    layout="prev, pager, next"
                    :total="total"
                    @current-change="handlePage">
                </el-pagination>
            </div>
            </div>
  </div>
  
</template>

<script>
import { getMall, addUser, editUser, delUser } from '../api'
  export default {
   
         data() {
      return {
        fixedColumn: 'id',
       editRow:{},
        
         form: {
                id: '',
                count: '',
                phone: '',
                ztai: '',
                zid: '',
                ztime: '',
                coin: '',
                money: '',
                lastj: '',
                dji:'',
                 vip: '',
                 cengj: '',
                 online: '',
                 czuo:''

            },
            table:[
              {name:'id',
              id:'id',
              fixed:'left'
              , visible: true},
              {name:'账号'
                ,id:'count',
              fixed:false , visible: true},
              {name:'手机号',id:'phone',
              fixed:false, visible: true},
              {name:'账户状态',id:'ztai',
              fixed:false, visible: true},
              {name:'注册ip',id:'zid',
              fixed:false, visible: true},
              {name:'注册时间',id:'ztime',
              fixed:false, visible: true},
              {name:'金币',id:'coin',
              fixed:false, visible: true},
              {name:'充值金额',id:'money',
              fixed:false, visible: true},
              {name:'上级',id:'lastj',
              fixed:false, visible: true},
              {name:'顶级',id:'dji',
              fixed:false, visible: true},
              {name:'VIP',id:'vip',
              fixed:false, visible: true},
              {name:'层级',id:'cengj',
              fixed:false, visible: true},
              {name:'在线状态',id:'online',
              fixed:false, visible: true},
              {name:'操作',id:'czuo',
              fixed:false, visible: true}
            ],
            tabledata: [],
             modalType: 0, // 0表示新增的弹窗， 1表示编辑
            total: 0, //当前的总条数
            pageData: {
                page: 1,
                limit: 10
            },
            userForm: {
                id: '',
                count:'',
                phone:'',
                time:[],
                
            },
            
        dialogVisible:false,
      
      };
    },
    methods:{

                getRowData(row){
                this.editRow=row
                console.log(this.editRow)
                this.dialogVisible = true
                },
               submit(){
                // this.$refs.editRow.validate((valid)=>{
                //  if(valid){
                //   console.log(this.editRow,"editRow")
                //   this.dialogVisible=false
                //  }
                // })
                this.dialogVisible=false
               },
            handleClose(){
             
              this.dialogVisible=false
            },
             cancel(){
             
              this.dialogVisible=false;
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
   
  
         onSubmit() {
            const startDate = this.userForm.time[0];
         const endDate = this.userForm.time[1];
          this.userForm.time = `${startDate} - ${endDate}`;
            console.log(this.userForm)
            console.log(this.fixedColumn)
             console.log(this.userForm.time)
             this.getList()
             this.userForm.time=[]
        }
            },
            mounted () {
             this.getList();
              
           
           }
             
           
           
      }
   
</script>
<style scoped>
.search-form{
    display: flex;
    justify-content: space-around;
    width: 80%;
}
.common-tabel{
  height:100%;
}
.el-table__fixed{
  height: auto !important; 
}

.custom-dropdown {
  width: 200px;
  height: auto;
}

.dropdown-item-container {
  display: flex;
  align-items: center;
}

.column-name {
  flex: 1;
  margin-right: 10px;
}

.active {
  color:red;
}
.pager{
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  
}

</style> 