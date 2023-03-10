import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableFooter,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "80%",
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 10px",
    maxWidth: "80%",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    color: "black",
  },

  name: {
    fontWeight: "bold",
  },
}));

function AllProducts() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/product").then((response) => {
      setProducts(response.data);
    });
  }, []);

  console.log(products);

  return (
    <TableContainer
      component={Paper}
      className="card__body"
      style={{
        width: "80%",
      }}
    >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow className="tableRow">
            <TableCell className={classes.tableHeaderCell}>Image</TableCell>
            <TableCell className={classes.tableHeaderCell}>Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>
              Description
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ?.map((item) => (
              <TableRow key={item._id} className="tableBody">
                <TableCell>
                  <img src={item.images[0]} alt="img" style={{
                    width: "30%",
                    height: "30%"
                  }}/>
                </TableCell>
                <TableCell> {item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.price.amount + `(${item.price.currency})`}</TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={products?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default AllProducts;
