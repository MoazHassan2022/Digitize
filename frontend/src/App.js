import './App.css';
import {  Route, Routes } from "react-router-dom";
import SignIn from './Pages/SignIn/Signin';
import SubmitSurvy from './Pages/SubmitSurvy/SubmitSurvy';
import RequestData from './Pages/RequestData/RequestData';
import AddSuperVisor from './Pages/AddSupervisor/AddSuperVisor';
import Setting from './Pages/Setting/Setting';
import SubmitEmail from './Pages/SubmitEmail/SubmitEmail';
import Resetpassword from './Pages/ResetPassword/ResetPassword';
import GeneralAuthWrapper from './Component/AuthWrapper/GeneralAuthWrapper copy';
import AdminAuthWrapper from './Component/AuthWrapper/AdminAuthWrapper';
import ProjectMaps from './Pages/ProjectMaps/ProjectMaps';
import PersonalSetting  from './Pages/PersonalSetting/PersonalSetting.js';


function App() {
  return (
      <Routes>
        <Route exact path="/" element={ <SignIn /> } />
        <Route path="/SubmitSurvey" element={<GeneralAuthWrapper> <SubmitSurvy /> </GeneralAuthWrapper>} />
        <Route path="/PersonalSetting" element={<GeneralAuthWrapper> <PersonalSetting/></GeneralAuthWrapper> } />
        <Route path="/RequestData" element={<AdminAuthWrapper> <RequestData /></AdminAuthWrapper> } />
        <Route path="/AddSupervisor" element={ <AdminAuthWrapper><AddSuperVisor /> </AdminAuthWrapper>} />
        <Route path="/Setting" element={<AdminAuthWrapper> <Setting/></AdminAuthWrapper> } />
        <Route path="/ProjectMaps" element={<AdminAuthWrapper> <ProjectMaps /></AdminAuthWrapper> } />
        <Route path="/SubmitEmail" element={<SubmitEmail />} />
        <Route path="/users/resetPassword/:id" element={ <Resetpassword /> } />
      </Routes>
  );
}

export default App;