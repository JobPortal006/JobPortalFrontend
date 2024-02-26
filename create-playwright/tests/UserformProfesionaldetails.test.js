const { test, expect } = require('@playwright/test');

test('Education Details Accordion', async ({ page }) => {
  // Navigate to the page or component containing the Education Details Accordion
  await page.goto('http://localhost:3000/CreateAccount', { timeout: 90000 });


  const accordionWrapperSelector = '.professional_details';
  const radiobutton=  '.exprence';
  const selectnumber= 'input[name="numberOfCompanies"]';
  const companyName ='input[name="companyName"]'
  const job_role ='input[name="job_role"]'

  const skills ='input[name="skills"]'

  const years_of_exprence ='input[name="years_of_exprence"]'

  await page.click(accordionWrapperSelector);
  await page.click(radiobutton);
  await page.waitForSelector(selectnumber, { state: 'visible', timeout: 90000 });
  await page.fill(selectnumber, '1');
  await page.waitForSelector(companyName, { state: 'visible', timeout: 90000 });
  await page.fill(companyName, 'JL');
  await page.waitForSelector(job_role, { state: 'visible', timeout: 90000 });
  await page.fill(job_role, 'web_development');
  await page.waitForSelector(skills, { state: 'visible', timeout: 90000 });

  await page.fill(skills, 'html,css');
  await page.waitForSelector(years_of_exprence, { state: 'visible', timeout: 90000 });
  await page.fill(years_of_exprence, '2');






});