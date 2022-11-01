import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/homePage";
import BusinessUnit from "../pages/BusinessPage/businessPage";
import ErrorPage from "../globalComponent/ErrorPage/Error";
import ClientCreation from "../pages/ClientCreation/ClientCreation";
import CreateBusinessUnit from "../pages/CreateBusinessUnit/CreateBusinessUnit";
import EditBusinessUnit from "../pages/EditBusinessUnit/EditBusinessUnit";
import ClientConfigurePage from "../pages/ClientConfigure/ClientConfigurePage";
// import TeamView from '../pages/TeamUnit/TeamView'
import CreateTeam from '../pages/CreateTeam/CreateTeam'
import EditTeam from '../pages/EditTeam/EditTeam'
import TeamListing from "../pages/TeamUnit/TeamListing";

const Routing = () => {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<HomePage />} />
        <Route path="/setup" element={<BusinessUnit />} />
        <Route path="/client/configure" element={<ClientConfigurePage />} />
        <Route path="/admin/client-creation" element={<ClientCreation />} />
        <Route path="/admin/create-bu" element={<CreateBusinessUnit />} />
        <Route path="/admin/edit-bu" element={<EditBusinessUnit />} />
        <Route path="/teamview" element={<TeamListing />} />
        <Route path="/teamview/createteam" element={<CreateTeam />} />
        <Route path="/teamview/editteam" element={<EditTeam />} />

        {/* Protected routes */}

        {/* Wildcard route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default Routing
