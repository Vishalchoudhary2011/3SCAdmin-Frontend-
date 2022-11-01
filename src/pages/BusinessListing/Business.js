import React, { useState, useEffect } from "react";
import "./BU.scss";
import {
  GET_ALL_BUSINESS_UNITS,
  UPLOAD_Business_CSV_DATA,
  CREATE_BUSINESSUNIT,
} from "../../store/Types";
import { useDispatch, useSelector } from "react-redux";
import BusinessData from "./BusinessData";
import { useNavigate, useLocation } from "react-router-dom";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { useTranslation } from "react-i18next";
// import { SHOW_ROWS } from "../../../../constant/constant";
// import { toast } from "react-toastify";
// import { TextField, InputAdornment } from "@mui/material";
import "@progress/kendo-theme-default/dist/all.css";
import { useDropzone } from "react-dropzone";
import { isEmpty, get } from "lodash";
import { CSVLink, CSVDownload } from "react-csv";
import papa from "papaparse";
import CSVFileValidator from "csv-file-validator";

function Business(props) {
  const { selectedClient } = props;

  useEffect(() => {
    if (!isEmpty(selectedClient)) {
      dispatch({ type: GET_ALL_BUSINESS_UNITS, payload: selectedClient });
    }
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const csvHeader1 = [
    [
      "BU Name",
      "BU Entities Name",
      "BU Contact Person Name",
      "BU Contact Person Number",
      "TAN Number",
      "Address Line 1",
      "Address Line 2",
      "Country",
      "State",
      "City",
      "Pincode",
    ],
  ];

  var csvFileData = [];

  // const CsvUploadData = [];
  const [CsvUploadData, setCsvUploadData] = useState([]);
  const [csvError, setcsvError] = useState([]);
  // const [editItem, setEditItem] = useState([]);
  const [visible, setVisible] = useState(false);
  const [fileVisible, setFileVisible] = React.useState(false);
  const uploadFileToggle = () => {
    setFileVisible(true);
    setVisible(!visible);
  };
  const businessDetails = useSelector(
    (state) => state.BusinessUnitReducer.businessUnits
  );

  const org_id = get(selectedClient, "id", "");

  const getCsv = () => {
    var flag = 0;
    businessDetails &&
      businessDetails.map((Item) => {
        if (flag == 0) {
          csvFileData.push([
            "BU Name",
            "BU Entities Name",
            "BU Contact Person Name",
            "BU Contact Person Country Code",
            "BU Contact Person Number",
            "TAN Number",
            "Address Line 1",
            "Address Line 2",
            "Country",
            "State",
            "City",
            "Pincode",
          ]);
        }
        flag = 1;
        var value = [];
        var val =
          Item.name +
          "," +
          Item.entities_name +
          "," +
          Item.contact_person_name +
          "," +
          Item.contact_person_country_code +
          "," +
          Item.contact_person_number +
          "," +
          Item.tan +
          "," +
          Item.address_line1 +
          "," +
          Item.address_line2 +
          "," +
          Item.country +
          "," +
          Item.state +
          "," +
          Item.city +
          "," +
          Item.pincode;
        csvFileData.push(val.split(","));
      });
  };
  getCsv();

  const csvData = csvFileData;

  const { t } = useTranslation();
  // const SCAI_URL = process.env.REACT_APP_SCAI_API_ENDPOINT;
  // const tenantId = "123";

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const headerConfig = () => {
    const resultArr = [];
    csvHeader1[0].forEach((item) => {
      const obj = {
        name: item,
        inputName: item,
        required: true,
        requiredError: function (headerName, rowNumber, columnNumber) {
          return `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
        },
      };
      resultArr.push(obj);
    });
    return resultArr;
  };

  const csvHeaderConfig = headerConfig();

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const config = {
        headers: csvHeaderConfig, // required
        isHeaderNameOptional: false, // default (optional)
      };
      CSVFileValidator(acceptedFiles[0], config)
        .then((csvData) => {
          setCsvUploadData(csvData.data);
          // Array of error messages
          setcsvError(csvData.inValidData);
        })
        .catch((err) => {
          console.log({ err });
        });
    }
  }, [acceptedFiles]);

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const handleCSVUpload = () => {
    const csvUploadArray = [];
    CsvUploadData.forEach((item) => {
      const obj = {
        name: item["BU Name"],
        entities_name: item["BU Entities Name"],
        contact_person_name: item["BU Contact Person Name"],
        contact_person_number: item["BU Contact Person Number"],
        contact_person_country_code: "+91",
        tan: item["TAN Number"],
        address_line1: item["Address Line 1"],
        address_line2: item["Address Line 2"],
        country: item.Country,
        state: item.State,
        city: item.City,
        pincode: item.Pincode,
      };
      csvUploadArray.push(obj);
    });

    const payload = {
      org_id: org_id,
      formData: csvUploadArray,
    };

    dispatch({ type: "business/businessCSVUploadInitiate" });
    dispatch({ type: CREATE_BUSINESSUNIT, payload: payload });
    setcsvError([]);
    setTimeout(() => {
      navigate("/setup");
      toggleDialog();
    }, 300);
  };

  const onCreateBUClick = () => {
    navigate("/admin/create-bu");
  };

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const errorContent = () => {
    if (!isEmpty(csvError)) {
      return (
        <div className="bu-csv-error-container">
          {!isEmpty(acceptedFiles) &&
          !isEmpty(CsvUploadData) &&
          acceptedFiles[0].type === "text/csv" ? (
            <>
              <h5 className="text-center warning">
                {csvError.length} Errors Found
              </h5>{" "}
              <br />
              {csvError.map((item, index) => (
                <>
                  <span key={index} className="warning">
                    {index + 1}. *{item.message}
                  </span>
                  <br />
                  <br />
                </>
              ))}
            </>
          ) : (
            <span className="warning">
              *Invalid format!, Please upload .csv file
            </span>
          )}
        </div>
      );
    }
  };

  const checkCsv = () => {
    let disabled = true;
    if (!isEmpty(files) && !isEmpty(CsvUploadData)) {
      if (isEmpty(csvError) && acceptedFiles[0].size > 0) {
        disabled = false;
      }
    }
    return disabled;
  };

  return (
    <div>
      <section className="client-listing">
        <h3 className="section-heading">SetUp</h3>
        <div className="section-breadcrumbs">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/admin" className="section-breadcrumbs-a">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="/admin" className="section-breadcrumbs-a">
                  Client Creation
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="/admin" className="section-breadcrumbs-a">
                  {selectedClient.name}
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Client Setup
              </li>
            </ol>
          </nav>
        </div>
        <div className="client-listing-content">
          <div className="client-listing-toolbar" style={{ float: "right" }}>
            <div className="client-listing-toolbar-right">
              <div className="client-listing-toolbar-right-csv-download">
                <button className="btn secondary-button" onClick={toggleDialog}>
                  {" "}
                  CSV Upload <i className="fa fa-upload" aria-hidden="true"></i>
                </button>
              </div>
              <div
                className="client-listing-toolbar-right-csv-download"
                style={{ marginLeft: "10px" }}
              >
                <CSVLink data={csvData} filename={"BusinessUnits.csv"}>
                  <button className="btn secondary-button">
                    {" "}
                    CSV Download{" "}
                    <i className="fa fa-download" aria-hidden="true"></i>
                  </button>
                </CSVLink>
              </div>
              <div className="client-listing-toolbar-right-add-client">
                <button
                  className="btn primary-button ml-20"
                  onClick={onCreateBUClick}
                  style={{ marginRight: "20px" }}
                >
                  {" "}
                  Create BU{" "}
                  <i className="fa fa-plus-circle" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
          <BusinessData businessData={businessDetails} />
        </div>
      </section>

      {visible && (
        <Dialog id="window">
          <span className="span1">{t("Upload csv")}</span>
          <span
            style={{ fontSize: "20px" }}
            class="k-icon k-i-close-outline k-btn1"
            onClick={uploadFileToggle}
          ></span>
          <DialogActionsBar>
            <p className="border2">
              <div className="div2">
                <section className="container">
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input
                      {...getInputProps()}
                      accept={".csv"}
                      type="file"
                      name="file"
                    />
                    <span
                      style={{ fontSize: "50px" }}
                      class="k-icon k-i-file-csv k-span"
                    ></span>
                    <h4 className="kh4">Select a CSV file to upload</h4>
                    <p className="kp">and drag or drop it here</p>
                  </div>
                  <aside>{!fileVisible ? <ul>{files}</ul> : ""}</aside>
                  {errorContent()}

                  {isEmpty(CsvUploadData) && !isEmpty(files) && (
                    <span className="text-center warning">
                      *Csv file Empty{" "}
                    </span>
                  )}
                </section>
              </div>
            </p>
          </DialogActionsBar>

          <DialogActionsBar>
            <CSVLink data={csvHeader1} filename={"Businessunit_Template.csv"}>
              <button
                style={{
                  marginTop: "9px",
                  marginBottom: "9px",
                  backgroundColor: "#F1F1F1",
                  fontWeight: "bold",
                  fontSize: "10px",
                  borderRadius: "6px",
                  color: "#03045e",
                  marginLeft: "14px",
                  padding: "7px",
                }}
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              >
                {t("Download Template")}
                <span class="k-icon k-i-download"></span>
              </button>
            </CSVLink>

            <button
              style={{
                backgroundColor: "#03045e",
                fontWeight: "bold",
                fontSize: "10px",
                borderRadius: "6px",
                color: "white",
                marginLeft: "80px",
                padding: "8px",
              }}
              className={`k-button k-button-md k-rounded-md k-button-solid k-button-solid-base ${
                checkCsv() && "k-disabled"
              } `}
              onClick={handleCSVUpload}
            >
              {t("Upload")}
            </button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
}

export default Business;
