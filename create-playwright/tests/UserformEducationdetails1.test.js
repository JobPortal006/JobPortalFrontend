const { test, expect } = require('@playwright/test');

test('Education Details Accordion', async ({ page }) => {
  // Navigate to the page or component containing the Education Details Accordion
  await page.goto('http://localhost:3000/CreateAccount', { timeout: 90000 });

  // component selectors
  const accordionWrapperSelector = '.education';
  const sslcSchoolNameInputSelector = 'input[name="sslc_school_name"]';
  const sslcStartYearInputSelector = 'input[name="sslc_start_year"]';
  const sslcEndYearInputSelector = 'input[name="sslc_end_year"]';
  const sslcPercentageInputSelector = 'input[name="sslc_percentage"]';

  const hscSchoolNameInputSelector = 'input[name="hsc_school_name"]';
  const hscStartYearInputSelector = 'input[name="hsc_start_year"]';
  const hscEndYearInputSelector = 'input[name="hsc_end_year"]';
  const hscPercentageInputSelector = 'input[name="hsc_percentage"]';

  const collegeNameInputSelector = 'input[name="college_name"]';
  const collegeStartYearInputSelector = 'input[name="college_start_year"]';
  const collegeEndYearInputSelector = 'input[name="college_end_year"]';
  const collegePercentageInputSelector = 'input[name="college_percentage"]';

  const departmentInputSelector = 'input[name="department"]';
  const degreeInputSelector = 'input[name="degree"]';

  // Expand the accordion
  await page.click(accordionWrapperSelector);

  // Wait for form elements to be visible
  await page.waitForSelector(sslcSchoolNameInputSelector, { state: 'visible', timeout: 90000 });
  await page.waitForSelector(sslcStartYearInputSelector, { state: 'visible', timeout: 90000 });
  await page.waitForSelector(sslcEndYearInputSelector, { state: 'visible', timeout: 90000 });
  await page.waitForSelector(sslcPercentageInputSelector, { state: 'visible', timeout: 90000 });

  await page.waitForSelector(hscSchoolNameInputSelector, { state: 'visible', timeout: 90000 });
  await page.waitForSelector(hscStartYearInputSelector, { state: 'visible', timeout: 90000 });
  await page.waitForSelector(hscEndYearInputSelector, { state: 'visible', timeout: 90000 });
  await page.waitForSelector(hscPercentageInputSelector, { state: 'visible', timeout: 90000 });

  await page.waitForSelector(collegeNameInputSelector, { state: 'visible', timeout: 90000 });
  await page.waitForSelector(collegeStartYearInputSelector, { state: 'visible', timeout: 90000 });
  await page.waitForSelector(collegeEndYearInputSelector, { state: 'visible', timeout: 90000 });
  await page.waitForSelector(collegePercentageInputSelector, { state: 'visible', timeout: 90000 });

  await page.waitForSelector(departmentInputSelector, { state: 'visible', timeout: 90000 });
  await page.waitForSelector(degreeInputSelector, { state: 'visible', timeout: 90000 });

  // Input values into the form fields
  await page.fill(sslcSchoolNameInputSelector, 'SSLC School');
  await page.fill(sslcStartYearInputSelector, '2010');
  await page.fill(sslcEndYearInputSelector, '2012');
  await page.fill(sslcPercentageInputSelector, '90');

  await page.fill(hscSchoolNameInputSelector, 'HSC School');
  await page.fill(hscStartYearInputSelector, '2012');
  await page.fill(hscEndYearInputSelector, '2014');
  await page.fill(hscPercentageInputSelector, '85');

  await page.fill(collegeNameInputSelector, 'University College');
  await page.fill(collegeStartYearInputSelector, '2014');
  await page.fill(collegeEndYearInputSelector, '2018');
  await page.fill(collegePercentageInputSelector, '80');

  await page.fill(departmentInputSelector, 'Computer Science');
  await page.fill(degreeInputSelector, 'Bachelor of Science');

  // Wait for any async operations or animations to complete
  await page.waitForTimeout(1000);

 
});
