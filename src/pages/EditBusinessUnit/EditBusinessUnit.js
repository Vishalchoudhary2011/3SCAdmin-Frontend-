import React, { useState, useEffect } from "react";
import "../CreateBusinessUnit/CreateBusinessUnit.scss";
import { useTranslation } from "react-i18next";
import { get, isEmpty } from "lodash";
import { Grid, TextField } from "@mui/material";
import Select from "react-select";
import { useFormik } from "formik";
import csc from "country-state-city";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import SimpleReactValidator from "simple-react-validator";
import { EDIT_BUSINESSUNIT } from "../../store/Types";
const validator = new SimpleReactValidator();

const EditBusinessUnit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedBU = get(location, "state", "");
  const [, forceUpdate] = useState();

  const [editCountry, SetEditCountry] = useState("");
  const [editState, SetEditState] = useState("");
  const [editCity, SetEditCity] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    entities_name: "",
    contact_person_name: "",
    contact_person_number: "",
    contact_person_country_code: "+91",
    tan: "",
    address_line1: "",
    address_line2: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    if (!isEmpty(selectedBU)) {
      setFormData({
        name: selectedBU.name,
        entities_name: selectedBU.entities_name,
        contact_person_name: selectedBU.contact_person_name,
        contact_person_number: selectedBU.contact_person_number,
        contact_person_country_code: "+91",
        tan: selectedBU.tan,
        address_line1: selectedBU.address_line1,
        address_line2: selectedBU.address_line2,
        country: selectedBU.country,
        state: selectedBU.state,
        city: selectedBU.city,
        pincode: selectedBU.pincode,
      });
      SetEditCountry({ label: selectedBU.country });
      SetEditState({ label: selectedBU.state });
      SetEditCity({ label: selectedBU.city });
      setValues(
        {
          country: selectedBU.country,
          state: selectedBU.state,
          city: selectedBU.city,
        },
        false
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBU]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const countries = csc.getAllCountries();

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

  const offsetHeight = window.innerHeight - 100;

  const onSubmit = () => {
    if (validator.allValid()) {
      const payload = {
        formData: formData,
        org_id: selectedBU.organization,
        business_id: selectedBU.id,
      };
      dispatch({ type: EDIT_BUSINESSUNIT, payload: payload });
      setTimeout(() => {
        navigate("/setup");
      }, 300);
    } else {
      validator.showMessages();
      forceUpdate(1);
      return false;
    }
  };

  return (
    <section className="bu-creation" style={{ height: `${offsetHeight}px` }}>
      <h3 className="section-heading"> {t("Update BU")}</h3>
      <div className="section-breadcrumbs">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/admin">
                <span className="section-breadcrumbs-a">{t("Home")}</span>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {t("Update BU")}
            </li>
          </ol>
        </nav>
      </div>
      <div className="bu-create-container m-1">
        <h3 className="section-subheading">{t("BU Information")}</h3>
      </div>
      <div className="bu-creation-container">
        <div className="mb-4">
          <Grid container spacing={2.5}>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                label={"Bu Name*"}
                sx={{ width: "100%" }}
                name={"name"}
                value={formData.name}
                onChange={onChange}
              />
              {validator.message(`BU Name`, formData.name, "required")}
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                label={"BU Entities Name*"}
                sx={{ width: "100%" }}
                name={"entities_name"}
                value={formData.entities_name}
                onChange={onChange}
              />
              {validator.message(
                `BU Entities Name`,
                formData.entities_name,
                "required"
              )}
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                label={"BU Contact Person Name*"}
                sx={{ width: "100%" }}
                name={"contact_person_name"}
                value={formData.contact_person_name}
                onChange={onChange}
              />
              {validator.message(
                `BU Contact Person Name`,
                formData.contact_person_name,
                "required"
              )}
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <PhoneInput
                placeholder="BU Contact Person Number*"
                value={formData.contact_person_number}
                withCountryCallingCode={true}
                onChange={(val) =>
                  setFormData({ ...formData, contact_person_number: val })
                }
                international
                defaultCountry="IN"
                className="phone-input"
              />
              {validator.message(
                `BU Contact Person Number`,
                formData.contact_person_number,
                "required"
              )}
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                label={"Tan Number*"}
                sx={{ width: "100%" }}
                name={"tan"}
                value={formData.tan}
                onChange={onChange}
              />
              {validator.message(`Tan Number*`, formData.tan, "required")}
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                label={"Address Line 1*"}
                sx={{ width: "100%" }}
                name={"address_line1"}
                value={formData.address_line1}
                onChange={onChange}
              />
              {validator.message(
                `Address Line 1`,
                formData.address_line1,
                "required"
              )}
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                label={"Address Line 2"}
                sx={{ width: "100%" }}
                name={"address_line2"}
                value={formData.address_line2}
                onChange={onChange}
              />
            </Grid>

            <Grid item md={3} sm={6} xs={12}>
              {" "}
              <Select
                classNamePrefix="mySelect"
                className="bu-creation-select"
                id="country"
                name="country"
                placeholder="Country*"
                label="Country*"
                options={updatedCountries}
                value={editCountry}
                onChange={(value) => {
                  SetEditCountry();
                  setFormData({ ...formData, country: value.name });
                  //   handleInput(index, value.name, "country");

                  setValues(
                    {
                      country: value,
                      state: null,
                      city: null,
                    },
                    false
                  );
                }}
              />{" "}
              {validator.message("country", formData.country, "required")}
            </Grid>

            <Grid item md={3} sm={6} xs={12}>
              {" "}
              <Select
                classNamePrefix="mySelect"
                className="bu-creation-select"
                id="state"
                name="state"
                placeholder="State*"
                options={updatedStates(
                  values.country ? values.country.value : null
                )}
                value={editState}
                onChange={(value) => {
                  SetEditState();
                  setFormData({ ...formData, state: value.name });
                  //   handleInput(index, value.name, "state");
                  setValues({ state: value, city: null }, false);
                }}
              />{" "}
              {validator.message(`state`, formData.state, "required")}
            </Grid>

            <Grid item md={3} sm={6} xs={12}>
              <Select
                classNamePrefix="mySelect"
                className="bu-creation-select"
                id="city"
                name="city"
                placeholder="City*"
                options={updatedCities(
                  values.state ? values.state.value : null
                )}
                value={editCity}
                onChange={(value) => {
                  SetEditCity();
                  setFormData({ ...formData, city: value.name });
                  //   handleInput(index, value.name, "city");
                  setFieldValue("city", value);
                }}
              />
              {validator.message(`city`, formData.city, "required")}
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                label={"PIN Code*"}
                sx={{ width: "100%" }}
                name={"pincode"}
                value={formData.pincode}
                onChange={onChange}
              />
              {validator.message(`PIN Code`, formData.pincode, "required")}
            </Grid>
          </Grid>
        </div>
        <div className="bu-creation-submit-container mt-4 text-end">
          <button className="btn primary-button" onClick={onSubmit}>
            {t("Update")}
          </button>
          <button
            className="btn cancel-button ml-20"
            onClick={() => navigate("/setup")}
          >
            {t("Cancel")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditBusinessUnit;
