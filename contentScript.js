// Create the div element for styling
var div = document.createElement("div");
div.style.textAlign = "center";
div.style.margin = "1em";

var form = document.createElement("form");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    const cFileContent = `#include <bits/stdc++.h>
    #define int long long
    using namespace std;

    void solve() {

    }

    signed main() {
        ios_base::sync_with_stdio(false);
        cin.tie(NULL); cout.tie(NULL);
        cin >> tc;
        while (tc--) {
            solve();
        }
        return 0;
    }
    `;

    const blob = new Blob([cFileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    var title = document.getElementsByClassName("title")[0];

    if (title) {

        // var trimmedString = title.textContent.trim();
        // var transformedString = trimmedString.replace(/[ .]+/g, '-');

        var filteredString = title.textContent.replace(/[^a-zA-Z0-9]+/g, '-');
  
        // Remove leading and trailing hyphens
        transformedString = filteredString.replace(/^-+|-+$/g, '');

        a.download = transformedString;
        a.download += '.cpp';
    }
    else {
        a.download = 'name.cpp';
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
input.value = "Generate file";
input.style.padding = "0 0.5em";

form.appendChild(input);
div.appendChild(form);
var sidebar = document.getElementById("sidebar");
sidebar.insertBefore(div, sidebar.firstChild);