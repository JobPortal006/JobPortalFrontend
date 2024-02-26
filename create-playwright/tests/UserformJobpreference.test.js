const { test, expect } = require('@playwright/test');

test('Job Preference Form', async ({ page }) => {
  // Navigate to the page or component containing the Job Preference form
  await page.goto('http://localhost:3000/CreateAccount', { timeout: 90000 }); 

  // Your component selectors
  const accordionWrapperSelector = '.job_preference';
  const keySkillsInputSelector = 'input[name="key_skills"]';
  const industryInputSelector = 'input[name="industry"]';
  // const departmentInputSelector = 'input[name="department"]';
  const preferedLocationsInputSelector = 'input[name="prefered_locations"]';

  // Expand the accordion
  await page.click(accordionWrapperSelector);

  // await page.waitForSelector(departmentInputSelector, { state: 'visible', timeout: 60000 });
  await page.waitForSelector(keySkillsInputSelector, { state: 'visible', timeout: 60000 });
  await page.waitForSelector(industryInputSelector, { state: 'visible', timeout: 60000 });


  // Input values into the form fields
  // await page.fill(departmentInputSelector, 'Development');
  await page.fill(keySkillsInputSelector, 'JavaScript');
  await page.fill(industryInputSelector, 'Software');
  await page.fill(preferedLocationsInputSelector, 'New York San Francisco');

  // Wait for any async operations or animations to complete
  await page.waitForTimeout(1000);

  // Assertions - Adapt based on your component's behavior
  // const departmentValue = await page.$eval(departmentInputSelector, (input) => input.value);
  const keySkillsValue = await page.$eval(keySkillsInputSelector, (input) => input.value);
  const industryValue = await page.$eval(industryInputSelector, (input) => input.value);
  const preferedLocationsValue = await page.$eval(preferedLocationsInputSelector, (input) => input.value);


  // console.log(`Department Input: ${departmentValue}`);
  console.log(`Key Skills Input: ${keySkillsValue}`);
  console.log(`Industry Input: ${industryValue}`);
  console.log(`Preferred Locations Input: ${preferedLocationsValue}`);

});
