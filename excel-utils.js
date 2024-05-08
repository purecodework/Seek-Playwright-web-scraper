const ExcelJS = require("exceljs");

async function saveJobsToExcel(jobs) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Jobs");

  worksheet.columns = [
    { header: "Job Title", key: "JobTitle", width: 35 },
    { header: "Company", key: "Company", width: 20 },
    { header: "Location", key: "Location", width: 20 },
    { header: "Classifications", key: "Classifications", width: 35 },
    { header: "Work Type", key: "WorkType", width: 20 },
    { header: "Salary", key: "Salary", width: 20 },
    { header: "Job Details", key: "JobDetails", width: 35 },
  ];

  jobs.forEach((job) => {
    worksheet.addRow(job);
  });
  await workbook.xlsx.writeFile("Jobs.xlsx");
  console.log("Result saved to Excel file.");
}

module.exports = saveJobsToExcel;
