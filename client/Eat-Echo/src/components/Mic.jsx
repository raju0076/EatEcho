import {CloudUpload} from "lucide-react";
import {useRef} from "react";


function Mic(){

  const fileInput=useRef(null);
 
 function handleFile(){
    fileInput.current.click()
  }

    return(
        <>
                <input ref={fileInput} type="file" style={{display:"none"}} />
                <CloudUpload onClick={handleFile}  />
        </>
    )
}
export default Mic