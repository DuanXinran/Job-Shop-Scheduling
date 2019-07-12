import React, { Component } from 'react';
import "./index.css";
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import Drawer from'./Drawer';
import AddDrawer from'./AddDrawer';
import axios from'axios';

  export default class MyTable extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            searchText: '',
            data:[],
            dataChangs:0
        }
       
        this.pushRow=this.pushRow.bind(this);
        this.ReAdd=this.ReAdd.bind(this);
       
        this.onChange=this.onChange.bind(this);
        this.post=this.post.bind(this);

    }

    componentWillMount () {
      // 表格内需输出数据获取
     const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
     axios.get('https://bird.ioliu.cn/v1?url=http://106.15.39.130/abc/SelectMachine.action')
     .then(function (res) {
       console.log(JSON.parse(res.data).result)
       let result=JSON.parse(res.data).result
       _this.setState({
         data:result
       });
     })
    };
   
    post(){
       console.log(this.state.data)
      let data1=JSON.parse(this.state.data);
      let data ={"machine":data1}
    //   let data =[]
    //  data1.forEach(item=>{
    //   data.push( item.toString())
    //  })

      
      console.log(data)
            axios.post('https://bird.ioliu.cn/v1?url=http://106.15.39.130/abc/Machine.action',data)
            .then(res=>{
                console.log('res=>',JSON.parse(res.data).result);  
                
            })
    }



    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => (
        <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      },
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
    });
  
    handleSearch = (selectedKeys, confirm) => {
      confirm();
      this.setState({ searchText: selectedKeys[0] });
    };
  
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };
    deleteHandle(index){
      // 找到数组中 索引是index的元素 删除掉
      let data = [...this.state.data];
      data.splice(index,1);
      this.setState({
          data
      })
  };


   pushRow(gotValue){ //添加新数据
    const newDataSource = this.state.data;
    newDataSource.unshift(gotValue);
    this.setState({
      // data: this.state.data.splice(-1,1),
          data: newDataSource//将newDataSource新添加的数组给dataSource
      });
      console.log(this.state.data)
     
   };
    
   ReAdd(rowKey,gotValue){//修改数据
     console.log(rowKey)
    const newDataSource = this.state.data;
    newDataSource.splice(rowKey,1,gotValue);
    this.setState({
      // data: this.state.data.splice(-1,1),
          data: newDataSource//将newDataSource新添加的数组给dataSource
      });
      console.log(this.state.data)

   };
 
   
onChange(Changs, dateString) { //表格页码变化
  console.log(Changs, dateString);
  const Changs1=parseInt(Changs-1)*5;
  console.log(Changs1);
 
 this.setState({
  // data: this.state.data.splice(-1,1),
  dataChangs:Changs1,
  });
   console.log(this.state.dataChangs);
}



    render() {
      
      const columns = [
        {
          title: '机器编号',
          dataIndex: 'machineid',
          key: 'machineid',
          width: '30%',
          ...this.getColumnSearchProps('machineid'),
        },
        {
          title: '机器名称',
          dataIndex: 'machinename',
          key: 'machinename',
          width: '6%',
          ...this.getColumnSearchProps('machinename'),
        },
        {
          title: '机器类型',
          dataIndex: 'machinetype',
          key: 'machinetype',
          width: '10%',
          ...this.getColumnSearchProps('machinetype'),
        },{
          title: '使用年限',
          dataIndex: 'machinedata',
          key: 'machinedata',
          ...this.getColumnSearchProps('machinedata'),
        },
        {
           title:'详情',
           
           render: (text,record,rowKey) =>
          <Drawer data={this.state.data[rowKey+this.state.dataChangs]}   rowKey={rowKey} ReAdd={this.ReAdd}></Drawer>

        },
        {
          title:'删除',
          
          render: (text,record,rowKey) =>
         <Button icon="close" onClick={(e)=>{
          this.deleteHandle(rowKey);
          e.stopPropagation();
          this.post();
          
      }}></Button>  

       }
      ];
  
      
      return(        
      <div>
  
      <AddDrawer addRow={this.addRow} value={['']}  name={'+'} pushRow={this.pushRow} post={this.post}> </AddDrawer>
    
      <Table columns={columns} dataSource={this.state.data} 
      rowKey={this.rowKey+1}
       pagination={{      
       defaultPageSize:5,
       onChange: this.onChange, }}/>
      </div>)}
    
    }
   
  
  
