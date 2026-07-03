import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('AC2 - Checkout Information Entry and Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate, login, and add items to cart
    await page.goto(BASE_URL);
    await page.fill('input[data-test="username"]', USERNAME);
    await page.fill('input[data-test="password"]', PASSWORD);
    await page.click('input[data-test="login-button"]');
    await page.waitForSelector('[data-test="inventory-list"]');
    
    // Add items
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Navigate to cart
    await page.click('[data-test="shopping-cart-link"]');
    await page.waitForSelector('[data-test="cart-list"]');
  });

  test('AC2.1: Verify checkout form displays all required fields', async ({ page }) => {
    // Click checkout
    await page.click('[data-test="checkout"]');
    await page.waitForSelector('[data-test="firstName"]');
    
    // Verify form fields are present
    const firstNameInput = page.locator('[data-test="firstName"]');
    const lastNameInput = page.locator('[data-test="lastName"]');
    const postalCodeInput = page.locator('[data-test="postalCode"]');
    
    await expect(firstNameInput).toBeVisible();
    await expect(lastNameInput).toBeVisible();
    await expect(postalCodeInput).toBeVisible();
  });

  test('AC2.2: Verify successful checkout with valid data', async ({ page }) => {
    // Click checkout
    await page.click('[data-test="checkout"]');
    await page.waitForSelector('[data-test="firstName"]');
    
    // Fill form with valid data
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    
    // Click continue
    await page.click('[data-test="continue"]');
    
    // Verify redirect to overview page
    await expect(page).toHaveURL(/checkout-step-two/);
    await page.waitForSelector('[data-test="checkout-summary-container"]');
  });

  test('AC2.3: Verify validation error when First Name is empty', async ({ page }) => {
    // Click checkout
    await page.click('[data-test="checkout"]');
    await page.waitForSelector('[data-test="firstName"]');
    
    // Fill only Last Name and Postal Code
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    
    // Try to continue
    await page.click('[data-test="continue"]');
    
    // Verify error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    const errorText = await errorMessage.textContent();
    expect(errorText).toContain('First Name');
    
    // Verify still on checkout page
    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test('AC2.4: Verify validation error when Last Name is empty', async ({ page }) => {
    // Click checkout
    await page.click('[data-test="checkout"]');
    await page.waitForSelector('[data-test="firstName"]');
    
    // Fill only First Name and Postal Code
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="postalCode"]', '12345');
    
    // Try to continue
    await page.click('[data-test="continue"]');
    
    // Verify error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    const errorText = await errorMessage.textContent();
    expect(errorText).toContain('Last Name');
    
    // Verify still on checkout page
    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test('AC2.5: Verify validation error when Postal Code is empty', async ({ page }) => {
    // Click checkout
    await page.click('[data-test="checkout"]');
    await page.waitForSelector('[data-test="firstName"]');
    
    // Fill only First Name and Last Name
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    
    // Try to continue
    await page.click('[data-test="continue"]');
    
    // Verify error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    const errorText = await errorMessage.textContent();
    expect(errorText).toContain('Postal Code');
    
    // Verify still on checkout page
    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test('AC2.6: Verify validation error when all fields are empty', async ({ page }) => {
    // Click checkout
    await page.click('[data-test="checkout"]');
    await page.waitForSelector('[data-test="firstName"]');
    
    // Try to continue without filling any fields
    await page.click('[data-test="continue"]');
    
    // Verify error message appears
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    
    // Verify still on checkout page
    await expect(page).toHaveURL(/checkout-step-one/);
  });
});
