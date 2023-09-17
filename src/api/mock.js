import Mock from "mockjs";
import home from "./mockServeData/home.js"
import user from './mockServeData/user.js'
import mall from "./mockServeData/mall.js";
import permission from "./mockServeData/permission.js";

// 定义mock请求拦截
Mock.mock('/api/home/getData',home.getStatisticalData)
Mock.mock('/api/user/add', 'post', user.createUser)
Mock.mock('/api/user/edit', 'post', user.updateUser)
Mock.mock('/api/user/del', 'post', user.deleteUser)
Mock.mock(/api\/user\/getUser/, user.getUserList)
Mock.mock('/api/mall/add', 'post', mall.createMall)
Mock.mock(/api\/mall\/getMall/, mall.getMallList)
Mock.mock(/api\/permission\/getMenu/, permission.getMenu)