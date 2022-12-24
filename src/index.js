"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chance_1 = __importDefault(require("chance"));
function generateScientificName() {
    const syllables = [
        "canis", "felis", "homo", "sapiens", "ursus", "arctos", "lupus",
        "crocodilus", "dinosaurus", "elephas", "giraffa", "leo",
        "panthera", "tigris", "aquila", "corvus", "falco",
        "merops", "nycticorax", "alcedo", "anas", "aurelia",
        "branta", "chen", "columba", "cygnus", "anas",
        "accipiter", "buteo", "circus", "falco", "accipiter",
        "anas", "branta", "chen", "columba", "cygnus",
        "anas", "accipiter", "buteo", "circus", "falco",
    ];
    const numSyllables = Math.floor(Math.random() * 2) + 1; // generate a random number of syllables between 1 and 2
    let name = "";
    for (let i = 0; i < numSyllables; i++) {
        name += syllables[Math.floor(Math.random() * syllables.length)]; // choose a random syllable from the list
    }
    return name;
}
function generateName() {
    // Generate a random number between 00 and 99
    const HD = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    // Generate a random scientific name
    const XXXXX = generateScientificName();
    // Generate a random letter
    const YY = String.fromCharCode(Math.floor(Math.random() * 26) + 'A'.charCodeAt(0));
    return `${HD} ${XXXXX} ${YY}`;
}
class GalaxyGenerator {
    constructor() {
        this.chance = new chance_1.default();
        this.starCount = 0; // initialize starCount to 0
    }
    generateStar(distribution) {
        if (this.starCount === 10) { // check if starCount is equal to 10
            return { size: 0, mass: 0, luminosity: 0, temperature: 0, name: "" }; // return an empty object
        }
        let size, mass, name;
        if (distribution === 'powerLaw') {
            // Use a power law distribution
            size = this.chance.normal({ mean: 1, dev: 0.5 });
            mass = this.chance.normal({ mean: 1, dev: 0.5 });
        }
        else if (distribution === 'uniform') {
            // Use a uniform distribution to generate the size and mass of the star
            size = this.chance.floating({ min: 0.5, max: 1.5 });
            mass = this.chance.floating({ min: 0.5, max: 1.5 });
        }
        else if (distribution === 'logNormal') {
            // Use a log-normal distribution to generate the size and mass of the star
            size = this.chance.normal({ mean: 0.5, dev: 0.5 });
            mass = this.chance.normal({ mean: 0.5, dev: 0.5 });
        }
        else {
            // Use the default power law distribution
            size = this.chance.normal({ mean: 1, dev: 0.5 });
            mass = this.chance.normal({ mean: 1, dev: 0.5 });
        }
        // Calculate the luminosity and temperature of the star using well-known equations from astrophysics
        const luminosity = (size ** 3) * (mass ** 3.5);
        const temperature = (mass / size ** 2) ** 0.5;
        // Generate a random name for the star
        name = generateName();
        this.starCount++; // increment starCount
        return { size, mass, luminosity, temperature, name };
    }
    generatePlanet(star, moonCount = 0) {
        if (moonCount === 10) { // check if moonCount is equal to 10
            return { size: 0, mass: 0, composition: "none", atmosphere: "none", temperature: 0, moons: [], name: "none", isWearable: false };
        }
        // Generate size, mass, and composition for the planet
        const size = this.chance.floating({ min: 0.5, max: 1.5 });
        const mass = this.chance.floating({ min: 0.5, max: 1.5 });
        const composition = this.chance.pickone(['rocky', 'gaseous', 'icy']);
        // Generate atmosphere and temperature for the planet based on its composition
        let atmosphere = "none", temperature = 0;
        if (composition === 'rocky') {
            atmosphere = this.chance.weighted(['none', 'thin', 'thick'], [4, 2, 1]);
            temperature = this.chance.floating({ min: -100, max: 100 });
        }
        else if (composition === 'gaseous') {
            atmosphere = this.chance.weighted(['thick', 'thin'], [1, 4]);
            temperature = this.chance.floating({ min: -20, max: 500 });
        }
        else if (composition === 'icy') {
            atmosphere = this.chance.weighted(['none', 'thin'], [5, 1]);
            temperature = this.chance.floating({ min: -200, max: 0 });
        }
        // Generate moons for the planet
        const numMoons = this.chance.integer({ min: 0, max: 5 });
        const moons = [];
        for (let i = 0; i < numMoons; i++) {
            moons.push(this.generatePlanet(star, moonCount + 1)); // recursive call to generatePlanet with updated moonCount
        }
        // Generate name and isWearable flag for the planet
        const name = generateName();
        const isWearable = this.chance.bool({ likelihood: 5 });
        return { size, mass, composition, atmosphere, temperature, moons, name, isWearable };
    }
    generateCelestialBody(distribution) {
        let size, mass, name;
        if (distribution === 'powerLaw') {
            // Use a power law distribution to generate the size and mass of the celestial body
            size = this.chance.normal({ mean: 1, dev: 0.5 });
            mass = this.chance.normal({ mean: 1, dev: 0.5 });
        }
        else if (distribution === 'uniform') {
            // Use a uniform distribution to generate the size and mass of the celestial body
            size = this.chance.floating({ min: 0.5, max: 1.5 });
            mass = this.chance.floating({ min: 0.5, max: 1.5 });
        }
        else if (distribution === 'logNormal') {
            // Use a log-normal distribution to generate the size and mass of the celestial body
            size = this.chance.normal({ mean: 0.5, dev: 0.5 });
            mass = this.chance.normal({ mean: 0.5, dev: 0.5 });
        }
        else {
            // Use the default power law distribution to generate the size and mass of the celestial body
            size = this.chance.normal({ mean: 1, dev: 0.5 });
            mass = this.chance.normal({ mean: 1, dev: 0.5 });
        }
        // Generate a random name for the celestial body
        name = generateName();
        // Generate a random distance for the celestial body
        const distance = this.chance.floating({ min: 0.1, max: 100 });
        return { size, mass, distance, name };
    }
}
const galaxyGenerator = new GalaxyGenerator();
const star = galaxyGenerator.generateStar();
console.log(star);
const planet = galaxyGenerator.generatePlanet(star);
console.log(planet);
const celestialBody = galaxyGenerator.generateCelestialBody();
console.log(celestialBody);
