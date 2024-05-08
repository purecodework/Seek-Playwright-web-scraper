# Seek Playwright Web Scraper

Welcome to the Seek Playwright Web Scraper application. This simple scraper is built using _Playwright_ and _ExcelJS_, and is designed to scrape job details from seek.com.au and save the data into an Excel file.

<b>Please note</b>: In compliance with the `restrictions` specified in seek.com.au's `robots.txt`, this application is <b>configured to only crawl the first record on the very first page</b>. This limitation is set out of respect for the website's operational guidelines and to minimize the load on the server.

## Prerequisites

built
Before you begin, ensure you have the following installed on your system:

- Node.js (v18.17.1)
- Yarn package manager

These prerequisites are necessary to install and run the application.

## Installation and Usage for

To Install:

```bash
# Clone the repository
git clone https://github.com/purecodework/.git
```

Follow these steps to get the application up and running on your local machine:

```bash
# From the root directory, Navigate to the frontend project directory
cd Seek-Playwright-web-scraper

# Install dependencies
yarn

# After installation, you can start the application using the following command:

yarn start
```

After crawling, you would find the excel file named Jobs.excel in the project root folder.

## License

Distributed under the MIT License. See `LICENSE` for more information.
