import { Grid, Typography } from "@mui/material";

export const Hello =() =>{

    const instructions = ["قم بملي كل خطوة من الخطوات حيث لا يمكنك المرور من احداها الا بملئها" ,
     "في خطوه الخريطه عليك اختيار المربعات او رفع صوره توضيحيه للعمل او كلاهما ثم الضغط عل زر الاضافه", "تحري كتابتك فما تكتبه سيرسل كما هو بدون اي تعديل", "راجع خطواتك بعنايه قبل الارسال في خطوه المراجعه"];

    return <Grid item container xs={12} md={10} spacing={0} textAlign="end">
            <Grid item textAlign="end" xs={12}> <Typography variant="h2" > اهلا بك في الاستطلاع العمل من فضلك اقرا التالي بحرص قبل البدء  </Typography></Grid>

            {
            instructions.map((title , i) => 
            <Grid key={i} sx={{marginTop:1}} item container xs={12} textAlign="end">
                <Grid item xs={11.5}>{title} </Grid>
                <Grid item xs={.4}>- </Grid>
            </Grid>
            )}
            
    </Grid>;

}
export default Hello;