import React from 'react'
import { Highlighter } from 'lucide-react';
export default function PopupApp(){

  const activateHighlight = () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: "activateHighlight"});
    });
  }
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

        <h1>Welcome to the Popup!</h1>
        <h3>it works</h3>

        <button onClick={activateHighlight}>
        <Highlighter size={16} style={{marginRight: '8px'}}/>
        </button>

        <button onClick={openSidePanel}>See more</button>
    </div>
  )
}
