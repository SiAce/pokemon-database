# Pokémon Database

The Pokémon Database showcases a refined approach to data integration and web design. By leveraging CSV files, global deployment strategies, and modern development practices, this project delivers seamless access to comprehensive Pokémon data.

## Live Deployment

The application is currently deployed on Netlify : [Live Application on Netlify](https://pokemon-siace.netlify.app/).

[![Pokémon Database](/src/assets/pokemon-logo.svg)](https://pokemon-siace.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/a61037fa-65d0-43c9-bda8-d440d5ebd82e/deploy-status)](https://app.netlify.com/sites/pokemon-siace/deploys)
[![Built with Astro](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

## Overview
This website delivers detailed Pokémon information through modern, responsive web design and efficient data processing. By integrating CSV files and optimized back-end logic, the project ensures that data builds quickly.

- **Pokémon Types:** Comprehensive details about each Pokémon's type(s).
- **Pokémon Abilities:** Inherent abilities associated with each Pokémon.
- **Moves:** A list detailing the available moves.
- **Encounters:** Specific encounter information related to moves.
- **Effort Values:** Insight into effort values that affect stat growth.
- **Basic Stats:** Core statistics including height, weight, and base experience.
- **Evolution Chain:** Detailed progression through each evolution stage.
- **Generations:** Classification of Pokémon by generation for historical context.

![Pokémon Database](/src/assets/background.avif)

## Deployment Status & Badges


## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**
  ```
  git clone https://github.com/yourusername/pokemon-database.git
  ```

2. **Navigate to the Project Directory**
  ```
  cd pokemon-database
  ```

3. **Install Dependencies**
  ```
  bun install
  ```

4. **Launch the Development Server**
  ```
  bun dev
  ```
  ## Build

  To create a production build of the project using Bun, run:
  ```
  bun build
  ```

  ## Usage

  Once the development server is running, visit the provided URL to explore the Pokémon database. Enjoy real-time insights and robust interactivity.

  ## Branch Overview

  This repository contains multiple branches illustrating various approaches to data management:

  - **Version 1:** Uses the Pokémon API for real-time data retrieval.
  - **Version 2:** Leverages Astro DB to seed and query a SQLite table.
  - **Version 3:** Reads and processes data from JSON files.
  - **Version 4:** Implements drizzle ORM for a comprehensive database schema with CSV-sourced data.
  - **Version 5 (Current):** Loads CSV data directly into memory for efficient processing.

  Switch branches to experience the distinct functionalities and design choices implemented in each version.

  ## Community Showcase

  The Pokémon Database project is proudly featured in the Astro Starlight community [site showcase](https://starlight.astro.build/resources/showcase/#:~:text=grpcmd-,Pokemon%20Database,-Cloudflare%20Docs). Explore similar projects at [Astro Starlight Showcase](https://starlight.astro.build/resources/showcase).
