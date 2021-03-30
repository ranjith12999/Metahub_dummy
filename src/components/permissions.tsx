/** @format */

import React, { useState , useEffect} from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox,Row,Col,Space,Typography } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';

import { Transfer, Switch, Table, Tag } from 'antd';
import difference from 'lodash/difference';

// Customize Table Transfer

const mock:any = [];
const target:any = [];
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }:any) => (
  <Transfer {...restProps} showSelectAll={false}>
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

      console.log('filtered',filteredItems);
      return (
        <Table
          rowSelection={rowSelection}
          dataSource={filteredItems} 
          columns={columns}
          size="large"
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

export default function PermissionForms() {
  const [targetKeys, setTargetKeys] = useState();
  const [mockData, setMockData] = useState();

  const onChange = (nextTargetKeys:any) => {
      setTargetKeys(nextTargetKeys)
  } 
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    const onFinish = async (values: any) => {
        const index:any = targetKeys;
        const permissions:any = [];
        if(index.length!=''){
            index.map((i:any)=>{
            permissions.push(mock[i-1]);
            })
            values['permissions']=permissions;
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
        }
        else{
            alert('Please assign any role');
        }
    };
    const fetchData =()=>{
    
    axios.get('http://localhost:8000/permission').then(res=>{
        const allData = res.data;
        console.log('alldatat',allData); 
        if(allData){
            allData.map((data:any,key:any)=>{
                console.log('mdata',data);
                data["key"] = key+1;
                mock.push(data);
            })
        }
    });
    setMockData(mock);
    setTargetKeys(target);
}

    useEffect(()=>{
      
      fetchData();
    //setTargetKey(target);
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
            <Col span={12} offset={8}>
                <Title level={5}>Permissions</Title>
            </Col>
        </Row>
         {console.log('mock',mockData)}
         <Row>
           <Col offset={2}>
             {mockData&&
              <TableTransfer
                  dataSource={mockData}
                  targetKeys={targetKeys}
                  showSearch
                  onChange={onChange}
                  leftColumns={leftTableColumns}
                  rightColumns={leftTableColumns}
              />}
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
  );
}
