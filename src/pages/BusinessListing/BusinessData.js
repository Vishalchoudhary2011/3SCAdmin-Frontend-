import React, { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { PanelBar, PanelBarUtils } from "@progress/kendo-react-layout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const BusinessData = (businessData) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let items = [];
  let filterArray = [];
  let item = [];
  const [newCountry, setNewCountry] = useState();
  const [toggle, setToggle] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState("");

  const getData = () => {
    if (businessData.businessData != undefined) {
      const newArr = [];
      const objApi = [];
      businessData.businessData.filter((element) => {
        const isDuplicate = newArr.includes(element.country);
        if (!isDuplicate) {
          newArr.push(element.country);
          return true;
        } else {
          return false;
        }
      });
      var len = newArr.length;
      for (var i = 0; i < len; i++) {
        var innerArr = [];
        businessData.businessData.forEach((element) => {
          if (newArr[i] == element.country) {
            innerArr.push(element);
          }
        });
        objApi[newArr[i]] = innerArr;
      }
      var keys = Object.keys(objApi);
      const childManage = () => {
        return child;
      };

      const newCty = [];
      const childCall = (items) => {
        if (!newCty.includes(items)) {
          newCty.push(items);
        }
        setNewCountry(items);
      };

      const onViewClick = (obj) => {

        dispatch({
          type: "teams/selectedBUSlice",
          payload: obj,
        });

        setTimeout(() => {
          navigate("/teamview");
        }, 1000);
      };

      const onEditClick = (obj) => {
        navigate("/admin/edit-bu", { state: obj });
      };

      var team = {};
      var userData = {};
      var child = [];
      for (var i = 0; i < keys.length; i++) {
        keys.map((key) => {
          var count = 0;
          var userCount = 0;
          objApi[key].map((obj) => {
            if (key == keys[i]) {
              count = count + obj["teams_count"];
              team[key] = count;
              userCount = userCount + obj["users_count"];
              userData[key] = userCount;
              var countryChildData = [];
              child.push(
                (countryChildData[key] = (
                  <>
                    {newCountry == obj["country"] ? (
                      <div className="custom-template">
                        <tr className="panelevel1">
                          <td></td>
                          <td>{obj["entities_name"]}</td>
                          <td>{obj["teams_count"]}</td>
                          <td>{obj["users_count"]}</td>
                          <td>
                            {" "}
                            <Button
                              newContry={obj["country"]}
                              style={{ float: "right", marginRight: "11px" }}
                              onClick={() => onEditClick(obj)}
                            >
                              <i className="fa fa-pencil mr-5"></i>
                            </Button>
                            <Button
                              style={{
                                float: "right",
                                width: "80",
                                marginRight: "11px",
                              }}
                            >
                              Configure
                            </Button>
                            <Button
                              style={{ float: "right", marginRight: "11px" }}
                              onClick={() => onViewClick(obj)}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                ))
              );
            }
          });
        });
      }
      keys.map((items, index) => {
        let obj = {};
        obj.title = (
          <tr
            onClick={() => {
              childCall(items, index);
              setSelectedIndex(index);
              setToggle(true);
              if (selectedIndex === index && toggle === true) {
                setToggle(false);
              }
            }}
            className="panellevel new"
            id={"handle" + `${index}`}
          >
            <td>
              {" "}
              {selectedIndex === index ? (
                toggle ? (
                  <span>
                    <i className="fa fa-minus" />
                  </span>
                ) : (
                  <span>
                    <i className="fa fa-plus" />
                  </span>
                )
              ) : (
                <span>
                  <i className="fa fa-plus" />
                </span>
              )}
              {items}
            </td>
            <td>{objApi[items].length}</td>
            <td>{Object.values(team)[index]}</td>
            <td>{Object.values(userData)[index]}</td>
            <td></td>
          </tr>
        );
        obj.content = childManage();
        filterArray.push(obj);
      });
      items = [
        {
          title: (
            <tr className="paneluser">
              <th>Country</th>
              <th>BU</th>
              <th>Team</th>
              <th>User</th>
              <th>Action</th>
            </tr>
          ),
        },
        filterArray.map((items) => ({
          title: items.title,
          content: items.content ? items.content : "",
        })),
      ];
      item.push(...items.flat());
    }
  };
  item = items.flat();
  getData();
  const components = PanelBarUtils.mapItemsToComponents(item);

  return (
    <div className="client-listing-grid">
      {" "}
      <div>
        <table className="panelcountry">
          <PanelBar
            children={components}
            className="panedata"
            expandMode="single"
          ></PanelBar>
        </table>
      </div>
    </div>
  );
};

export default BusinessData;
