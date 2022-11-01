import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import TeamView from "./TeamView";

const TeamListing = () => {
  const navigate = useNavigate();
  const selectedClient = useSelector(
    (state) => state.BusinessUnitReducer.selectedClient
  );

  const navigateToAdmin = () => {
    navigate("/admin");
  };

  useEffect(() => {
    if (isEmpty(selectedClient)) {
      navigateToAdmin();
    }
  }, [selectedClient]);

  return (
    <>
      {isEmpty(selectedClient) ? (
        <Loader />
      ) : (
        <TeamView />
      )}
    </>
  );
};
export default TeamListing;
