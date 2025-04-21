
document.getElementById("keyword").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      searchNews(); 
    }
  });
  
  document.getElementById("date").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      searchNews(); 
    }
  });
  
  document.getElementById("domain").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      searchNews(); 
    }
  });
  
  // Lugar de la Magia
  async function searchNews() {
    const apiKey = "fffe7a55994743e8ba58564f1ee00255";
    const keyword = document.getElementById("keyword").value;
    const date = document.getElementById("date").value;
    const domain = document.getElementById("domain").value;
    const language = document.getElementById("language").value;
  

    
    // Crear la URL de la API 
    let url = `https://newsapi.org/v2/everything?apiKey=${apiKey}&language=${language}`;
  
    if (keyword) url += `&q=${encodeURIComponent(keyword)}`;
    if (date) url += `&from=${date}&to=${date}`;
    if (domain) url += `&domains=${domain}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === "ok" && data.articles.length > 0) {
        displayNews(data.articles);
      } else {
        document.getElementById("news-container").innerHTML = "No se encontraron noticias.";
      }
    } catch (error) {
      console.error("Error al obtener noticias:", error);
      document.getElementById("news-container").innerHTML = "Hubo un error al cargar las noticias.";
    }
  }
  
  function displayNews(articles) {
    const container = document.getElementById("news-container");
    container.innerHTML = ''; // Limpiar contenedor
  
    articles.forEach(article => {
      const newsElement = document.createElement("div");
      newsElement.classList.add("news-item");
  
      // Si la noticia tiene imagen, agregarla
      if (article.urlToImage) {
        const image = document.createElement("img");
        image.src = article.urlToImage;
        newsElement.appendChild(image);
      }
  //titulo de la noticia
      const title = document.createElement("h3");
      title.textContent = article.title;
  //descripcion de la noticia   
      const description = document.createElement("p");
      description.textContent = article.description || "No hay descripción disponible.";
  //link a la noticia
      const link = document.createElement("a");
      link.href = article.url;
      link.target = "_blank";
      link.textContent = "Leer más";
  
      newsElement.appendChild(title);
      newsElement.appendChild(description);
      newsElement.appendChild(link);
      container.appendChild(newsElement);
    });
  }
  