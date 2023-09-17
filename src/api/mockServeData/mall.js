import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
.replace(/\+/g, ' ')
      .replace(/=/g, '":"') +
    '"}'
  )
}

let List = []
const count = 200

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
        id: Mock.Random.guid(),
        count: Mock.mock('@word(3, 5)'),
        phone: Mock.mock('@id'),
        ztai: '',
        zid: Mock.mock('@ip'),
        ztime:Mock.Random.date(),
        coin: Mock.Random.string('number', 1, 3),
        money:Mock.Random.string('number', 1, 3),
        lastj: '',
        dji:'',
         vip: '',
         cengj: '',
         online: '',
         czuo:''
    })
  )
}

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param id, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */

  getMallList: config => {
    const { id, phone,count,stime,etime,s_time,e_time,page = 1, limit = 10 } = param2Obj(config.url)
    
            
            // console.log(time)

            // if (time && time !== 'undefined') {
            //   const [start, end] = time.split(' - ');
            //   if (start && end && start !== 'undefined' && end !== 'undefined') {
            //     startDate = start;
            //     endDate = end;
            //   }
            // }
            // if (date && date !== 'undefined') {
            //   const [startt, endd] = date.split(' - ');
            //   if (startt && endd && startt !== 'undefined' && endd !== 'undefined') {
            //     startTime = startt;
            //     endTime = endd;
            //   }
            // }
    console.log('id:' + id,'phone:'+phone,'time:'+stime ,'count:'+count,'page:' + page, '分页大小limit:' + limit)
    const newList = List.map(mall => {
      const dateString = mall.ztime;
      const date = new Date(dateString);
      const timestamp = Math.floor(date.getTime() / 1000);
      return { ...mall, ztime: timestamp }; // 将时间戳赋值给 mall.ztime 字段
    });
    
    
    const mockList = newList.filter(mall => {
   console.log(mall)
      if ((id && mall.id.indexOf(id) === -1 
      && mall.zid.indexOf(id) === -1
      )||(count&&mall.count.indexOf(count)===-1)
      ||( phone && mall.phone.indexOf(phone) === -1)
      ||(stime  &&
        etime &&
        (mall.ztime < stime || mall.ztime > etime)
      )&&(s_time  &&
        e_time &&
        (mall.ztime < s_time || mall.ztime > e_time)
      )) return false
      return true
    })
    const endList = mockList.map(mall => {
      const moment = require('moment');
      const timestring=mall.ztime
      const dateString = moment.unix(timestring).format('YYYY-MM-DD');
      return { ...mall, ztime: dateString }; 
    });
    const pageList = endList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      count: mockList.length,
      list: pageList
    }
  },
  
  /**
   * 增加用户
   * @param name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  createMall: config => {
    const { id,
    count,
    phone,
    ztai,
    zid,
    ztime,
    coin,
    money,
    lastj,
    dji,
     vip,
     cengj,
     online,
     czuo } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    List.unshift({
                id: id,
                count: count,
                phone:  phone,
                ztai: ztai,
                zid: zid,
                ztime: ztime,
                coin: coin,
                money: money,
                lastj: lastj,
                dji:dji,
                 vip:vip,
                 cengj:  cengj,
                 online:online,
                 czuo: czuo
    })
    return {
      code: 20000,
      data: {
        message: '添加成功'
      }
    }
  },
  createUser: config => {
    const { name, addr, age, birth, sex } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    List.unshift({
      id: Mock.Random.guid(),
      name: name,
      addr: addr,
      age: age,
      birth: birth,
      sex: sex
    })
    return {
      code: 20000,
      data: {
        message: '添加成功'
      }
    }
  },
  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteUser: config => {
    const { id } = JSON.parse(config.body)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 20000,
        message: '删除成功'
      }
    }
  },
  /**
   * 批量删除
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremove: config => {
    let { ids } = param2Obj(config.url)
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return {
      code: 20000,
      data: {
        message: '批量删除成功'
      }
    }
  },
  /**
   * 修改用户
   * @param id, name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  updateUser: config => {
    const { id, name, addr, age, birth, sex } = JSON.parse(config.body)
    const sex_num = parseInt(sex)
    List.some(u => {
      if (u.id === id) {
        u.name = name
        u.addr = addr
        u.age = age
        u.birth = birth
        u.sex = sex_num
        return true
      }
    })
    return {
      code: 20000,
      data: {
        message: '编辑成功'
      }
    }
  }
}