import React, { useState,useEffect } from 'react';
import {Typography,Form,Button,Row,Col,Input,Select,Transfer} from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import axios from 'axios';

const {Title} = Typography;
const { Option }:any = Select;

const FormWrapper:any = styled(Form)`
  width: 650px;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ButtonWrapper = styled(Button)`
  width: 50%;
`;

export default function ManageRole() {
    const [role,setRole] = useState<any>([]);
    const [mockData,setMockData] = useState<any>([]);
    const [targetKeys, setTargetKeys] = useState<any>([]);
    const mock:any = [];
    const target:any = [];
    const name:any = [];

  const onChange = (nextTargetKeys:any) => {
      setTargetKeys(nextTargetKeys)
  } 
    
    axios.get('http://localhost:8000/role')
    .then((res:any)=>{
        console.log('log',res.data);
        res.data.map((i:any,key:any)=>{
            name.push(<Option key={key}>{i.rolename}</Option>);
        })
    })
    .catch((error)=>{
        console.log('error',error);
    })

    useEffect(() => {
        axios.get('http://localhost:8000/user').then(res=>{
        const allData = res.data;
        console.log('alldatat',allData); 
        if(allData){
            allData.map((data:any,key:any)=>{
                console.log('mdata',data);
                data["key"] = key+1;
                if(data.chosen){
                    target.push(data);
                }
                mock.push(data);
            })
        }
        setMockData(mock);
        setTargetKeys(target);
    });
    }, [])

   console.log('name',name);
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
    };

    function handleChange(value:any) {
        console.log(`selected ${value}`);
    }
    return (
        <FormWrapper {...layout} name="permission_page" onFinish={onFinish}>
            <Row>
                <Col span={12} offset={10}>
                    <Title level={3}>Manage Role</Title>
                </Col>
            </Row>
            <Form.Item
                name="role"
                label="Role"
                rules={[
                {
                    required: true,
                    message: 'Please Select your role',
                },
                ]}>
                    <Row>
                        <Col span={22} offset={2}>
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="select the role"
                                onChange={handleChange}
                                >
                                {name}
                            </Select>
                        </Col>
                    </Row>
            </Form.Item>
            <Row>
                <Col span={12} offset={12}>
                    <Title level={5}>Assign Role</Title>
                </Col>
            </Row>
            <Row>
                <Col offset={6}>
                    <Transfer
                        dataSource={mockData}
                        showSearch
                        targetKeys={targetKeys}
                        onChange={onChange}
                        render={(item:any) => item.username}
                    />
                </Col>
            </Row>
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
    )
}
