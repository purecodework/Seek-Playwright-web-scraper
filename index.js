const playwright = require("playwright");
const saveJobsToExcel = require("./excel-utils");

// a query example
const QUERY = {
  keyword: "node",
  location: "All-Sydney",
  dateRange: 14,
};

const QUERY_URL = `https://www.seek.com.au/${QUERY.keyword}-jobs/in-${QUERY.location}-NSW?daterange=${QUERY.dateRange}`;

async function main() {
  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();
  let jobs = [];

  async function saveJob(page, article) {
    await article.click();
    await page.waitForSelector('[data-sticky="job-details-page"]', {
      state: "attached",
    });
    await page.waitForSelector('[data-automation="job-detail-title"]', {
      state: "visible",
    });

    const jobData = {
      JobTitle: await getTextContent(
        page,
        '[data-automation="job-detail-title"]'
      ),
      Company: await getTextContent(
        page,
        '[data-automation="advertiser-name"]'
      ),
      Location: await getTextContent(
        page,
        '[data-automation="job-detail-location"]'
      ),
      Classifications: await getTextContent(
        page,
        '[data-automation="job-detail-classifications"]'
      ),
      WorkType: await getTextContent(
        page,
        '[data-automation="job-detail-work-type"]'
      ),
      Salary: await getTextContent(
        page,
        '[data-automation="job-detail-salary"]'
      ),
      JobDetails: await getTextContent(
        page,
        '[data-automation="jobAdDetails"]'
      ),
    };
    jobs.push(jobData);
  }

  async function getTextContent(page, selector) {
    const element = await page.$(selector);
    return element ? await element.textContent() : null;
  }

  async function isLastPage() {
    const noResultsText = await page.evaluate(() =>
      document.body.innerText.includes("No matching search results")
    );

    return noResultsText ? true : false;
  }

  async function getAllJobs() {
    try {
      //Stop the loop if pageCounter exceeds 1， Avoid of using &page=${pageCounter}， only crawl for this first result
      //This is done to comply with the restrictions specified in seek.com.au's robots.txt. and respect the website's guidelines.
      let pageCounter = 0;

      while (true) {
        if (pageCounter >= 1 || (await isLastPage())) {
          break;
        } else {
          await page.goto(QUERY_URL, { waitUntil: "networkidle" });

          const articles = await page.$$("article");
          if (articles.length > 0) {
            await saveJob(page, articles[0]);
          } else {
            break;
          }
          pageCounter++;
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      await browser.close();
      await saveJobsToExcel(jobs);
    }
  }

  getAllJobs();
}

main();
