import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_TEAMS_UNIT, BU_GET_TEAMS_UNIT } from "../../store/Types";
import { TextField, InputAdornment } from "@mui/material";
import { withStyles } from "@mui/styles";
// import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import "../ClientListing/client-listing.scss";
import Loader from "../../components/Loader";
import TableGrid from "./TableGrid";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { useDropzone } from "react-dropzone";
import CSVFileValidator from "csv-file-validator";

const styles = {
  input1: {
    padding: "13px 12px",
  },
};

const TeamView = (props) => {

  const selectedBU = useSelector((state) => state.TeamUnitReducer.selectedBU);

  const selectedClient = useSelector(
    (state) => state.BusinessUnitReducer.selectedClient
  );
  const teamDetail = useSelector((state) => state.TeamUnitReducer.teams);

  const navigate = useNavigate();
  const { t } = useTranslation();
  // const CsvUploadData = []
  const breadcrumb = [];
  const [rowLength, setRowLength] = useState(10);
  const dispatch = useDispatch();

  const [editItem, setEditItem] = useState([]);

  const [searchField, setSearchField] = useState("");
  const [myFiles, setMyFiles] = useState([]);

  const [refresh, setRefresh] = useState(false);
  const [visible, setVisible] = useState(false);
  var csvFileData = [];
  const [CsvUploadData, setCsvUploadData] = useState([]);
  const [csvError, setcsvError] = useState([]);

  const CurrentDate = moment().format("DD-MM-YYYY");

  const refreshHandler = () => {
    setRefresh(true);
    setSearchField("");
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setSearchField(e.target.value);
    setRowLength(10);
  };

  const showMoreOptions = [10, 25, 50, 100].map((item) => ({
    label: `Show ${item} Rows`,
    value: item,
  }));

  useEffect(() => {
    if (!isEmpty(selectedBU)) {
      dispatch({ type: BU_GET_TEAMS_UNIT, payload: selectedBU });
    }
  }, []);

  const onEditClick = (obj) => {
    navigate("/teamview/createteam");
    dispatch({
      type: "teams/selectedBUSlice",
      payload: obj,
    });
  };

  const setupRedirect = (editItem) => {
    navigate("/teamview/createteam");
    dispatch({
      type: "teams/createteamBUSlice",
      payload: editItem[0],
    });
  };

  const onSetupClick = () => {
    !isEmpty(editItem[0]) && editItem.length === 1
      ? setupRedirect()
      : toast.error("Select One Client to Setup !!!");
  };

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const csvHeader1 = [
    [
      "Name",
      "Contact Person Name",
      "Contact Person Country Code",
      "Contact Person Number",
      "Email",
      "Address Line 1",
      "Address Line 2",
      "Country",
      "State",
      "City",
      "Pincode",
    ],
  ];

  const getCsv = () => {
    var flag = 0;
    teamDetail &&
      teamDetail.map((Item) => {
        if (flag == 0) {
          csvFileData.push([
            "Name",
            "Entities Name",
            "Contact Person Name",
            "Contact Person Country Code",
            "Contact Person Number",
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

  const onDrop = useCallback(
    (acceptedFiles) => {
      setMyFiles([...myFiles, ...acceptedFiles]);
    },
    [myFiles]
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const removeAll = () => {
    setMyFiles([]);
  };

  const uploadFileToggle = () => {
    setVisible(!visible);
    removeAll();
    setcsvError([]);
  };

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

  const handleCSVUpload = () => {
    const csvUploadArray = [];
    CsvUploadData.forEach((item) => {
      const obj = {
        name: item["Name"],
        contact_person_name: item["Contact Person Name"],
        contact_person_number: item["Contact Person Number"],
        contact_person_country_code: item["Contact Person Country Code"],
        address_line1: item["Address Line 1"],
        address_line2: item["Address Line 2"],
        email: item["Email"],
        country: item.Country,
        state: item.State,
        city: item.City,
        pincode: item.Pincode,
        business_unit: selectedBU.id,
      };
      csvUploadArray.push(obj);
    });

    const body = {
      formData: csvUploadArray,
      org_id: selectedBU.organization,
    };
    dispatch({ type: CREATE_TEAMS_UNIT, payload: body });
    dispatch({ type: "teams/teamCSVUploadInitiate" });
    setTimeout(() => {
      toggleDialog();
    }, 300);
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

  const headers = [
    { label: "Name", key: "name" },
    { label: "Mobile Number", key: "contact_person_number" },
    { label: "Address Line 1", key: "address_line1" },
    { label: "Address Line 2", key: "address_line2" },
    { label: "Country", key: "country" },
    { label: "State", key: "state" },
    { label: "City", key: "city" },
    { label: "Pincode", key: "pincode" },
    { label: "Created", key: "created_by" },
    { label: "Modified", key: "modified_by" },
    { label: "Email", key: "email" },
    { label: "Activate/Deactive", key: "is_active" },
  ];

  const filteredteamDetail =
    teamDetail &&
    teamDetail.filter((team) => {
      return (
        // team.name.toLowerCase().includes(searchField.toLowerCase())
        team
      );
    });
  if (selectedBU.business_unit === undefined) {
    breadcrumb.push(selectedBU);
  } else {
    breadcrumb.push(selectedBU);
  }

  const checkCsv = () => {
    let disabled = true;
    if (!isEmpty(files) && !isEmpty(CsvUploadData)) {
      if (isEmpty(csvError) && acceptedFiles[0].size > 0) {
        disabled = false;
      }
    }
    return disabled;
  };

  if (isEmpty(teamDetail) || refresh) {
    return <Loader />;
  }
  return (
    <div>
      <section className="client-listing">
        <h3 className="section-heading">Buisness Unit: {selectedBU.name}</h3>
        <div className="section-breadcrumbs">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="section-breadcrumbs-a">
                  Clients
                </Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                {selectedClient.name}
              </li>
              <li className="breadcrumb-item" aria-current="page">
                <Link to="/setup" className="section-breadcrumbs-a">
                  Client Setup
                </Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                {breadcrumb[0].country}
              </li>
              <li className="breadcrumb-item" aria-current="page">
                {breadcrumb[0].name}
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Team List
              </li>
            </ol>
          </nav>
        </div>

        <div className="client-listing-content">
          <div className="client-listing-toolbar">
            <div
              className="client-listing-toolbar-left"
              style={{ width: "43%" }}
            >
              <div className="client-listing-toolbar-left-search searchitem">
                <TextField
                  label={"Team Name"}
                  sx={{ width: "100%" }}
                  name={"search"}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    classes: { input: props.classes.input1 },
                  }}
                />
              </div>
              <div className="client-listing-toolbar-left-show ml-10">
                <Select
                  id="show"
                  name="show"
                  placeholder="Show 10 Rows"
                  options={showMoreOptions}
                  onChange={(value) => {
                    setRowLength(value.value);
                  }}
                  classNamePrefix="show"
                />
              </div>
              <div
                className="client-listing-toolbar-left-refresh ml-10"
                onClick={() => {
                  dispatch({ type: BU_GET_TEAMS_UNIT, payload: selectedBU });
                  refreshHandler();
                }}
              >
                <i className="fa fa-undo" aria-hidden="true"></i>
              </div>
            </div>

            <div className="client-listing-toolbar-right">

              <div className="client-listing-toolbar-right-csv-download">
                <button className="btn secondary-button" onClick={toggleDialog}>
                  {" "}
                  CSV Upload <i className="fa fa-upload" aria-hidden="true"></i>
                </button>
              </div>
              <div className="client-listing-toolbar-right-csv-download">
                <CSVLink
                  data={isEmpty(editItem) ? teamDetail : editItem}
                  headers={headers}
                  filename={"Team_" + CurrentDate}
                >
                  <button className="btn secondary-button">
                    {" "}
                    CSV Download{" "}
                    <i className="fa fa-download" aria-hidden="true"></i>
                  </button>
                </CSVLink>
              </div>
              <div className="client-listing-toolbar-right-add-client">
                <Link to="/teamview/createteam">
                  <button className="btn primary-button ml-20">
                    {" "}
                    Add new Team{" "}
                    <i className="fa fa-plus-circle" aria-hidden="true"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="client-listing-grid">
            {" "}
            <TableGrid
              teamDetail={filteredteamDetail}
              editItem={editItem}
              setEditItem={setEditItem}
              rowLength={rowLength}
              searchField={searchField}
            />
          </div>
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
                      <aside>
                        <ul>{!isEmpty(myFiles) && files}</ul>
                      </aside>

                      {!isEmpty(myFiles) && errorContent()}

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
                <CSVLink data={csvHeader1} filename={"Teams_Template.csv"}>
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
      </section>
    </div>
  );
};

export default withStyles(styles)(TeamView);
