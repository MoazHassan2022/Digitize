import { useTheme } from "@emotion/react";
import { Grid, Typography } from "@mui/material";

export const Hello =() =>{
    const theme = useTheme();

    const instructions = [".قم بملئ كل خطوة من الخطوات حيث لا يمكنك المرور من احداها الا بملئها" ,
     ".في خطوة الخريطة عليك اختيار المربعات او رفع صورة توضيحية للعمل او كلاهما ثم الضغط على زر الاضافة", ".تحرى كتابتك فما تكتبه سيرسل كما هو بدون اي تعديل", ".راجع خطواتك بعناية قبل الارسال في خطوة المراجعة"];

    const hellotext = `!أهلا بك في استطلاع العمل من فضلك اقرأ التالي بحرص قبل البدء `
    return <Grid item container xs={12} md={10} textAlign="end" spacing={3}>
            <Grid item textAlign="end" xs={12}> <Typography variant="h3" > {hellotext}</Typography></Grid>
            <Grid  sx={{marginTop:1 , fontSize:18}} item container xs={12} textAlign="end" >
                <Grid item container xs={11.4} sx={{ bgcolor:"#adacab7e" ,borderRadius:4 }} >
                   { instructions.map( (title) => <Grid item xs={11.6} sx={{marginTop:1}}>{title} </Grid>)}
                </Grid>
                <Grid item xs={.2} />
                <Grid item container xs={.4} textAlign="center" sx={{bgcolor: theme.palette.primary.main , color:"white", borderRadius:4 }} >
                   { instructions.map( (title,i) => <Grid item xs={11.6} sx={{marginTop:1}} > -{i+1} </Grid>)}
                </Grid>
            </Grid>
    </Grid>;

}
export default Hello;