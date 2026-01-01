import React from 'react'
import { Highlighter } from 'lucide-react';
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

        <h3>Welcome to Nook</h3>
        <hr/>

        <div className = 'highlight-button'>
            <Highlight/>
        </div>

        <h4>Recent NookBooks:</h4>

        {recentNooks.length > 0 ? (
          <div className="recent-nooks">
            {recentNooks.map(([key, nook]) => (
              <button
                key={key}
                onClick={() => openNookbook(key)}
                className="recent-nook-btn"
              >
                <div>{nook.name}</div>
                <small>{nook.notes.length} notes</small>
              </button>
            ))}
          </div>
        ) : (
          <div>No recent NookBooks. Begin Highlighting!</div>
        )}

        
        <button onClick={openSidePanel}>See more</button>
    </div>
  )
}
