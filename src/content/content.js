console.log('nook content script loaded');


let isActive = false;
let highlightColor = '#FFFF00'; //default highlight color

//the highlighting is causing problems, so i need it to be inactive while notetaking
let isNoteOpen = false;


//need a way to get that active message from popup

chrome.runtime.onMessage.addListener((message) => {
    if(message.action === "HIGHLIGHT_TOGGLE"){
        isActive =  message.active;
        highlightColor = message.color;
        console.log("Highlighting active:", isActive);
    } //i think this is right..

    if(message.action === "HIGHLIGHT_COLOR"){
        highlightColor = message.color;
    }
})


document.addEventListener('mouseup', () => {

    if (!isActive) return;



    const selection =  window.getSelection();

    const selectedText = selection.toString().trim();
    console.log('Mouse up event detected.');


    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.style.backgroundColor = highlightColor;
    
    range.surroundContents(span);
    selection.removeAllRanges();


    if(selectedText.length > 0){
        showNoteCard(selectedText);
    } else {
        console.log("No text selected.");
    }
});

function showNoteCard(selectedText) {
    if(isNoteOpen) return; 
    isNoteOpen = true;


    const card = document.createElement('div');
    card.id = 'nook-note-card';
    card.style.cssText = `
        position: fixed;    
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-readius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 10000;
    `;

    card.innerHTML = `
        <textarea id="nook-note-input" placeholder="Add your note..." style = "width: 100%; height: 80px; margin: 10px 0;"></textarea>
        <div>
            <button id="nook-save-note">Save Note</button>
            <button id="nook-cancel-note">Cancel</button>
        </div>
    `;
    document.body.appendChild(card);

    document.getElementById('nook-note-input').focus();

    //saving the note
    document.getElementById('nook-save-note').onclick = () => {
        const noteText = document.getElementById('nook-note-input').value;
        saveNote(selectedText, noteText);
        card.remove();
        isNoteOpen = false;
    
    }


    //something to cancel
    document.getElementById('nook-cancel-note').onclick = () => {
        card.remove();
        isNoteOpen = false;
    };
};

function saveNote(selectedText, noteText) {
    const websiteKey = new URL(window.location.href);
    const pageUrl = window.location.href;
    const pageTitle = document.title;

    const newNote = {
        id: Date.now().toString(),
        text: selectedText,
        note: noteText,
        timestamp: Date.now(),
        color: highlightColor,
        url: pageUrl,
        title: pageTitle
    };
    
    // to get the nookbooks

chrome.storage.local.get(['nookbooks'], (result) => {
    const nookbooks = result.nookbooks || {};

    //and if it doesnt exist, to make one

    if(!nookbooks[websiteKey]){
        nookbooks[websiteKey] = {
            url: websiteKey,
            name: pageTitle,
            notes: []
        }
    }

    //this to save the note to the nookbook

    nookbooks[websiteKey].notes.push(newNote);

    chrome.storage.local.set({nookbooks}, () => {
        console.log('Note saved successfully.');
    });
});

}

