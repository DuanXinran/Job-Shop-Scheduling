import { Table ,Input ,Button} from 'antd';
import React, { Component } from 'react';
import "./index.css";
import MiniTable from'./MiniTable';
import axios from 'axios';

import Modal from'./../../component/Login/Modal'
import Canvas from'./../../component/Canvas'
import Canvas1 from'./../../component/Canvas/canvas1'
import { timingSafeEqual } from 'crypto';
export default class AjobShop extends Component{

  constructor(props) {
    super(props); 
    this.state = {
        returnArray:[],
        x:0,
        y:0,
        jobnumber:0,
        returnArray2:[],
        x2:0,
        y2:0,
        machinenumber2:0,

        canvasData:{},
        isShow:true,
        isShow0:false,
        isShow1:false,
        isShow2:false, 
        TotalValue:[],
        Rvalue:'',  //工序
        Cvalue:'', //作业
        data:[
         
        ],
        columns: [
       {
            title: '作业序号',
            dataIndex: 'key',
            width: '50px',
            
          },
          {
            title: '',
            dataIndex: 'address',
            width: '20px',
            render: (text,record,rowKey) =>
                  <MiniTable  Rvalue={this.state.Rvalue}  rowKey={rowKey}      pushMtvalue={this.pushMtvalue}/>
          },
        ]
    }
    this.changeshow=this.changeshow.bind(this);
    this.pushMtvalue=this.pushMtvalue.bind(this);
    this.Click=this.Click.bind(this);
    this.changemount=this.changemount.bind(this);
  }
  mount0(){

   
    var Ganttleft =270;//甘特图区域left位置px
    var Gantttop = 60;//甘特图区域top位置px
    var ganttsize = 50;//甘特图默认条形高度
    var row =this.state.y;//y轴最大值：机器数：y
    var col =this.state.x;//x轴最大值：时间：x
    var work =this.state.jobnumber;//颜色最大数量：作业数：jobnumber
    var xstr="设备";//y轴信息
    var smallstr="作业";//小标信息
    var ret = this.state.returnArray;
    //  [[1, 1, 1, 2, 2, 0, 0, 0, 0, 0, 0,], //数据信息：returnArray
    //             [3, 3, 3, 3, 1, 1, 2, 2, 2, 2, 0,],
    //             [0, 0, 0, 0, 0, 2, 3, 3, 3, 1, 1,], //数据信息：returnArray
    // ];
    /********/
    
    var Ganttheight = ganttsize*(row+1)+50;
    var Ganttwidth = ganttsize*col+250;
    var ganttheight = Ganttheight - 50;
    var ganttwidth = Ganttwidth - 100;
    var ganttleft = Ganttleft+100;
    var gantttop = Gantttop - 50;
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    //设置画布高和宽
    canvas.height=Ganttheight;
    canvas.width=Ganttwidth;
    //水平标尺与canvas的距离
    var HORIZONTAL_AXIS_MARGIN = 100;
    //竖直标尺与canvas的距离
    var VERTICAL_AXIS_MARGIN = 50;
    //标尺起点
    var AXIS_ORIGIN = {
        x : HORIZONTAL_AXIS_MARGIN,
        y : canvas.height - VERTICAL_AXIS_MARGIN
    };
    //坐标的顶部
    var AXIS_TOP = VERTICAL_AXIS_MARGIN;
    //坐标的长度
    var AXIS_RIGHT = canvas.width - HORIZONTAL_AXIS_MARGIN;
    //小标记的间隔
    var HORIZONTAL_TICK_SPACING = ganttsize
    var VERTICAL_TICK_SPACING = ganttsize
    //坐标标记的范围
    var AXIS_WIDTH = AXIS_RIGHT - AXIS_ORIGIN.x;
    var AXIS_HEIGHT = AXIS_ORIGIN.y - AXIS_TOP;
    //纵向标记数值
    var NUM_VERTICAL_TICKS = AXIS_HEIGHT / VERTICAL_TICK_SPACING;
    //横向标记数值
    var NUM_HORIZONTAL_TICKS = AXIS_WIDTH / HORIZONTAL_TICK_SPACING;
    var TICK_WIDTH = 10;
    //标牌和坐标轴之间的距离
    var SPACE_BETWEEN_ABELS_AND_AXIS = 20;
    
    function fn3(){
    var r = Math.floor( Math.random() * 256 );
    var g = Math.floor( Math.random() * 256 );    
    var b = Math.floor( Math.random() * 256 );
    return "rgb("+r+','+g+','+b+")";
    }
    var color=[];
    for(var i=1;i<=work;i++)
    {
        color[i]=fn3();
    }
        var str="";
        for(var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                if (ret[i][j] == 0)
                    continue;
                str+="<div id='1' "+
                "style='background-color:"+color[ret[i][j]]+"; "+
                "background-size:100% ;"+
                "height: "+ganttsize+"px;"+
                "width: "+ganttsize+"px;"+
                "position: absolute; visibility: inherit;"+
                "z-index: 20;"+
                "left:"+(ganttleft+2+ (50)* j)+"px; "+
                "top: " +(ganttheight + gantttop + (i - row + 1) * ganttsize)+"px;'></div>"
            }
        }    
    
    
      for (var i = 1; i <= work; i++) {
        str+="<div id='2'"+
            "style='background-color:"+ color[i] +";background-size:100% ;"+
                "height: 20px;"+ 
                "width: 60px; "+
               "position: absolute; visibility: inherit;"+
                "left: "+(Ganttleft + Ganttwidth - 65)+"px; "+
                "top:"+ (ganttheight + gantttop + (i - work) * 25)+"px;'>"+
            "</div>"+
            "<div id='3'"+
            "style='height:20px;"+ 
              "width: 60px;"+
               "position: absolute; visibility: inherit;"+
               "left:"+ (Ganttleft + Ganttwidth - 105) +"px; "+
                "top:" +(ganttheight + gantttop + (i - work) * 25)+ "px;'>"+smallstr+i+"</div>"
    
    
        } document.getElementById("div").innerHTML=str;
    
    
    function drawAxes() {
        context.save();
        context.lineWidth = 1.0;
        context.fillStyle = "rgba(100, 140, 230, 0.8)";
        context.strokeStyle = "navy";
        drawHorizontalAxis();
        drawVerticalAxis();
        context.lineWidth = 0.5;
        context.strokeStyle = "navy";
        context.strokeStyle = "darkred";
        drawVerticalAxisTicks();
        drawHorizontalAxisTicks();
        context.restore();
    }
    //绘制水平的小标
    
