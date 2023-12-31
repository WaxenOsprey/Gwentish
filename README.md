# Gwentish! - A Browser Card Game App

**Gwentish** is a browser-based card game app based on the popular card game Gwent from the Witcher series. The app will allow players to register and log in to play the game, and will feature a deck-building feature where players can customize their card decks. The game will be turn-based, with rules based on Gwent, including drawing cards at the beginning of the game, playing cards with abilities and power values, taking turns and playing cards strategically, and determining the winner based on card power. The app will also feature a visual display of player's lives and scores, and will integrate with the backend to handle game logic and rules.

## Screenshots

<div style="text-align: center">
   <span>
    <kbd>
      <img height="200px" alt="Portfolio page" src="./client/src/screenshots/title.png">
    </kbd>
     &emsp;&emsp;
    <kbd>
     <img height="200px" alt="Stock page" src="./client/src/screenshots/action.png">
    </kbd>
     <span>
 </div>

<hr>

## Demo Video

[Watch the Demo Video](https://youtu.be/UtxtS1FAiGI?si=0TUAN--aWV-vA7Y4)


## Built with:

- PostgreSQL
- Spring
- Java
- JavaScript
- React.js
- <a href="https://api.gwent.one/"> GwentOne API </a>

<hr>

<span>
<img hspace="5" height="50px" title="PostgreSQL" src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original.svg">
<img hspace="5" height="50px" title="Spring" src="https://github.com/devicons/devicon/blob/master/icons/spring/spring-original.svg">
<img hspace="5" height="50px" title="Java" src="https://github.com/devicons/devicon/blob/master/icons/java/java-original.svg">
<img hspace="5" height="50px" title="JavaScript" src="https://raw.githubusercontent.com/devicons/devicon/v2.15.1/icons/javascript/javascript-original.svg">
<img hspace="5" height="50px" title="React JS" src="https://raw.githubusercontent.com/devicons/devicon/v2.15.1/icons/react/react-original.svg">
<img hspace="5" height="50px" title="GwentOne API" src="https://gwent.one/image/favicon/favicon-96x96.png">
</span>

<hr>

## Getting Started

### Prerequisites

- Java 11
- Maven
- PostgreSQL


### Installation

1. Clone the repo
   ```sh
   git clone

    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Install Maven packages
    ```sh
    mvn install
    ```
4. Create a PostgreSQL database called `gwentish`
    ```sh
    createdb gwentish
    ```

5. Run the Spring server
    ```sh
    mvn spring-boot:run
    ```
6. Run the React app
    ```sh
    npm start
    ```
7. Open the app in your browser at `http://localhost:3000/`

<hr>


## Brief
Create a browser-based Gwent card game app that replicates the key features and gameplay mechanics of the original game.

## MVP
- Turn-based gameplay with rules based on Gwent, including:
  - Implement rarity levels for cards, affecting their power or special abilities
  - Drawing cards at the beginning of the game
  - Playing cards with abilities and power values
  - Taking turns and playing cards strategically
  - Determining the winner based on card power
- A visual display of player's lives and scores
- Integration with the backend to handle game logic and rules
- A feature for players to register and log in to the game
- A deck-building feature where players can create and customize their card decks

## EXTENSIONS
- Implement different factions with unique abilities and card sets
- Include an AI opponent for single-player mode
- Implement a leaderboard to track player rankings and scores


## Thanks to:

<a href="https://github.com/Greghi2000"> Gregorio Fumagalli </a>for his assistance during the early stages of the project. 
