import axios from "axios";
import React,{useState} from 'react';
import { saveAs } from 'file-saver'
import url from "./url";
function App() {
  const [web,setWeb]=useState("");
  async function scrape()
  {
    const req={websiteUrl:web};
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const response=await axios.post(`${url.baseURL}/save-website`,req).then((res)=>{
      saveAs(`${url.baseURL}/uploads/${res.data.file}`,res.data.file)
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div className="App" style={{"margin":"50px"}} align="center">
      <label>Enter website: </label><input type="text" onChange={(e)=>{setWeb(e.target.value)}}/><button onClick={scrape}>Scrape</button>
    </div>
  );
}

export default App;