    function drawHorizontalAxisTicks() {
        var deltaY;
        for (var i = 1; i < NUM_HORIZONTAL_TICKS; i++) {
            context.beginPath();
            //判断画的是大坐标还是短坐标
            if (i % 5 == 0) {
                deltaY = TICK_WIDTH;
            } else {
                deltaY = TICK_WIDTH / 2
            }
            context.moveTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING,
                    AXIS_ORIGIN.y - deltaY);
            context.lineTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING,
                    AXIS_ORIGIN.y + deltaY);
            context.stroke();
        }
    }
    
    //绘制数值的小标
    function drawVerticalAxisTicks() {
        var deltaX;
        for (var i = 1; i < NUM_VERTICAL_TICKS; i++) {
            context.beginPath();
            if (i % 5 === 0) {
                deltaX = TICK_WIDTH;
            } else {
                deltaX = TICK_WIDTH / 2;
            }
            context.moveTo(AXIS_ORIGIN.x - deltaX, AXIS_ORIGIN.y - i
                    * VERTICAL_TICK_SPACING);
            context.lineTo(AXIS_ORIGIN.x + deltaX, AXIS_ORIGIN.y - i
                    * VERTICAL_TICK_SPACING);
            context.stroke();
        }
    }
    
    //画竖直线
    function drawVerticalAxis() {
        context.beginPath();
        context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
        context.lineTo(AXIS_ORIGIN.x, AXIS_TOP);
        context.stroke();
    }
    
    //画水平线
    function drawHorizontalAxis() {
        context.beginPath();
        context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
        context.lineTo(AXIS_RIGHT, AXIS_ORIGIN.y);
        context.stroke();
    }
    //绘制标注
    function drawAxisLabels() {
        context.fillStyle = "blue";
        drawHorizontalAxisLabels();
        drawVerticalAxisLabels();
    }
    //绘制竖直轴标注
    
    function drawVerticalAxisLabels() {
        context.textAlign = "center";
        context.textBaseline = "top";
        for (var i = 0; i <= NUM_HORIZONTAL_TICKS; i++) {
            if (i % 1 === 0) {
                context.fillText(i,
                        AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING,
                        AXIS_ORIGIN.y + SPACE_BETWEEN_ABELS_AND_AXIS);
            }
        }
    }
    //绘制水平轴标注
    
    function drawHorizontalAxisLabels() {
        context.textAlign = "center";
        context.textBaseline = "top";
        for (var i = 1; i <= NUM_VERTICAL_TICKS && i <=row; i++) {
            if (i % 1 === 0) {
                context.fillText(xstr + (row- i),
                        AXIS_ORIGIN.x - SPACE_BETWEEN_ABELS_AND_AXIS,
                        AXIS_ORIGIN.y - i * VERTICAL_TICK_SPACING);
            }
        }
    }
    
    function drawGrid(color, stepx, stepy) {
        context.save()
        context.strokeStyle = color;
        context.fillStyle = '#ffffff';
        context.lineWidth = 0.5;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
            context.beginPath();
            context.moveTo(i, 0);
            context.lineTo(i, context.canvas.height);
            context.stroke();
        }
        for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(context.canvas.width, i);
            context.stroke();
        }
        context.restore();
    }
    
    context.font = "15px Arial";
    
    drawGrid("lightgray", 10, 10);
    
    context.shadowColor = "rgba(100, 140, 230, 0.8)";
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 3;
    context.shadowBlur = 5;
    
    drawAxes();
    drawAxisLabels();
  }




 mount1(){

  /*输入信息区*/
    var Ganttleft = 270;//甘特图区域left位置px
    var Gantttop = 60;//甘特图区域top位置px
    var ganttsize = 50;//甘特图默认条形高度
    var row =this.state.y2;//y轴最大值：机器数：y
    var col =this.state.x2;//x轴最大值：时间：x
    var mach =this.state.machinenumber2;//颜色最大数量：作业数：jobnumber
    var xstr="作业";//y轴信息
    var smallstr="设备";//小标信息
    var ret = this.state.returnArray2;
  //    [[1, 1, 1, 2, 2, -1, -1, -1, -1, -1, -1,], //数据信息：returnArray
  //         [0, 0, 0, 0, 1, 1, 2, 2, 2, 2, -1,],
  //         [-1, -1, -1, -1, -1, 2, 0, 0, 0, 1, 1,], //数据信息：returnArray
  // ];
    /********/
  
    var Ganttheight = ganttsize*(row+1)+50;
    var Ganttwidth = ganttsize*col+250;
    var ganttheight = Ganttheight - 50;
    var ganttwidth = Ganttwidth - 100;
    var ganttleft = Ganttleft+100;
    var gantttop = Gantttop - 50;
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    //设置画布高和宽
    canvas.height=Ganttheight;
    canvas.width=Ganttwidth;
    //水平标尺与canvas的距离
    var HORIZONTAL_AXIS_MARGIN = 100;
    //竖直标尺与canvas的距离
    var VERTICAL_AXIS_MARGIN = 50;
    //标尺起点
    var AXIS_ORIGIN = {
      x : HORIZONTAL_AXIS_MARGIN,
      y : canvas.height - VERTICAL_AXIS_MARGIN
    };
    //坐标的顶部
    var AXIS_TOP = VERTICAL_AXIS_MARGIN;
    //坐标的长度
    var AXIS_RIGHT = canvas.width - HORIZONTAL_AXIS_MARGIN;
    //小标记的间隔
    var HORIZONTAL_TICK_SPACING = ganttsize
    var VERTICAL_TICK_SPACING = ganttsize
    //坐标标记的范围
    var AXIS_WIDTH = AXIS_RIGHT - AXIS_ORIGIN.x;
    var AXIS_HEIGHT = AXIS_ORIGIN.y - AXIS_TOP;
    //纵向标记数值
    var NUM_VERTICAL_TICKS = AXIS_HEIGHT / VERTICAL_TICK_SPACING;
    //横向标记数值
    var NUM_HORIZONTAL_TICKS = AXIS_WIDTH / HORIZONTAL_TICK_SPACING;
    var TICK_WIDTH = 10;
    //标牌和坐标轴之间的距离
    var SPACE_BETWEEN_ABELS_AND_AXIS = 20;
  
    function fn3(){
    var r = Math.floor( Math.random() * 256 );
    var g = Math.floor( Math.random() * 256 );    
    var b = Math.floor( Math.random() * 256 );
    return "rgb("+r+','+g+','+b+")";
    }
    var color=[];
    for(var i=0;i<mach;i++)
    {
      color[i]=fn3();
    }
      var str="";
      for(var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
          if (ret[i][j] == -1)
            continue;
          str+="<div id='1' "+
          "style='background-color:"+color[ret[i][j]]+"; "+
          "background-size:100% ;"+
          "height: "+ganttsize+"px;"+
          "width: "+ganttsize+"px;"+
          "position: absolute; visibility: inherit;"+
          "z-index: 20;"+
          "left:"+(ganttleft+2+ (50)* j)+"px; "+
          "top: " +(ganttheight + gantttop + (i - row + 1) * ganttsize)+"px;'></div>"
        }
      }    
   
  
    for (var i = 0; i < mach; i++) {
      str+="<div id='2'"+
        "style='background-color:"+ color[i] +";background-size:100% ;"+
          "height: 20px;"+ 
          "width: 60px; "+
         "position: absolute; visibility: inherit;"+
          "left: "+(Ganttleft + Ganttwidth - 65)+"px; "+
          "top:"+ (ganttheight + gantttop + (i - mach+1) * 25)+"px;'>"+
        "</div>"+
        "<div id='3'"+
        "style='height:20px;"+ 
        "width: 60px;"+
         "position: absolute; visibility: inherit;"+
         "left:"+ (Ganttleft + Ganttwidth - 105) +"px; "+
          "top:" +(ganttheight + gantttop + (i - mach+1) * 25)+ "px;'>"+smallstr+i+"</div>"
  
  
      } document.getElementById("div").innerHTML=str;
    
  
    function drawAxes() {
      context.save();
      context.lineWidth = 1.0;
      context.fillStyle = "rgba(100, 140, 230, 0.8)";
      context.strokeStyle = "navy";
      drawHorizontalAxis();
      drawVerticalAxis();
      context.lineWidth = 0.5;
      context.strokeStyle = "navy";
      context.strokeStyle = "darkred";
      drawVerticalAxisTicks();
      drawHorizontalAxisTicks();
      context.restore();
    }
    //绘制水平的小标
  
    function drawHorizontalAxisTicks() {
      var deltaY;
      for (var i = 1; i < NUM_HORIZONTAL_TICKS; i++) {
        context.beginPath();
        //判断画的是大坐标还是短坐标
        if (i % 5 == 0) {
          deltaY = TICK_WIDTH;
        } else {
          deltaY = TICK_WIDTH / 2
        }
        context.moveTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING,
            AXIS_ORIGIN.y - deltaY);
        context.lineTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING,
            AXIS_ORIGIN.y + deltaY);
        context.stroke();
      }
    }
  
    //绘制数值的小标
    function drawVerticalAxisTicks() {
      var deltaX;
      for (var i = 1; i < NUM_VERTICAL_TICKS; i++) {
        context.beginPath();
        if (i % 5 === 0) {
          deltaX = TICK_WIDTH;
        } else {
          deltaX = TICK_WIDTH / 2;
        }
        context.moveTo(AXIS_ORIGIN.x - deltaX, AXIS_ORIGIN.y - i
            * VERTICAL_TICK_SPACING);
        context.lineTo(AXIS_ORIGIN.x + deltaX, AXIS_ORIGIN.y - i
            * VERTICAL_TICK_SPACING);
        context.stroke();
      }
    }
  
    //画竖直线
    function drawVerticalAxis() {
      context.beginPath();
      context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
      context.lineTo(AXIS_ORIGIN.x, AXIS_TOP);
      context.stroke();
    }
  
    //画水平线
    function drawHorizontalAxis() {
      context.beginPath();
      context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
      context.lineTo(AXIS_RIGHT, AXIS_ORIGIN.y);
      context.stroke();
    }
    //绘制标注
    function drawAxisLabels() {
      context.fillStyle = "blue";
      drawHorizontalAxisLabels();
      drawVerticalAxisLabels();
    }
    //绘制竖直轴标注
  
    function drawVerticalAxisLabels() {
      context.textAlign = "center";
      context.textBaseline = "top";
      for (var i = 0; i <= NUM_HORIZONTAL_TICKS; i++) {
        if (i % 1 === 0) {
          context.fillText(i,
              AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING,
              AXIS_ORIGIN.y + SPACE_BETWEEN_ABELS_AND_AXIS);
        }
      }
    }
    //绘制水平轴标注
  
    function drawHorizontalAxisLabels() {
      context.textAlign = "center";
      context.textBaseline = "top";
      for (var i = 1; i <= NUM_VERTICAL_TICKS && i <=row; i++) {
        if (i % 1 === 0) {
          context.fillText(xstr + (row- i+1),
              AXIS_ORIGIN.x - SPACE_BETWEEN_ABELS_AND_AXIS,
              AXIS_ORIGIN.y - i * VERTICAL_TICK_SPACING);
        }
      }
    }
  
    function drawGrid(color, stepx, stepy) {
      context.save()
      context.strokeStyle = color;
      context.fillStyle = '#ffffff';
      context.lineWidth = 0.5;
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, context.canvas.height);
        context.stroke();
      }
      for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(context.canvas.width, i);
        context.stroke();
      }
      context.restore();
    }
    context.font = "15px Arial";
  
    drawGrid("lightgray", 10, 10);
  
    context.shadowColor = "rgba(100, 140, 230, 0.8)";
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 3;
    context.shadowBlur = 5;
  
    drawAxes();
    drawAxisLabels();
 }


  changeshow(){
   
    let data1=this.state.data;
 
   for(var i=0;i<this.state.Cvalue;i++){
     data1.push({'key':i+1})
   }

    this.setState({
      data:data1
    })
    this.setState({
      isShow:false,
    })
     this.setState({
    
     isShow0:true
     })
  }

  pushMtvalue(Mtvalue,rowKey){
    let arr=this.state.TotalValue;
    arr[rowKey]=Mtvalue;  
    this.setState({
        TotalValue:arr
    })
 
  }

  Click(){  //输出列表数据
    console.log(this.state.TotalValue)
   

    let arr1=[];
   this.state.TotalValue.forEach(item=>{
      

        for(var i=0;i<item[0].length;i++){
          arr1.push(item[0][i],item[1][i]);
         
        }
      
    })

console.log(arr1)
this.setState({
      TotalValue:arr1
     
    })
 console.log(this.state.TotalValue.join(','))
    
 let post={"workname":"fhfh","inputstring":`${this.state.Cvalue}+${this.state.Rvalue}@${arr1.join(',')},`}
 console.log(post);
    
    axios.post('https://bird.ioliu.cn/v1?url=http://106.15.39.130/abc/Algorithm.action',post)
    .then(res=>{

      var ob = JSON.parse(res.data);

     this.setState({
      returnArray:ob.returnArray,
      x:ob.x,
      y:ob.y,
      jobnumber:ob.jobnumber,
      returnArray2:ob.returnArray2,
      x2:ob.x2,
      y2:ob.y2,
      machinenumber2:ob.machinenumber2,
     })

     this.changemount();
    
        console.log(res)
        this.setState({
          isShow0:false,
         
        })
      
    
        this.setState({
          isShow1:true
         
        })
  
    })
    
    


   
    
  }
  Rchange=(event)=> {
    this.setState({
      Rvalue:event.target.value
    })
    
   }
   Cchange=(event)=> {
     this.setState({
       Cvalue:event.target.value
     })
     
    }
    changemount(){
    

      let flag=!this.state.isShow2;
      this.setState({
        isShow2:flag
      })
     if(this.state.isShow2){
    this.mount0()}
    else{
      this.mount1()
    }

     console.log("mount1")
     console.log(this.state.isShow2)
 
  
  
  }

    render(){

      console.log(window.localStorage.getItem("islogined"));
      const Rvalue=this.state.Rvalue
      const Cvalue=this.state.Cvalue
        return(
          <div>
            {/* <Modal></Modal> */}
          <div className={this.state.isShow ? 'show': 'hidden'}>
          作业 <Input  value={Cvalue} placeholder="请输入所需作业总数" onChange ={event => this.Cchange(event)}/>
          机器 <Input  value={Rvalue} placeholder="请输入所需机器总数" onChange ={event => this.Rchange(event)}  />
         
        <Button onClick={this.changeshow} >生成表格 </Button>
            </div>
            <div  className={this.state.isShow0 ? 'show': 'hidden'}   >
        <Table   columns={this.state.columns} dataSource={this.state.data} size="small" pagination={false} />
        <Button onClick={this.Click}>确认</Button>
          </div>

          <div  className={this.state.isShow1 ? 'show': 'hidden'} >

          <div class="canvas0"  >
          <canvas id="canvas" onbeforeunload ></canvas>
            <div id="div"></div>

            </div>
            <Button className="cButton"onClick={this.changemount}>切换甘特图</Button>
         
          </div>
          </div>
        )
    }

}

