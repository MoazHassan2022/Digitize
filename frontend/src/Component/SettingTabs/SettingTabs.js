import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useStyle from './SettingTabsStyles';
import { Grid } from '@mui/material';
import AddRemove from '../AddRemove/AddRemove';

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
  const labels = ["ممثل فريق توصيل","طريقة توصيل","مشرف ثانوي","مشرف اساسي","مهندس موقع","انواع نشاط","مجموعات نشاط","مواقع","مشاريع", "ارقام كبائن" , "صور المشاريع" ];
  const objectlabel = ["name","way","name","name","name","activityTypes","activityGroupName","siteNames","projectCode", "cabineCode"];
  const objectgetlabel = ["","","","","","activityGroupName","","projectCode","","cabineCode"];


  const renderChose = () => {
    switch (value) {
      //شركة توصيل
        case 0: return <AddRemove key={value} textonly={true} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={labels[value]} /> // measerment wy
      //طريقة توصيل
        case 1: return <AddRemove key={value} textonly={true} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={labels[value]} /> //delever company
      //مشرف ثانوي  
        case 2: return <AddRemove key={value} textonly={true}  obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={labels[value]}/> //deleiver way
      //مشرف اساسي 
        case 3: return <AddRemove key={value} textonly={true} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={labels[value]} /> // site assest super visor
      //مهندس موقع
        case 4: return <AddRemove key={value} textonly={true} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={labels[value]} /> // site main supervisor
      //انواع النشاط
        case 5: return <AddRemove key={value} textonly={false} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={labels[value]} /> // activity site engineer
      //مجموعات نشاط
        case 6: return <AddRemove key={value} textonly={true} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={labels[value]} /> // activity type
      //مواقع
        case 7: return <AddRemove key={value} textonly={false} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={labels[value]} /> // activity group
      //مشاريع
        case 8: return <AddRemove key={value} textonly={true} obsenget={objectgetlabel[value]} getlabel={labels[value+1]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={labels[value]}/> // site
      // الرقم المسلسل للكابينه
        case 9: return <AddRemove key={value} textonly={true} obsenget={objectgetlabel[value]} getlabel={labels[value]} obcal={objectlabel[value]} getApi={getapi[value]}  setApi={setapi[value]}  label={labels[value]}/> // cabineCode
      // غير صور المشاريع مش تبع الجداول
      case 10: return  <AddRemove key={value} label={"عدل صور خرائط"} />
            
        default: return <>not a chose</>;
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
