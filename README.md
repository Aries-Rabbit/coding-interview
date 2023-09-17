# Product Listing Web App

This project is a simple web application built using ReactJS and TypeScript. It allows users to view a list of products and search for specific products. The application fetches product data from an API and supports infinite scrolling to load more products.

## Installation

Before you begin, ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your computer.

1. Clone the project to your local machine:

```bash
git clone https://github.com/Aries-Rabbit/product-list-react-w-typescript
cd product-list-react-w-typescript
```

2. Install the project dependencies::

```bash
npm install
# if you can't install because of conflict dependencies, try:
npm install --legacy-peer-deps
```

3. Start the application in development mode:

```bash
npm run dev
```

### Directory Structure

- `src/`: The main source code of the application.
  - `components/`: Contains reusable UI components.
  - `services/`: Includes services for interacting with APIs and data.
  - `App.tsx`: The main React component of the application.
- `public/`: Contains static files and other assets.

### Searching for Products

1. The application supports searching for products. To use the search functionality:

2. Enter your search query in the search input field.

3. Press Enter or click the search button.

4. The application will display the search results based on your query.

### Infinite Scrolling

The product list is loaded in a paginated manner. When you scroll to the bottom of the page, the application will automatically fetch and display more products.
