<template>
   <div>
   
    <ListTable
    :dialogVisible="dialogVisible"
    :editRow="editRow"
    :table="table"
    :tabledata="tabledata"
    :fixedColumn="fixedColumn"
    :pageData="pageData"
    :total="total"
    :userForm="userForm"
    :searchfrom="searchfrom"
    @submitt="submittt"
    >
     <template v-slot:money="{data}">
        {{ moneyicon + data }}
  </template>
   <template v-slot:czuo="{data}">
    <el-button size="small" type="success" @click="getRowData(data)">编辑</el-button>
  </template>
      </ListTable>
</div>
</template>

<script>
import { getMall } from '@/api';
import ListTable from '../components/listTable.vue'



export default {
  name: 'Mall',
  components: {
    ListTable,
   
  },
   data() {
    return {
      dialogVisible:false,
      
      moneyicon:'$',
      fixedColumn: 'id',
       editRow:{},
      table:[
              {name:'id',
              key:'id',
              fixed:'left'
              , visible: true,
              isneedslot:false},
              {name:'账号'
                ,key:'count',
              fixed:false , visible: true,
              isneedslot:false},
              {name:'手机号',key:'phone',
              fixed:false, visible: true,
              isneedslot:false},
              {name:'账户状态',key:'ztai',
              fixed:false, visible: true,
              isneedslot:false},
              {name:'注册ip',key:'zid',
              fixed:false, visible: true,
              isneedslot:false},
              {name:'注册时间',key:'ztime',
              fixed:false, visible: true,
              isneedslot:false},
              {name:'金币',key:'coin',
              fixed:false, visible: true,
              isneedslot:false},
              {name:'充值金额',key:'money',
              fixed:false, visible: true,
              isneedslot:true},
              {name:'上级',key:'lastj',
              fixed:false, visible: true,
              isneedslot:false},
              {name:'顶级',key:'dji',
              fixed:false, visible: true,
              isneedslot:false},
              {name:'VIP',key:'vip',
              fixed:false, visible: true,
              isneedslot:false},
              {name:'层级',key:'cengj',
              fixed:false, visible: true,
              isneedslot:false},
              {name:'在线状态',key:'online',
              fixed:false, visible: true,
              isneedslot:false},
              {name:'操作',key:'czuo',
              fixed:false, visible: true,
              isneedslot:true}
            ],
            searchfrom:[
              {type:"input",placeholder:"账号",
              key:"count"},
              {type:"input",placeholder:"id",
              key:"id"},
              {type:"input",placeholder:"手机尾号",
              key:"phone"},
              {type:"daterange",
              startplaceholder:"开始时间",
              endplaceholder:"结束时间",
              key:["stime","etime"]},
              {type:"daterange",
              startplaceholder:"开始时间",
              endplaceholder:"结束时间",
              key:["s_time","e_time"]},
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
                  stime: '',
                  etime: '',
                 s_time: '',
                 e_time: '',
                  
            },
            
        
      
      };
    },
    methods:{
          submittt(){
            this.dialogVisible=false
          },
                getRowData(row){
                this.editRow=row
                console.log(this.editRow)
                this.dialogVisible=true
                },
               submit(){
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
            getMall({params: {...this.userForm,startDate: this.userForm.stime,
      endDate: this.userForm.etime, ...this.pageData}}).then(({ data }) => {
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