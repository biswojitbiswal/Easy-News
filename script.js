const apikey = "aa48656c8e434cfeaab41d8a9f63b1f4";
const input = document.querySelector('#search-input');
const button = document.querySelector('#search-btn');
const news = document.querySelector('.news-content');
const links = document.querySelectorAll('#query-link');
const home = document.querySelector('#home-link');

//for fetching info function
async function easyNews(keyword){
    keyword = keyword || "india";
    
    const url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apikey}`;

    const response = await fetch(url);
    const data = await response.json();

    // console.log(data);
    const articles = data.articles;

    //we use articlefragmented to allows you to append 
    //multiple elements without updating the DOM each time,
    // which can enhance performance.
    const articlesFragment = document.createDocumentFragment();
    articles.forEach((article) => {
        if(!article.urlToImage) return;

        const newslink = document.createElement('a');

        const date = new Date(article.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta"
        });

        newslink.href = article.url;
        newslink.innerHTML = `
        <div class="news-card">
            <img class="card-image" src="${article.urlToImage}" alt="">
            <div class="card-content">
                <h3>${article.title}</h3>
                <p class="source"><p>${article.source.name} : ${date}</p>
                <p>${article.description}</p>
            </div>
        </div>`

        // news.appendChild(newslink);
        articlesFragment.appendChild(newslink);

        newslink.addEventListener("click", (e) => {
            e.preventDefault();
             window.open(article.url, "_blank");
        })
    });
    news.appendChild(articlesFragment);
}

//for home loading
window.addEventListener("load", () => {
    easyNews("india");
})

//for search option
button.addEventListener("click", () => {
    news.innerHTML = "";
    const searchKeyword = input.value.trim();
    easyNews(searchKeyword);
})

//for adding function on navlink
let prevSelectedItem = null;
links.forEach((link) => {
    link.addEventListener("click", () => {
        news.innerHTML = "";
        const searchKeyword = link.innerHTML;   
        easyNews(searchKeyword);
        
        if (prevSelectedItem) {
            prevSelectedItem.classList.remove('active');
        }
        
        link.classList.add('active');
        prevSelectedItem = link;
        
    })
})

//for adding link in logo
home.addEventListener("click", () => {
    window.location.reload();
})



