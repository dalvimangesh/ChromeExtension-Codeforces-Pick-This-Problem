// console.log('Mangesh here Mangesh here Mangesh here Mangesh here Mangesh here Mangesh here Mangesh here Mangesh here Mangesh here Mangesh here Mangesh here Mangesh here Mangesh here Mangesh here')

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


    const cFileContent = `#include <stdio.h>

    int main() {
        printf("Hello, World!\\n");
        return 0;
    }`;

    const blob = new Blob([cFileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;

    var title = document.getElementsByClassName("title")[0];

    if(title) {

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

    document.body.appendChild(a);
    a.click();

    // Clean up the temporary anchor element
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

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