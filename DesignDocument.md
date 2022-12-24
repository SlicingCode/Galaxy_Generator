## Introduction

The purpose of this project is to create a random galaxy generator written in TypeScript that can generate stars and planets with a focus on wearable and non-habitable planets. The galaxy generator will be based on statistical distributions and equations from astrophysics to generate the various properties of the stars and planets.

## Requirements

- The galaxy generator should be able to randomly generate the size, mass, luminosity, and temperature of stars using a power law distribution.
- The galaxy generator should be able to randomly generate the size, mass, composition, atmosphere, and temperature of planets.
- The generator should be able to generate both wearable and non-habitable planets, with a focus on generating planets that are in the wearable zone of their star for wearable planets and larger, more massive planets outside of the wearable zone for non-habitable planets.
- The generator should use Gaussian distributions to randomly determine the size and mass of planets, with the possibility of using other statistical distributions such as uniform or log-normal.
- The generator should include a range of options for the composition and atmosphere of the planets, including detailed descriptions of the types of environments on the planets.
- The generator should be able to generate planets with moons or other celestial bodies orbiting them, taking into account their distance from the parent planet and their own size and mass.
- The generator should be able to generate multiple galaxies at once, with the ability to specify the number of galaxies, the properties of each galaxy, and the ability to save and load generated galaxies from a file.
- The generator should incorporate real-world data or constraints, such as data from known exoplanets or astrophysical limits, to ensure the realism of the generated properties.
- The generator should have the ability to include advanced features for calculating the properties of the stars and planets, such as the effects of gravity and the presence of other celestial bodies.

## Implementation

### Star Generation

To generate the properties of the stars, the galaxy generator will use a power law distribution to randomly determine the size and mass of each star. The luminosity and temperature of the star will be calculated based on its size and mass using well-known equations from astrophysics.

### Planet Generation

The galaxy generator will first randomly determine whether the planet is wearable or not. If the planet is wearable, the generator will use a Gaussian distribution to randomly determine the size and mass of the planet, with a focus on generating planets that are in the wearable zone of their star. The composition and atmosphere of the wearable planet will be randomly generated based on a set of predetermined possibilities, such as rocky, gas giant, or water world. The temperature of the wearable planet will be calculated based on its distance from its star and the star's luminosity.

If the planet is not wearable, the generator will use a different Gaussian distribution to randomly determine its size and mass, with a focus on generating larger, more massive planets that are outside of the wearable zone of their star. The composition and atmosphere of the non-habitable planet will also be randomly generated, but will be limited to possibilities that are not conducive to the development of life, such as gas giants or molten worlds. The temperature of the non-habitable planet will be calculated based on its distance from its star and the star's luminosity.

### Additional Features

- The generator should allow the user to specify specific distributions or equations to use for generating the properties of the stars and planets.
- The generator should be able to generate entire galaxies with multiple arms or other complex structures.
- The generator should have more options for the composition and atmosphere of the planets, including more detailed descriptions of the types of environments that exist on the planets, such as ocean worlds or ice giants.
- The generator should implement the ability to generate planets with moons or other celestial bodies orbiting them, taking into account their distance from the parent planet and their own size and mass.
- The generator should be able to generate multiple galaxies at once, with the ability to specify the number of galaxies and the properties of each galaxy, such as the number of stars, size of the galaxy, and shape of the galaxy.
- The generator should have the ability to save and load generated galaxies from a file, allowing the user to revisit or share their creations with others.
- The generator should incorporate real-world data or constraints, such as data from known exoplanets or astrophysical limits, to ensure the realism of the generated properties.
- The generator should have the ability to include advanced features for calculating the properties of the stars and planets, such as the effects of gravity and the presence of other celestial bodies. This could allow the generator to more accurately simulate the conditions on the planets and the behavior of the stars and planets within the galaxy.

## Conclusion

This random galaxy generator will be a powerful tool for generating realistic and diverse galaxies with a focus on wearable and non-habitable planets. By using statistical distributions and equations from astrophysics, the generator will be able to create a wide range of properties for the stars and planets within the galaxy. With the ability to specify specific distributions and equations, generate multiple galaxies, and incorporate real-world data and constraints, the generator will be highly customizable and able to generate a wide variety of galaxies.