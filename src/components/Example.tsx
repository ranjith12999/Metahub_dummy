import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Select, Transfer } from "antd";
import axios from "axios";
import "./App.css";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function App() {
  const [roles, setRoles] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [usersInGroup, setInGroup] = useState<any>([]);
  const onChange = (nextTargetKeys: any) => {
    setInGroup(nextTargetKeys);
  };
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://localhost:8000/role");
      const data = res.data;
      setRoles(data);
    };
    const getDataOfUsers = async () => {
      const res = await axios.get("http://localhost:8000/user");
      const data = res.data;
      setUsers(data);
    };
    getData();
    getDataOfUsers();
  }, []);
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="Roles" name="roles">
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
        >
          {roles.map((v: any, k: number) => (
            <Option key={k} value={v.id}>
              {v.rolename}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Users" name="users">
        <Transfer
          dataSource={users}
          rowKey={(record) => record.userid}
          targetKeys={usersInGroup}
          titles={["Source", "Target"]}
          onChange={onChange}
          render={(item) => (
            <span>
              ({item.userid}) {item.username}
            </span>
          )}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default App;