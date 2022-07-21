function searchTextFunction() {
    let searchText = document.getElementById('searchBar').value;
    console.log(searchText)
    searchWhere = document.getElementById('searchEverywhereorTopHeadlines').innerText.trim();
    console.log(searchWhere)
    apiCall(searchWhere, searchText)
}

function searchEverywhereOrTopHeadlines() {
    //Initialize with the list of symbols
    let names = ["Breaking-News","World","Nation","Business","Technology","Entertainment","Sports","Science","Health"]

    //Find the input search box
    let search = document.getElementById("searchEverywhereOrHeadlines")

    //Find every item inside the dropdown
    let items = document.getElementsByClassName("dropdown-item")
    function buildDropDown(values) {
        let contents = []
        for (let name of values) {
            contents.push('<input type="button" class="dropdown-item" type="button" value="' + name + '"/>')
        }
        $('#menuItems').append(contents.join(""))

        //Hide the row that shows no items were found
        $('#empty').hide()
    }

    //Capture the event when user types into the search box
    window.addEventListener('input', function () {
        filter(search.value.trim().toLowerCase())
    })

    //For every word entered by the user, check if the symbol starts with that word
    //If it does show the symbol, else hide it
    function filter(word) {
        let length = items.length
        let collection = []
        let hidden = 0
        for (let i = 0; i < length; i++) {
            if (items[i].value.toLowerCase().startsWith(word)) {
                $(items[i]).show()
            }
            else {
                $(items[i]).hide()
                hidden++
            }
        }

        //If all items are hidden, show the empty view
        if (hidden === length) {
            $('#empty').show()
        }
        else {
            $('#empty').hide()
        }
    }

    //If the user clicks on any item, set the title of the button as the text of the item
    $('#menuItems').on('click', '.dropdown-item', function () {
        $('#searchEverywhereorTopHeadlines').text($(this)[0].value);
    })

    buildDropDown(names)
}

function apiCall(searchWhere, searchText) {
    const apiKey = '7eb16212df2f3f069d4ce7ca4951ce74'
    const xhr = new XMLHttpRequest();
    let newsAccordion = document.getElementById('newsAccordion');
    https://gnews.io/api/v4/search?q=example&token=API-Token
    xhr.open('GET', `https://gnews.io/api/v4/search?q=${searchText}&topic=${searchWhere}&token=${apiKey}`, true);
    

    // What to do when response is ready
    xhr.onload = function () {
        if (this.status === 200) {
            let json = JSON.parse(this.responseText);
            let articles = json.articles;
            console.log(articles);
            let newsHtml = "";
            articles.forEach(function (element, index) {
                if (element["content"] != null) {
                    // console.log(element, index)
                    let news = `<div class="col-sm-4 mb-4">
                                <div class="card h-100 ">
                                    <div class="card-body">
                                        <img class="card-img-top" src="${element["image"]}" alt="Card image cap">
                                        <div class="card-body">
                                        <h5 class="card-title">${element["title"]}</h5>
                                        <p class="card-text">${element["content"]}</p>
                                        <a href="${element['url']}" target="_blank" class="btn btn-primary">Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    newsHtml += news;
                }
            });
            newsAccordion.innerHTML = newsHtml;
        }
        else {
            console.log("Some error occured")
        }
    }

    xhr.send()
}

searchEverywhereOrTopHeadlines()
apiCall('breaking-news', 'canada')
