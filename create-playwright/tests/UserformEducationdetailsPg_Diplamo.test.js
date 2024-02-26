const { test, expect } = require('@playwright/test');

test('Education Details Accordion', async ({ page }) => {
  // Navigate to the page or component containing the Education Details Accordion
  await page.goto('http://localhost:3000/CreateAccount', { timeout: 90000 });

  // Your component selectors
  const accordionWrapperSelector = '.education';
  const educationTypeSelector = 'input[value="pg"]';
  const pgCollegeNameInputSelector = 'input[name="pg_college_name"]';
  const pgCollegeStartYearInputSelector = 'input[name="pg_college_start_year"]';
  const pgCollegeEndYearInputSelector = 'input[name="pg_college_end_year"]';
  const pgCollegePercentageInputSelector = 'input[name="pg_college_percentage"]';
  const pgCollegeDepartmentInputSelector = 'input[name="pg_college_department"]';
  const pgCollegeDegreeInputSelector = 'input[name="pg_college_degree"]';

  const diplomaCollegeNameInputSelector = 'input[name="diploma_college_name"]';
  const diplomaCollegeStartYearInputSelector = 'input[name="diploma_college_start_year"]';
  const diplomaCollegeEndYearInputSelector = 'input[name="diploma_college_end_year"]';
  const diplomaCollegePercentageInputSelector = 'input[name="diploma_college_percentage"]';
  const diplomaCollegeDepartmentInputSelector = 'input[name="diploma_college_department"]';
  const diplomaCollegeDegreeInputSelector = 'input[name="diploma_college_degree"]';



  // Expand the accordion
  await page.click(accordionWrapperSelector);
  await page.waitForTimeout(1000);

  await page.click(educationTypeSelector); // Select PG
  await page.fill(pgCollegeNameInputSelector, 'PG College');
  await page.fill(pgCollegeStartYearInputSelector, '2018');
  await page.fill(pgCollegeEndYearInputSelector, '2020');
  await page.fill(pgCollegePercentageInputSelector, '85');
  await page.fill(pgCollegeDepartmentInputSelector, 'PG Computer Science');
  await page.fill(pgCollegeDegreeInputSelector, 'Master of Science');
  await page.waitForTimeout(1000);

   // Switch to Diploma
   await page.click('.pg_button2');
   await page.fill(diplomaCollegeNameInputSelector, 'Diploma College');
   await page.fill(diplomaCollegeStartYearInputSelector, '2016');
   await page.fill(diplomaCollegeEndYearInputSelector, '2018');
   await page.fill(diplomaCollegePercentageInputSelector, '75');
   await page.fill(diplomaCollegeDepartmentInputSelector, 'Diploma Computer Science');
   await page.fill(diplomaCollegeDegreeInputSelector, 'Diploma of Science');
 
   // Wait for any async operations or animations to complete
   await page.waitForTimeout(1000);



});
