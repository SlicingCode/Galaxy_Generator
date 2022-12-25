import * as Chance from 'chance';

interface Star {
    name: string,
    size: number;
    mass: number;
    luminosity: number;
    temperature: number;
    planets: Planet[];
}

interface Planet {
    name: string,
    size: number;
    mass: number;
    composition: string;
    atmosphere: string;
    temperature: number;
    moons?: CelestialBody[];
    isWearable: boolean;
}

interface CelestialBody {
    name: string,
    size: number;
    mass: number;
    distance: number;
    isWearable: boolean;
}

function generateScientificName(): string {
    const syllables: string[] = [
        "canis", "felis", "homo", "sapiens", "ursus", "arctos", "lupus",
        "crocodilus", "dinosaurus", "elephas", "giraffa", "leo",
        "panthera", "tigris", "aquila", "corvus", "falco",
        "merops", "nycticorax", "alcedo", "anas", "aurelia",
        "branta", "chen", "columba", "cygnus", "anas",
        "accipiter", "buteo", "circus", "falco", "accipiter",
        "anas", "branta", "chen", "columba", "cygnus",
        "anas", "accipiter", "buteo", "circus", "falco",
    ];
    const numSyllables: number = Math.floor(Math.random() * 2) + 1; // generate a random number of syllables between 1 and 2
    let name: string = "";
    for (let i = 0; i < numSyllables; i++) {
        name += syllables[Math.floor(Math.random() * syllables.length)]; // choose a random syllable from the list
    }
    return name;
}

function generateGalaxyName(): string {
    // Generate a random scientific name
    const XXXXX: string = generateScientificName();

    return `Galaxy ${XXXXX}`;
}

function generateStarName(): string {
    // Generate a random scientific name
    const XXXXX: string = generateScientificName();

    return `Star ${XXXXX}`;
}

function generatePlanetName(): string {
    // Generate a random number between 00 and 99
    const HD: string = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    // Generate a random scientific name
    const XXXXX: string = generateScientificName();
    // Generate a random letter
    const YY: string = String.fromCharCode(Math.floor(Math.random() * 26) + 'A'.charCodeAt(0));

    return `Planet ${HD} ${XXXXX} ${YY}`;
}

function generateMoonName(): string {
    // Generate a random number between 00 and 99
    const HD: string = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    // Generate a random scientific name
    const XXXXX: string = generateScientificName();
    // Generate a random letter
    const YY: string = String.fromCharCode(Math.floor(Math.random() * 26) + 'A'.charCodeAt(0));

    return `Moon ${XXXXX} ${YY}${HD}`;
}


class GalaxyGenerator {
    private chance: Chance.Chance;

    constructor() {
        this.chance = new Chance.Chance();
    }

    public generateStar(
        distribution?: 'powerLaw' | 'uniform' | 'logNormal'
    ): Star {
        let size, mass, name;

        name = generateStarName();

        if (distribution === 'powerLaw') {
            // Use a power law distribution to generate the size and mass of the star
            size = this.chance.normal({ mean: 1, dev: 0.5 });
            mass = this.chance.normal({ mean: 1, dev: 0.5 });
        } else if (distribution === 'uniform') {
            // Use a uniform distribution to generate the size and mass of the star
            size = this.chance.floating({ min: 0.5, max: 1.5 });
            mass = this.chance.floating({ min: 0.5, max: 1.5 });
        } else if (distribution === 'logNormal') {
            // Use a log-normal distribution to generate the size and mass of the star
            size = this.chance.normal({ mean: 0.5, dev: 0.5 });
            mass = this.chance.normal({ mean: 0.5, dev: 0.5 });
        } else {
            // Use the default power law distribution
            size = this.chance.normal({ mean: 1, dev: 0.5 });
            mass = this.chance.normal({ mean: 1, dev: 0.5 });
        }

        // Calculate the luminosity and temperature of the star using well-known equations from astrophysics
        const luminosity = (size ** 3) * (mass ** 3.5);
        const temperature = (mass / size) ** 0.5;

        return {
            name,
            size,
            mass,
            luminosity,
            temperature,
            planets: []
        };
    }

