<template>
  <div >
    <el-date-picker 
      v-model="userForm.stime"
      :type="daterange"
      range-separator="To"
    ></el-date-picker>
    <el-date-picker
      v-model="userForm.etime"
      :type="daterange"
      range-separator="To"
    
    ></el-date-picker>
    <el-date-picker
      v-model="userForm.s_time"
      :type="daterange"
      range-separator="To"
    
    ></el-date-picker>
    <el-date-picker
      v-model="userForm.e_time"
      :type="daterange"
      range-separator="To"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchfrom: [
        { type: "input", placeholder: "账号", key: "count" },
        { type: "input", placeholder: "id", key: "id" },
        { type: "input", placeholder: "手机尾号", key: "phone" },
        {
          type: "daterange",
          startplaceholder: "开始时间",
          endplaceholder: "结束时间",
          key: ["stime", "etime"],
        },
        {
          type: "daterange",
          startplaceholder: "开始时间",
          endplaceholder: "结束时间",
          key: ["s_time", "e_time"],
        },
      ],
      userForm: {
        id: "",
        count: "",
        phone: "",
        stime: "",
        etime: "",
        s_time: "",
        e_time: "",
      },
    };
  },
};
</script>