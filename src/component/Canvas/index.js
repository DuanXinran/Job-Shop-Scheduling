import React, { Component } from 'react';
import "./index.css";

export default class Canvas extends Component{
    constructor(props) {
        super(props); }
    componentWillMount(){
        console.log(this.props.canvasData)
    }
    componentDidMount(){
   /*输入信息区*/

  



   var Ganttleft =270;//甘特图区域left位置px
   var Gantttop = 60;//甘特图区域top位置px
   var ganttsize = 50;//甘特图默认条形高度
   var row =3;//y轴最大值：机器数：y
   var col =11;//x轴最大值：时间：x
   var work =3;//颜色最大数量：作业数：jobnumber
   var xstr="设备";//y轴信息
   var smallstr="作业";//小标信息
   var ret =  [[1, 1, 1, 2, 2, 0, 0, 0, 0, 0, 0,], //数据信息：returnArray
               [3, 3, 3, 3, 1, 1, 2, 2, 2, 2, 0,],
               [0, 0, 0, 0, 0, 2, 3, 3, 3, 1, 1,], //数据信息：returnArray
   ];
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


    render(){
     
        

        return(
            <div >
                 
              <canvas id="canvas" ></canvas>
            <div id="div"></div>

            </div>
        )
    }

}