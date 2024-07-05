// Create the div element for styling
var div = document.createElement("div");
div.style.textAlign = "center";
div.style.margin = "1em";

// Create the form element
var form = document.createElement("form");

// Add submit event listener to the form

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting
    // alert("Hey"); // Show the popup


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

    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;

    var title = document.getElementsByClassName("title")[0];

    if (title) {

        var trimmedString = title.textContent.trim();

        // Replace spaces and periods with hyphens, and replace multiple consecutive hyphens with a single hyphen
        var transformedString = trimmedString.replace(/[ .]+/g, '-');

        // Log the result
        // console.log(transformedString);


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

// Append the input to the form
form.appendChild(input);

// Append the form to the div
div.appendChild(form);

// Find the sidebar element
var sidebar = document.getElementById("sidebar");

// Append the div at the start of the sidebar
sidebar.insertBefore(div, sidebar.firstChild);