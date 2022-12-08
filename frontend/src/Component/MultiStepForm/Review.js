import { Grid, Typography } from "@mui/material";

const Review = ({data}) => {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth()+1; 
    var yyyy =today.getFullYear();
    today = mm+'-'+dd+'-'+yyyy;
    const titles = ["تاريخ الارسال","كود المشروع" , "اسم الموقع", "اختيارات الخريطه " , "الرقم المسلسل للكابينة" , "اسم مجموعة النشاط", "نوع النشاط",
                    "وحدة القياس" , "التقدم اليومي" , "طريقة التسليم" , "ممثل فريق التوصيل" , "مهندس الموقع" , "مشرف الموقع الرئيسي" , "مشرف الموقع المساعد"];
    let datatoshow =[ today , data.project.projectCode , data["project"].siteName , data.map.img !== undefined ?  "تم ارفاق صوره" : "تم تسجيل اختيارك" ,
                    data.cabinetSerial["cabineCode"] , data.activityGroupName.activityGroupName , data.activityTypes , data.measurementUnit.unit ,
                    data.dayProgress , data.deliveryWay.way , data.deliveryTeam.name , data.siteEngineer.name , data.siteSupervisorMain.name,
                    data.siteSupervisorAssistant.name];
    return(
        <Grid item container xs={12} md={10} spacing={2} textAlign="end">
            <Grid item textAlign="end" xs={12}> <Typography variant="h2" >-: اختياراتك </Typography></Grid>

            {
            titles.map((title , i) => 
            <Grid key={i} item container xs={12} textAlign="end">
                <Grid item xs={9}>{datatoshow[i]}</Grid>
                <Grid item xs={3}>: {title}</Grid>
            </Grid>
            )}
            
        </Grid>
    );

}

export default Review;