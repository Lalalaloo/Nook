import React from 'react'
import { Trash} from 'lucide-react';
import {Highlight} from '../hooks/highlight';
import { useState, useEffect } from 'react';
import './popup.css';


export default function PopupApp(){

  const [recentNooks, setRecentNooks] = useState([]);

 useEffect(() => {
    chrome.storage.local.get(['nookbooks'], (result) => {
      const nookbooks = result.nookbooks || {};

      const sorted = Object.entries(nookbooks)
        .sort(([, a], [, b]) => (b.lastUpdated || 0) - (a.lastUpdated || 0))
        .slice(0, 3);

      setRecentNooks(sorted);

    })
  }, [])

 const openNookbook = async (nookbookKey) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

 
  await chrome.storage.local.set({
    openNookbookKey: nookbookKey,
  });

  await chrome.sidePanel.open({ windowId: tab.windowId });
};


  
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

        <h3 className="popup-title">Welcome to Nook </h3>
        <hr className = 'hr-title-popup'/>
    

        
            <Highlight/>
        

       <h5>Recent NookBooks:</h5>

      <div className="recent-row">
        {recentNooks.length > 0 ? (
          <div className="recent-nooks">
            {recentNooks.map(([key, nook]) => (
              <button
                key={key}
                onClick={() => openNookbook(key)}
                className="recent-nook-btn"
              >
                <p className="recent-nook-title">{nook.name}</p>
              </button>
            ))}
          </div>
        ) : (
          <h6>No recent NookBooks. Begin Highlighting!</h6>
        )}

        <button
          className="see-more"
          onClick={openSidePanel}
        >
          More
        </button>
      </div>

    </div>
  )
}
