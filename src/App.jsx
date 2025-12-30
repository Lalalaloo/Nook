import React from 'react';
import { ChevronUp } from 'lucide-react';

export default function App() {
  const handlesidePanel = () => {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
    }
  return (

    
    <div>
     hello

      <button onClick={handlesidePanel}>
        <ChevronUp />
      </button>
    </div>
  )
}
