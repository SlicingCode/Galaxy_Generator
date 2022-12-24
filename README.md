# Galaxy_Generator

Welcome to the Random Galaxy Generator, a tool for generating realistic and diverse galaxies with a focus on wearable and non-habitable planets. This generator uses statistical distributions and equations from astrophysics to create a wide range of properties for the stars and planets within the galaxy.

## Features

- Generate stars with random size, mass, luminosity, and temperature using a power law distribution
- Generate planets with random size, mass, composition, atmosphere, and temperature
- Generate both wearable and non-habitable planets, with a focus on generating - planets in the wearable zone for wearable planets and larger, more massive planets outside of the wearable zone for non-habitable planets
- Use Gaussian distributions to randomly determine the size and mass of planets, with the possibility of using other distributions such as uniform or log-normal
- Include a range of options for the composition and atmosphere of the planets, including detailed descriptions of the types of environments on the planets
- Generate planets with moons or other celestial bodies orbiting them, taking into account their distance from the parent planet and their own size and mass
- Generate multiple galaxies at once, with the ability to specify the number of galaxies and the properties of each galaxy
- Save and load generated galaxies from a file
- Incorporate real-world data or constraints, such as data from known exoplanets or astrophysical limits, to ensure the realism of the generated properties
- Include advanced features for calculating the properties of the stars and planets, such as the effects of gravity and the presence of other celestial bodies

## Getting Started

To get started with the Random Galaxy Generator, clone the repository and install the dependencies:
```
git clone https://github.com/<your-username>/random-galaxy-generator.git
cd random-galaxy-generator
npm install
```
Then, run the generator using the following command:
```
npm run start
```
## Configuration

The generator can be configured by modifying the config.json file in the root directory. This file allows you to specify the distribution or equation to use for generating the properties of the stars and planets, as well as the options for the composition and atmosphere of the planets.

## Contributing

We welcome contributions to the Random Galaxy Generator. If you would like to contribute, please fork the repository and create a pull request with your changes.

## License

The Random Galaxy Generator is licensed under the MIT License. See the **LICENSE** file for more information.