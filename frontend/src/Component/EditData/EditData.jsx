import { Alert, Box, Grid, IconButton, Paper, Skeleton, Snackbar, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { baseapi } from "../../Utilities/utilitesFunction";
import { useEffect } from "react";
import {HiArrowLeft, HiArrowRight} from "react-icons/hi"
import {MdFirstPage , MdLastPage} from "react-icons/md"
import EditRow from "./EditDataRow";


export const EditData = ({backtoDownload , selectedProject}) => {
  const theme = useTheme();
  const [heads , setHeads] = useState([]);
  const [cookies] = useCookies(['user']);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snakeData, setSnakeData] = useState([false,"",""]);
  const [page, setPage] = useState(0);
  const [rows, setrows] = useState([]);


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

const handleChangePage = (event, newPage) => {setPage(newPage);};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

  const FetchingLabels = () =>{
    const auth = "Bearer " + cookies.token;
     axios.get(baseapi +"/labels" ,
      {headers:{
        authorization: auth,
      }}
      ).then(response =>{
        setHeads([...response.data.data.labels , "Save", "Delete"])

      }).catch((err) => {
        setSnakeData([true, err.response.data.message , "error"]);
      });
  }
  const FetchingData = () =>{
    const auth = "Bearer " + cookies.token;
    const reqcomplete = selectedProject === "all" ? "/rows" :`/rows?projectCode=${selectedProject}`;
    axios.get(baseapi +reqcomplete ,
     {headers:{
       authorization: auth,
     }}
     ).then(response =>{
      setrows([...response.data.data.data])
     }).catch((err) => {
       setSnakeData([true, err.response.data.message , "error"]);
     });
  }

  useEffect(() => { FetchingLabels(); FetchingData(); }, []);

  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <MdLastPage /> : <MdFirstPage />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <HiArrowRight /> : <HiArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <HiArrowLeft /> : <HiArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <MdFirstPage /> : <MdLastPage />}
        </IconButton>
      </Box>
    );
  }

    return (
        <Grid
        container 
        alignItems="center"
        justifyContent="center"
        sx={{  marginTop:"10px", paddingX:"10px" }}
        > 
          <TableContainer component={Paper} >
            <Table  aria-label="custom pagination table">
            <TableHead sx={{ bgcolor: theme.palette.primary.main , color: theme.palette.secondary.main  }} >
                <TableRow>
                  {heads.map((head, index) => {
                      return (
                        <TableCell style={{ minWidth: "150px" , lineHeight:".8rem" }} align='center' key={index} sx={{color: "white" , fontWeight: 700}} >{head}</TableCell>
                    );
                    })}
                </TableRow>
            </TableHead>
              <TableBody>
                {
                  console.log(page * rowsPerPage , page * rowsPerPage + rowsPerPage , rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
                }
                {
                (rowsPerPage > 0
                  ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : rows
                ).map((_row,index) => {
                    return( <EditRow roww={_row} snackbarShowMessage={setSnakeData} key={index + page * rowsPerPage + Math.random() * 4826787}/>)
                  }
                ) 
              }
                {emptyRows > 0 && (
                  <TableRow style={{ height: 20 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter width={500}>
                <TableRow width={500}>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <Snackbar sx={{ width:400, }} open={snakeData[0]} autoHideDuration={3000} onClose={() =>  setSnakeData([false , "" , ""]) }>
              <Alert onClose={() => setSnakeData([false , "" , ""])} severity={snakeData[2] === "success" ? "success" : (snakeData[2] === "error" ?"error" :"info")} >
                  {snakeData[1]}
              </Alert >
          </Snackbar>
        </Grid>
    
        )
}

export default EditData;