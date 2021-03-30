import React from 'react';
import PermissionForm from './components/permission';
import PermissionForms from './components/permissions';
import ManageRole from './components/manageRole';
import PermissionView from './components/PermissionView';
import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div>
       {/* <PermissionView/> */}
       <PermissionForms/>
       {/* <ManageRole/> */}
    </div>
  );
}

export default App;
