/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('example4@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Raghul12@');
  await page.getByRole('button', { name: 'LogIn', exact: true }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('div:nth-child(3) > .MuiCardContent-root > .icon-container').click();
  await page.getByRole('heading', { name: 'HCL tech' }).click();
  await page.getByRole('button', { name: 'Next' }).first().click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('.icon-container').first().click();
  await page.getByLabel('Search-location').click();
  await page.getByLabel('Search-location').fill('chennai');
  await page.getByRole('option', { name: 'Chennai' }).click();
  await page.getByRole('button', { name: 'Search' }).click();
  await page.locator('div').filter({ hasText: /^Technical supportCTS$/ }).first().click();
  await page.locator('div').filter({ hasText: /^React DeveloperCTS$/ }).nth(2).click();
  await page.getByRole('button', { name: 'Apply' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Apply' }).click();
  await page.getByRole('heading', { name: 'IT Manager' }).click();
});