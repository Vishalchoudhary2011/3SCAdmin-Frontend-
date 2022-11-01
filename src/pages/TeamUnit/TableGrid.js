import React, { useEffect, useState } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import { Switch } from "@progress/kendo-react-inputs";
import "./tablegrid.scss";
import { isEmpty } from "lodash";
import { Button } from "@progress/kendo-react-buttons";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ActivateModal from "../../components/ActivateModal/ActivateModal";
import { EDIT_TEAM_UNIT } from "../../store/Types";

const TableGrid = (props) => {
  const { setEditItem, rowLength, teamDetail, editItem, searchField } = props;
  const selectedNameBU = useSelector(
    (state) => state.TeamUnitReducer.selectedBU
  );
  const nameBU = selectedNameBU.name;

  // const data = teamDetail.map((o) => ({ ...o }))
  const data = teamDetail;
  // data.push(...teamDetail)

  // for (let i = 0; i < data.length; i++) {
  //   Object.assign(data[i], { bu_name: nameBU })
  // }
  // console.log('selectedNameBU', data)

  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      const filtereddata =
        data &&
        data.filter((team) => {
          return team.name.toLowerCase().includes(searchField.toLowerCase());
        });

      setResultClient(filtereddata);
    } else {
      setResultClient(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchField, data]);

  const onEditClick = (team) => {
    dispatch({
      type: "teams/selectedBUSlice",
      payload: team,
    });

    setTimeout(() => {
      navigate("/teamview/editteam");
    }, 1000);
  };

  const handleClick = () => {
    const editedTeam = {
      ...isActive,
      business_unit: isActive.business_unit.id,
    };

    if (isActive.is_active) {
      const deactivatedTeam = { ...editedTeam, is_active: false };

      dispatch({ type: EDIT_TEAM_UNIT, payload: deactivatedTeam });
      setVisible(!visible);
    } else {
      const activatedTeam = { ...editedTeam, is_active: true };

      dispatch({ type: EDIT_TEAM_UNIT, payload: activatedTeam });
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
          {/* <Column
            headerClassName="tablegrid-heading"
            width={'50px'}
            cell={(props) => {
              const team = props.dataItem
              return (
                <td>
                  <input
                    type="checkbox"
                    value={editItem}
                    checked={editItem.includes(team)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setEditItem([...editItem, team])
                      } else {
                        setEditItem(
                          editItem.filter((item) => item.id !== team.id),
                        )
                      }
                    }}
                  />
                </td>
              )
            }}
          /> */}
          <Column
            field="name"
            title="Team Name"
            headerClassName="tablegrid-heading"
          />
          <Column
            field="email"
            title="Team Email Id"
            headerClassName="tablegrid-heading"
            // headerClassName="tablegrid-heading"
            // cell={(props) => {
            //   return (
            //     <td>
            //       <span>
            //         {Moment(props.dataItem.created_on).format('DD MMM YYYY')}
            //       </span>
            //     </td>
            //   )
            // }}
          />
          <Column
            field="user_count"
            title="Number Of Users"
            headerClassName="tablegrid-heading"
          />
          {/* <Column
            field="modified_on"
            title="BU"
            headerClassName="tablegrid-heading"
            cell={(props) => {
              return (
                <td>
                  <span>
                    {Moment(props.dataItem.modified_on).format('DD MMM YYYY')}
                  </span>
                </td>
              )
            }}
          /> */}

          <Column
            field="business_unit.name"
            title="BU"
            headerClassName="tablegrid-heading"
          />
          <Column
            field=""
            title="View"
            headerClassName="tablegrid-heading"
            cell={(props) => {
              return (
                <td className="tablegrid-switch">
                  <span>
                    <Button
                      className="btnteam"
                      style={{ background: "primary" }}
                      // onClick={() => onViewClick(obj)}
                    >
                      View
                    </Button>
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
          <Column
            title="Edit"
            headerClassName="tablegrid-heading"
            cell={(props) => {
              const team = props.dataItem;
              return (
                <td className="tablegrid-switch">
                  <span>
                    <Button
                      style={{ background: "primary" }}
                      onClick={() => onEditClick(team)}
                    >
                      <EditIcon className="editteam" />
                    </Button>
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
