class Vehicule {
  // Constructeur
  constructor(marque, modele, vitesseMax) {
    this.marque = marque;
    this.modele = modele;
    this.vitesseMax = vitesseMax;
  }

  // Méthode pour afficher les détails du véhicule
  afficherDetails() {
    console.log(`Marque : ${this.marque}`);
    console.log(`Modèle : ${this.modele}`);
    console.log(`Vitesse maximale : ${this.vitesseMax}`);

  }

  // Méthode pour mettre à jour la vitesse maximale
  mettreAJourVitesseMax(nouvelleVitesseMax) {
    this.vitesseMax = nouvelleVitesseMax;
  }
}

class Moto extends Vehicule {
  // Constructeur
  constructor(marque, modele, vitesseMax, nombreDeRoues) {
    // Appeler le constructeur parent
    super(marque, modele, vitesseMax);

    // Initialiser la propriété spécifique à la moto
    this.nombreDeRoues = nombreDeRoues;
    

  }

  // Méthode pour afficher les détails de la moto
  afficherDetails() {
    // Appeler la méthode afficherDetails() du parent
    super.afficherDetails();
    // Afficher la propriété spécifique à la moto
    console.log(`Nombre de roues : ${this.nombreDeRoues}`);
  }
}

const maMoto = new Moto("Harley-Davidson", "Iron 883", 180, 2);
maMoto.afficherDetails();
maMoto.mettreAJourVitesseMax(200);
maMoto.afficherDetails();