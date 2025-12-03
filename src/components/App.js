import '../css/App.css';
import Responselist from "./Responselist.js";
import NavBar from './NavBar.js';
import Searchbox from './searchbox.js'
import React , { useState } from 'react';


export const MyContext = React.createContext();

function App() {
  const[searchedData,SetsearchedData]=useState('');
  const [searchedResponse,SetsearchedResponse]=useState('');
  const [history, setHistory] = useState([]);


  async function send(history,message) {
    const res = await fetch("http://localhost:8000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        history: history,
        message: message,
      })
    });
    const j = await res.json();
    setHistory([...history, { role: "assistant", content: j.reply }]);
    SetsearchedResponse(j.reply);
  }



  async function handlesearchedData(data){
    SetsearchedData(data);
    setHistory([...history, { role: "user", content: data }]);
    if(history.length >0){
      await send([...history, { role: "user", content: data }],data)
    }else{
      await send([{ role: "user", content: data }],data)
    }
  }

  const usefulfunction = {
    // handleaddtocart,
    handlesearchedData,
    send
  }


  return (
    <MyContext.Provider value={usefulfunction}>
      <NavBar />
      <Searchbox />
      {
        searchedResponse && 
          <Responselist Response={history}/>
      }
      
    </MyContext.Provider>
  );
}


export default App;
