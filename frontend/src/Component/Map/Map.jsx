import { Button, Chip, Grid, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import DropDownwithselctions from "../MultiStepForm/DropDownwithselctions";
import MapImg from "./Img/Img";
import {BsFillArrowDownCircleFill, BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsFillArrowUpCircleFill, BsImageFill} from "react-icons/bs"
import {GiFinishLine} from "react-icons/gi"
import { useTheme } from "@emotion/react";


export const Map =({setselection , sd, imgurl,initsq}) =>{
  const theme = useTheme();
  const [pos , setpos] = useState([0,0]);
  const mapselections = ["لم اعمل بها" , "بدات العمل بها " , "انهيت العمل بها"];
  const [sel ,setsel]= useState("لم اعمل بها");
  const [Imgs , setImgs] = useState([]);
  const [choses , setChoses] = useState([]);
  const [squares , setsquers] = useState(initsq);
  const [trival , settrival] = useState(true);
  const [showloadimg, setshowloadimg] =useState(true);

  var notchoosesquare = pos[0] === -1 || pos[1] === -1;

  const handlechose = () => {
      if(Imgs.length === 0 && (notchoosesquare)) {sd([true , "من فضلك قم بالاختيار من الخريطه او ارفق صوره", "error"]); return;}
      if(!notchoosesquare) {
        let ind = choses.findIndex( x => x[0] === pos[0] && x[1] === pos[1] );
        if(ind !== -1 ){
          if(choses[ind][2] === mapselections.indexOf(sel)){ 
            sd([true , "لقد قمت باضافه هذا العمل من قبل ","info"])
            return;
          }else{
            setChoses(prev => {
              let p= prev;
              p[ind][2] =mapselections.indexOf(sel);
              return p;
             })
             setsquers(prev => {
              let p = prev;
              p[pos[0]][pos[1]] = mapselections.indexOf(sel);
              return p;});
            sd([true , "تم تغيير اختيارك لتلك المنطقه ","info"])
            settrival(!trival);
            return;
          }
        }
        setChoses(prev => {
          let p= prev;
          p.push([pos[0],pos[1],mapselections.indexOf(sel)]);
          return p;
         })
         setsquers(prev => {
          let p = prev;
          p[pos[0]][pos[1]] = mapselections.indexOf(sel);
          return p;});
      }
      setselection({"img":Imgs[0].target.files[0], "sq":squares});
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
      setImgs([...Imgs, e]);
      setshowloadimg(false);
    }
    
  }
      return(
        <Grid container xs={12} md={12}  sx={{ minHeight:"30vh"}} >
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

            <Grid item container xs={12} md={12} textAlign="center" lineHeight="4"  >
                <Grid item xs={12} md={6} textAlign="center" justifyItems="center" >
                <DropDownwithselctions selection={sel} selections={mapselections}  setselection={setsel} label={" اختر مقدار تقدمك"} />
                </Grid>
                <Grid item xs={12} md={6} textAlign="center" justifyItems="center">
                 {showloadimg && 
                  <Button variant="contained" startIcon={<BsImageFill color="white" />} component="label" onChange={UploadImgs}>
                      ارفق صوره
                    <input hidden accept="image/*" type="file" />
                  </Button>
                  }

                  <Button variant="contained" onClick={handlechose} startIcon={<GiFinishLine color="white" />} sx={{marginLeft:1}} >اضف الاختيار</Button>
                </Grid>
            </Grid>


        </Grid>
      );
} 

export default Map;