import React from 'react'
import { useHighlighter } from './useHighlighter'
import { Highlighter } from 'lucide-react';

const colors = [
        '#FFC9C9', 
        '#FF6E6E', 
        '#FBDF91', 
        '#EEA769', 
        '#A9D59F', 
        '#9FC3D5', 
        '#D4B9ED'
    ];


export function Highlight() {

    const { active, color, toggleHighlight, selectColor } = useHighlighter();
  return (

    <div>
    <button 
        onClick={toggleHighlight}
        className = "highlight-toggle-button"
        style = {{
            backgroundColor: active ? color : 'transparent',
        }}
        >
        <Highlighter size={16} style={{marginRight: '8px'}}/>
        </button>

        {active && (
          <div className="color-options">
            {colors.map((c) => (
               <button 
               key = {c}
               onClick = {() => selectColor(c)}
                className = "color-option-button"
                />
            ))}
          </div>
        )
        
        }
        </div>
  )
}

