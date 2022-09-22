import { Button, Chip, Grid, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import DropDownwithselctions from "../MultiStepForm/DropDownwithselctions";
import MapImg from "./Img/Img";
import {BsFillArrowDownCircleFill, BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsFillArrowUpCircleFill, BsImageFill} from "react-icons/bs"
import {GiFinishLine} from "react-icons/gi"
import { useTheme } from "@emotion/react";



const Mapshow =({existMap , children})=>{


  if(!existMap){
    return <Grid item xs={12} md={12} sx={{maxHeight:"30vh", marginTop:5}} textAlign="center"   >
      <Typography variant="h2" >  هذا المشروع لا يمتلك خريطة بعد. يجب عليك ارفاق صورة</Typography>
    </Grid>
  }
  return children;

}


export const Map =({setselection , sd, imgurl,initsq}) =>{
  const theme = useTheme();
  const [pos , setpos] = useState([0,0]);
  const mapselections = ["لم اعمل بها" , "بدات العمل بها " , "انهيت العمل بها"];
  const [sel ,setsel]= useState("لم اعمل بها");
  const [Imgs , setImgs] = useState();
  const [choses , setChoses] = useState([]);
  const [moved , setmoved] = useState(false);

  var init = initsq;
  if(initsq.length === 0){
      init = [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
      ]
  }

  const [squares , setsquers] = useState(init);
  const [trival , settrival] = useState(true);
  const [showloadimg, setshowloadimg] = useState(true);
  const mapexist = imgurl.slice(imgurl.length-9) !== "undefined";



  const handlechose = () => {
      if(!mapexist){
        if(Imgs  === undefined) {sd([true , "من فضلك ارفق صورة", "error"]); return;}
        let x= Imgs.target.files[0];
        setselection({"img":x, "sq":squares});
        sd([true , "تم ارفاق الصورة بنجاح", "success"]); 
      }
      else{
          if(Imgs  === undefined && !moved ) {sd([true , "من فضلك قم بالاختيار من الخريطة او ارفق صورة", "error"]); return;}
          let img,squaressend = squares;
          if(Imgs  !== undefined){
            img = Imgs.target.files[0];
            sd([true , "تم ارفاق الصورة بنجاح", "success"]); 
          }
          if(moved){
          let ind = choses.findIndex( x => x[0] === pos[0] && x[1] === pos[1] );
          if(ind != -1){
            // مكرر 
            if(choses[ind][2] === mapselections.indexOf(sel)){ 
              sd([true , "لقد قمت باضافة هذا العمل من قبل ","info"])
            }else{
              // بيغير اختياره
              setChoses(prev => {
                let p= prev;
                p[ind][2] = mapselections.indexOf(sel);
                return p;
              })
              setsquers(prev => {
                squaressend = prev;
                squaressend[pos[0]][pos[1]] = mapselections.indexOf(sel);
                return squaressend;});
              sd([true , "تم تغيير اختيارك لتلك المنطقة ","info"])
            }
          }else{
            // جديد
            setChoses(prev => {
              let p= prev;
              p.push([pos[0],pos[1],mapselections.indexOf(sel)]);
              return p;
             })
             setsquers(prev => {
              squaressend = prev;
              squaressend[pos[0]][pos[1]] = mapselections.indexOf(sel);
              return squaressend;});
          }
        }
        setselection({"img":img, "sq":squaressend});
        }
    settrival(!trival);
  }

  const mappingchose = (ch) => {
    switch (ch) {
      case 0: return " لم ابدا في";
      case 1: return " بدات في ";
      case 2: return " انهيت ";
    }

  }


  const moveArrows = (val) => {
    setmoved(true);
    let newpos = pos;
    switch (val) {
      case 0: newpos[1] = (newpos[1] > 0) ? newpos[1]-1 : 19;    break;
      case 1: newpos[0] = (newpos[0] > 0) ? newpos[0]-1 : 23;    break;;
      case 2: newpos[1] = (newpos[1] < 19) ? newpos[1]+1 : 0;    break;
      case 3: newpos[0] = (newpos[0] < 23) ? newpos[0]+1 : 0;    break;
    }
    setpos(newpos);
    settrival(!trival);
  }

  const UploadImgs = (e) => {
    if (e) {
      setImgs(e);
      setshowloadimg(false);
      settrival(!trival);
    }
  }
      return(
        <Grid container  sx={{ minHeight:"30vh"}} >
          <Mapshow existMap={mapexist} >
          <Grid item xs={12} md={12} sx={{maxHeight:"60vh", margin:1}} >
              <MapImg setp={setpos} imgurl={imgurl} squares={squares} curs={pos} trival={trival}/>
            </Grid>
            <Grid item container xs={12} md={12}  textAlign="center">
              <Grid item container xs={6} md={3} textAlign="center" >
                <Grid item xs={12}>
                  <IconButton onClick={ () => moveArrows(0)}><BsFillArrowUpCircleFill color={theme.palette.primary.main} /></IconButton>
                </Grid>
                <Grid item xs={12}>
                <IconButton onClick={ () => moveArrows(1)} ><BsFillArrowLeftCircleFill color={theme.palette.primary.main} /></IconButton>
                <IconButton onClick={ () => moveArrows(2)}><BsFillArrowDownCircleFill color={theme.palette.primary.main}/></IconButton>
                <IconButton onClick={ () => moveArrows(3)} ><BsFillArrowRightCircleFill color={theme.palette.primary.main}/></IconButton>
                </Grid>
              </Grid>
              <Grid item  xs={6} md={2} textAlign="center" >
              <Typography variant="h2" fontSize={18}>
                : اختيارك 
              </Typography>
              <Typography variant="h2" fontSize={18}>
                عمود و صف
              </Typography>
              <Typography variant="h2" fontSize={18}>
                {`${pos[0]} , ${pos[1]}`}
              </Typography>
              </Grid>
              <Grid item xs={12} md={7} textAlign="end" sx={{ minHeight:"10vh"}}  >
              <Typography variant="h2">
                 :اختياراتك 
              </Typography>
              <Typography variant="caption" fontSize={14}>
              {choses.map(c => <Chip label={`${mappingchose(c[2])} ${c[0]} ${c[1]}`} variant="outlined" /> )}
              </Typography>
              </Grid>
            </Grid>

          </Mapshow>


            <Grid item container xs={12} md={12} textAlign="center" lineHeight="4"  >
                <Grid item xs={12} md={6} textAlign="center" justifyItems="center" >
                  {mapexist && 
                <DropDownwithselctions selection={sel} selections={mapselections}  setselection={setsel} label={" اختر مقدار تقدمك"} />
                }
                </Grid>
                <Grid item xs={12} md={6} textAlign="center" justifyItems="center">
                 {showloadimg && 
                  <Button variant="contained" startIcon={<BsImageFill color="white" />} component="label" onChange={UploadImgs}>
                      ارفق صورة
                    <input hidden accept="image/*" type="file" />
                  </Button>
                  }

                  <Button variant="contained" onClick={handlechose} startIcon={<GiFinishLine color="white" />} sx={{marginLeft:1}} >اضف الاختيار او الصورة</Button>
                </Grid>
            </Grid>


        </Grid>
      );
} 

export default Map;