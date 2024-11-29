# Turborepo Project

This repository is a **Turborepo** that serves as a monorepo for managing multiple applications and packages with shared dependencies, ensuring efficient builds and streamlined development.

## Contents

- **apps/**
  - **myapp (RecipeWorld)** - A recipe management application where users can explore, add, edit, and rate recipes. See the [RecipeWorld README](apps/myapp/README.md) for more details.

### How It Works  
<video src="./apps/myapp/public/video/RecipeWorld.mp4" controls width="60%"></video>  

### See Responsiveness  
<video src="./apps/myapp/public/video/RecipeWorldResponsive22.mp4" controls width="60%"></video>

  - **web** - A placeholder for a generic web application.
  - **doc** - Documentation or content-related application.

- **packages/**
  - Shared packages and libraries that may be used across multiple apps in this repo.

## Key Features

- **Centralized Management:** All applications are managed in one place, with shared dependencies and configuration.
- **Efficient Builds:** Utilizes Turborepo’s caching and parallelization to improve build times.
- **Reusable Components:** Shared libraries and packages allow for code reuse across applications.
- **Consistent Environment:** Ensures that all apps in the monorepo follow consistent versioning and dependencies.

## Tech Stack

- **Monorepo Management:** [Turborepo](https://turbo.build/repo)
- **Primary Frameworks:** Next.js for web applications
- **Styling:** Tailwind CSS (primarily in `RecipeWorld`)
- **Image Hosting:** Cloudinary (used in `RecipeWorld`)
- **Database:** MongoDB (used in `RecipeWorld`)

## Setup and Development

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>```


2.**Install dependencies**:

```bash
npm install
Running Applications:
```
RecipeWorld (myapp): Navigate to apps/myapp and follow its specific setup instructions.
Other Applications: Follow similar instructions within each app’s folder if applicable.
Build and Run:

```bash
npm run build     # Builds all applications and packages
npm run dev       # Runs all applications in development mode
```
**Additional Resources**
RecipeWorld: See RecipeWorld README for detailed information on the recipe application.
Turborepo Documentation: https://turbo.build/repo/docs

Replace `<repository-url>` and `<repository-folder>` with your actual repository details. This structure will
