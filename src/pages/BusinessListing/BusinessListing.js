import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TableGrid from "../../../../globalComponent/TableGrid/TableGrid";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_CLIENTS } from "../../../../store/Types";
import { TextField, InputAdornment } from "@mui/material";
import { withStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import Loader from "../../../../components/Loader";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import '../ClientListing/client-listing.scss';

const styles = {
  input1: {
    padding: "13px 12px",
  },
  input2: {
    height: 200,
    fontSize: "3em",
  },
};

const BusinessListing = (props) => {
  const navigate = useNavigate();

  const [rowLength, setRowLength] = useState(10);

  const [editItem, setEditItem] = useState([]);

  const [searchField, setSearchField] = useState("");

  const [refresh, setRefresh] = useState(false);

  const refreshHandler = () => {
    setRefresh(true);
    setSearchField("")
    setTimeout(() => {
      setRefresh(false);
    }, 300);
  };

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const clientDetails = useSelector((state) => state.AdminReducer.clients);
  const showMoreOptions = [10, 25, 50, 100].map((item) => ({
    label: `Show ${item} Rows`,
    value: item,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_CLIENTS });
  }, []);

  const onEditClick = () => {
    !isEmpty(editItem[0]) && editItem.length === 1
      ? navigate("/admin/client-creation", { state: editItem[0] })
      : toast.error("Select One Client to Edit !!!");
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
        <h3 className="section-heading">Business Unit: Food</h3>
        <div className="section-breadcrumbs">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/" className="section-breadcrumbs-a">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                SetUp
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                India
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Food
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
                <div className="client-listing-toolbar-right-csv-download">
                    <button className="btn secondary-button">
                        {" "}
                        CSV Upload{" "}
                        <i className="fa fa-upload" aria-hidden="true"></i>
                    </button>
                </div>
                <div className="client-listing-toolbar-right-csv-download" style={{marginLeft:'10px'}}>
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
                        Add New Team{" "}
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
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default withStyles(styles)(BusinessListing);
