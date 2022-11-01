import React, { useState } from "react";
import { Grid, TextField, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import "./client-creation.scss";
import { useFormik } from "formik";
import Select from "react-select";
import csc from "country-state-city";
import { useDispatch } from "react-redux";
import { CREATE_CLIENT, EDIT_CLIENT } from "../../store/Types";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { withStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { get, isEmpty } from "lodash";
import { useEffect } from "react";
import SimpleReactValidator from "simple-react-validator";
// import { convertBase64 } from "../../utils/FormValidationHandler";
const validator = new SimpleReactValidator();

const styles = {
  helperText: {
    textAlign: "right !important",
  },
};

const ClientCreation = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const editValue = get(location, "state", "");

  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    clientId: "",
    clientName: "",
    mobileNumber: "",
    tanNumber: "",
    registrationNumber: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    adminName: "",
    adminMailId: "",
    adminMobile: "",
    logo: "",
  });

  const {
    clientName,
    mobileNumber,
    tanNumber,
    registrationNumber,
    addressLine1,
    addressLine2,
    pincode,
    adminName,
    adminMailId,
    adminMobile,
    country,
    state,
    city,
  } = formData;

  const dispatch = useDispatch();

  const [, forceUpdate] = useState();

  const [editCountry, SetEditCountry] = useState("");
  const [editState, SetEditState] = useState("");
  const [editCity, SetEditCity] = useState("");

  const clientItems = [
    {
      name: "clientName",
      label: "Client Name*",
      value: clientName,
      required: true,
    },
    {
      name: "mobileNumber",
      label: "Mobile Number*",
      value: mobileNumber,
      required: true,
    },
    {
      name: "tanNumber",
      label: "Tan Number",
      value: tanNumber,
      required: false,
    },
    {
      name: "registrationNumber",
      label: "Registration Number",
      value: registrationNumber,
      required: false,
    },
    {
      name: "addressLine1",
      label: "Address Line 1*",
      value: addressLine1,
      required: true,
    },
    {
      name: "addressLine2",
      label: "Address Line 2",
      value: addressLine2,
      required: false,
    },
  ];

  const adminItems = [
    {
      name: "adminMailId",
      label: "Admin Mail ID*",
      value: adminMailId,
      required: true,
    },
    {
      name: "adminName",
      label: "Admin Name*",
      value: adminName,
      required: true,
    },
    {
      name: "adminMobile",
      label: "Mobile Number*",
      value: adminMobile,
      required: true,
    },
  ];

  const countries = csc.getAllCountries();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const offsetHeight = window.innerHeight - 100;

  const addressFromik = useFormik({
    initialValues: {
      country: "India",
      state: null,
      city: null,
    },
  });

  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.id,
    ...country,
  }));

  const updatedStates = (countryId) =>
    csc
      .getStatesOfCountry(countryId)
      .map((state) => ({ label: state.name, value: state.id, ...state }));

  const updatedCities = (stateId) =>
    csc
      .getCitiesOfState(stateId)
      .map((city) => ({ label: city.name, value: city.id, ...city }));

  const { values, setFieldValue, setValues } = addressFromik;

  const onSubmit = () => {
    if (validator.allValid()) {
      const client = {
        organization: {
          name: clientName,
          tan: tanNumber,
          country_code: "91",
          phone_number: mobileNumber,
          registration_number: registrationNumber,
          address_line_1: addressLine1,
          address_line_2: addressLine2,
          country: country,
          state: state,
          city: city,
          pincode: pincode,
          logo: "logo",
          is_active: false,
        },
        user: {
          first_name: adminName,
          email: adminMailId,
          password: "admin123",
          mobile: adminMobile,
          mobile_country_code: "91",
        },
      };

      dispatch({ type: CREATE_CLIENT, payload: client });

      setTimeout(() => {
        navigate("/admin");
      }, 300);
    } else {
      validator.showMessages();
      forceUpdate(1);
      return false;
    }
  };

  const onUpdate = () => {
    if (validator.allValid()) {
      const updatedClient = {
        ...editValue,
        id: editValue.id,
        name: clientName,
        tan: tanNumber,
        country_code: "91",
        phone_number: mobileNumber,
        registration_number: registrationNumber,
        address_line_1: addressLine1,
        address_line_2: addressLine2,
        country: country,
        state: state,
        city: city,
        pincode: pincode,
        logo: "logo",
        email: adminMailId,
        is_active: false,
      };
      dispatch({ type: EDIT_CLIENT, payload: updatedClient });
      setTimeout(() => {
        navigate("/admin");
      }, 300);
    } else {
      validator.showMessages();
      forceUpdate(1);
      return false;
    }
  };

  useEffect(() => {
    if (!isEmpty(editValue)) {
      setFormData({
        ...formData,
        clientName: editValue.name,
        mobileNumber: editValue.phone_number,
        tanNumber: editValue.tan,
        registrationNumber: editValue.registration_number,
        addressLine1: editValue.address_line_1,
        addressLine2: editValue.address_line_2,
        country: editValue.country,
        state: editValue.state,
        city: editValue.city,
        pincode: editValue.pincode,
        adminMailId: editValue.email,
      });
      SetEditCountry({ label: editValue.country });
      SetEditState({ label: editValue.state });
      SetEditCity({ label: editValue.city });
      setValues(
        {
          country: editValue.country,
          state: editValue.state,
          city: editValue.city,
        },
        false
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editValue]);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    // const base64 = await convertBase64(file);
    // const fileSize = file.size < 2000000;
    // checkSupport && fileSize && setSelectedFile(base64);
    setFormData({ ...formData, logo: "logo" });
    setFile(e.target.files[0]);
  };

  return (
    <section
      className="client-creation"
      style={{ height: `${offsetHeight}px` }}
    >
      <h3 className="section-heading">
        {" "}
        {!isEmpty(editValue) ? "Update Client" : "Create Client"}
      </h3>
      <div className="section-breadcrumbs">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/admin">
                <span className="section-breadcrumbs-a">Home</span>
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/admin">
                <span className="section-breadcrumbs-a">Client List</span>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {!isEmpty(editValue) ? "Update Client" : "Create New Client"}
            </li>
          </ol>
        </nav>
      </div>
      <div className="client-creation-container">
        <div>
          <div className="mb-4">
            <h3 className="section-subheading">Client Information</h3>
            <Grid container spacing={2.5}>
              {clientItems.map((item, index) => {
                return item.name !== "mobileNumber" ? (
                  <Grid item md={3} sm={6} xs={12} key={index}>
                    <TextField
                      label={item.label}
                      sx={{ width: "100%" }}
                      name={item.name}
                      value={item.value}
                      onChange={onChange}
                    />
                    {item.required &&
                      validator.message(
                        `${item.label}`,
                        item.value,
                        "required"
                      )}
                  </Grid>
                ) : (
                  <Grid item md={3} sm={6} xs={12} key={index}>
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={mobileNumber}
                      withCountryCallingCode={true}
                      onChange={(val) =>
                        setFormData({ ...formData, mobileNumber: val })
                      }
                      international
                      defaultCountry="IN"
                      className="phone-input"
                    />
                    {item.required &&
                      validator.message(
                        `${item.label}`,
                        item.value,
                        "required"
                      )}
                  </Grid>
                );
              })}

              <Grid item md={3} sm={6} xs={12}>
                {" "}
                <Select
                  classNamePrefix="mySelect"
                  className="client-creation-select"
                  id="country"
                  name="country"
                  placeholder="Country*"
                  label="Country*"
                  options={updatedCountries}
                  value={editCountry}
                  // styles={customStyles}
                  onChange={(value) => {
                    SetEditCountry();
                    setFormData({ ...formData, country: value.name });
                    setValues(
                      { country: value, state: null, city: null },
                      false
                    );
                  }}
                />{" "}
                {validator.message("country", country, "required")}
              </Grid>

              <Grid item md={3} sm={6} xs={12}>
                {" "}
                <Select
                  classNamePrefix="mySelect"
                  className="client-creation-select"
                  id="state"
                  name="state"
                  placeholder="State*"
                  // styles={customStyles}
                  options={updatedStates(
                    values.country ? values.country.value : null
                  )}
                  value={editState}
                  onChange={(value) => {
                    SetEditState();
                    setFormData({ ...formData, state: value.name });
                    setValues({ state: value, city: null }, false);
                  }}
                />{" "}
                {validator.message(`state`, state, "required")}
              </Grid>

              <Grid item md={3} sm={6} xs={12}>
                <Select
                  classNamePrefix="mySelect"
                  className="client-creation-select"
                  id="city"
                  name="city"
                  placeholder="City*"
                  // styles={customStyles}
                  options={updatedCities(
                    values.state ? values.state.value : null
                  )}
                  value={editCity}
                  onChange={(value) => {
                    SetEditCity();
                    setFormData({ ...formData, city: value.name });
                    setFieldValue("city", value);
                  }}
                />
                {validator.message(`city`, city, "required")}
              </Grid>

              <Grid item md={3} sm={6} xs={12}>
                <TextField
                  label={"Pincode*"}
                  sx={{ width: "100%" }}
                  name={"pincode"}
                  value={pincode}
                  onChange={onChange}
                />
                {validator.message(`pincode`, pincode, "required")}
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <div className="client-creation-input">
                  <span> {file ? file.name : "No File Chosen"}</span>
                  <div>
                    <label
                      for="file-upload"
                      className="client-creation-input-label"
                    >
                      Choose File
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      className="d-none"
                      onChange={(e) => onFileChange(e)}
                    />
                  </div>
                </div>
                <span className="client-creation-helper-text">
                  *Client Logo
                </span>

                {validator.message(`country`, country, "required")}
              </Grid>
            </Grid>
          </div>
          <Divider />
          <div className="mt-4">
            <h3 className="common-heading">Admin Information</h3>
            <Grid container spacing={2.5}>
              {adminItems.map((item, index) => {
                return item.name !== "adminMobile" ? (
                  <Grid item md={3} sm={6} xs={12} key={index}>
                    <TextField
                      label={item.label}
                      sx={{ width: "100%" }}
                      name={item.name}
                      value={item.value}
                      onChange={onChange}
                    />
                    {item.required &&
                      validator.message(
                        `${item.label}`,
                        item.value,
                        "required"
                      )}
                  </Grid>
                ) : (
                  <Grid item md={3} sm={6} xs={12} key={index}>
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={adminMobile}
                      withCountryCallingCode={true}
                      onChange={(val) =>
                        setFormData({ ...formData, adminMobile: val })
                      }
                      international
                      defaultCountry="IN"
                      className="phone-input"
                    />{" "}
                    {item.required &&
                      validator.message(
                        `${item.label}`,
                        item.value,
                        "required"
                      )}
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </div>

        <div className="client-creation-submit-container mt-4">
          <button
            className="btn primary-button"
            onClick={!isEmpty(editValue) ? onUpdate : onSubmit}
          >
            {!isEmpty(editValue) ? "Update" : "Create"}
          </button>
          <button
            className="btn cancel-button ml-20"
            onClick={() => navigate("/admin")}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
    // </Layout>
  );
};

export default withStyles(styles)(ClientCreation);
