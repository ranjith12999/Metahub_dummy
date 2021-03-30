/** @format */

import React, { useState , useEffect} from 'react';
import styled from 'styled-components';
import { Form, Input, Button,Row,Col,Typography,Transfer,Table,Space } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import difference from 'lodash/difference';

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }:any) => (
  <Transfer {...restProps} showSelectAll={false} >
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;
      const rowSelection = {
        getCheckboxProps: (item:any) => ({ disabled: listDisabled || item.disabled }),
        onSelectAll(selected:any, selectedRows:any) {
          const treeSelectedKeys = selectedRows
          .filter((item:any) => !item.disabled)
          .map(({ key }:any) => key);
          const diffKeys = selected
          ? difference(treeSelectedKeys, listSelectedKeys)
          : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }:any, selected:any) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };
      return (
        <Table
          rowSelection={rowSelection}
          dataSource={filteredItems} 
          columns={columns}
          size="small"
        />
        );
      }}
  </Transfer>
);


const leftTableColumns = [
  {
    dataIndex: 'name',
    title: 'Name',
  },
  {
    dataIndex: 'description',
    title: 'Description',
  },
];

const rightTableColumns = [
  {
    dataIndex: 'name',
    title: 'Name',
  },
];

const {Title} = Typography;
const FormWrapper:any = styled(Form)`
  width: 650px;
  position: fixed;
  top: 50%;
  left: 47%;
  transform: translate(-50%, -50%);
`;
const ButtonWrapper = styled(Button)`
  width: 50%;
  margin: 10px;
`;


export default function PermissionForms() {
  const [filteredPermissionKeys, setFilteredPermissionKeys] = useState<any>();
  const [permission, setPermission] = useState([]);
  const permissionData:any = [];

  const onChange = (nextfilteredPermissionKeys:any) => {
    setFilteredPermissionKeys(nextfilteredPermissionKeys);
  }

  const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
  };

    const onFinish = async (values: any) => {
        const filteredPermissionData:any = [];
        
            filteredPermissionKeys.map((i:any)=>{
              filteredPermissionData.push(permissionData[i-1]);
            })
            values['permissions']=filteredPermissionData;
            console.log({values,filteredPermissionData});
            console.log('Received values of form: ', values);
            axios({
                url:"http://localhost:8000/role",
                method:'POST',
                data:values
            })
            .then(()=>{
                console.log("role sent");
            })
            .catch(()=>{
                console.log("role error");
            })
    };
    
    useEffect(()=>{
      const fetchPermissionData =async()=>{
       await axios.get('http://localhost:8000/permission').then(res=>{
            const initialPermissionData = res.data;
            console.log('alldatat',initialPermissionData); 
            if(initialPermissionData){
                initialPermissionData.map((data:any,key:any)=>{
                    console.log('mdata',data);
                    data["key"] = key+1;
                    permissionData.push(data);
                })
            }
        });
        setPermission(permissionData);
    }
      fetchPermissionData();
  },[])

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
            <Col span={12} offset={11}>
                <Title level={4}>Permissions</Title>
            </Col>
        </Row>
         <Row>
           <Form.Item label="Permissions" name="permission">
              <TableTransfer
                  dataSource={permission}
                  targetKeys={filteredPermissionKeys}
                  showSearch
                  onChange={onChange}
                  filterOption={(inputValue:any, item:any) =>
                    item.name.indexOf(inputValue) !== -1 || item.description.indexOf(inputValue) !== -1
                  }
                  leftColumns={leftTableColumns}
                  rightColumns={rightTableColumns}
                  style={{width:800}}
              />
           </Form.Item>
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
  );
}
