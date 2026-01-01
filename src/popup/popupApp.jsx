import React from 'react'
import { Highlighter } from 'lucide-react';
import {Highlight} from '../hooks/highlight';



export default function PopupApp(){

  
  const openSidePanel = async() => {
    try{
      const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
      await chrome.sidePanel.open({windowId: tab.windowId})

    
    }catch(error){
      console.error("Error opening side panel:", error);
    }
    }


  return (

    <div>

        <h3>Welcome to Nook</h3>
        <hr/>

        <div className = 'highlight-button'>
            <Highlight/>
        </div>
        
        

        <div className = 'recent-Nooks'></div>
        <button onClick={openSidePanel}>See more</button>
    </div>
  )
}
