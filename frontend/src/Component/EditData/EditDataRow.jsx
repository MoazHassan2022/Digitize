import { IconButton, TableCell, TableRow, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import {RiDeleteBin2Line} from "react-icons/ri";
import {AiFillSave} from "react-icons/ai"; 

import AlertDialog from "./AlertDialog";
import { baseapi } from "../../Utilities/utilitesFunction";
import {BsImageFill} from "react-icons/bs";
import theme from "../../Utilities/Theme";




function EditRow({roww , snackbarShowMessage}) {
    const [cookies] = useCookies(['user']);
    const [ row, setRow ] = useState(roww);
    const DataLables=["date" , "projectCode" , "siteName" , "cabinetSerial" , "activityID" , "activityGroup" , "activityType" , "measurmentUnit" , "dayProgress",
                        "deliveryWay" , "deliveryTeam" , "siteEngineer" , "siteSupervisorMain" , "siteSupervisorAssistant" , "photo" , "sender"];
  
    const [open, setOpen] = useState(false);
    const [DialogTitle , setDialogTitle] = useState("");
    const [DialogText , setDialogText] = useState("");
    const [DeleteOredit , setDeleteOredit] = useState();


      

    const handleOpenDialogDelete = () => {
        setOpen(true);
        setDialogTitle("هل انت متاكد من الغائك لهذا الصف؟")
        setDialogText("!!بالغائك هذا الصف لن تتمكن من استرجاع المعلومة مرة أخري فكن حذراً")
        setDeleteOredit(true)
      };


    const handleOpenDialogSave = () => {
        setOpen(true);
        setDialogTitle("هل انت متاكد من تعديلك لهذا الصف؟")
        setDialogText("!!بتعديلك هذا الصف لن تتمكن من استرجاع المعلومة مرة أخري فكن حذراً")
        setDeleteOredit(false)
      };

    const HanldeDialogRes = (res) => {
        setOpen(false);
        if(!res) return;
        if(!DeleteOredit) SaveRow(res); else DeleteRow(res);
    }

    const DeleteRow = async () => {
        const auth = "Bearer " + cookies.token;
          await axios.delete(baseapi +`/rows/${roww["_id"]}`, {headers:{
            authorization: auth, 
          }}).then(res => { 
            snackbarShowMessage([true, "تم الغاء الصف بنجاح" , "success"])
            setTimeout(window.location.reload() , 5000 );
            } ).catch(err => snackbarShowMessage([true, err.response.data.message , "error"])  );
        }
    

    const SaveRow = async () => {
    const auth = "Bearer " + cookies.token;
      await axios.patch(baseapi +`/rows/${roww["_id"]}`, row , {headers:{
        authorization: auth, 
      }}).then(res => { 
        snackbarShowMessage([true, "تم حفظ التعديلات بنجاح" , "success"])
        } ).catch(err => snackbarShowMessage([true, err.response.data.message , "error"])  );
    }


    const chabgeCell = (e,cellLabel) =>{
        setRow( (prev) => {
            let p = prev;
            prev[cellLabel] = e.target.value;
            return p;});
    }
  
    const returnCell = (cell) =>{

          return (cell=="photo") ? 
          <IconButton sx={{color:theme.palette.primary.main}} onClick={() => window.open(roww[cell], '_blank') } > <BsImageFill /> </IconButton>:
          <TextField  disabled={cell=="sender"} defaultValue={roww[cell]} onChange={(e) => chabgeCell(e,cell )} variant="standard" />;

    }

  
    return (
      <>
        <AlertDialog Title={DialogTitle} Text={DialogText} open={open} handleClose={HanldeDialogRes} setOpen={setOpen}  />
        <TableRow key={1} >
        {DataLables.map((cell, index) => {
          console.log(cell)

          return <TableCell key={index} align="center">
                {
                  returnCell(cell)
                }
            </TableCell>
            }
        )
        }
        <TableCell align="center">
            <IconButton
              aria-label="expand row"
              size="medium"
              color="primary"
              onClick={handleOpenDialogSave}
              align="center"
            >
              <AiFillSave />
            </IconButton>
        </TableCell>


        <TableCell align="center">
        <IconButton
              size="medium"
              color="primary"
              onClick={handleOpenDialogDelete}
              align="center"
            >
              <RiDeleteBin2Line />
            </IconButton>
        </TableCell>

        </TableRow>
  
      </>
    );
  }



  export default EditRow;