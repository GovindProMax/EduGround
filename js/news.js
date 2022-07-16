console.log("This is my index js file");

// Initialize the news api parameters
let source = 'the-times-of-india';
let apiKey = 'f81e0c84fc5f454a830949aac7fdac51'

// Grab the news container
let newsAccordion = document.getElementById('newsAccordion');

// Create an ajax get request
const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/everything?q=trump&apiKey=${apiKey}`, true);

// What to do when response is ready
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml = "";
        articles.forEach(function (element, index) {
            // console.log(element, index)
            let news = `<div class="col-sm-4">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <img class="card-img-top" src="${element["urlToImage"]}" alt="Card image cap">
                                        <div class="card-body">
                                        <h5 class="card-title">${element["title"]}</h5>
                                        <p class="card-text">${element["content"]}</p>
                                        <a href="${element['url']}" target="_blank" class="btn btn-primary">Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>`
            newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;
    }
    else {
        console.log("Some error occured")
    }
}

xhr.send()