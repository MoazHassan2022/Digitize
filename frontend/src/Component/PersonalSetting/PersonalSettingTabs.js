import * as React from 'react';
import useStyle from './PersonalSettingTabsStyles';
import { Alert, Snackbar, Typography } from '@mui/material';
import FormContainer from '../FormContainer/FormContainer';
import ChangePassword from '../ChangePassword/ChangePassword';
import { useState } from 'react';

export default function PersonalSettingTabs() {
  const [snakeData, setSnakeData] = useState([false, "", ""]);
  const classes = useStyle();

  return (
    <>
    <FormContainer Title={<Typography alignSelf="end" sx={{ color: "white" }} variant="h2">غير كلمه السر الخاصة بك</Typography>}>
      <ChangePassword setSnakeData={setSnakeData}/>
    </FormContainer>

    <Snackbar
        sx={{ width: 500 }}
        open={snakeData[0]}
        autoHideDuration={2000}
        onClose={() => setSnakeData([false, "", ""])}
      >
        <Alert
          onClose={() => setSnakeData([false, "", ""])}
          severity={
            snakeData[2] === "success"
              ? "success"
              : snakeData[2] === "error"
              ? "error"
              : "info"
          }
        >
          {snakeData[1]}
        </Alert>
      </Snackbar>

    </>
  );

}

      /* <Grid item xs={12} md={12} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} 
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabschose.map((tab, index) => {
          return <Tab key={index} label={tab} {...a11yProps(index)} className={classes.tab} />
          })}
        </Tabs>
      </Grid> */

