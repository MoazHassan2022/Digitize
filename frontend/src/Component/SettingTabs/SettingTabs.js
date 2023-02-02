import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useStyle from './SettingTabsStyles';
import { Grid, IconButton, Paper, Stack } from '@mui/material';
import AddRemove from '../AddRemove/AddRemove';
import FormContainer from "../FormContainer/FormContainer";
import { FcAddRow, FcDeleteRow } from 'react-icons/fc';
import { useState } from 'react';
import theme from '../../Utilities/Theme';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SettingTabs() {
  const classes = useStyle();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  var tabschose = ["اضف / احذف ممثل فريق توصيل" , "اضف / احذف طريقة توصيل" ,
    "اضف / احذف مشرف ثانوي" , "اضف / احذف مشرف اساسي" , "اضف / احذف مهندس موقع"  ,
     "اضف / احذف نوع نشاط" ,  "اضف / احذف مجموعة انشطة" , " اضف / احذف موقع " , "اضف / احذف مشروع",  "اضف / احذف رقم مسلسل كابينة", "غير صورة لمشروع" ];


  const [value, setValue] = React.useState(tabschose.length - 1);

  const getapi = ["/deliveryTeams","/deliveryWays","/siteSupervisorAssistant","/siteSupervisorMain","/siteEngineers","/activities","/activities ","/projects","/projects","/cabines"];
  const setapi = ["/deliveryTeams","/deliveryWays","/siteSupervisorAssistant","/siteSupervisorMain","/siteEngineers","/activities","/activities","/projects","/projects","/cabines"];
  const HeadLabel = ["ممثل فريق توصيل","طريقة توصيل","مشرف ثانوي","مشرف اساسي","مهندس موقع","انواع نشاط","مجموعات نشاط","مواقع","مشاريع", "ارقام كبائن" , "صور المشاريع" ];
  const labels = ["ممثلي فريق توصيل","طرق التوصيل","المشرفين الثانويين","المشرفين الاساسيين","مهندسي المواقع","انواع النشاط","مجموعات النشاط","مواقعك","مشاريعك", "ارقام الكبائن" , "صور المشاريع" ];
  const objectlabel = ["name","way","name","name","name","activityTypes","activityGroupName","siteNames","projectCode", "cabineCode"];
  const objectgetlabel = ["","","","","","activityGroupName","","projectCode","","cabineCode"];



  const EditformDataHeader = ({label , isAdd , setIsAdd}) =>{

    return(
      <Grid item  container xs={12} sx={{padding:".4rem"}}>
          <Grid item container xs={2} >
              {(label !== "عدل صور خرائط") && 
          <IconButton onClick={()=>setIsAdd(!isAdd)} >
              {isAdd ? <FcAddRow title="Add item" /> : <FcDeleteRow title="remove item" />}
          </IconButton>
          }
          </Grid>
          <Grid item container xs={10} justifyContent="flex-end" >
              {(label !== "عدل صور خرائط") ?
          <Typography component={'span'} sx={{color: "white" , fontSize:"1.3rem"}}  variant="h2" > {isAdd ? " اضف الي "  :"احذف من   "} {label}</Typography>
          :
          <Typography component={'span'} sx={{color: "white" , fontSize:"1.3rem"}}  variant="h2" >عدل صور خرائطك</Typography>
      }
          </Grid>
      </Grid>
    );
  }

  const [isAdd , setIsAdd] = useState(true);

  const renderChose = () => {

    switch (value) {
      //شركة توصيل
        case 0: return <AddRemove isAdd={isAdd} key={value} textonly={true} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={HeadLabel[value]} /> // measerment wy
      //طريقة توصيل
        case 1: return <AddRemove isAdd={isAdd} key={value} textonly={true} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={HeadLabel[value]} /> //delever company
      //مشرف ثانوي  
        case 2: return <AddRemove isAdd={isAdd} key={value} textonly={true}  obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={HeadLabel[value]}/> //deleiver way
      //مشرف اساسي 
        case 3: return <AddRemove isAdd={isAdd} key={value} textonly={true} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={HeadLabel[value]} /> // site assest super visor
      //مهندس موقع
        case 4: return <AddRemove isAdd={isAdd} key={value} textonly={true} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={HeadLabel[value]} /> // site main supervisor
      //انواع النشاط
        case 5: return <AddRemove isAdd={isAdd} key={value} textonly={false} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={HeadLabel[value]} /> // activity site engineer
      //مجموعات نشاط
        case 6: return <AddRemove isAdd={isAdd} key={value} textonly={true} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={HeadLabel[value]} /> // activity type
      //مواقع
        case 7: return <AddRemove isAdd={isAdd} key={value} textonly={false} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={HeadLabel[value]} /> // activity group
      //مشاريع
        case 8: return <AddRemove isAdd={isAdd} key={value} textonly={true} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={HeadLabel[value]}/> // site
      // الرقم المسلسل للكابينه
        case 9: return <AddRemove isAdd={isAdd} key={value} textonly={true} obsenget={objectgetlabel[value]} getlabel={labels[value]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={HeadLabel[value]}/> // cabineCode
      // غير صور المشاريع مش تبع الجداول
      case 10: return  <AddRemove isAdd={isAdd} key={value} label={"عدل صور خرائط"} />
            
        default: return <>not a chose</>;
      }
  }



  
  return (
    <Grid container xs={12} alignItems="center">
      <Grid item xs={12} md={12} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} 
          variant="scrollable"
          scrollButtons="auto"
          classes={{
            indicator: classes.indicator
          }}
          TabIndicatorProps={{
            sx: {
              bgcolor: theme.palette.primary.main,
              height: "5px",
            }
          }}
        >
          {tabschose.map((tab, index) => {
          return <Tab  key={index} label={tab} {...a11yProps(index)} className={classes.tab} />
          })}
        </Tabs>
      </Grid>



      <Grid item container sx={{bgcolor:"red"}} xs={12} md={12} >

      <FormContainer Title={<EditformDataHeader  label={labels[value]} isAdd={isAdd} setIsAdd={setIsAdd}/>}>
      <Grid
        container
        direction="row"
        component={Paper}
          sx={{ padding: 6, border: "5px solid", borderRadius: 6 }}
        xs={11}
        sm={11}
        md={8}
        justifyContent="space-around"
        alignItems="center"
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
      
        >

          {tabschose.map((tab, index) => {
          return <TabPanel sx={{bgcolor:"blue"}}  key={index} value={value} index={index} className={classes.tab}  >
          {renderChose()}
          </TabPanel>
          })}

          
          </Stack>
          </Grid>
          </FormContainer>

      </Grid>
      
    </Grid>
  );
}
