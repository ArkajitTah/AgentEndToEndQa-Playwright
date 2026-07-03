import { test, expect } from '@playwright/test';

const BASE = 'https://demowebshop.tricentis.com';

test('successful login (register -> logout -> login)', async ({ page }) => {
  const ts = Date.now();
  const email = `user${ts}@example.com`;
  const password = 'Password123!';

  // Register a new user
  await page.goto(`${BASE}/register`);
  await page.locator('input#gender-male').click();
  await page.fill('input#FirstName', 'Test');
  await page.fill('input#LastName', 'User');
  await page.fill('input#Email', email);
  await page.fill('input#Password', password);
  await page.fill('input#ConfirmPassword', password);
  await page.click('input#register-button');
  await expect(page.locator('.result')).toHaveText(/Your registration completed/i);

  // Log out after registration
  await page.click('a[href="/logout"]');

  // Navigate to login and sign in
  await page.goto(`${BASE}/login`);
  await page.fill('input#Email', email);
  await page.fill('input#Password', password);
  await page.click('input.button-1.login-button');

  // Assert login success by checking the presence of the logout link
  await expect(page.locator('a[href="/logout"]')).toBeVisible();
});
