console.log('nook content script loaded');


let isActive = false;

//need a way to get that active message from popup

chrome.runtime.onMessage.addListener((message) => {
    if(message.action === "activateHighlight"){
        isActive = !isActive;
        console.log("Highlighting active:", isActive);
    } //i think this is right..
})


document.addEventListener('mouseup', () => {

    if (!isActive) return;

    const selectedText = window.getSelection().toString().trim();
    console.log('Mouse up event detected.');


    if(selectedText.length > 0){
        console.log('Selected text:', selectedText);
        showNoteCard(selectedText);
    } else {
        console.log('No text selected.');
    }
});

function showNoteCard(selectedText) {
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
        <h3>Add Note</h3>
        <p>${selectedText}</p>
        <textarea id="nook-note-input" placeholder="Add your note..." style = "width: 100%; height: 80px; margin: 10px 0;"></textarea>
        <div>
            <button id="nook-save-note">Save Note</button>
            <button id="nook-cancel-note">Cancel</button>
        </div>
    `;
    document.body.appendChild(card);

    //saving the note
    document.getElementById('nook-save-note').onclick = () => {
        const noteText = document.getElementById('nook-note-input').value;
        saveNote(selectedText, noteText);
        card.remove();
    
    }


    //something to cancel
    document.getElementById('nook-cancel-note').onclick = () => {
        card.remove();
    };
};

function saveNote(selectedText, noteText) {
    const websiteKey = new URL(window.location.href).hostname;
    const pageUrl = window.location.href;
    const pageTitle = document.title;

    const newNote = {
        id: Date.now().toString(),
        text: selectedText,
        note: noteText,
        color: 'yellow',
        timestamp: Date.now(),
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
            name: websiteKey,
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

