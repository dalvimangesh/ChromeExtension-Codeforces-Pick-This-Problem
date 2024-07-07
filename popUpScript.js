document.getElementById('downloadBtn').addEventListener('click', function() {

    const template = document.getElementById('template').value;
    const language = document.getElementById('language').value;

    chrome.storage.local.set({'template':template},()=>{
        console.log('template had been stored');
    });

    chrome.storage.local.set({'language':language},()=>{
        console.log('language had been stored');
    });

    // alert('updated')

    document.getElementById('popup-container').style.display = 'none';
    // document.getElementById('language').style.display = 'none';
    // document.getElementById('downloadBtn').style.display = 'none';

    const updatedMessage = document.createElement('div');
    updatedMessage.textContent = 'Updated';
    updatedMessage.id = 'updatedMessage';
    updatedMessage.className = 'class="popup-container'
    document.body.appendChild(updatedMessage);

});
