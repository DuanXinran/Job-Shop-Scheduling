import { Table ,Input ,Button} from 'antd';
import React, { Component } from 'react';




export default class MiniTable extends Component{

  
  constructor(props) {
    super(props); 
    this.state = {
      
      data:[],
      Svalue:[],
      Tvalue:[],
      Mtvalue:[]//MmniTable value
    }
   this.Schange=this.Schange.bind(this);
   this.Tchange=this.Tchange.bind(this);
   this.Change=this.Change.bind(this);
  }

  componentWillMount(){
    let data1=this.state.data;
 
    for(var i=0;i<this.props.Rvalue;i++){
      data1.push({'work':i+1})
    }
 
     this.setState({
       data:data1
     })

  }

  Schange=(event,rowKey)=> {
    let arr=[...this.state.Svalue]
    arr[rowKey]=event.target.value;
    this.setState({
      Svalue:arr
    })
    
    
    this.Change();
   }
   Tchange=(event,rowKey)=> {
    let arr=[...this.state.Tvalue]
    arr[rowKey]=event.target.value;
    this.setState({
      Tvalue:arr
    })
  
    this.Change();
   }

   Change(){
     
      let arr1=this.state.Svalue;
      let arr2=this.state.Tvalue;
      let arr=[];
    console.log(this.state.Svalue);
    console.log(this.state.Tvalue);
    
      arr.push(arr1);    
      arr.push(arr2);
     this.setState({
       Mtvalue:arr
     });
     console.log(arr)
     this.props.pushMtvalue(arr,this.props.rowKey);
  
   }



    render(){     
     const columns = [

        {
          title: '工序号',
          dataIndex: 'work',
          width: '10px',
         
          
        },
        {
          title: '设备号',
          dataIndex: 'address',
          width: '10px',
          render: (text,record,rowKey) =>    
             
          <Input value={this.state.Svalue[rowKey]}  onChange ={event => this.Schange(event,rowKey)} onBlur={this.Change} />
          
        },
        {
        
          title: '时间',
          dataIndex: 'time',
          width: '10px',
          render: (text,record,rowKey) =>
          <Input value={this.state.Tvalue[rowKey]}  onChange ={event => this.Tchange(event,rowKey)} onBlur={this.Change} />
        }
        ]
      

        return(
            <div>

    
    <Table columns={columns} dataSource={this.state.data} size="small" pagination={false}  onBlur={this.Change}/>

  
  </div>
        )
    }

}