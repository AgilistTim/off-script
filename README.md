# OffScript - Career Exploration Website

This repository contains the OffScript career exploration website, a tool designed to help users explore different career paths through interactive videos, reflection questions, and personalized guidance.

## Features

- **Multiple Career Categories**: Explore careers in technology, healthcare, creative arts, business, skilled trades, green energy, and education
- **Interactive Video Exploration**: Watch curated videos about different careers and reflect on what aspects resonate with you
- **Reflection Questions**: Answer guided questions during video playback to help process what you've learned
- **Career Suggestions**: Receive personalized career path suggestions based on your responses
- **Open Exploration**: Freely navigate between different career categories without being forced into a single path

## Tech Stack

- React 18
- React Router 6
- Vite
- Tailwind CSS

## Local Development

### Prerequisites

- Node.js 16+ and npm

### Setup

1. Clone this repository
```bash
git clone <your-repo-url>
cd offscript-career-exploration
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## Deployment

This project is configured for easy deployment to Netlify.

### Deploying to Netlify

1. Push this repository to GitHub

2. Log in to Netlify and click "New site from Git"

3. Select your GitHub repository

4. Use these build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

5. Click "Deploy site"

The `netlify.toml` file in this repository already includes the necessary configuration for handling client-side routing, so all routes will work correctly after deployment.

## Project Structure

- `/src` - Source code
  - `/components` - Reusable UI components
  - `/pages` - Page components for different routes
  - `/assets` - Static assets like images
- `/public` - Static files
- `/dist` - Build output (generated)

## User Flow

1. Users start at the homepage and can choose to explore career categories or get AI guidance
2. When exploring categories, users can select from various career fields
3. Each category offers multiple videos with reflection questions
4. As users watch videos and answer questions, the system builds a profile of their interests
5. Based on responses, the system suggests potential career paths that align with their preferences

## License

[MIT License](LICENSE)
