<template>
    <el-row class="tac">
      <el-col :span="3" style="background-color: rgb(251, 220, 225);">
        <h5 class="mb-2">Default colors</h5>
        <el-menu style="background-color: rgb(249, 205, 212);"
        :default-active="defaultActive"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose" 
          @select="handleSelect"
        >
          <el-menu-item v-for="menuItem in menuList"  :index="menuItem.index">
            <template #title>
              <el-icon><location/></el-icon>
              <span>{{ menuItem.name }}</span>
            </template>
              <!-- <el-menu-item v-for="menuItem in menuList" :index=menuItem.label >
                {{ menuItem.name }}
              </el-menu-item> -->
           </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <el-tabs v-model="activeTab" @tab-remove="removeTab">
                <el-tab-pane :closable="true" :label="tabItem.label" :name="tabItem.name" 
                v-show="tabItem.loading"  v-for="tabItem in tabList" >
                <component :is="tabItem.content"></component>
                </el-tab-pane>
            </el-tabs>
      </el-col>
    </el-row>
  </template>
  
  <script lang="ts" setup>
  import {Location} from '@element-plus/icons-vue';
  import {Ref, defineAsyncComponent,markRaw, ref,watch} from "vue";
  let defaultActive =ref('');
  const menuList :any=[{
  name: 'demo',
  index:'1',
  label: 'demo',
  loading: false,
  content: markRaw(defineAsyncComponent(() =>{
        return import("../components/demo.vue")
      }
  ))
},
  {
    name: 'demo2',
    index:'2',
    label: 'demo2',
    loading: false,
    content: markRaw(defineAsyncComponent(() =>{
          return import("../components/demo2.vue")
        }
    ))
  },
];
// const cclick = (key: string) => {
//     console.log(key)
//   };
let activeTab :any= ref("");

const removeTab=(tabItem: { name: Ref<string>; })=>{
  console.log(tabItem);
  let tabs :any = tabList.value;
  let tname :any=tabItem;
  if(activeTab.value==tname){
    tabs.forEach((tab: any, index: any) => {
      if (tab.name===activeTab.value)
      {let nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeTab.value= nextTab.name;
            activeTab.index=nextTab.index;
          }
        }
      });
  };
  tabList.value = tabs.filter((tab: { name: any; }) => tab.name !== tname);
  handleSelect(activeTab.index,menuList);
        console.log(defaultActive);
}
const tabList = ref<any[]>([]);
const pushList=(menuItem :any) => 
{let existingTab = tabList.value.find((tab: { name: any; })=> tab.name === menuItem.name); 
  if (!existingTab) { 
    menuItem.loading=true;
    tabList.value.push(menuItem);} 
//   activeTab.value = menuItem.name;
    console.log(tabList)};
 const handleSelect= function(key: any, keyPath: string | any[],) {
      let selectData :any;
        menuList.forEach((item: { index: any; }) => {
          if (item.index === keyPath[0]) {
            selectData = item;
        console.log(selectData)}});
        if (selectData) {
    pushList(selectData);
    // activeTab.value = 'demo';
    activeTab.index=key;
    activeTab.value=selectData.name
    console.log(activeTab)
  }else{defaultActive.value=''}
    }
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  };
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  watch(activeTab,(newValue, oldValue) => {
    menuList.forEach((item: { name: any; index: any })=>{
      if(activeTab.index==item.index){
        defaultActive.value=item.index;
        console.log(defaultActive);
        console.log('watch 已触发', newValue,oldValue)
      }
    })
    
});
  </script>
  <style lang="scss" scoped>
.tac{
height: 100%;
.mb-2{
    width: 100%;
}
:deep(.el-tabs__header){
    margin: 0 !important;
    background-color: rgb(252, 215, 221);
  }
:deep(.el-sub-menu__icon-arrow){
    width: 10px;
}
:deep(.el-sub-menu__title){
    width: 100%;
    justify-content: space-between;
}
.el-col-3{
    height: 100vh;
}
.el-menu-item{
    background-color: rgb(252, 212, 218);
}
}
</style>