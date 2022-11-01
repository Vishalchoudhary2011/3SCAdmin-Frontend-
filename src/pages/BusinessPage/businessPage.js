import React, { useEffect } from "react";
import BusinessListing from "../BusinessListing/Business";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const BusinessPage = () => {
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
        <BusinessListing selectedClient={selectedClient} />
      )}
    </>
  );
};
export default BusinessPage;
