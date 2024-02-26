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
  await page.waitForTimeout(2000);


  // Expand the address accordion if not already expanded
  const addressAccordionToggle = await page.$('.address_accordion .MuiAccordionSummary-root');
  if (addressAccordionToggle) {
      await addressAccordionToggle.click();
      // Wait for the accordion to expand
      await page.waitForSelector('.address_accordion .MuiAccordionDetails-root');
  }

  // Fill in permanent address
  await page.fill('.address_accordion input[name=street]', 'Permanent Street');
  await page.fill('.address_accordion input[name=city]', 'Permanent City');
  await page.fill('.address_accordion input[name=pincode]', '123456');
 
  await page.fill('.address_accordion input[name=country]', 'Permanent Country');
  await page.fill('.address_accordion input[name=state]', 'Permanent State');
  await page.waitForTimeout(2000);

  const accordionWrapperSelectoreducation = '.education';
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
  await page.click(accordionWrapperSelectoreducation);

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
  await page.waitForTimeout(2000);


  const accordionWrapperSelectoreducationpg = '.education';
  const educationTypeSelector = '.MuiFormControlLabel-root.MuiFormControlLabel-labelPlacementEnd.pg_button1.css-j204z7-MuiFormControlLabel-root';
  const pgCollegeNameInputSelector = 'input[name="pg_college_name"]';
  const pgCollegeStartYearInputSelector = 'input[name="pg_college_start_year"]';
  const pgCollegeEndYearInputSelector = 'input[name="pg_college_end_year"]';
  const pgCollegePercentageInputSelector = 'input[name="pg_college_percentage"]';
  const pgCollegeDepartmentInputSelector = 'input[name="pg_college_department"]';
  const pgCollegeDegreeInputSelector = 'input[name="pg_college_degree"]';

  


  // Expand the accordion
  await page.click(accordionWrapperSelectoreducationpg);
  await page.waitForTimeout(1000);

  await page.locator(educationTypeSelector);
  await page.click(educationTypeSelector); // Select PG
  await page.waitForTimeout(1000);

  await page.fill(pgCollegeNameInputSelector, 'PG College');
  await page.fill(pgCollegeStartYearInputSelector, '2018');
  await page.fill(pgCollegeEndYearInputSelector, '2020');
  await page.fill(pgCollegePercentageInputSelector, '85');
  await page.fill(pgCollegeDepartmentInputSelector, 'PG Computer Science');
  await page.fill(pgCollegeDegreeInputSelector, 'Master of Science');
  await page.waitForTimeout(2000);



  
  const accordionWrapperSelectorPD = '.professional_details';
  const radiobutton=  '.exprence';
  const selectnumber= 'input[name="numberOfCompanies"]';
  const companyName ='input[name="companyName"]'
  const job_role ='input[name="job_role"]'

  const skills ='input[name="skills"]'

  const years_of_exprence ='input[name="years_of_exprence"]'

  await page.click(accordionWrapperSelectorPD);
  await page.click(radiobutton);
  await page.waitForSelector(selectnumber, { state: 'visible', timeout: 1000 });
  await page.fill(selectnumber, '1');
  await page.waitForSelector(companyName, { state: 'visible', timeout: 1000 });
  await page.fill(companyName, 'JL');
  await page.waitForSelector(job_role, { state: 'visible', timeout: 1000 });
  await page.fill(job_role, 'web_development');
  await page.waitForSelector(skills, { state: 'visible', timeout: 1000 });

  await page.fill(skills, 'html,css');
  await page.waitForSelector(years_of_exprence, { state: 'visible', timeout: 1000 });
  await page.fill(years_of_exprence, '2');

  const accordionWrapperSelectorjobpreference = '.job_preference';
  const keySkillsInputSelector = 'input[name="key_skills"]';
  const industryInputSelector = 'input[name="industry"]';
  // const departmentInputSelector = 'input[name="department"]';
  const preferedLocationsInputSelector = 'input[name="prefered_locations"]';

  // Expand the accordion
  await page.click(accordionWrapperSelectorjobpreference);

  // await page.waitForSelector(departmentInputSelector, { state: 'visible', timeout: 60000 });
  await page.waitForSelector(keySkillsInputSelector, { state: 'visible', timeout: 1000 });
  await page.waitForSelector(industryInputSelector, { state: 'visible', timeout: 1000 });

  await page.waitForSelector(preferedLocationsInputSelector, { state: 'visible', timeout: 1000 });

  // Input values into the form fields
  // await page.fill(departmentInputSelector, 'Development');
  await page.fill(keySkillsInputSelector, 'JavaScript');
  await page.fill(industryInputSelector, 'Software');
  await page.fill(preferedLocationsInputSelector, 'New York San Francisco');

  // Wait for any async operations or animations to complete
  await page.waitForTimeout(1000);

 

   
  

});
