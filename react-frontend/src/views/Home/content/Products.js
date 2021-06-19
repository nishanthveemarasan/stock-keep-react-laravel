import ProductHomeTable from "components/Table/Home/ProductTable";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductData } from "store/product-slice";
import MainNavigation from "../MainNavigation";
import Pagination from "components/Table/Pagination";
import FormInput from "components/UI/FormInput";
import FormSelect from "components/UI/FormSelect";
import { productStoreAction } from "store";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import API from "axios/axios";
import ExportExcel from "../ExportExcel";
const Products = () => {
  const [rowNumber, setRowNumber] = useState("10");
  const [searchParam, setSearchParam] = useState("");
  const mapStateToProps = (state) => {
    return {
      tableData: state.productStore.chairs,
      isDataChanged: state.productStore.isDataChanged,
      rowNumber: state.productStore.rowNumber,
      isLoading: state.productStore.isLoading,
    };
  };
  const state = useSelector(mapStateToProps);
  useEffect(() => {
    dispatch(getProductData(state.rowNumber));
  }, [state.rowNumber, dispatch]);

  const dispatch = useDispatch();

  const onRowNumberChange = (event) => {
    setRowNumber(event.target.value);
    const rowNumber = event.target.value;
    dispatch(
      productStoreAction.changeRowNumber({
        rowNumber,
      })
    );
  };
  const onSearchParamsChange = (event) => {
    setSearchParam(event.target.value);
    const searchParam = event.target.value;
  };

  const onPrintPageController = () => {
    window.print();
  };
  const onExportExcelHandler = () => {
    API.get("export-product-excel")
      .then((response) => {
        console.log(response.data);
      })
      .catch();
  };
  return (
    <React.Fragment>
      <MainNavigation />
      <div className="container">
        <div className="mt-5 mb-3">
          <h4 className="badge table-warning">.</h4>
          <span className="font-italic font-bold text-muted">
            {" "}
            these highlighted items have less than 25 in the stocks at this
            moment
          </span>
          <br />
          <h4 className="badge table-danger">.</h4>
          <span className="font-italic font-bold text-muted">
            {" "}
            these highlighted items are not available in the stocks at this
            moment
          </span>
          <div className="m-3">
            <ExportExcel />
          </div>
        </div>

        <div className="d-flex justify-content-md-between">
          <FormSelect
            id="rowType"
            label="Rows"
            value={rowNumber}
            change={onRowNumberChange}
            options={["10", "20", "50", "100"]}
            readOnly=""
          />
          {state.isLoading && (
            <div className="align-self-md-center">Loading....</div>
          )}
          <FormInput
            id="searchTable"
            type="text"
            labelName="Search"
            readOnly=""
            change={onSearchParamsChange}
            value={searchParam}
          />
        </div>
        <ProductHomeTable tableData={state.tableData} />
        <Pagination paginationData={state.tableData} />
      </div>
    </React.Fragment>
  );
};
export default Products;
