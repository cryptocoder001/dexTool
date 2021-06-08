import React, {useState} from 'react';
import { makeStyles,useTheme } from "@material-ui/core/styles";
import {Grid} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from '@material-ui/core/TableHead';
import TableFooter from "@material-ui/core/TableFooter";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from "@material-ui/core/TableRow";
import Paper from '@material-ui/core/Paper';
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

  const useStyles2 = makeStyles({
    table: {
      minWidth: 500
    }
  });

  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div style = {{flexShrink: "0", marginLeft: "20px"}}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
  };

  function createData(token, time, auctions, price, value, tokenAmount, ethAmount, variation, remaining) {
    return { token, time, auctions, price, value, tokenAmount, ethAmount, variation, remaining };
  }
  
  const initialRow = [
    createData('India', 'IN', 1324171354, 3287263,234,2342,234234,234234,234234),
    createData('kei', 'IN', 1324171354, 3287263,234,2342,234234,234234,234234),
    createData('kweei', 'IN', 1324171354, 3287263,234,2342,234234,234234,234234),
    createData('ksdfei', 'IN', 1324171354, 3287263,234,2342,234234,234234,234234),
    createData('keia', 'IN', 1324171354, 3287263,234,2342,234234,234234,234234),
    createData('kcwei', 'IN', 1324171354, 3287263,234,2342,234234,234234,234234),
    createData('ktei', 'IN', 1324171354, 3287263,234,2342,234234,234234,234234),
    createData('kegji', 'IN', 1324171354, 3287263,234,2342,234234,234234,234234),
    createData('kehjti', 'IN', 1324171354, 3287263,234,2342,234234,234234,234234),
    createData('kefghi', 'IN', 1324171354, 3287263,234,2342,234234,234234,234234),
    createData('kertyi', 'IN', 1324171354, 3287263,234,2342,234234,234234,234234),
    
  ];

function PoolExplorer(){
  const classes = useStyles2();
  const [totalRow, setTotalRow] = useState(initialRow);
  const [rows, setRows] = useState(initialRow);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
  rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

    return(
        <div>
            <div className = "x-pool-table">
                <div className = "x-font1">
                    POOLS ACTIVITY
                </div>
                <div>
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHead style = {{backgroundColor: "#290664"}}>
                        <TableRow>
                            <TableCell>TOKEN</TableCell>
                            <TableCell align="right">TIME</TableCell>
                            <TableCell align="right">AUCTIONS</TableCell>
                            <TableCell align="right">TOKEN PRICE USD (ETH)</TableCell>
                            <TableCell align="right">TOTAL VALUE</TableCell>
                            <TableCell align="right">TOKEN AMOUNT</TableCell>
                            <TableCell align="right">ETH AMOUNT</TableCell>
                            <TableCell align="right">POOL VARIATION</TableCell>
                            <TableCell align="right">POOL REMAINING</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row, idx) => (
                        <TableRow key={idx}>
                            <TableCell component="th" scope="row">
                                {row.token}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.time}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.auctions}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.price}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.value}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.tokenAmount}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.ethAmount}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.variation}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.remaining}
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={9} />
                        </TableRow>
                    )}
                    </TableBody>
                    <TableFooter>
                    <TableRow>
                        <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                        colSpan={9}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: { "aria-label": "rows per page" },
                            native: true
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                    </TableFooter>
                </Table>
                </TableContainer>
                </div>
            </div>
        </div>
    )
}

export default PoolExplorer;