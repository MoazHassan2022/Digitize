import {  FormControl ,Stack, TextField } from "@mui/material";
import { useState } from "react";


export const ManualInsert = ({ setselection, label }) => {
  const [enterdtext , setEnterdtext] = useState("");

    return(
        <FormControl sx={{ m: 1, minWidth: 300 , bgcolor: "#ddd" , borderRadius:2 }} size="small">
          <Stack direction="row" spacing={1} alignItems="center" > 
              <TextField
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