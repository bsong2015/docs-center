# Project Overview

This project is a documentation center built using Docusaurus, a modern static website generator. It is designed to host documentation for multiple products, including EIAM, CIAM, and IDaaS, in a unified and centralized manner.

The key technologies used are:
- **Docusaurus:** A React-based static site generator for building documentation websites.
- **TypeScript:** For type-safe code.
- **React:** For building the UI components.
- **MDX:** For writing documentation pages with embedded JSX components.

The project supports documentation versioning (as seen with the EIAM product) and internationalization (i18n) with support for English and Chinese (zh-Hans).

# Building and Running

The following scripts are available in `package.json` to manage the application:

- **Installation:**
  ```bash
  yarn
  ```

- **Local Development:**
  To start the local development server:
  ```bash
  yarn start
  ```
  This will open a browser window with the website, and most changes will be reflected live.

- **Build:**
  To generate a static build of the website:
  ```bash
  yarn build
  ```
  The output will be in the `build` directory.

- **Type Checking:**
  To run the TypeScript compiler and check for type errors:
  ```bash
  yarn typecheck
  ```

# Development Conventions

- **Project Structure:** The documentation for each product is organized into its own directory under `docs/digital-identity/`. Each product is configured as a separate Docusaurus content plugin in `docusaurus.config.ts`.
- **Sidebars:** Navigation for each product's documentation is defined in its own sidebar file (e.g., `sidebars-eiam.ts`).
- **Internationalization (i18n):** Translated content is stored in the `i18n` directory. New translations should be added there, following the existing structure.
- **Versioning:** The EIAM documentation is versioned. Versioned docs are stored in `eiam_versioned_docs`, and versioned sidebars are in `eiam_versioned_sidebars`.
- **Custom Components:** Custom React components used in the website are located in the `src/components` directory.
- **Styling:** Custom CSS is located in `src/css/custom.css`.
