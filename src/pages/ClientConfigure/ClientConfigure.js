import React, { useEffect, useState } from "react";
import "./client-configure.scss";
import Loader from "../../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ReactJson from "react-json-view";
import { toast } from "react-toastify";

const ClientConfigure = (props) => {
  // //work on closure and saved changes !
  // window.addEventListener("beforeunload", (ev) => {
  //   ev.preventDefault();
  //   console.log(ev.returnValue);
  //   return (ev.returnValue = "Are you sure you want to close?");
  // });

  const { selectedClient, clientConfiguration } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const config = [];

  !isEmpty(clientConfiguration) &&
    Object.keys(clientConfiguration).forEach((item) => {
      config.push(item);
    });

  const [tabs, setTabs] = useState(config[0]);
  const [currentConfig, setCurrentConfig] = useState(
    clientConfiguration[`${tabs}`] || null
  );
  const [editMode, setEditMode] = useState(false);
  const [isEdited, setIsEdited] = useState(null);

  const onEditConfig = (e) => {
    setIsEdited(e.new_value);
    setCurrentConfig(e.updated_src);
  };

  const jsonOperations = editMode
    ? {
        onEdit: (edit) => onEditConfig(edit),
        onDelete: (e) => onEditConfig(e),
        onAdd: (add) => onEditConfig(add),
        theme: "harmonic",
      }
    : {};

  const handleTabClick = (item) => {
    setTabs(item);
    setCurrentConfig(clientConfiguration[`${item}`]);
    setEditMode(false);
  };

  const onSave = () => {
    const body = {
      id: "1234",
      config: tabs,
      formData: currentConfig,
    };

    dispatch({ type: "UPDATE_CLIENT_CONFIG", payload: body });

    setTimeout(() => {
      dispatch({ type: "GET_CLIENT_CONFIG", payload: "1234" });
      setEditMode(false);
    }, [1000]);
  };

  return (
    <>
      <div className="section-breadcrumbs">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" className="section-breadcrumbs-a">
                Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="/" className="section-breadcrumbs-a">
                Client Creation
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {selectedClient.name}
            </li>
          </ol>
        </nav>
      </div>

      <div className="client-configure-main ">
        <div className="client-configure-main-tabs mt-2">
          {config.map((item) => {
            const activeClass =
              tabs === item ? "primary-button" : "light-button";
            return (
              <span
                key={item}
                className={`btn ${activeClass} m-2`}
                onClick={() => handleTabClick(item)}
              >
                {item}
              </span>
            );
          })}
        </div>
        <div className="client-configure-main-content">
          <div className="client-configure-main-content-header">
            <div className="config-title">{t(`${tabs}`)}</div>
            <div className="config-edit">
              <i
                className="fa fa-pencil"
                onClick={() => {
                  setEditMode(!editMode);
                  !editMode && toast.success("Edit Mode Enabled");
                }}
              ></i>
            </div>
          </div>
          <div className="client-configure-main-content-editor">
            <ReactJson
              src={currentConfig}
              {...jsonOperations}
              className="styletest"
            />
          </div>
          {editMode && (
            <div className="client-configure-main-content-submit-buttons">
              <button className="btn primary-button" onClick={() => onSave()}>
                Save
              </button>
              <button className="btn cancel-button ml-5">Cancel</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ClientConfigure;
