"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Chance = require("chance");
class GalaxyGenerator {
    constructor() {
        this.chance = new Chance();
    }
    generateStar(distribution) {
        let size, mass;
        if (distribution === 'powerLaw') {
            // Use a power law distribution to generate the size and mass of the star
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
        const temperature = (mass / size) ** 0.5;
        return {
            size,
            mass,
            luminosity,
            temperature
        };
    }
    generatePlanet(isWearable, distribution) {
        let size, mass;
        if (distribution === 'gaussian') {
            // Use a Gaussian distribution to generate the size and mass of the planet
            if (isWearable) {
                // Focus on generating planets in the wearable zone
                size = this.chance.normal({ mean: 1, dev: 0.5 });
                mass = this.chance.normal({ mean: 1, dev: 0.5 });
            }
            else {
                // Focus on generating larger, more massive planets outside of the wearable zone
                size = this.chance.normal({ mean: 1.5, dev: 0.5 });
                mass = this.chance.normal({ mean: 1.5, dev: 0.5 });
            }
        }
        else if (distribution === 'uniform') {
            // Use a uniform distribution to generate the size and mass of the planet
            if (isWearable) {
                // Focus on generating planets in the wearable zone
                size = this.chance.floating({ min: 0.5, max: 1.5 });
                mass = this.chance.floating({ min: 0.5, max: 1.5 });
            }
            else {
                // Focus on generating larger, more massive planets outside of the wearable zone
                size = this.chance.floating({ min: 1.5, max: 2.5 });
                mass = this.chance.floating({ min: 1.5, max: 2.5 });
            }
        }
        else if (distribution === 'logNormal') {
            // Use a log-normal distribution to generate the size and mass of the planet
            if (isWearable) {
                // Focus on generating planets in the wearable zone
                size = this.chance.normal({ mean: 0.5, dev: 0.5 });
                mass = this.chance.normal({ mean: 0.5, dev: 0.5 });
            }
            else {
                // Focus on generating larger, more massive planets outside of the wearable zone
                size = this.chance.normal({ mean: 1.5, dev: 0.5 });
                mass = this.chance.normal({ mean: 1.5, dev: 0.5 });
            }
        }
        else {
            // Use the default Gaussian distribution
            if (isWearable) {
                // Focus on generating planets in the wearable zone
                size = this.chance.normal({ mean: 1, dev: 0.5 });
                mass = this.chance.normal({ mean: 1, dev: 0.5 });
            }
            else {
                // Focus on generating larger, more massive planets outside of the wearable zone
                size = this.chance.normal({ mean: 1.5, dev: 0.5 });
                mass = this.chance.normal({ mean: 1.5, dev: 0.5 });
            }
        }
        // Randomly generate the composition and atmosphere of the planet based on predetermined possibilities
        let composition;
        let atmosphere;
        if (isWearable) {
            composition = this.chance.pickone(['rocky', 'gas giant', 'water world']);
            atmosphere = this.chance.pickone(['none', 'thin', 'thick']);
        }
        else {
            composition = this.chance.pickone(['gas giant', 'molten world']);
            atmosphere = this.chance.pickone(['none', 'thin']);
        }
        return {
            size,
            mass,
            composition,
            atmosphere,
            // Calculate the temperature of the planet based on its distance from its star and the star's luminosity
            temperature: this.chance.floating({ min: -273, max: 273 })
        };
    }
    generateCelestialBody(distance, distribution) {
        let size, mass;
        if (distribution === 'gaussian') {
            // Use a Gaussian distribution to generate the size and mass of the celestial body
            size = this.chance.normal({ mean: 0.5, dev: 0.5 });
            mass = this.chance.normal({ mean: 0.5, dev: 0.5 });
        }
        else if (distribution === 'uniform') {
            // Use a uniform distribution to generate the size and mass of the celestial body
            size = this.chance.floating({ min: 0.1, max: 0.9 });
            mass = this.chance.floating({ min: 0.1, max: 0.9 });
        }
        else if (distribution === 'logNormal') {
            // Use a log-normal distribution to generate the size and mass of the celestial body
            size = this.chance.normal({ mean: 0.1, dev: 0.1 });
            mass = this.chance.normal({ mean: 0.1, dev: 0.1 });
        }
        else {
            // Use the default Gaussian distribution
            size = this.chance.normal({ mean: 0.5, dev: 0.5 });
            mass = this.chance.normal({ mean: 0.5, dev: 0.5 });
        }
        return {
            size,
            mass,
            distance
        };
    }
    generateGalaxy(numStars, galaxyShape) {
        const stars = [];
        const planets = [];
        for (let i = 0; i < numStars; i++) {
            const star = this.generateStar();
            stars.push(star);
            // Generate a random number of planets for each star
            const numPlanets = this.chance.integer({ min: 0, max: 10 });
            for (let j = 0; j < numPlanets; j++) {
                // Randomly determine whether the planet is wearable or not
                const isWearable = this.chance.bool();
                const planet = this.generatePlanet(isWearable);
                planets.push(planet);
                // Generate a random number of celestial bodies orbiting the planet
                const numBodies = this.chance.integer({ min: 0, max: 5 });
                for (let k = 0; k < numBodies; k++) {
                    // Generate the celestial body with a random distance from the planet
                    const distance = this.chance.floating({ min: 0.1, max: 1 });
                    const body = this.generateCelestialBody(distance);
                    planet.moons && planet.moons.push(body);
                }
            }
        }
        return {
            stars,
            planets
        };
    }
}
const generator = new GalaxyGenerator();
const galaxy = generator.generateGalaxy(10);
console.log(galaxy);
