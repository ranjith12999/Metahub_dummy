import React from 'react';
import { Table, Tag, Space, Row,Col, Typography,Form } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const {Title} = Typography;
const FormWrapper: any = styled(Form)`
    width: 800px;
    position: static;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
`

export default function PermissionView() {

    const columns = [
    {
        title: 'Role Name',
        dataIndex: 'roleName',
        key: 'roleName',
    },
    {
        title: 'Role Description',
        dataIndex: 'roleDescription',
        key: 'roleDescription',
    },
    {
        title: 'Permission',
        dataIndex: 'permission',
        key: 'permission',
    },
    
    ];

    const data = [
        {
            key: '1',
            roleName: 'Manager',
            roleDescription : 'Manages all persons',
            permission : 'Create'
        },
        {
            key: '2',
            roleName: 'Helper',
            roleDescription : 'Helps to transport the goods',
            permission : 'Update'
        },
        {
            key: '3',
            roleName: 'Producer',
            roleDescription : 'Produces all goods',
            permission : 'Delete'
        },
        {
            key: '4',
            roleName: 'Manager',
            roleDescription : 'Manages all persons',
            permission : 'Create'
        },
        {
            key: '5',
            roleName: 'Helper',
            roleDescription : 'Helps to transport the goods',
            permission : 'Update'
        },
        {
            key: '6',
            roleName: 'Producer',
            roleDescription : 'Produces all goods',
            permission : 'Delete'
        },
        {
            key: '7',
            roleName: 'Manager',
            roleDescription : 'Manages all persons',
            permission : 'Create'
        },
        {
            key: '8',
            roleName: 'Helper',
            roleDescription : 'Helps to transport the goods',
            permission : 'Update'
        },
        {
            key: '9',
            roleName: 'Producer',
            roleDescription : 'Produces all goods',
            permission : 'Delete'
        },
        {
            key: '10',
            roleName: 'Manager',
            roleDescription : 'Manages all persons',
            permission : 'Create'
        },
        {
            key: '11',
            roleName: 'Helper',
            roleDescription : 'Helps to transport the goods',
            permission : 'Update'
        },
        {
            key: '12',
            roleName: 'Producer',
            roleDescription : 'Produces all goods',
            permission : 'Delete'
        },
    ];
    return (
        <div>
            <FormWrapper name="permission_page" >
                <Row>
                    <Col span={12} offset={7}>
                        <Title level={3}>List View Permission Groups</Title>
                    </Col>
                </Row>
                <Table columns={columns} dataSource={data} />
            </FormWrapper>
        </div>
    )
}
