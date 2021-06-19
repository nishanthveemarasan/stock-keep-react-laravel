import React, { useState, useEffect } from "react";
import API from "axios/axios";
import { useDate } from "hooks/get-date";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
const ExportExcel = () => {
  const [products, setProducts] = useState({
    items: [],
  });
  useEffect(() => {
    API.get("get-products-without-pagination")
      .then((response) => {
        setProducts(prevState => {
            return{
                ...prevState,
                items: response.data
            }
        })
      .catch((error) => {
        console.log(error.message);
      });
  }
}, []);
  return (
    <div>
      <table id="emp" className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Product Name</th>
            <th>Product Code</th>
            <th>Stock Count</th>
            <th>Created at</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
            {products.items && products.items.map((product , index) => {
                return(
                    <tr key={index}>
                        <td>{product.id}</td>
                        <td>{product.itemname}</td>
                        <td>{product.itemcode}</td>
                        <td>{product.count}</td>
                        <td>{product.created_at && useDate(product.created_at)}</td>
                        <td>{useDate(product.updated_at) }</td>
                    </tr>
                );
            })}
          
        </tbody>
      </table>
      <div>
        <ReactHTMLTableToExcel
          className="btn btn-info"
          table="emp"
          filename="Products"
          sheet="Sheet"
          buttonText="Export excel"
        />
      </div>
    </div>
  )};

  
export default ExportExcel;
