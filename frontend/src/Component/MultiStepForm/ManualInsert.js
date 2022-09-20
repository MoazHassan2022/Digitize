import { useTheme } from "@emotion/react";
import {  FormControl , IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import {GrAddCircle} from "react-icons/gr"


export const ManualInsert = ({ setselection, label }) => {
  const theme = useTheme();
  const [enterdtext , setEnterdtext] = useState("");

    return(
        <FormControl sx={{ m: 1, minWidth: 300 , bgcolor: "#ddd" , borderRadius:2 }} size="small">
          <Stack direction="row" spacing={1} alignItems="center" > 
              <TextField
              multiline
              label={label}
              minRows={3}
              type="text"
              required
              autoFocus
              value={enterdtext}
              onChange={(e) => {setselection(e.target.value);setEnterdtext(e.target.value); }}
              sx={{ bgcolor: "#ddd" , borderRadius:2 , minWidth: 300 }}
              />
          </Stack>
        </FormControl>
    );
}
export default ManualInsert;