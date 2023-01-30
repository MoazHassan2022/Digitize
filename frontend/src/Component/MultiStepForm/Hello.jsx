import { Grid, Typography } from "@mui/material";
import theme from "../../Utilities/Theme";

export const Hello =() =>{


    const instructions = ["قم بملئ كل خطوة من الخطوات حيث لا يمكنك المرور من احداها الا بملئها" ,
     "في خطوة الخريطة عليك اختيار المربعات او رفع صورة توضيحية للعمل او كلاهما ثم الضغط على زر الاضافة", "تحرى كتابتك فما تكتبه سيرسل كما هو بدون اي تعديل", "راجع خطواتك بعناية قبل الارسال في خطوة المراجعة"];

    const hellotext = `أهلا بك في استطلاع العمل من فضلك اقرأ التالي بحرص قبل البدء`
    return <Grid item container xs={12} md={10} textAlign="end" spacing={3}>
            <Grid item textAlign="end" xs={12}> <Typography variant="h3" > {hellotext}</Typography></Grid>

            <Grid  sx={{marginTop:1 , fontSize:18}} item container xs={12} textAlign="end" >
                <Grid item container xs={11} md={11.4} sx={{ bgcolor:"#f5f5fa" ,borderRadius:4 }} >
                   { instructions.map( (title,i) => <Grid key={i} item xs={11.6} sx={{marginTop:1}}>{title} </Grid>)}
                </Grid>
                <Grid item xs={.2} />
                <Grid item container xs={.8} md={.4} textAlign="center" sx={{bgcolor: theme.palette.primary.main , color:"white", borderRadius:4 }} >
                   { instructions.map( (title,i) => <Grid key={i} item xs={11.6} sx={{marginTop:1}} > -{i+1} </Grid>)}
                </Grid>
            </Grid>
    </Grid>;

}
export default Hello;