    public generatePlanets(star: Star) {
        // Generate a random number of planets for the given star
        const numPlanets = this.chance.integer({ min: 0, max: 10 });

        // Create an array of planets
        const planets = [];
        for (let i = 0; i < numPlanets; i++) {
            // Generate a random value for the isWearable argument
            const isWearable = this.chance.bool();

            // Generate a planet with the random isWearable value
            const planet = this.generatePlanet(isWearable);

            // Generate a random number of moons for the planet
            const numMoons = this.chance.integer({ min: 0, max: 10 });

            // Create an array of celestial bodies for the moons
            const moons = [];
            for (let j = 0; j < numMoons; j++) {
                // Generate a random distance for the moon
                const distance = this.chance.floating({ min: 1, max: 100 });

                // Generate a celestial body with the random distance
                const moon = this.generateCelestialBody(distance);
                moons.push(moon);
            }

            // Add the moons to the planet
            planet.moons = moons;

            planets.push(planet);
        }

        // Add the planets to the star
        star.planets = planets;
    }

    public generatePlanet(
        isWearableParam: boolean,
        distribution?: 'gaussian' | 'uniform' | 'logNormal'
    ): Planet {
        let size, mass, name;
        const isWearableVariable = isWearableParam;

        name = generatePlanetName();

        if (distribution === 'gaussian') {
            // Use a Gaussian distribution to generate the size and mass of the planet
            if (isWearableVariable) {
                // Focus on generating planets in the wearable zone
                size = this.chance.normal({ mean: 1, dev: 0.5 });
                mass = this.chance.normal({ mean: 1, dev: 0.5 });
            } else {
                // Focus on generating larger, more massive planets outside of the wearable zone
                size = this.chance.normal({ mean: 1.5, dev: 0.5 });
                mass = this.chance.normal({ mean: 1.5, dev: 0.5 });
            }
        } else if (distribution === 'uniform') {
            // Use a uniform distribution to generate the size and mass of the planet
            if (isWearableVariable) {
                // Focus on generating planets in the wearable zone
                size = this.chance.floating({ min: 0.5, max: 1.5 });
                mass = this.chance.floating({ min: 0.5, max: 1.5 });
            } else {
                // Focus on generating larger, more massive planets outside of the wearable zone
                size = this.chance.floating({ min: 1, max: 2 });
                mass = this.chance.floating({ min: 1, max: 2 });
            }
        } else if (distribution === 'logNormal') {
            // Use a log-normal distribution to generate the size and mass of the planet
            if (isWearableVariable) {
                // Focus on generating planets in the wearable zone
                size = this.chance.normal({ mean: 0.5, dev: 0.5 });
                mass = this.chance.normal({ mean: 0.5, dev: 0.5 });
            } else {
                // Focus on generating larger, more massive planets outside of the wearable zone
                size = this.chance.normal({ mean: 1, dev: 0.5 });
                mass = this.chance.normal({ mean: 1, dev: 0.5 });
            }
        } else {
            // Use the default power law distribution
            size = this.chance.normal({ mean: 1.5, dev: 0.5 });
            mass = this.chance.normal({ mean: 1.5, dev: 0.5 });
        }

        // Generate a random composition for the planet
        const compositions = ['rocky', 'gaseous', 'icy', 'water', 'acid'];
        const composition = this.chance.pickone(compositions);

        // Generate a random atmosphere for the planet
        let atmosphere;
        if (composition === 'rocky') {
            atmosphere = this.chance.bool() ? 'none' : 'thin';
        } else if (composition === 'gaseous') {
            atmosphere = this.chance.bool() ? 'thick' : 'moderate';
        } else {
            atmosphere = 'none';
        }

        // Calculate the temperature of the planet using a well-known equation from astrophysics
        const temperature = (size / mass) ** 0.5;

        // Determine whether the planet is wearable
        // This should depend on the size, mass, temperature, and atmosphere of the planet
        const isWearable = (size >= 0.5 && mass >= 0.5 && temperature <= 100 && composition !== 'gaseous' || composition !== 'acid' && atmosphere !== 'none') || (atmosphere === 'gas');

        return {
            name,
            size,
            mass,
            composition,
            atmosphere,
            temperature,
            isWearable,
            moons: []
        };
    }

