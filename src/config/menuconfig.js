const menuList = [
   
    // {
    //     title:"首页",
    //     path:'/home',//home
        
        
    // },
    {
        title:"作业调度",
        path:'/jobShop',
        icon:'bar-chart',
        children:[
            {
                title:"订单系统",
                path:'/JobDetail'
            }
        ]
    },
    {
        title:"员工信息管理",
        path:'/staff',
        icon:'contacts',
       
    }, {
        title:"设备信息管理",
        path:'/device',
        icon:'usergroup-add',
        
    },
]

export default menuList;