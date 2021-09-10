import React from "react";
import HomePage from "../pages/HomePage";
import JobSeekerRegisterPage from "../pages/Job Seeker/JobSeekerRegisterPage";
import { Route } from 'react-router';
import JobSeekerLoginPage from "../pages/Job Seeker/JobSeekerLoginPage";
import EmployerLoginPage from "../pages/Employer/EmployerLoginPage";
import EmployerRegisterPage from "../pages/Employer/EmployerRegisterPage";
import JobAdvertisementPage from "../pages/Job Advertisement/JobAdvertisementPage";
import Filter from "../layouts/Filter";
import JobAdvertisementDetail from "../pages/Job Advertisement/JobAdvertisementDetail";
import JobAdvertisementAddPage from "../pages/Employer/JobAdvertisementAddPage";
import ConfirmJobAdvertisementPage from "../pages/Hrms Personnel/ConfirmJobAdvertisementPage";
import JobSeekerProfile from "../pages/Job Seeker/JobSeekerProfile";
import CvUpdate from "../pages/Job Seeker/CvUpdate";
import { ToastContainer } from "react-toastify";
import EmployerProfileUpdate from "../pages/popups/JobSeekerCvUpdate/EmployerUpdate/EmployerProfileUpdate";



export default function Dashboard() {
  return (
    <div>
      <ToastContainer position="bottom-right"/>
      <Route exact path ="/jobseekerregisterpage" component={JobSeekerRegisterPage}/>
      <Route exact path ="/jobseekerloginpage" component={JobSeekerLoginPage}/>
      <Route exact path ="/jobseekerprofile" component={JobSeekerProfile}/>
      <Route exact path ="/employerloginpage" component={EmployerLoginPage}/>
      <Route exact path ="/employerupdate" component={EmployerProfileUpdate}/>
      <Route exact path ="/cvdetail/:id" component={CvUpdate}/>
      <Route exact path ="/employerregisterpage" component={EmployerRegisterPage}/>
      <Route exact path ="/jobadvertspage" component={JobAdvertisementPage}/>
      <Route exact path ="/filter" component={Filter}/>
      <Route exact path ="/jobadvertsdetail/:id" component={JobAdvertisementDetail}/>
      <Route exact path ="/jobadvertadd" component={JobAdvertisementAddPage}/>
      <Route exact path ="/confirmAdvert" component={ConfirmJobAdvertisementPage}/>
      <Route exact path ="/home" component={HomePage}/>
      <Route exact path ="/" component={HomePage}/>
    </div>
  );
}
