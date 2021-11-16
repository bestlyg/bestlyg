import { Resume } from './resume';

const birthday = new Date('1997/4/18');
const nowDate = new Date();
export const data: Resume = {
  info: {
    name: '李逸港',
    gender: '男',
    age: nowDate.getFullYear() - birthday.getFullYear(),
    birthday,
    birthplace: '浙江台州',
    school: '浙江大学宁波理工学院',
    education: '本科',
    major: '软件工程',
    phone: '13958696909',
    email: 'bestlyg@foxmail.com',
    wechat: 'bestlyg',
    qq: '1057966749',
  },
  evaluation:
    '本人学习刻苦认真，学习开朗，平易近人，热爱学习。目前基本掌握Js，Ts的运用，学习并使用过前端三打框架Angular/React/Vue，喜欢写代码，坚持每天一题LeetCode，熟悉基础数据结构与算法，掌握面向对象思想，研究各种新框架技术，掌握vue的mvvm/diff组件化等思想，在工作之余也会去看些文章或者自己写点Demo学习，也会Node去创造一些小工具去帮助自己解决一些繁琐的事。',
  job: {
    place: '杭州',
    profession: 'WEB前端工程师',
    money: 12000,
  },
  educationalExperience: [
    {
      startTime: new Date('2015/9'),
      endTime: new Date('2018/6'),
      education: '专科',
      major: '软件技术',
      school: '绍兴职业技术学院',
    },
    {
      startTime: new Date('2018/9'),
      endTime: new Date('2020/6'),
      education: '本科',
      major: '软件工程',
      school: '浙江大学宁波理工学院',
    },
  ],
  skills: [
    {
      img: '',
      name: 'react',
    },
    {
      img: '',
      name: 'node',
    },
    {
      img: '',
      name: 'webgl',
    },
  ],
  workExperience: [
    {
      startTime: new Date('2017/6'),
      endTime: new Date('2017/10'),
      company: '浙江集品集惠电子商务有限公司',
      profession: '前端实习生',
      describe: '实习工作，在职期间使用Jq+HTML+CSS完成公司官网前端开发。',
    },
    {
      startTime: new Date('2020/3'),
      endTime: new Date('2020/12'),
      company: '嘉兴索勤信息科技有限公司',
      profession: '前端工程师',
      describe: '在职期间使用Angular+.NetCore参与公司内部项目Beflam的开发。',
    },
    {
      startTime: new Date('2020/12'),
      endTime: null,
      company: '杭州洪普科技有限公司',
      profession: '前端工程师',
      describe: '在职期间使用react、vue2参与公司多个项目的开发和维护。',
    },
  ],
  projectExperience: [
    {
      name: '信韵FM',
      describe:
        '大学学习项目，采用.NetMvc的开发模式，前端采用Jquery操作DOM，后端采用.NetMVC，使用EF6链接SQLServer数据库，完成本项目开发。',
    },
    {
      name: '信息青年新闻资讯平台',
      describe:
        '毕业设计项目，与他人合作进行前后端分离的开发模式，前端使用基于VueJs的NuxtJs框架，采用服务端渲染模式+Vue全家桶进行页面的开发，选择ElementUI作为项目的UI框架，Node端使用Koa2进行与后端的交互与数据处理，使用Nginx+Docker+WebHook进行持续集成部署。',
    },
    {
      name: 'Beflam低代码平台开发',
      describe:
        '公司内部产品，使用拖拽控件+少量js代码方式进行快速页面制作的LowCode开发平台，使用Angular全家桶进行前端页面开发，使用.NetCore进行后端数据处理，使用SVG进行页面控件的绘制。',
    },
    {
      name: '洪普科技官网',
      describe: '',
    },
    {
      name: '洪普智哨小程序',
      describe: '',
    },
    {
      name: '洪普智哨大屏',
      describe: '',
    },
    {
      name: '洪普智哨后台管理平台',
      describe: '',
    },
    {
      name: '星链商盟小程序',
      describe: '',
    },
    {
      name: '星链科技后台管理平台',
      describe: '',
    },
  ],
};
