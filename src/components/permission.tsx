/** @format */

import React, { useState , useEffect} from 'react';
import {useQuery} from 'react-query';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox,Row,Col,Space,Typography } from 'antd';
import 'antd/dist/antd.css';
import { Transfer,Table,Divider} from 'antd';
import axios from 'axios';

// Customize Table Transfer



const {Title} = Typography;
const FormWrapper:any = styled(Form)`
  width: 650px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ButtonWrapper = styled(Button)`
  width: 50%;
`;

//const Transfers:any = styled(Transfer)` width: 100%`;

export default function PermissionForm() {
  const [error, setError] = useState({ status: false, message: '' });
  const [size, setSize] = useState('small');
  //const [allData, setAllData] = useState([]);
  const [mockData, setMockData] = useState([]);
  const [targetKey, setTargetKey] = useState([]);
  interface DataType {
   key: React.Key;
  name: string;
  age: number;
  address: string;
}
  const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },

];

const data: any = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

const rowSelection = {
  onChange: (selectedRowKeys:React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
     // Column configuration not to be checked
    name: record.name,
  }),
};

  const fetchData =()=>{
    const mock:any = [];
    const target:any = [];
    axios.get('http://localhost:8000/permission').then(res=>{
        const allData = res.data;
        console.log('alldatat',allData); 
        if(allData){
            allData.map((data:any,key:any)=>{
                console.log('mdata',data);
                data["key"] = key;
                if(data.chosen){
                    target.push(data);
                }
                mock.push(data);
            })
        }
        setMockData(mock);
    });
  }
  
  useEffect(()=>{
      
      fetchData();
    //setTargetKey(target);
  },[])

 const handleChange = (target:any) => {
    setTargetKey(target);
  };

//   renderFooter = () => (
//     <Button size="small" style={{ float: 'right', margin: 5 }} onClick={this.getMock}>
//       reload
//     </Button>
//   );
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
    };

  return (
    <FormWrapper {...layout} name="permission_page" onFinish={onFinish}>
        <Row>
            <Col span={12} offset={10}>
                <Title level={3}>Create Role</Title>
            </Col>
        </Row>
        <Form.Item
        name="rolename"
        label="Role Name"
        rules={[
          {
            required: true,
            message: 'Please input your role',
          },
        ]}>
            <Row>
                <Col span={22} offset={2}>
                    <Input  placeholder="Role Name" />
                </Col>
            </Row>
        </Form.Item>
      <Form.Item
        name="roledescription"
        label="Role Description"
        rules={[
          {
            required: true,
            message: 'Please input your role description',
          },
        ]}>
            <Row>
                <Col span={22} offset={2}>
                    <Input.TextArea  placeholder="Role Description"/>
                </Col>
            </Row>
        </Form.Item>

        <Row>
            <Col span={12} offset={8}>
                <Title level={5}>Permissions</Title>
            </Col>
        </Row>

        <Transfer
        dataSource={mockData}
        showSearch
        listStyle={{
          width: 250,
          height: 300,
        }}
        targetKeys={targetKey}
        onChange={handleChange}
        render={(item:any) => ``}
      />

        
        <Row>
            <Col span={15} offset={10}>
                <Form.Item>
                    <ButtonWrapper type="primary" htmlType="submit" >
                        Submit
                    </ButtonWrapper>
                </Form.Item>
            </Col>
        </Row>
    </FormWrapper>
  );
}
