import React from 'react'
import {useState, useEffect } from 'react';
import { ChevronUp, FilePenLine, House } from 'lucide-react';
export default function SidePanelApp() {

  const [nookbooks, setNookBooks] = useState({});

  useEffect (() => {
    chrome.storage.local.get(['nookbooks'], (result) => {
      setNookBooks(result.nookbooks || {});
      console.log('nookbook done', result.nookbooks);
    })

    const listener = (changes, area) => {
    if (area === "local" && changes.nookbooks) {
      setNookBooks(changes.nookbooks.newValue || {});
    }
  };

  // this was missing so the notes werent reeally updating on the view, just a small fix 
  chrome.storage.onChanged.addListener(listener);

  return () => {
    chrome.storage.onChanged.removeListener(listener);
  };

  }, []);

  



  return (

    <div>

      <div className = "sidepanel-header">
        <button>
          <FilePenLine size={24} />
        </button>
        
        <button>
          <ChevronUp size={24} />
        </button>
        

      </div>
      
      <div>
        <h1>NookBooks</h1>
        <hr/>
      </div>
        

<div className="nookbook-list">
      {(() => {
        if (Object.keys(nookbooks).length === 0) {
          return <p>No NookBooks available.</p>;
        } else {
          return Object.entries(nookbooks).map(([key, nookbook]) => (
            <div key={key} className="nookbook-item">
              <h2>{nookbook.name}</h2>
              <p>notes: {nookbook.notes.length || 0}</p>

              {nookbook.notes.map((note) => (
                <div key={note.id} className="note-item">
                  <p><strong>{note.text}</strong></p>
                  <p>{note.note}</p>
                </div>
              ))}
            </div>
          ));
        }
      })()}
    </div>

  </div>
  );
}