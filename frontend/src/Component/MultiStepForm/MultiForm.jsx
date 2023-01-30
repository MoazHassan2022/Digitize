import {
  Alert,
  Button,
  Grid,
  MobileStepper,
  Paper,
  Snackbar,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { useState } from "react";
import useStyle from "./MultiFormStyles";
import { useCookies } from "react-cookie";
import { useTheme } from "@emotion/react";
import { DropDownwithapi } from "./DropDownwithapi";
// import ManualInsert from './ManualInsert';
import axios from "axios";
import {
  translator,
  baseapi,
  mediaApi,
} from "../../Utilities/utilitesFunction";
import DropDownwithselctions from "./DropDownwithselctions";
import Map from "../Map/Map";
import { GiFinishLine } from "react-icons/gi";
import ManualInsertNumber from "./ManualInsertNumber";
import Review from "./Review";
import Hello from "./Hello";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { ChoseSite } from "./ChoseSite";
import Tracker from "./Tracker/Tracker";

export const MultiForm = () => {
  const classes = useStyle();
  const theme = useTheme();
  const [cookies] = useCookies(["user"]);
  const [snakeData, setSnakeData] = useState([false, "", ""]);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = (e) => {
    e.preventDefault();
    setActiveStep((prevActiveStep) => {
      return prevActiveStep + 1;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep - 1;
    });
  };

  const attribute = [
    "",
    "projectCode", // selectwithapi
    "non", // select
    "cabineCode", // Cabina Serial
    "activityGroupName", // select
    "non", // select
    "unit", // select
    "non", // insert
    "way", // freesolo
    "name", // freesolo
    "name", // freesolo
    "name", // freesolo
    "name", // freesolo
    "name", // freesolo
  ];

  const maxSteps = attribute.length;

  const [formData, setFormData] = useState({
    project: "",
    map: "",
    cabinetSerial: "",
    activityGroupName: "",
    activityType: "",
    measurementUnit: "",
    dayProgress: "",
    deliveryWay: "",
    deliveryTeam: "",
    siteEngineer: "",
    siteSupervisorMain: "",
    siteSupervisorAssistant: "",
  });

  const [stopsubmit, setstopsubmit] = useState(false);
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (activeStep < maxSteps - 1) {
      handleNext(e);
      return;
    }
    setstopsubmit(true);
    let row = new FormData();
    row.append("projectCode", formData["project"]["projectCode"]);
    row.append("siteName", formData["project"]["siteName"]);
    row.append("cabinetSerial", formData["cabinetSerial"]["cabineCode"]);
    row.append("activityID", formData["activityGroupName"]["activityGroupID"]);
    row.append(
      "activityGroup",
      formData["activityGroupName"]["activityGroupName"]
    );
    row.append("activityType", formData["activityTypes"]);
    row.append("measurmentUnit", formData["measurementUnit"]["unit"]);
    row.append("dayProgress", formData["dayProgress"]);
    row.append("deliveryWay", formData["deliveryWay"]["way"]);
    row.append("deliveryTeam", formData["deliveryTeam"]["name"]);
    row.append("siteEngineer", formData["siteEngineer"]["name"]);
    row.append("siteSupervisorMain", formData["siteSupervisorMain"]["name"]);
    row.append(
      "siteSupervisorAssistant",
      formData["siteSupervisorAssistant"]["name"]
    );
    row.append("photo", formData["map"]["img"]);
    row.append("username", cookies["name"]);

    let seq = formData["map"]["sq"];

    const auth = "Bearer " + cookies.token;
    axios
      .patch(
        baseapi + `/projects/${formData["project"]["_id"]}`,
        { squares: seq },
        { headers: { authorization: auth } }
      )
      .catch((err) => setSnakeData([true, err.response.data.message, "error"]));
    axios
      .post(baseapi + "/rows", row, { headers: { authorization: auth } })
      .then((res) => {
        setSnakeData([true, "تم ارسال الاستطلاع بنجاح", "success"]);
        setTimeout(() => window.location.reload(), 5000);
      })
      .catch((err) => setSnakeData([true, err.response.data.message, "error"]));

    setstopsubmit(false);
  };

  const getapi = [
    "non",
    "/projects",
    "non",
    "/cabines",
    "/activities",
    "non",
    "/measurementUnits",
    "non",
    "/deliveryWays",
    "/deliveryTeams",
    "/siteEngineers",
    "/siteSupervisorMain",
    "/siteSupervisorAssistant",
  ];

  const getformKey = (step) => {
    switch (step) {
      case 0:
        return "hello";
      case 1:
        return "project";
      case 2:
        return "map";
      case 3:
        return "cabinetSerial";
      case 4:
        return "activityGroupName";
      case 5:
        return "activityTypes";
      case 6:
        return "measurementUnit";
      case 7:
        return "dayProgress";
      case 8:
        return "deliveryWay";
      case 9:
        return "deliveryTeam";
      case 10:
        return "siteEngineer";
      case 11:
        return "siteSupervisorMain";
      case 12:
        return "siteSupervisorAssistant";
      default:
        return "unknown";
    }
  };

  const [Trival, setTrival] = useState(true);

  const handleChangeForm = (valuee) => {
    setFormData((prev) => {
      let p = prev;
      prev[getformKey(activeStep)] = valuee;
      return p;
    });
    setTrival(!Trival);
  };

  const renderStep = (step) => {
    switch (step) {
      case 0: {
        return (
          <Grid
            item
            container
            xs={12}
            md={12}
            justifyContent="center"
            sx={{ borderRadius: 2, marginTop: 2 }}
          >
            <Hello />
          </Grid>
        );
      }

      case 1: {
        return (
          <Grid
            item
            container
            xs={8}
            md={4}
            justifyContent="center"
            sx={{ borderRadius: 2, marginTop: 2 }}
          >
            <ChoseSite
              disNext={setstopsubmit}
              selection={formData[getformKey(step)]}
              getapi={getapi[step]}
              chose={attribute[step]}
              setSnakeData={setSnakeData}
              key={step}
              setselection={handleChangeForm}
              label={" اختر " + translator(step)}
            />
          </Grid>
        );
      }

      case 2: {
        return (
          <Map
            initsq={formData["project"]["squares"]}
            setselection={handleChangeForm}
            imgurl={mediaApi + "/img/projectMaps/" + formData["project"]["map"]}
            sd={setSnakeData}
          />
        );
      }

      case 3:
        return (
          <Grid
            item
            container
            xs={8}
            md={6}
            justifyContent="center"
            sx={{ borderRadius: 2, marginTop: 2 }}
          >
            {/* <ManualInsert  selection={formData[getformKey(step)]}   key={step} setselection={handleChangeForm} label={" ادخل "  + translator(step)} /> */}
            <DropDownwithapi
              disNext={setstopsubmit}
              selection={formData[getformKey(step)]}
              getapi={getapi[step]}
              chose={attribute[step]}
              setSnakeData={setSnakeData}
              key={step}
              setselection={handleChangeForm}
              label={" اختر " + translator(step)}
            />
          </Grid>
        );

      case 4: {
        return (
          <Grid
            item
            container
            xs={8}
            md={4}
            justifyContent="center"
            sx={{ borderRadius: 2, marginTop: 2 }}
          >
            <DropDownwithapi
              disNext={setstopsubmit}
              selection={formData[getformKey(step)]}
              getapi={getapi[step]}
              chose={attribute[step]}
              setSnakeData={setSnakeData}
              key={step}
              setselection={handleChangeForm}
              label={" اختر " + translator(step)}
            />
          </Grid>
        );
      }

      case 5: {
        return (
          <Grid
            item
            container
            xs={8}
            md={4}
            justifyContent="center"
            sx={{ borderRadius: 2, marginTop: 2 }}
          >
            <DropDownwithselctions
              selection={formData[getformKey(step)]}
              selections={formData[getformKey(step - 1)]["activityTypes"]}
              key={step}
              setselection={handleChangeForm}
              label={" اختر " + translator(step)}
            />
          </Grid>
        );
      }

      case 6: {
        return (
          <Grid
            item
            container
            xs={8}
            md={4}
            justifyContent="center"
            sx={{ borderRadius: 2, marginTop: 2 }}
          >
            <DropDownwithapi
              disNext={setstopsubmit}
              selection={formData[getformKey(step)]}
              getapi={getapi[step]}
              chose={attribute[step]}
              setSnakeData={setSnakeData}
              key={step}
              setselection={handleChangeForm}
              label={" اختر " + translator(step)}
            />
          </Grid>
        );
      }

      case 7: {
        return (
          <Grid
            item
            container
            xs={8}
            md={4}
            justifyContent="center"
            sx={{ borderRadius: 2, marginTop: 2 }}
          >
            <ManualInsertNumber
              selection={formData[getformKey(step)]}
              key={step}
              setselection={handleChangeForm}
              label={" ادخل " + translator(step)}
            />
          </Grid>
        );
      }

      case 8: {
        return (
          <Grid
            item
            container
            xs={8}
            md={4}
            justifyContent="center"
            sx={{ borderRadius: 2, marginTop: 2 }}
          >
            <DropDownwithapi
              disNext={setstopsubmit}
              selection={formData[getformKey(step)]}
              getapi={getapi[step]}
              chose={attribute[step]}
              setSnakeData={setSnakeData}
              key={step}
              setselection={handleChangeForm}
              label={" اختر " + translator(step)}
            />
          </Grid>
        );
      }

      case 9: {
        return (
          <Grid
            item
            container
            xs={8}
            md={4}
            justifyContent="center"
            sx={{ borderRadius: 2, marginTop: 2 }}
          >
            <DropDownwithapi
              disNext={setstopsubmit}
              selection={formData[getformKey(step)]}
              getapi={getapi[step]}
              chose={attribute[step]}
              setSnakeData={setSnakeData}
              key={step}
              setselection={handleChangeForm}
              label={" اختر " + translator(step)}
            />
          </Grid>
        );
      }

      case 10: {
        return (
          <Grid
            item
            container
            xs={8}
            md={4}
            justifyContent="center"
            sx={{ borderRadius: 2, marginTop: 2 }}
          >
            <DropDownwithapi
              disNext={setstopsubmit}
              selection={formData[getformKey(step)]}
              getapi={getapi[step]}
              chose={attribute[step]}
              setSnakeData={setSnakeData}
              key={step}
              setselection={handleChangeForm}
              label={" اختر " + translator(step)}
            />
          </Grid>
        );
      }

      case 11: {
        return (
          <Grid
            item
            container
            xs={8}
            md={4}
            justifyContent="center"
            sx={{ borderRadius: 2, marginTop: 2 }}
          >
            <DropDownwithapi
              disNext={setstopsubmit}
              selection={formData[getformKey(step)]}
              getapi={getapi[step]}
              chose={attribute[step]}
              setSnakeData={setSnakeData}
              key={step}
              setselection={handleChangeForm}
              label={" اختر " + translator(step)}
            />
          </Grid>
        );
      }
      case 12: {
        return (
          <Grid
            item
            container
            xs={8}
            md={4}
            justifyContent="center"
            sx={{ borderRadius: 2, marginTop: 2 }}
          >
            <DropDownwithapi
              disNext={setstopsubmit}
              selection={formData[getformKey(step)]}
              getapi={getapi[step]}
              chose={attribute[step]}
              setSnakeData={setSnakeData}
              key={step}
              setselection={handleChangeForm}
              label={" اختر " + translator(step)}
            />
          </Grid>
        );
      }

      case 13: {
        return (
          <Grid
            item
            container
            xs={12}
            md={12}
            justifyContent="center"
            sx={{ borderRadius: 2, marginTop: 2 }}
          >
            <Review data={formData} keys={getformKey} />
          </Grid>
        );
      }
      default:
        return "unknown";
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      className={classes.SignPage}
    >
      <Grid
        container
        item
        component={Paper}
        elevation={0}
        sx={{ borderRadius: "2rem", bgcolor: "transparent" }}
        xs={12}
        md={8}
        direction="row"
        justifyContent="space-around"
        alignItems="stretch"
        className={classes.FormContainer}
      >
        <Grid
          container
          item
          component={"form"}
          onSubmit={HandleSubmit}
          xs={12}
          sm={8}
          textAlign="center"
          justifyContent="flex-start"
          className={classes.StepsContainer}
        >
          <Grid
            item
            xs={12}
            component={Paper}
            sx={{
              verticalAlign: "middle",
              height: 75,
              pl: 6,
              bgcolor: theme.palette.primary.main,
              paddingTop: 1,
              fontSize: "1.2rem",
              fontWeight: 900,
              borderRadius: "0",
              borderTopLeftRadius: "1rem",
              borderTopRightRadius: "1rem",
            }}
            textAlign="center"
          >
            <Typography alignSelf="center" sx={{ color: "white" }} variant="h2">
              {translator(activeStep)}
            </Typography>
          </Grid>

          <Grid item container sx={{ padding:2}} alignItems="flex-start" justifyContent="center">
            {renderStep(activeStep)}
          </Grid>

          <Grid item xs={12}>
            <MobileStepper
              variant="progress"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  type="submit"
                  disabled={stopsubmit}
                  size="small"
                  endIcon={
                    activeStep === maxSteps - 1 ? (
                      <GiFinishLine color="white" />
                    ) : (
                      ""
                    )
                  }
                >
                  {activeStep === maxSteps - 1 ? (
                    <AiOutlineCheck size={24} />
                  ) : (
                    <MdArrowForwardIos size={24} />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  <MdArrowBackIos size={24} />
                </Button>
              }
            />
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          sm={3}
          md={3}
          className={classes.Tracker}
          display={{ xs: "none", sm: "flex" }}
        >
          <Grid
            item
            xs={12}
            sx={{ color: "white" }}
            textAlign="center"
            className={classes.TrackerLabel}
          >
            تابع تقدمك
          </Grid>
          <Tracker activeStep={activeStep} />
        </Grid>
      </Grid>

      <Snackbar
        sx={{ width: 400 }}
        open={snakeData[0]}
        autoHideDuration={3000}
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
    </Grid>
  );
};

export default MultiForm;
