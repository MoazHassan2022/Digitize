import { useState } from "react";
import Header from "../../Component/Header/Header";
import RequestDataForm from "../../Component/RequestDataForm/RequestDataForm";
import EditData from "../../Component/EditData/EditData"

export const RequestData = () => {

    const [DownloaOrEdit , setDownloaOrEdit ] = useState(true);
    const [selectedProject , setselectedProject ] = useState("all");
  
    return (
        <>
          <Header />
          {DownloaOrEdit ? <RequestDataForm setEdit={setDownloaOrEdit} selecteddata={setselectedProject} /> : <EditData backtoDownload={setDownloaOrEdit} selectedProject={selectedProject}  /> }
        </>
        )

}

export default RequestData;