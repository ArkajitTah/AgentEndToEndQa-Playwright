import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

async function navigateToCheckoutOverview(page) {
  // Login
  await page.goto(BASE_URL);
  await page.fill('input[data-test="username"]', USERNAME);
  await page.fill('input[data-test="password"]', PASSWORD);
  await page.click('input[data-test="login-button"]');
  await page.waitForSelector('[data-test="inventory-list"]');
  
  // Add items
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
  
  // Navigate to cart
  await page.click('[data-test="shopping-cart-link"]');
  await page.waitForSelector('[data-test="cart-list"]');
  
  // Proceed to checkout
  await page.click('[data-test="checkout"]');
  await page.waitForSelector('[data-test="firstName"]');
  
  // Fill checkout info
  await page.fill('[data-test="firstName"]', 'John');
  await page.fill('[data-test="lastName"]', 'Doe');
  await page.fill('[data-test="postalCode"]', '12345');
  await page.click('[data-test="continue"]');
  
  // Wait for overview page
  await page.waitForSelector('[data-test="checkout-summary-container"]');
}

test.describe('AC3 - Order Overview', () => {
  test('AC3.1: Verify order overview displays all items and pricing', async ({ page }) => {
    await navigateToCheckoutOverview(page);
    
    // Verify items are displayed
    const backpackItem = page.locator('text=Sauce Labs Backpack');
    await expect(backpackItem).toBeVisible();
    
    const bikeItem = page.locator('text=Sauce Labs Bike Light');
    await expect(bikeItem).toBeVisible();
    
    // Verify pricing information
    const subtotalLabel = page.locator('[data-test="subtotal-label"]');
    const taxLabel = page.locator('[data-test="tax-label"]');
    const totalLabel = page.locator('[data-test="total-label"]');
    
    await expect(subtotalLabel).toBeVisible();
    await expect(taxLabel).toBeVisible();
    await expect(totalLabel).toBeVisible();
    
    // Verify pricing values are displayed
    const subtotalValue = page.locator('.summary_subtotal_label');
    const taxValue = page.locator('.summary_tax_label');
    const totalValue = page.locator('.summary_total_label');
    
    await expect(subtotalValue).toBeVisible();
    await expect(taxValue).toBeVisible();
    await expect(totalValue).toBeVisible();
  });

  test('AC3.2: Verify order overview displays payment and shipping information', async ({ page }) => {
    await navigateToCheckoutOverview(page);
    
    // Verify payment information section
    const paymentInfo = page.locator('[data-test="payment-info-label"]');
    await expect(paymentInfo).toBeVisible();
    
    // Verify shipping information section
    const shippingInfo = page.locator('[data-test="shipping-info-label"]');
    await expect(shippingInfo).toBeVisible();
    
    // Verify order summary
    const orderSummary = page.locator('[data-test="checkout-summary-container"]');
    await expect(orderSummary).toBeVisible();
  });

  test('AC3.3: Verify Cancel and Finish buttons on overview page', async ({ page }) => {
    await navigateToCheckoutOverview(page);
    
    // Verify Cancel button
    const cancelButton = page.locator('[data-test="cancel"]');
    await expect(cancelButton).toBeVisible();
    await expect(cancelButton).toBeEnabled();
    
    // Verify Finish button
    const finishButton = page.locator('[data-test="finish"]');
    await expect(finishButton).toBeVisible();
    await expect(finishButton).toBeEnabled();
  });

  test('AC3.3.1: Verify Cancel button redirects away from checkout', async ({ page }) => {
    await navigateToCheckoutOverview(page);
    
    // Click Cancel button
    await page.click('[data-test="cancel"]');
    await page.waitForLoadState('networkidle');
    
    // Verify redirect away from checkout (goes to inventory per site behavior)
    const currentUrl = page.url();
    expect(currentUrl).not.toContain('checkout-step-two');
  });
});
