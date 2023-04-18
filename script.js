function getStockData() {
  let symbol = document.getElementById("symbol").value;

  // Create new Http Request object to retrieve stock data
  const xhr = new XMLHttpRequest();
  const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=e0b08b9febb84e60baed9cef20fdd020&source=docs`;

  xhr.open("GET", url);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);

      const { open, high, low, close, volume } = data.values[0];

      const stockData = document.getElementById("stock-data");

      stockData.innerHTML = `<p>Open: $${open}</p>
                             <p>High: $${high}</p>
                             <p>Low: $${low}</p>
                             <p>Close: $${close}</p>
                             <p>Volume: ${volume}</p>`;

      // Call function to fetch news data
      getNewsData(symbol);
    } else {
      alert("Error retrieving data");
    }
  };

  xhr.send();
}

function getNewsData(symbol) {
  // Create new Http Request object to retrieve news data
  const xhr = new XMLHttpRequest();
  const url = `https://newsapi.org/v2/everything?q=${symbol}&apiKey=f43dda9540c14f5498881135863b0d2f`;

  xhr.open("GET", url);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);

      const articles = data.articles;

      const newsData = document.getElementById("news-data");

      let newsHTML = "";

      articles.slice(0, 5).forEach((article) => {
        newsHTML += `<div class="article">
                      <h3><a href="${article.url}">${article.title}</a></h3>
                      <p>${article.description}</p>
                    </div>`;
      });

      newsData.innerHTML = newsHTML;
    } else {
      alert("Error retrieving data");
    }
  };

  xhr.send();
}
