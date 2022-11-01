import React, { useEffect, useState } from "react";
import "./client-configure.scss";
import Loader from "../../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ClientConfigure from "./ClientConfigure";
import ReactJson from "react-json-view";
import { toast } from "react-toastify";

const ClientConfigurePage = () => {
  const navigate = useNavigate();
  const selectedClient = useSelector(
    (state) => state.AdminReducer.selectedClient
  );

  const clientConfiguration = useSelector(
    (state) => state.AdminReducer.clientConfiguration
  );

  // const clientConfiguration = {
  //       snop: {
  //         productHierarchyLevel: "4",
  //         locationHierarchyLevel: "2",
  //         planningFrequency: "MONTHLY",
  //       },
  //       entities: {
  //         salesmanHierarchy: {
  //           salesmanHierarchyNoOfLevels: 5,
  //           salesmanHierarchyLevel1: "ASM",
  //           salesmanHierarchyLevel2: "LSM",
  //           salesmanHierarchyLevel3: "PSM",
  //           salesmanHierarchyLevel4: "DSM",
  //           salesmanHierarchyLevel5: "QSM",
  //         },
  //         demandPlannerHierarchy: {
  //           demandPlannerHierarchyNoOfLevels: 5,
  //           demandPlannerHierarchyLevel1: "DD1",
  //           demandPlannerHierarchyLevel2: "DD2",
  //           demandPlannerHierarchyLevel3: "DD3",
  //           demandPlannerHierarchyLevel4: "DD4",
  //           demandPlannerHierarchyLevel5: "DD5",
  //         },
  //         locationHierarchy: {
  //           locationHierarchyNoOfLevels: 4,
  //           locationHierarchyLevel1: "Area",
  //           locationHierarchyLevel2: "City",
  //           locationHierarchyLevel3: "State",
  //           locationHierarchyLevel4: "Region",
  //         },
  //         productHierarchy: {
  //           productHierarchyNoOfLevels: 4,
  //           productHierarchyLevel1: "Product",
  //           productHierarchyLevel2: "Sub-Category",
  //           productHierarchyLevel3: "Category",
  //           productHierarchyLevel4: "Brand",
  //         },
  //       },
  //     };

  // const configError = useSelector((state) => state.AdminReducer.error);

  const navigateToAdmin = () => {
    navigate("/admin");
  };

  useEffect(() => {
    if (isEmpty(selectedClient)) {
      navigateToAdmin();
    }
  }, [selectedClient]);

  // console.log(!isEmpty(selectedClient), "isEmpty(selectedClient)");
  // console.log(!isEmpty(clientConfiguration), "isEmpty(clientConfiguration)");

  return (
    <>
      {!isEmpty(selectedClient) && !isEmpty(clientConfiguration) ? (
        <section className="client-configure">
          <h3 className="section-heading">Client Configuration</h3>
          <ClientConfigure
            selectedClient={selectedClient}
            clientConfiguration={clientConfiguration}
          />
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ClientConfigurePage;
