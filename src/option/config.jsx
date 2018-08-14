

const server = "http://localhost:8008/"
//const server = "http://192.168.0.14:8008/" //开发
//const server = "http://121.204.142.183:8008/" //公网
const option = {
    title: "后台测试",
    company: "公司信息",
    support: "技术支持 居正软件@2018",
    developer: "开发信息",
    version: "版本号:1.0.0",
    api: {
        server: server,
        login: "login",
        wxuser: server + "api/weixin/wxuser",//获取微信用户
        wxsign: server + "api/weixin/signature",//获取微信token
        article: server + "api/common/articles",
        articleid: server + "api/common/article",
        market: server + "api/common/market",
        noimg: server + "/storage/uploads/img/noimgapp.png",
        mort: server + "api/common/mort",
        banks: server + "api/common/banks",

        demoGet: server + "exam/changeState",
        orgTree: server + "Config/orgTree2" ,  //Config/orgTree/{orgId}  获取组织结构树
        Login: server + 'user/login2' ,  //输入用户号码即可
        newPm:server + 'newPm/new', //  POST /newPm/new 创建三会一课
        ThreePm: server +'config/getThreePMType',//GET /config/getThreePMType读取三会一课的信息
        AllPm:server + 'newPm/findByOrgIdUserIdOrgTypeId' ,  //GET 获取所有创建未发送的会议信息
        sendThree: server + 'newPm/sendPmBase/', //GET /newPm/sendPmBase/{pmId}发送三会一课
        deleteThreemeeting: server + '/newPm/delete/', //GET /newPm/delete/{pmId}删除三会一课
        history: server+ 'report/list/history/report',  //获取历史记录
        wait: server +'report/list/new/report',  //GET /report/list/new/report三会一课等待上报的内容 state0表示未上报，1表示已经上报


        iswait:server + 'PmContent/getTypeInfo/',  //GET /PmContent/getTypeInfo/{rptId}  还未上报详情
        isok: server + 'PmContent/readTypeInfo/',  //GET /PmContent/readTypeInfo/{rptId}已经上报的详情 
        withdraw: server +'newPm/recallPmBase/',  //GET /newPm/recallPmBase/{pmId} 撤回
        overdue: server + 'report/list/overdue/report',  //GET /report/list/overdue/report  逾期未上报

        //上传文件
        uploadFile: server +'uploadFile', //POST /uploadFile
        downLoadFile: server + 'downLoadFile',   //文件下载
        saveFile: server+'pmReport/savePmReport', //保存或者上报

        //申请合并
        submit: server + 'exam/submit',  //申请合并
        select: server + 'exam/select',   //查询审批
        update: server+  'exam/update',  //合并后修改页面
        eaxmchange: server + 'exam/changeState' ,  //审核是否通过

        //党务模块
        seeParty:server +  '/PmContent/other/type/info/two/',  //查看党务村务
        uploadParty: server + '/pmReport/saveAnnexFile',     //村务党务模块单独保存
        sendParty: server+ 'pmReport/send/',      //上报党务村务

    },
    hiddenMenu: [
        {
            name: "编辑页面",
            url: "/cpcc/add",
        },
    ],
    menu: [
        {
            name: "统计",
            icon: "pie-chart",
            url: "/dashboard",
            isParent: false,
        },
        {
            name:'三会一课',
            icon:'book',
            url:'/three',
            isParent:true,
            children:[
                {
                    name:'会议发布',
                    icon:'form',
                    url:'/three/write',
                    isParent:false,
                },{
                    name:'当前上报',
                    icon:'profile',
                    url:'/three/wait',
                    isParent:false,
                },{
                    name:'逾期未报',
                    icon:'exception',
                    url:'/three/overdue',
                    isParent:false
                },{
                    name:'三会合并',
                    icon:'switcher',
                    url:'/three/merge',
                    isParent:false
                },{
                    name:'历史上报',
                    icon:'like',
                    url:'/three/history',
                    isParent: false
                },
            ]
        },{
            name:'党务公开',
            icon:'table',
            url:'/party',
            isParent:true,
            children:[
                {
                    name:'党务发布',
                    icon:'form',
                    url:'/party/write',
                    isParent:false
                },{
                    name:'当前上报',
                    icon:'profile',
                    url:'/party/wait',
                    isParent:false
                },{
                    name:'逾期未报',
                    icon:'exception',
                    url:'/party/overdue',
                    isParent:false
                },{
                    name:'党务合并',
                    icon:'switcher',
                    url:'/party/merge',
                    isParent:false
                },{
                    name:'历史上报',
                    icon:'like',
                    url:'/party/history',
                    isParent: false
                },
            ]
        },{
            name:'村务公开',
            icon:'calculator',
            url:'/village',
            isParent:true,
            children:[
                {
                    name:'会议发布',
                    icon:'form',
                    url:'/village/write',
                    isParent:false,
                },{
                    name:'当前上报',
                    icon:'profile',
                    url:'/village/wait',
                    isParent:false
                },{
                    name:'逾期未报',
                    icon:'exception',
                    url:'/village/overdue',
                    isParent:false
                },{
                    name:'村务合并',
                    icon:'switcher',
                    url:'/village/merge',
                    isParent:false
                },{
                    name:'历史上报',
                    icon:'like',
                    url:'/village/history',
                    isParent: false
                }
            ]
        },{
            name:'党校建设',
            icon:'folder-open',
            url:'/open',
            isParent:false
        },{
            name:'通知公告',
            icon:'notification',
            url:'/notice',
            isParent:false
        },{
            name:'合并审计',
            icon:'switcher',
            url:'merge',
            isParent:false
        },
    ]
}

export default option