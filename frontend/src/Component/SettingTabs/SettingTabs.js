import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useStyle from './SettingTabsStyles';
import { Grid } from '@mui/material';
import AddRemove from '../AddRemove/AddRemove';
import { Cookies, useCookies } from 'react-cookie';
import ChangePassword from '../ChangePassword/ChangePassword';
import ChangeProjectImg from '../AddRemove/SettingTools/ChangeProjectImg';

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
  const [cookies, setCookie] = useCookies(['user']);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  var tabschose = ["اضف / احذف نوع قياس" , "اضف / احذف شركه توصيل" , "اضف / احذف طريقه توصيل" ,
    "اضف / احذف مشرف ثانوي" , "اضف / احذف مشرف اساسي" , "اضف / احذف مهندس موقع"  ,
     "اضف / احذف نوع نشاط" ,  "اضف / احذف مجموعه انشطه" , " اضف / احذف موقع " , "اضف / احذف مشروع", "غير صوره لمشروع" ];


  const [value, setValue] = React.useState(tabschose.length - 1);

  const getapi = ["0","/deliveryTeams","/deliveryWays","/siteSupervisorAssistant","/siteSupervisorMain","/siteEngineers","/activities","/activities ","/projects","/projects"];
  const setapi = ["0","/deliveryTeams","/deliveryWays","/siteSupervisorAssistant","/siteSupervisorMain","/siteEngineers","/activities","/activities","/projects","/projects"];
  const labels = ["نوع قياس","شركه توصيل","طريقه توصيل","مشرف ثانوي","مشرف اساسي","مهندس موقع","انواع النشاط","مجموعات نشاط","مواقع","مشاريع"];
  const objectlabel = ["measurmentUnit","DeliveryTeam","DeliveryWay","SiteSupervisorAssistant",
  "SiteSupervisorMain","SiteEngineer","activityTypes","activityGroupID"
  ,"siteNames","projectCode"];
  const objectgetlabel = ["","","","",
  "","","activityGroupID",""
  ,"projectCode",""];


  const renderChose = () => {
    switch (value) {
        case 0: return <AddRemove key={value} textonly={true} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={labels[value]} /> // measerment wy
        case 1: return <AddRemove key={value} textonly={true} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={labels[value]} /> //delever company
        case 2: return <AddRemove key={value} textonly={true}  obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={labels[value]}/> //deleiver way
        case 3: return <AddRemove key={value} textonly={true} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={labels[value]} /> // site assest super visor
        case 4: return <AddRemove key={value} textonly={true} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={labels[value]} /> // site main supervisor
        case 5: return <AddRemove key={value} textonly={true} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={labels[value]} /> // activity site engineer
        case 6: return <AddRemove key={value} textonly={false} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={labels[value]} /> // activity type
        case 7: return <AddRemove key={value} textonly={true} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={labels[value]} /> // activity group
        case 8: return <AddRemove key={value} textonly={false} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={labels[value]}/> // site
        case 9: return <AddRemove key={value} textonly={true} obsenget={objectgetlabel[value]}  getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]} setApi={setapi[value]}  label={labels[value]} /> // project
        case 10: return  <AddRemove key={value} textonly={false} obsenget={objectgetlabel[value-1]}  getlabel={labels[value-1]} obcal={objectlabel[value-1]} getApi={getapi[value-1]} setApi={setapi[value-1]}  label={"عدل صور خرائط"} />
      }
  }


  return (
    <Grid container sx={{ width: '100%' }} alignItems="flex-start">
      <Grid item xs={12} md={12} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} 
          variant="scrollable"
          scrollButtons={false}
        >
          {tabschose.map((tab, index) => {
          return <Tab key={index} label={tab} {...a11yProps(index)} className={classes.tab} />
          })}
        </Tabs>
      </Grid>
      <Grid item container direction="column" xs={12} md={12} >
            {tabschose.map((tab, index) => {
          return <TabPanel key={index} value={value} index={index} className={classes.tab}  >
          {renderChose()}
          </TabPanel>
          })}
      </Grid>
    </Grid>
  );
}
