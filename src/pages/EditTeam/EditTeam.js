import React, { useState, useEffect } from "react";
import "../CreateBusinessUnit/CreateBusinessUnit.scss";
import { useTranslation } from "react-i18next";
import { get, isEmpty } from "lodash";
import { Grid, TextField } from "@mui/material";
import Select from "react-select";
import { useFormik } from "formik";
import csc from "country-state-city";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useSelector } from "react-redux";

import SimpleReactValidator from "simple-react-validator";
import { EDIT_TEAM_UNIT } from "../../store/Types";

const validator = new SimpleReactValidator();

const EditTeam = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const editteamBU = useSelector((state) => state.TeamUnitReducer.selectedBU);

  const selectedClient = useSelector(
    (state) => state.BusinessUnitReducer.selectedClient
  );
  const [, forceUpdate] = useState();

  const [editCountry, SetEditCountry] = useState("");
  const [editState, SetEditState] = useState("");
  const [editCity, SetEditCity] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    tan: "",
    contact_person_name: "",
    contact_person_number: "",
    contact_person_country_code: "+91",
    email: "",
    address_line1: "",
    address_line2: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    organization: "",
    business_unit: "",
  });

  useEffect(() => {
    if (!isEmpty(editteamBU)) {
      setFormData({
        id: editteamBU.id,
        name: editteamBU.name,
        tan: editteamBU.business_unit.tan,
        contact_person_name: editteamBU.business_unit.name,
        contact_person_number: editteamBU.contact_person_number,
        contact_person_country_code: "+91",
        email: editteamBU.email,
        address_line1: editteamBU.address_line1,
        address_line2: editteamBU.address_line2,
        country: editteamBU.country,
        state: editteamBU.state,
        city: editteamBU.city,
        pincode: editteamBU.pincode,
        organization: editteamBU.organization,
        business_unit: editteamBU.business_unit.id,
      });
      SetEditCountry({ label: editteamBU.country });
      SetEditState({ label: editteamBU.state });
      SetEditCity({ label: editteamBU.city });
      setValues(
        {
          country: editteamBU.country,
          state: editteamBU.state,
          city: editteamBU.city,
        },
        false
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editteamBU]);

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
      };
      dispatch({ type: EDIT_TEAM_UNIT, payload: formData });
      setTimeout(() => {
        navigate('/teamview')
      }, 1500);
    } else {
      validator.showMessages();
      forceUpdate(1);
      return false;
    }
  };

  return (
    <section className="bu-creation" style={{ height: `${offsetHeight}px` }}>
      <h3 className="section-heading"> {t("Edit Team")}</h3>
      <div className="section-breadcrumbs">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/admin">
                <span className="section-breadcrumbs-a">{t("Clients")}</span>
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              {selectedClient.name}
            </li>
            <li className="breadcrumb-item">
              <Link to="/setup" className="section-breadcrumbs-a">
                {t("Client Setup")}
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link to="/teamview" className="section-breadcrumbs-a">
                Team List
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {t("Edit Team")}
            </li>
          </ol>
        </nav>
      </div>

      <div className="bu-creation-container">
        <div className="bu-create-container m-1">
          <h3 className="section-subheading">{t("Team Information")}</h3>
        </div>
        <div className="mb-4">
          <Grid container spacing={2.5}>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                label={"Team Name*"}
                sx={{ width: "100%" }}
                name={"name"}
                value={formData.name}
                onChange={onChange}
              />
              {validator.message(`Team Name*`, formData.name, "required")}
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                disabled={true}
                label={"Team BU Name*"}
                sx={{ width: "100%" }}
                name={"contact_person_name"}
                value={editteamBU.business_unit.name}
                onChange={onChange}
              />
              {validator.message(
                `Team BU Name*`,
                editteamBU.business_unit.name,
                "required"
              )}
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <PhoneInput
                placeholder="Team Contact Person Number*"
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
                `Team Contact Person Number*`,
                formData.contact_person_number,
                "required"
              )}
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                label={"Enter Email Address*"}
                sx={{ width: "100%" }}
                name={"email"}
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event })}
              />
              {validator.message(`email`, formData.email, "required")}
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
                label={"Address Line 2*"}
                sx={{ width: "100%" }}
                name={"address_line2"}
                value={formData.address_line2}
                onChange={onChange}
              />
              {/* {validator.message(
                                `Address Line 2`,
                                formData.address_line2,
                                "required"
                            )} */}
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
            onClick={() => navigate("/teamview")}
          >
            {t("Cancel")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditTeam;
