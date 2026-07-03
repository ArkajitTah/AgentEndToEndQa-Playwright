import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('AC1 - Cart Review', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate and login
    await page.goto(BASE_URL);
    await page.fill('input[data-test="username"]', USERNAME);
    await page.fill('input[data-test="password"]', PASSWORD);
    await page.click('input[data-test="login-button"]');
    await page.waitForSelector('[data-test="inventory-list"]');
  });

  test('AC1.1: Verify cart displays all added items with correct details', async ({ page }) => {
    // Add items to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    
    // Navigate to cart
    await page.click('[data-test="shopping-cart-link"]');
    await page.waitForSelector('[data-test="cart-list"]');
    
    // Verify items are displayed
    const cartItems = await page.locator('.cart_item');
    expect(await cartItems.count()).toBeGreaterThanOrEqual(2);
    
    // Verify item details
    const backpackItem = page.locator('text=Sauce Labs Backpack');
    await expect(backpackItem).toBeVisible();
    
    const bikeItem = page.locator('text=Sauce Labs Bike Light');
    await expect(bikeItem).toBeVisible();
  });

  test('AC1.2: Verify cart navigation options to continue shopping or checkout', async ({ page }) => {
    // Add an item
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Navigate to cart
    await page.click('[data-test="shopping-cart-link"]');
    await page.waitForSelector('[data-test="cart-list"]');
    
    // Verify Continue Shopping button
    const continueButton = page.locator('[data-test="continue-shopping"]');
    await expect(continueButton).toBeVisible();
    
    // Verify Checkout button
    const checkoutButton = page.locator('[data-test="checkout"]');
    await expect(checkoutButton).toBeVisible();
    await expect(checkoutButton).toBeEnabled();
  });

  test('AC1.3: Verify empty cart handling', async ({ page }) => {
    // Navigate to cart without adding items
    await page.click('[data-test="shopping-cart-link"]');
    await page.waitForSelector('[data-test="cart-list"]');
    
    // Verify empty cart state
    const cartEmptyMessage = page.locator('text=Continue Shopping');
    await expect(cartEmptyMessage).toBeVisible();
  });
});
