import React, { useEffect, useState } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import { Switch } from "@progress/kendo-react-inputs";
import Moment from "moment";
import "./tablegrid.scss";
import { isEmpty } from "lodash";
import ActivateModal from "./../../../components/ActivateModal/ActivateModal";
import { EDIT_CLIENT } from "../../../store/Types";
import { useDispatch } from "react-redux";

const TableGrid = (props) => {
  const dispatch = useDispatch();
  const { setEditItem, rowLength, clientDetails, editItem, searchField } =
    props;

  const initialDataState = {
    sort: [
      {
        field: "name",
        dir: "asc",
      },
    ],
    take: rowLength,
    skip: 0,
  };

  const [dataState, setDataState] = useState(initialDataState);
  const [resultClient, setResultClient] = useState(null);
  const [isActive, SetIsActive] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setDataState({ ...dataState, take: rowLength });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowLength]);

  const handleActiveToggle = (active, e) => {
    SetIsActive(active);
    setVisible(true);
  };

  useEffect(() => {
    if (searchField) {
      setDataState({ ...dataState, skip: 0 });
      const filteredClientDetails = clientDetails.filter((client) => {
        return (
          client.client_id.toLowerCase().includes(searchField.toLowerCase()) ||
          client.name.toLowerCase().includes(searchField.toLowerCase())
        );
      });

      setResultClient(filteredClientDetails);
    } else {
      setResultClient(clientDetails);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchField, clientDetails]);

  const handleClick = () => {
    if (isActive.is_active) {
      const deactivatedClient = { ...isActive, is_active: false };
      dispatch({ type: EDIT_CLIENT, payload: deactivatedClient });
      setVisible(!visible);
    } else {
      const activatedClient = { ...isActive, is_active: true };

      dispatch({ type: EDIT_CLIENT, payload: activatedClient });
      setVisible(!visible);
    }
  };

  return (
    <div className="tablegrid">
      <ActivateModal
        active={isActive}
        open={visible}
        setOpen={setVisible}
        handleClick={handleClick}
      />
      {!isEmpty(resultClient) ? (
        <Grid
          pageable={true}
          sortable={true}
          data={process(resultClient, dataState)}
          {...dataState}
          onDataStateChange={(e) => {
            setDataState(e.dataState);
          }}
        >
          <Column
            headerClassName="tablegrid-heading"
            width={"50px"}
            cell={(props) => {
              const client = props.dataItem;
              return (
                <td>
                  <input
                    type="checkbox"
                    value={editItem}
                    checked={editItem.includes(client)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setEditItem([...editItem, client]);
                      } else {
                        setEditItem(
                          editItem.filter((item) => item.id !== client.id)
                        );
                      }
                    }}
                  />
                </td>
              );
            }}
          />
          <Column
            field="client_id"
            title="Client ID"
            headerClassName="tablegrid-heading"
          />
          <Column
            field="name"
            title="Client Name"
            headerClassName="tablegrid-heading"
          />
          <Column
            field="created_on"
            title="Created On"
            headerClassName="tablegrid-heading"
            cell={(props) => {
              return (
                <td>
                  <span>
                    {Moment(props.dataItem.created_on).format("DD MMM YYYY")}
                  </span>
                </td>
              );
            }}
          />
          <Column
            field="modified_on"
            title="Modified On"
            headerClassName="tablegrid-heading"
            cell={(props) => {
              return (
                <td>
                  <span>
                    {Moment(props.dataItem.modified_on).format("DD MMM YYYY")}
                  </span>
                </td>
              );
            }}
          />
          <Column
            field="status"
            title="Status"
            headerClassName="tablegrid-heading"
            cell={(props) => {
              return (
                <td className="tablegrid-status">
                  <span
                    className={
                      props.dataItem.is_active
                        ? "tablegrid-status-active"
                        : "tablegrid-status-inactive"
                    }
                  >
                    {props.dataItem.is_active ? "Active" : "In Active"}
                  </span>
                </td>
              );
            }}
          />
          <Column
            field="is_active"
            title="Activate/Deactivate"
            headerClassName="tablegrid-heading"
            cell={(props) => {
              return (
                <td className="tablegrid-switch">
                  <span>
                    <Switch
                      onLabel={""}
                      offLabel={""}
                      checked={props.dataItem.is_active}
                      onChange={(e) => handleActiveToggle(props.dataItem, e)}
                    />
                  </span>
                </td>
              );
            }}
          />
        </Grid>
      ) : (
        <>No records found</>
      )}
    </div>
  );
};

export default TableGrid;
