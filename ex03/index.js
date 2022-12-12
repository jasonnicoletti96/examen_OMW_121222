class Chien {
  constructor(img) {
    this.img= "";
  }
  async getRandomImg(){
    const request = await fetch("https://dog.ceo/api/breeds/image/random");
    const result = await request.json();
    this.img=result.message;
  }
};


window.onload  = async()=>{
  
  const chiens=[];
  for (let i=0; i<3; i++) {
    chiens.push(new Chien());
    await chiens[i].getRandomImg();
    let img = document.createElement("img");
    
    img.src = chiens[i].img;
    document.getElementById("result").appendChild(img);
    
  }
  console.log(chiens);
}


//Utilisez l'API "https://dog.ceo/api/breeds/image/random" pour récupérer 3 images de chiens aléatoires et les afficher dans la balise 'result'.