    public generateCelestialBody(
        distance: number,
        distribution?: 'uniform' | 'logNormal' | 'gaussian'
      ): CelestialBody {
        let size, mass, name;

        name = generateMoonName();
      
        if (distribution === 'gaussian') {
          // Use a Gaussian distribution to generate the size and mass of the celestial body
          size = this.chance.normal({mean: 1, dev: 0.5});
          mass = this.chance.normal({mean: 1, dev: 0.5});
        } else if (distribution === 'uniform') {
          // Use a uniform distribution to generate the size and mass of the celestial body
          size = this.chance.floating({min: 0.5, max: 1.5});
          mass = this.chance.floating({min: 0.5, max: 1.5});
        } else if (distribution === 'logNormal') {
          // Use a log-normal distribution to generate the size and mass of the celestial body
          size = this.chance.normal({mean: 0.5, dev: 0.5});
          mass = this.chance.normal({mean: 0.5, dev: 0.5});
        } else {
          // Use the default power law distribution
          size = this.chance.normal({mean: 1, dev: 0.5});
          mass = this.chance.normal({mean: 1, dev: 0.5});
        }
      
        // Calculate the wearability of the celestial body based on its mass, size, and distance from its parent star
        const isWearable =
          mass >= 0.5 && size >= 0.5 && distance <= 10;
      
        return {
          name,
          size,
          mass,
          distance,
          isWearable,
          };
    }

    public generateGalaxy(
        numStars: number,
        galaxyShape?: 'spiral' | 'elliptical' | 'irregular'
    ): { name: string; stars: Star[]; planets: Planet[] } {
        const stars: Star[] = [];
        const planets: Planet[] = [];

        let name = generateGalaxyName();

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
            name,
            stars,
            planets
        };
    }

    public displayPlanets(star: Star) {
        console.log(`Planets for star with size ${star.size}, mass ${star.mass}, luminosity ${star.luminosity}, and temperature ${star.temperature}:`);
        star.planets.forEach(planet => {
            console.log(`Planet with size ${planet.size}, mass ${planet.mass}, composition ${planet.composition}, atmosphere ${planet.atmosphere}, and temperature ${planet.temperature}`);
        });
    }

}

const generator = new GalaxyGenerator();

// Generate a star
const star = generator.generateStar();

// Generate planets for the star
generator.generatePlanets(star);

// Display the planets for the star
generator.displayPlanets(star);

console.log(`Star:`);
console.log(`  Name: ${star.name}`);
console.log(`  Size: ${star.size}`);
console.log(`  Mass: ${star.mass}`);
console.log(`  Luminosity: ${star.luminosity}`);
console.log(`  Temperature: ${star.temperature}`);
console.log(`  Planets:`);

// Display the planets and their moons
for (const planet of star.planets) {
    console.log(`  Planet:`);
    console.log(`    Name: ${planet.name}`);
    console.log(`    Size: ${planet.size}`);
    console.log(`    Mass: ${planet.mass}`);
    console.log(`    Composition: ${planet.composition}`);
    console.log(`    Atmosphere: ${planet.atmosphere}`);
    console.log(`    Temperature: ${planet.temperature}`);
    console.log(`    Wearability: ${planet.isWearable ? 'Wearable' : 'Non-wearable'}`);
    console.log(`    Moons:`);

    // Display the properties of each moon
    for (const moon of planet.moons ?? []) {
        console.log(`      Name: ${moon.name}`);
        console.log(`      Size: ${moon.size}`);
        console.log(`      Mass: ${moon.mass}`);
        console.log(`      Distance: ${moon.distance}`);
        console.log(`      Wearability: ${moon.isWearable ? 'Wearable' : 'Non-wearable'}`);
    }
}