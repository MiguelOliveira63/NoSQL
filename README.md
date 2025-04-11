# NoSQL

This project is a full‑stack application that uses a React frontend and a Node/Express backend (converted to serverless functions) to interact with a MongoDB instance containing the `sample_mflix` dataset.

## Project Structure

NoSQL/
├── .gitignore                  # Git ignore file (excludes .env, credentials.txt, etc.)
├── .env                        # Local environment variables (kept secret, not committed)
├── netlify.toml                # Netlify configuration file
├── README.md                   # Project documentation and instructions
├── netlify/
│   └── functions/
│       ├── movies.js           # Netlify Function to fetch a list of movies
│       └── movie.js            # Netlify Function to fetch movie details and comments
└── frontend/
    ├── package.json            # Frontend package file (React configuration)
    ├── public/                 # Public static assets (HTML, icons, etc.)
    └── src/                    # React source code
        ├── index.js          # React entry point
        ├── App.js            # Main component with routing configuration
        └── components/
            ├── MovieList.js  # Component for listing movies
            └── MovieDetail.js# Component for movie details and comments

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above recommended)
- npm (comes with Node.js) or yarn
- A running MongoDB instance with the `sample_mflix` dataset imported

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/<your-username>/NoSQL.git
   cd NoSQL
