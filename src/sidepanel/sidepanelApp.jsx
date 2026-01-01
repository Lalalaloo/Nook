import React from 'react'
import { useState, useEffect } from 'react';
import { ChevronUp, Highlighter, House } from 'lucide-react';
import {Highlight} from '../hooks/highlight';
import './sidepanel.css';


export default function SidePanelApp() {
  const [nookbooks, setNookBooks] = useState({});
  const [selectedNookbook, setSelectedNookbook] = useState(null); // Track which one is open

 
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


  const goBack = () => {
    setSelectedNookbook(null);
  };


  if (selectedNookbook) {
    const nookbook = nookbooks[selectedNookbook];
    return (
      <div>
        <div className="sidepanel-header">
          <button onClick={goBack}>
            <House size={24} />
          </button>
          <button>
            <ChevronUp size={24} />
          </button>
        </div>

        <div>
          <h1>{nookbook.name}</h1>
          <p>Click link to visit</p>
          <hr />
        </div>

     
        <div className="notes-list">
          {nookbook.notes.map((note) => (
            <div key={note.id} className="note-card">
              <div className="note-header">

                <span
                  className = "note-color-indicator"
                  style={{ backgroundColor: note.color }}

                />
                <strong>{note.text}</strong>
              </div>
              <div className="note-body">
                <p>{note.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  
  return (
    <div>
      <div className="sidepanel-header">
        <Highlight />
        <button>
          <ChevronUp size={24} />
        </button>
      </div>

      <div>
        <h1>NookBooks</h1>
        <hr />
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
              <p>{nookbook.notes.length} notes</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}