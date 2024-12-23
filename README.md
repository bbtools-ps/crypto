# Crypto

Crypto is a simple cryptography web app built with React, TypeScript, TailwindCSS and Material-UI (MUI).

## Features

- Single page application (SPA)
- Supports multiple ciphers:
  - Caesar cipher
  - Vigenère cipher
  - Emoji cipher
- TypeScript for type safety
- Unit tests with Vitest
- Docker support for containerized deployment

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

## Building for Production

Create a production build:

```bash
npm run build
```

## Generating the dictionary for Emoji cipher

To generate the emoji dictionary, run the following script:

```bash
npm run generate
```

## Deployment

### Docker Deployment

This project includes Docker support for different package managers:

- Dockerfile - for npm
- Dockerfile.pnpm - for pnpm
- Dockerfile.bun - for bun
- To build and run using Docker:

```bash
# For npm
docker build -t emoji-dict .

# For pnpm
docker build -f Dockerfile.pnpm -t emoji-dict .

# For bun
docker build -f Dockerfile.bun -t emoji-dict .

# Run the container
docker run -p 3000:3000 emoji-dict
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway
- Styling
- This project uses Tailwind CSS for styling.

Built with ❤️ using NodeJS and TypeScript.
