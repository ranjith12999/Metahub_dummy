import React, { useState,useEffect } from 'react';
import {Typography,Form,Button,Row,Col,Select,Transfer} from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import axios from 'axios';

const {Title} = Typography;
const { Option }:any = Select;

const FormWrapper:any = styled(Form)`
  width: 650px;
  position: fixed;
  top: 35%;
  left: 47%;
  transform: translate(-50%, -50%);
`;
const ButtonWrapper = styled(Button)`
  width: 50%;
  margin:12px;
`;

export default function ManageRole() {
    const [role,setRole] = useState<any>([]);
    const [user,setUser] = useState<any>([]);
    const [userAssignedKeys, setUserAssignedKeys] = useState<any>([]);
    const userData:any = [];
    
    const onChange = (nextuserAssignedKeys:any) => {
        setUserAssignedKeys(nextuserAssignedKeys)
    } 
    
    useEffect(() => {
        const getRoleData = async()=>{
            const res = await axios.get('http://localhost:8000/role')
            const data = res.data;
            setRole(data);
        }
        const getUserData=async()=>{
           await axios.get('http://localhost:8000/user').then(res=>{
                const allUserData = res.data;
                console.log('allUserData',allUserData); 
                if(allUserData){
                    allUserData.map((data:any,key:any)=>{
                        console.log('mdata',data);
                        data["key"] = key+1;
                        userData.push(data);
                    })
                }
                setUser(userData);
            });
        }
        getRoleData();
        getUserData();
    }, [])

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };

    const onFinish = async (values: any) => {
        const users:any = [];
        const roles:any = [];
        if(userAssignedKeys){
            userAssignedKeys.map((i:any)=>{
                users.push(user[i-1]);
            })
        }
        else{
            alert('assign any user');
        }
        const currentRoleValue = values.roles;
        if(currentRoleValue){
            currentRoleValue.map((c:any)=>{
                roles.push(role[c])
            })
        }
        console.log('target',userAssignedKeys);
        console.log('Received values of form: ', values);
        console.log('user',users);
        console.log('roles',roles);
    };

    return (
        <FormWrapper {...layout} name="permission_page" onFinish={onFinish}>
            <Row>
                <Col span={12} offset={10}>
                    <Title level={3}>Manage Role</Title>
                </Col>
            </Row>
            <Form.Item label="Roles" name="roles" rules={[
                {
                    required: true,
                    message: 'Please Select permissions',
                },
            ]}>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    >
                    {role.map((v: any, k: number) => (
                        <Option key={k} value={k}>
                            {v.rolename}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Row>
                <Col span={12} offset={12}>
                    <Title level={5}>Assign Role</Title>
                </Col>
            </Row>
            <Row>
                <Col offset={6}>
                    <Transfer
                        dataSource={user}
                        showSearch
                        targetKeys={userAssignedKeys}
                        style={{width:800}}
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
