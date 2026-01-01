import React, { use } from 'react'
import { useState, useEffect } from 'react';
import {  House, Trash } from 'lucide-react';
import {Highlight} from '../hooks/highlight';
import './sidepanel.css';


export default function SidePanelApp() {
  const [nookbooks, setNookBooks] = useState({});
  const [selectedNookbook, setSelectedNookbook] = useState(null); 

  const deleteNote = (nookbookKey, noteId) => {
    chrome.storage.local.get(['nookbooks'], (result) => {
      const nookbooks = result.nookbooks || {};

      if (!nookbooks[nookbookKey]) return;

      nookbooks[nookbookKey].notes = nookbooks[nookbookKey].notes.filter(
        (note) => note.id !== noteId
      );

      nookbooks[nookbookKey].lastUpdated = Date.now();

      chrome.storage.local.set({ nookbooks });
    });
};

const deleteNookbook = (nookbookKey) => {
  if (!confirm("Delete this NookBook and all its notes?")) return;

  chrome.storage.local.get(['nookbooks'], (result) => {
    const nookbooks = result.nookbooks || {};

    delete nookbooks[nookbookKey];

    chrome.storage.local.set({ nookbooks });
  });
};



 useEffect(() => {
    chrome.storage.local.get(['nookbooks'], (result) => {
      setNookBooks(result.nookbooks || {});
    })

    const listener = (changes, area) => {
      if (area === "local" && changes.nookbooks) {
        setNookBooks(changes.nookbooks.newValue || {});
      }
    };

    

    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }, []);

  useEffect(() => {
  chrome.storage.local.get(['openNookbookKey'], (result) => {
    if (result.openNookbookKey) {
      setSelectedNookbook(result.openNookbookKey);

      chrome.storage.local.remove('openNookbookKey');
    }
  });
}, []);



  const goBack = () => {
    setSelectedNookbook(null);
  };

  const goWebsite = () => {
    chrome.tabs.create({ url: nookbooks[selectedNookbook]?.notes[0]?.url });
  }

  if (selectedNookbook) {
    const nookbook = nookbooks[selectedNookbook];
    return (
      <div>
        <div className="sidepanel-in-header">
          <button 
          className = 'house'
          onClick={goBack}>
            <House size={24} />
          </button>
          
        </div>

        <div className = 'inside-nookbook'>
          <p
          className = "nookbook-title"
          onClick={() => goWebsite()}
          >{nookbook.name}</p>
          <p className =  'link-msg'>Click title to visit site</p>
          
          <hr className = "note-title-break"/>
        </div>

     
        <div className="notes-list">

          {nookbook.notes.map((note) => (

            <div key={note.id} className="note-card">
              <div className="note-header">
                <strong className="note-title">{note.note}</strong>

                <span
                  className="note-color-indicator"
                  style={{ backgroundColor: note.color }}
                />

              </div>
              <hr className = 'header-body-br'/>
              <div className="note-body">
                <p>{note.text}</p>


                <button
                  className="delete-note-btn"
                  onClick={() => deleteNote(selectedNookbook, note.id)}
                >
                  <Trash size = {16}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  
  return (
    <div>
      <div className="sidepanel-out-header">
        <Highlight />
      </div>

      <div className = 'sidepanel-title'>
        <h2 className = 'title'>NookBooks</h2>
        <hr className= 'hr-title-sidebar'/>
      </div>

      <div className="nookbook-grid">
        {Object.keys(nookbooks).length === 0 ? (
          <p>No NookBooks available.</p>
        ) : (
          Object.entries(nookbooks).map(([key, nookbook]) => (
            <div 
              key={key} 
              className="nookbook-card"
              onClick={() => setSelectedNookbook(key)} 
            >
              <h3>{nookbook.name}</h3>
              <button
            className="delete-nookbook-btn"
            onClick={(e) => {
              e.stopPropagation(); 
              deleteNookbook(key);
            }}
          >
            <Trash size={10}/>
          </button>
              
            </div>
          ))
        )}
      </div>
    </div>
  );
}