import { useState } from "react";
import React from "react";

export function useHighlighter() {
    const [active, setActive] = useState(false);
    const [color, setColor] = useState("#FFC9C9");

    const toggleHighlight = async () => {
        const next = !active;
        setActive(next);

        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.tabs.sendMessage(tab.id, {
        action: "HIGHLIGHT_TOGGLE",
        active: next,
        color,
        });
  };

    const selectColor = async (newColor) => {
    setColor(newColor);

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, {
      action: "HIGHLIGHT_COLOR",
      color: newColor,
    });
  };

  return {
    active,
    color,
    toggleHighlight,
    selectColor,
  };



}