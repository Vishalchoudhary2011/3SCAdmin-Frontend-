import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_CLIENTS, GET_CLIENT_CONFIG } from "../../store/Types";
import { TextField, InputAdornment } from "@mui/material";
import { withStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import "./client-listing.scss";
import Loader from "../../components/Loader";
import TableGrid from "./TableGrid/TableGrid";
import { setLoaderTrue } from "../../store/Slices/AdminSlice";

const styles = {
  input1: {
    padding: "13px 12px",
  },
};

const ClientListing = (props) => {
  const navigate = useNavigate();

  const [rowLength, setRowLength] = useState(10);

  const [editItem, setEditItem] = useState([]);

  const [searchField, setSearchField] = useState("");

  const [refresh, setRefresh] = useState(false);

  const refreshHandler = () => {
    setRefresh(true);
    setSearchField("");
    setTimeout(() => {
      setRefresh(false);
    }, 300);
  };

  const handleChange = (e) => {
    setSearchField(e.target.value);
    setRowLength(10);
  };

  const clientDetails = useSelector((state) => state.AdminReducer.clients);
  const showMoreOptions = [10, 25, 50, 100].map((item) => ({
    label: `Show ${item} Rows`,
    value: item,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_CLIENTS });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEditClick = () => {
    !isEmpty(editItem[0]) && editItem.length === 1
      ? navigate("/admin/client-creation", { state: editItem[0] })
      : toast.error("Select One Client to Edit !!!");
  };

  const setupRedirect = () => {
    navigate("/setup");
    dispatch({
      type: "businessUnit/selectedClientSlice",
      payload: editItem[0],
    });
  };

  const configureRedirect = () => {
    /// change it back to editItem[0].id || "1234"
    dispatch({ type: "admin/setLoaderTrue" });
    dispatch({
      type: GET_CLIENT_CONFIG,
      payload: "1234",
    });

    dispatch({
      type: "admin/selectedClientSlice",
      payload: editItem[0],
    });

    navigate("/client/configure");

    // setTimeout(() => {
    //   !clientLoader && navigate("/client/configure");
    // }, 300);
  };

  const onSetupClick = () => {
    !isEmpty(editItem[0]) && editItem.length === 1
      ? setupRedirect()
      : toast.error("Select One Client to Setup !!!");
  };

  const onConfigureClick = () => {
    !isEmpty(editItem[0]) && editItem.length === 1
      ? configureRedirect()
      : toast.error("Select One Client to Configure !!!");
  };

  const headers = [
    { label: "Name", key: "name" },
    { label: "Tan Number", key: "tan" },
    { label: "Mobile Number", key: "phone_number" },
    { label: "Registration Number", key: "registration_number" },
    { label: "Address Line 1", key: "address_line_1" },
    { label: "Address Line 2", key: "address_line_2" },
    { label: "Country", key: "country" },
    { label: "State", key: "state" },
    { label: "City", key: "city" },
    { label: "Pincode", key: "pincode" },
    { label: "Created On", key: "created_on" },
    { label: "Modified", key: "modified_on" },
    { label: "Status", key: "status" },
    { label: "Email", key: "email" },
    { label: "Website", key: "website" },
    { label: "Activate/Deactive", key: "is_active" },
  ];

  const filteredClientDetails = clientDetails.filter((client) => {
    return (
      client.client_id.toLowerCase().includes(searchField.toLowerCase()) ||
      client.name.toLowerCase().includes(searchField.toLowerCase())
    );
  });

  if (isEmpty(clientDetails) || refresh) {
    return <Loader />;
  }

  return (
    <div>
      <section className="client-listing">
        <h3 className="section-heading">Clients</h3>
        <div className="section-breadcrumbs">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/" className="section-breadcrumbs-a">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Client List
              </li>
            </ol>
          </nav>
        </div>

        <div className="client-listing-content">
          <div className="client-listing-toolbar">
            <div className="client-listing-toolbar-left">
              <div className="client-listing-toolbar-left-search">
                <TextField
                  label={"Client ID / Client Name"}
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
                  dispatch({ type: GET_ALL_CLIENTS });
                  refreshHandler();
                }}
              >
                <i className="fa fa-undo" aria-hidden="true"></i>
              </div>
            </div>

            <div className="client-listing-toolbar-right">
              <div className="client-listing-toolbar-right-add-client">
                <button
                  className={`btn cancel-button ml-10 ${
                    editItem.length !== 1 && "disabled"
                  }`}
                  onClick={onSetupClick}
                >
                  Setup
                </button>
                <button
                  className={`btn primary-button ml-10 ${
                    editItem.length !== 1 && "disabled"
                  }`}
                  onClick={onConfigureClick}
                >
                  Configure
                </button>
              </div>
              <div
                className={`client-listing-toolbar-right-edit ml-10 ${
                  editItem.length !== 1 && "disabled"
                }`}
              >
                <EditIcon onClick={onEditClick} />
              </div>
              <div className="client-listing-toolbar-right-csv-download">
                <CSVLink
                  data={isEmpty(editItem) ? clientDetails : editItem}
                  headers={headers}
                >
                  <button className="btn secondary-button">
                    {" "}
                    CSV Download{" "}
                    <i className="fa fa-download" aria-hidden="true"></i>
                  </button>
                </CSVLink>
              </div>
              <div className="client-listing-toolbar-right-add-client">
                <Link to="/admin/client-creation">
                  <button className="btn primary-button ml-20">
                    {" "}
                    Add new Client{" "}
                    <i className="fa fa-plus-circle" aria-hidden="true"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="client-listing-grid">
            {" "}
            <TableGrid
              clientDetails={filteredClientDetails}
              editItem={editItem}
              setEditItem={setEditItem}
              rowLength={rowLength}
              searchField={searchField}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default withStyles(styles)(ClientListing);
