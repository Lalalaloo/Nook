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

    const selection = window.getSelection().toString().trim();
    console.log('Mouse up event detected.');


    if(selection.length > 0){
        console.log('Selected text:', selection);
    } else {
        console.log('No text selected.');
    }
});