Nook:
-A chrome extension that is designed to make online research faster and easier.
Highlight text on any website, add a note and nook will automatically organize everything into NookBooks (folders for each website), ready for you to view them in a side panel.

I built Nook to solve my own problem. I do LOTS of research while learning, and constantly lose track of where I found information. I wanted a way to highlight and take notes directly on web pages without switching apps.

Screenshot:
![nook](https://github.com/user-attachments/assets/956626f8-5fa7-48b6-aa82-260ac49a8e94)


**Features**
Highlight & Annotate
  - Highlight text on any webpage
  - Attach a custom note to each highlight

- Automatic Organization
    - Notes are grouped into NookBooks based on their source website
    - Each NookBook contains all highlights + notes from that site

- Side Panel Interface
  - Persistent side panel for browsing NookBooks and notes
  - Click a NookBook title to go to the website of the NookBook

- Recent NookBooks (Popup)
  - Popup shows the three most recently updated NookBooks
  - Quick access to continue research

- Deletion Controls
  - Delete individual notes
  - Delete entire NookBooks
 
**Tech Stack**
- React – UI and state management
- Chrome Extension APIs
  - chrome.storage
  - chrome.tabs
  - chrome.sidePanel
- JavaScript / CSS
- Lucide Icons


**Future Improvements**
I'm intentionally tracking these as future work rather than unfinished features:
- Animations & micro-interactions
- Search within NookBooks
- Editable notes & highlights
- Sync support
- Improved accessibility

 **What I Learned**
- Chrome Extension architecture (manifest v3, content scripts, background workers)
- Working with chrome.storage API
- Managing state across different extension contexts (popup, side panel, content scripts)
- Text selection and range manipulation in the DOM

**Installation Guide**
1. Download or clone this repo
2. run:
   - `npm install`
   - `npm run build`
5. Open Chrome and go to `chrome://extensions/`
6. Enable "Developer mode" (toggle in top right)
7. Click "Load unpacked" and select the `dist/` folder in the extension
8. Nook should appear in your extensions
