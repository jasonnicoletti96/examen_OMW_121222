class DataFetcher {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async fetchData() {
    try {
      const response = await fetch(this.apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  
}

class DataRenderer {
  constructor(data) {
    this.data = data;
  }

  renderData() {
    //duplicate node
    const dataContainer = document.querySelector('#character_card').cloneNode(true);
    dataContainer.querySelector(".Card__name").innerText = this.data.name;
    dataContainer.querySelector(".Card__image").src =  this.data.image;
    dataContainer.querySelector(".card__text").innerText = this.data.species+" "+this.data.type+" "+this.data.gender;
    dataContainer.querySelectorAll(".Card__text b")[0].innerText = this.data.location.name;
    dataContainer.querySelectorAll(".Card__text b")[1].innerText = this.data.origin.name;
    dataContainer.querySelector("ul").innerHTML = "";
    dataContainer.querySelector(".Card__episodes .Card__label").innerText ="Played in "+this.data.episode.length+" episodes:";
    for (let index = 0; index < this.data.episode.length; index++) {
      let li = document.createElement("li");
      this.getEpisode(this.data.episode[index]).then(episode =>{
        li.innerText = episode.name;
      });
      dataContainer.querySelector("ul").appendChild(li);
    }
    document.querySelector(".CharactersList").appendChild(dataContainer);
  }
  async getEpisode(url){
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
  }
}

const dataFetcher = new DataFetcher('https://rickandmortyapi.com/api/character');
dataFetcher.fetchData().then(data => {
  console.log(data)
  for (let index = 0; index < data.results.length; index++) {
    const dataRenderer = new DataRenderer(data.results[index]);
    dataRenderer.renderData();
  }
  document.querySelector("#character_card").remove();
});
