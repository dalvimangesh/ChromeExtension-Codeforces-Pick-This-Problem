// Create the div element for styling
var div = document.createElement("div");
div.style.textAlign = "center";
div.style.margin = "1em";

var form = document.createElement("form");

form.addEventListener("submit", async function (event) {

    event.preventDefault(); // Prevent the form from submitting

    template = "";
    language = ".cpp";

    const getTemplate = new Promise((resolve, reject) => {
        chrome.storage.local.get(["template"], (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(result.template);
            }
        });
    });

    const getLanguage = new Promise((resolve, reject) => {
        chrome.storage.local.get(["language"], (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(result.language);
            }
        });
    });

    template = await getTemplate;
    language = await getLanguage;


    console.log(template)
    console.log(language)

    const cFileContent = template;

    const blob = new Blob([cFileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    var title = document.getElementsByClassName("title")[0];

    if (title) {
        
        var filteredString = title.textContent.replace(/[^a-zA-Z0-9]+/g, '-');
  
        // Remove leading and trailing hyphens
        transformedString = filteredString.replace(/^-+|-+$/g, '');

        a.download = transformedString;
        a.download += language;
    }
    else {
        a.download = 'name' + language;
    }

    chrome.runtime.sendMessage({ action: "getTabUrl" }, (response) => {

        if (response && response.url) {

            regex = /(?:contest|problemset\/problem)\/(\d+)/;

            var match = response.url.match(regex);

            if (match) {

                var contestId = match[1];
                console.log(contestId);
                a.download = contestId + '-' + a.download;

                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

            }

        }

        else {
            console.log('url not found')
        }

    });

});

// Create the input element
var input = document.createElement("input");
input.type = "submit";
input.name = "submit";
input.value = "Pick This Problem";
input.style.padding = "0 0.5em";

form.appendChild(input);
div.appendChild(form);
var sidebar = document.getElementById("sidebar");
sidebar.insertBefore(div, sidebar.firstChild);