import React, { useState } from 'react'
import { Grid, TextField } from '@mui/material'
import '../CreateBusinessUnit/CreateBusinessUnit.scss'
import { useFormik } from 'formik'
import Select from 'react-select'
import csc from 'country-state-city'
import { useDispatch } from 'react-redux'
// import { CREATE_BUSINESSUNIT } from "../../store/Types";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useNavigate, Link } from 'react-router-dom'
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout'
import { useTranslation } from 'react-i18next'
import SimpleReactValidator from 'simple-react-validator'
import { useSelector } from 'react-redux'
const validator = new SimpleReactValidator()

const CreateTeams = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const selectedClient = useSelector(
    (state) => state.BusinessUnitReducer.selectedClient,
  )

  const [inputFields, setInputFields] = useState([
    {
      name: '',
      entities_name: '',
      contact_person_name: '',
      contact_person_number: '',
      contact_person_country_code: '+91',
      tan: '',
      address_line1: '',
      address_line2: '',
      country: '',
      state: '',
      city: '',
      pincode: '',
    },
  ])

  const dispatch = useDispatch()

  const [, forceUpdate] = useState()

  const [editCountry, SetEditCountry] = useState('')
  const [editState, SetEditState] = useState('')
  const [editCity, SetEditCity] = useState('')

  const countries = csc.getAllCountries()

  const offsetHeight = window.innerHeight - 100

  const addressFromik = useFormik({
    initialValues: {
      country: 'India',
      state: null,
      city: null,
    },
  })

  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.id,
    ...country,
  }))

  const updatedStates = (countryId) =>
    csc
      .getStatesOfCountry(countryId)
      .map((state) => ({ label: state.name, value: state.id, ...state }))

  const updatedCities = (stateId) =>
    csc
      .getCitiesOfState(stateId)
      .map((city) => ({ label: city.name, value: city.id, ...city }))

  const { values, setFieldValue, setValues } = addressFromik

  const onSubmit = () => {
    if (validator.allValid()) {
      const payload = {
        formData: inputFields,
        org_id: selectedClient.id,
      }
      //   dispatch({ type: CREATE_BUSINESSUNIT, payload: payload });
      setTimeout(() => {
        navigate('/setup')
      }, 300)
    } else {
      validator.showMessages()
      forceUpdate(1)
      return false
    }
  }

  const handleFormChange = (index, event) => {
    let data = [...inputFields]
    data[index][event.target.name] = event.target.value
    setInputFields(data)
  }

  const handleInput = (index, value, name) => {
    let data = [...inputFields]
    data[index][name] = value
    setInputFields(data)
  }

  const addFields = () => {
    let newfield = {
      name: '',
      entities_name: '',
      contact_person_name: '',
      contact_person_number: '',
      contact_person_country_code: '+91',
      tan: '',
      address_line1: '',
      address_line2: '',
      country: '',
      state: '',
      city: '',
      pincode: '',
    }
    setInputFields([...inputFields, newfield])
  }

  const deleteForm = (input, e) => {
    e.preventDefault()
    setInputFields((prevState) => prevState.filter((e) => e !== input))
  }

  const returnToSetup = () => {
    navigate('/setup')
  }

  return (
    <>
      <section className="bu-creation" style={{ height: `${offsetHeight}px` }}>
        <h3 className="section-heading">{t('Create BU')}</h3>
        <div className="section-breadcrumbs">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin">
                  <span className="section-breadcrumbs-a">{t('Home')}</span>
                </Link>
              </li>
              <li className="breadcrumb-item">
                <span className="section-breadcrumbs-a" onClick={returnToSetup}>
                  {t('Client Setup')}
                </span>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {t('Create BU')}
              </li>
            </ol>
          </nav>
        </div>
        <div className="bu-create-container m-1">
          <h3 className="section-subheading">{t('BU Information')}</h3>
          <button className="btn primary-button" onClick={addFields}>
            {' '}
            {t('Create new BU')}
          </button>
        </div>
        <div>
          <form>
            {inputFields.map((input, index) => {
              return (
                <div key={index}>
                  <PanelBar>
                    <PanelBarItem
                      expanded={true}
                      title={`Business Unit ${index + 1}*`}
                      className="bu-create-panelbar"
                    >
                      <div className="bu-creation-container">
                        <div className="mb-4">
                          <Grid container spacing={2.5}>
                            <Grid item md={3} sm={6} xs={12}>
                              <TextField
                                label={'BU Name*'}
                                sx={{ width: '100%' }}
                                name={'name'}
                                value={input.name}
                                onChange={(event) =>
                                  handleFormChange(index, event)
                                }
                              />
                              {validator.message(
                                `bu name`,
                                input.name,
                                'required',
                              )}
                            </Grid>
                            <Grid item md={3} sm={6} xs={12}>
                              <TextField
                                label={'BU Entities Name*'}
                                sx={{ width: '100%' }}
                                name={'entities_name'}
                                value={input.entities_name}
                                onChange={(event) =>
                                  handleFormChange(index, event)
                                }
                              />
                              {validator.message(
                                `bu entities name`,
                                input.entities_name,
                                'required',
                              )}
                            </Grid>
                            <Grid item md={3} sm={6} xs={12}>
                              <TextField
                                label={'BU Contact Person Name*'}
                                sx={{ width: '100%' }}
                                name={'contact_person_name'}
                                value={input.contact_person_name}
                                onChange={(event) =>
                                  handleFormChange(index, event)
                                }
                              />
                              {validator.message(
                                `bu contact person name`,
                                input.contact_person_name,
                                'required',
                              )}
                            </Grid>
                            <Grid item md={3} sm={6} xs={12}>
                              <PhoneInput
                                placeholder="BU Contact Person Number*"
                                value={input.contact_person_number}
                                withCountryCallingCode={true}
                                onChange={(val) =>
                                  handleInput(
                                    index,
                                    val,
                                    'contact_person_number',
                                  )
                                }
                                international
                                defaultCountry="IN"
                                className="phone-input"
                              />
                              {validator.message(
                                `bu contact person number`,
                                input.contact_person_number,
                                'required',
                              )}
                            </Grid>
                            <Grid item md={3} sm={6} xs={12}>
                              <TextField
                                label={'Tan Number*'}
                                sx={{ width: '100%' }}
                                name={'tan'}
                                value={input.tan}
                                onChange={(event) =>
                                  handleFormChange(index, event)
                                }
                              />
                              {validator.message(
                                `tan number*`,
                                input.tan,
                                'required',
                              )}
                            </Grid>
                            <Grid item md={3} sm={6} xs={12}>
                              <TextField
                                label={'Address Line 1*'}
                                sx={{ width: '100%' }}
                                name={'address_line1'}
                                value={input.address_line1}
                                onChange={(event) =>
                                  handleFormChange(index, event)
                                }
                              />
                              {validator.message(
                                `address line 1`,
                                input.address_line1,
                                'required',
                              )}
                            </Grid>
                            <Grid item md={3} sm={6} xs={12}>
                              <TextField
                                label={'Address Line 2*'}
                                sx={{ width: '100%' }}
                                name={'address_line2*'}
                                value={input.address_line2}
                                onChange={(event) =>
                                  handleFormChange(index, event)
                                }
                              />
                              {validator.message(
                                `address line 2`,
                                input.address_line2,
                                'required',
                              )}
                            </Grid>

                            <Grid item md={3} sm={6} xs={12}>
                              {' '}
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
                                  SetEditCountry()
                                  handleInput(index, value.name, 'country')

                                  setValues(
                                    {
                                      country: value,
                                      state: null,
                                      city: null,
                                    },
                                    false,
                                  )
                                }}
                              />{' '}
                              {validator.message(
                                'country',
                                input.country,
                                'required',
                              )}
                            </Grid>

                            <Grid item md={3} sm={6} xs={12}>
                              {' '}
                              <Select
                                classNamePrefix="mySelect"
                                className="bu-creation-select"
                                id="state"
                                name="state"
                                placeholder="State*"
                                options={updatedStates(
                                  values.country ? values.country.value : null,
                                )}
                                value={editState}
                                onChange={(value) => {
                                  SetEditState()

                                  handleInput(index, value.name, 'state')
                                  setValues({ state: value, city: null }, false)
                                }}
                              />{' '}
                              {validator.message(
                                `state`,
                                input.state,
                                'required',
                              )}
                            </Grid>

                            <Grid item md={3} sm={6} xs={12}>
                              <Select
                                classNamePrefix="mySelect"
                                className="bu-creation-select"
                                id="city"
                                name="city"
                                placeholder="City*"
                                options={updatedCities(
                                  values.state ? values.state.value : null,
                                )}
                                value={editCity}
                                onChange={(value) => {
                                  SetEditCity()

                                  handleInput(index, value.name, 'city')
                                  setFieldValue('city', value)
                                }}
                              />
                              {validator.message(
                                `city`,
                                input.city,
                                'required',
                              )}
                            </Grid>
                            <Grid item md={3} sm={6} xs={12}>
                              <TextField
                                label={'PIN Code*'}
                                sx={{ width: '100%' }}
                                name={'pincode'}
                                value={input.pincode}
                                onChange={(event) =>
                                  handleFormChange(index, event)
                                }
                              />
                              {validator.message(
                                `pincode`,
                                input.pincode,
                                'required',
                              )}
                            </Grid>
                          </Grid>
                        </div>
                        {index !== 0 && (
                          <div>
                            <button
                              className="bu-create-delete"
                              onClick={(e) => deleteForm(input, e)}
                            >
                              <i className="fa fa-trash" aria-hidden="true"></i>
                            </button>
                          </div>
                        )}
                      </div>
                    </PanelBarItem>
                  </PanelBar>
                </div>
              )
            })}
          </form>
        </div>

        <div className="bu-creation-submit-container mt-4 text-end">
          <button className="btn primary-button" onClick={onSubmit}>
            {t('Create')}
          </button>
          <button
            className="btn cancel-button ml-20"
            onClick={() => navigate('/setup')}
          >
            {t('Cancel')}
          </button>
        </div>
      </section>
    </>
  )
}

export default CreateTeams
