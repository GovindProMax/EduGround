// Initialize no of parameters
let addedParamCount = 0;

// Hide the parameters box on startup
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// If the user clicks on json box, hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})

// If the user clicks on params box, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

let addParam = document.getElementById('addParam');
addParam.addEventListener('click', (e) => {
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                    </div>
                    <button class="btn btn-primary deleteParam" onclick="deleteParameters()" > - </button>
                    </div>`;

    // Convert the element string to DOM node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    addedParamCount++;
})

function deleteParameters() {
    // Add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');

    for (item of deleteParam) {
        item.addEventListener('click', (e) => {

            e.target.parentElement.remove();

        })
    }
}

//Add sample request in the url field
document.getElementById("sampleGetRequest").addEventListener("click", () =>{
    document.getElementById("url").value = "https://jsonplaceholder.typicode.com/posts";
    success();
 });

// Disable the 'Send' button until it there is an entry in the url field
function success() {
    if(document.getElementById("url").value==="") { 
           document.getElementById('submit').disabled = true; 
       } else { 
           document.getElementById('submit').disabled = false;
       }
   }



function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Show please wait in the response box to request patience from the user
    document.getElementById('responsePrism').innerHTML = `<div class="text-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>`
    // Fetch all the values user has entered
    let url = document.getElementById("url").value;
    let requestType = document.querySelector(".requestDropdown select").value;
    let contentType = document.querySelector('input[name=contentType]:checked').value;
    addedParamCount = document.getElementById("params").childElementCount;
    // If user has used params option instead of json, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    // if the request type is get, invoke fetch api to create a post request
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    }

    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });

    }
});