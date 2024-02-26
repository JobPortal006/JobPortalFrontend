const { test, expect } = require('@playwright/test');

test('User Details Accordion', async ({ page }) => {
  // Navigate to the page or component containing the User Details Accordion
  await page.goto('http://localhost:3000/CreateAccount', { timeout: 90000 });

  // Your component selectors
  const accordionWrapperSelector = '.user_details';
  const firstNameInputSelector = 'input[name="first_name"]';
  const lastNameInputSelector = 'input[name="last_name"]';
  const dateOfBirthInputSelector = 'input[name="date_of_birth"]';
  const mobileNumberInputSelector = 'input[name="mobile_number"]';
  const clickGenderSelector = '.user_details_gender';
  const clickGender='.male';
//   const genderSelectSelector = 'select[name="gender"]';

  // Expand the accordion
  await page.click(accordionWrapperSelector);

  // Wait for form elements to be visible
  await page.waitForSelector(firstNameInputSelector, { state: 'visible', timeout: 90000 });
  await page.waitForSelector(lastNameInputSelector, { state: 'visible', timeout: 90000 });
  await page.waitForSelector(dateOfBirthInputSelector, { state: 'visible', timeout: 90000 });
  await page.waitForSelector(mobileNumberInputSelector, { state: 'visible', timeout: 90000 });
//   await page.waitForSelector(genderSelectSelector, { state: 'visible', timeout: 90000 });

  // Input values into the form fields
  await page.fill(firstNameInputSelector, 'raghul');
  await page.fill(lastNameInputSelector, 'tom');
  await page.fill(dateOfBirthInputSelector, '08/05/2001');
  await page.fill(mobileNumberInputSelector, '1234567890');
  await page.click(clickGenderSelector)
  await page.click(clickGender)
//   await page.selectOption(genderSelectSelector, { label: 'Male' });

  // Wait for any async operations or animations to complete
  await page.waitForTimeout(1000);

  // Assertions - Adapt based on your component's behavior
  const firstNameValue = await page.$eval(firstNameInputSelector, (input) => input.value);
  const lastNameValue = await page.$eval(lastNameInputSelector, (input) => input.value);
  // Add similar assertions for other fields as needed

  console.log(`First Name Input: ${firstNameValue}`);
  console.log(`Last Name Input: ${lastNameValue}`);
  // Log other values as needed

  // Add more assertions based on your component's behavior
  // For example, you might want to check if the gender is selected correctly.

});
