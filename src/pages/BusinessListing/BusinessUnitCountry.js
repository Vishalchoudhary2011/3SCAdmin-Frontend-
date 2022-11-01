import React from 'react'
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import products from './Product.json';
// import { CSVLink } from "react-csv";
// import Loader from "../../../../components/Loader";
// import { isEmpty } from "lodash";
// import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button } from '@progress/kendo-react-buttons';
import './BU.scss'

const DetailComponent = (props) => {
  const dataItem = props.dataItem;
  return (
    <section>
       <table id="customers">
        <tr className="rowcustom">

          <td
          width="250"> {dataItem.UnitsInStock}</td>

          <td
            style={{ backgroundColor: "#03045e", color: "white" }}
            width="250"
          >
            {dataItem.UnitsOnOrder}
          </td>

          <td
            style={{ backgroundColor: "#03045e", color: "white" }}
            width="150"
          >
            {" "}
            {dataItem.ReorderLevel}
          </td>
          <td
            style={{ backgroundColor: "#03045e", color: "white" }}
            width="150"
          >
            {" "}
            {dataItem.Discontinued}
          </td>

          <td  style={{ backgroundColor: "#03045e", color: "white" }}  width="350">
          <Button style={{ float: "right", marginRight: "11px" }}>
              <span class="k-icon k-i-edit"></span>
            </Button>
          <Button
              style={{ float: "right", width: "80", marginRight: "11px" }}
            >
              Configure
            </Button>

            <Button style={{ float: "right", marginRight: "11px" }}>
              View
            </Button>
            </td>

        </tr>
        <tr className="rowcustom">
          <td
          width="250"></td>

          <td
            style={{ backgroundColor: "#03045e", color: "white" }}
            width="250"
          >
            {dataItem.Bu}
          </td>

          <td
            style={{ backgroundColor: "#03045e", color: "white" }}
            width="150"
          >
            {" "}
            {dataItem.Team}
          </td>
          <td
            style={{ backgroundColor: "#03045e", color: "white" }}
            width="150"
          >
            {" "}
            {dataItem.User}
          </td>

          <td  style={{ backgroundColor: "#03045e", color: "white" }}  width="350">
          <Button style={{ float: "right", marginRight: "11px" }}>
              <span class="k-icon k-i-edit"></span>
            </Button>
          <Button
              style={{ float: "right", width: "80", marginRight: "11px" }}
            >
              Configure
            </Button>

            <Button style={{ float: "right", marginRight: "11px" }}>
              View
            </Button>
            </td>

        </tr>



      </table>



    </section>
  );
};

const initialDataState = {
  sort: [
    {
      field: "code",
      dir: "asc",
    },
  ],
  take: 10,
  skip: 0,
};

export default function BusinessUnitCountry() {
    const [data, setData] = React.useState(products);
  const [dataState, setDataState] = React.useState(initialDataState);

  const expandChange = (event) => {
    let newData = data.map((item) => {
      if (item.ProductID === event.dataItem.ProductID) {
        item.expanded = !event.dataItem.expanded;
      }

      return item;
    });
    setData(newData);
  };
  return (
    <div>
      <section className="client-listing">
        <h3 className="section-heading">SetUp</h3>
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
            </ol>
          </nav>
        </div>

        <div className="client-listing-content">
          <div className="client-listing-toolbar" style={{marginLeft:'50%'}}>
            <div className="client-listing-toolbar-right">
                <div className="client-listing-toolbar-right-csv-download">
                    <button className="btn secondary-button">
                        {" "}
                        CSV Upload{" "}
                        <i className="fa fa-upload" aria-hidden="true"></i>
                    </button>
                </div>
                <div className="client-listing-toolbar-right-csv-download" style={{marginLeft:'10px'}}>
                    <button className="btn secondary-button">
                        {" "}
                        CSV Download{" "}
                        <i className="fa fa-download" aria-hidden="true"></i>
                    </button>
                </div>
                <div className="client-listing-toolbar-right-add-client">
                    <Link to="/admin/client-creation">
                    <button className="btn primary-button ml-20">
                        {" "}
                        Create BU{" "}
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>
                    </button>
                    </Link>
                </div>
            </div>
          </div>
          <div className="client-listing-grid">
            {" "}
            <Grid className='tablegrid'
              pageable={true}
              sortable={true}
              filterable={true}
              data={process(data, dataState)}
              {...dataState}
              onDataStateChange={(e) => {
                setDataState(e.dataState);
              }}
              detail={DetailComponent}
              style={{
                height: "600px",
              }}
              expandField="expanded"
              onExpandChange={expandChange}
              navigatable={true}
            >
              <Column field="CountryName" title="Country"  filterable={false} width="260px"/>
              <Column field="BuName" title="BU"  width="250px"/>
              <Column field="TeamName" title="Team" filter="numeric" width="150px"/>
              <Column
                field="UserName"
                title="User"
                filter="numeric" width="150px"
              />
              <Column field="QuantityPerUnit" title="Action" filter="numeric" width="350px"/>
            </Grid>
          </div>
        </div>
      </section>
    </div>
  )
}
