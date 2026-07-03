# Sauce Demo Checkout Test Plan - SCRUM-101

## Overview
Comprehensive checkout workflow testing for Sauce Demo e-commerce platform covering cart review, checkout information entry with validation, order overview, order completion, and error handling scenarios.

## Application URL
https://www.saucedemo.com

## Test Credentials
- Username: `standard_user`
- Password: `secret_sauce`

---

## Test Suite 1: AC1 - Cart Review

### Test 1.1: Verify cart displays all added items with correct details
**Description:** Verify that the cart page displays all items that were added with their complete details.

**Steps:**
1. Open Sauce Demo application and login with standard_user / secret_sauce
   - **Expected:** User is logged in and sees inventory page
2. Add Sauce Labs Backpack and Sauce Labs Bike Light to cart
   - **Expected:** Items are added to cart (cart badge shows count)
3. Click shopping cart icon to view cart
   - **Expected:** Cart page loads and displays both items, each item shows name, description, price, quantity
4. Verify cart total calculation
   - **Expected:** Cart shows subtotal, tax, and total amount; total calculation is correct

---

### Test 1.2: Verify cart navigation options to continue shopping or checkout
**Description:** Verify navigation buttons are available and functional on cart page.

**Steps:**
1. Login and add items to cart, then navigate to cart page
   - **Expected:** Cart page displays with items
2. Verify Continue Shopping button presence and functionality
   - **Expected:** Continue Shopping button is visible; clicking it returns to inventory page
3. Verify Checkout button presence
   - **Expected:** Checkout button is visible and enabled

---

### Test 1.3: Verify empty cart handling
**Description:** Verify the behavior when user tries to checkout with empty cart.

**Steps:**
1. Login and navigate to cart without adding any items
   - **Expected:** Cart page displays empty state message or no items shown
2. Attempt to proceed to checkout with empty cart
   - **Expected:** Checkout button is disabled or shows error message

---

## Test Suite 2: AC2 - Checkout Information Entry and Validation

### Test 2.1: Verify checkout form displays all required fields
**Description:** Verify the checkout information form has all required input fields.

**Steps:**
1. Login, add items to cart, navigate to cart, and click Checkout
   - **Expected:** Checkout information page (checkout-step-one) loads
2. Verify form fields are present: First Name, Last Name, Postal Code
   - **Expected:** All three form fields are visible and ready for input

---

### Test 2.2: Verify successful checkout with valid data
**Description:** Verify completing checkout information with valid data proceeds to overview.

**Steps:**
1. Navigate to checkout information page with items in cart
   - **Expected:** Checkout form is displayed
2. Enter valid data: First Name=John, Last Name=Doe, Postal Code=12345
   - **Expected:** All fields accept input without error
3. Click Continue button
   - **Expected:** User is redirected to checkout overview page (checkout-step-two)

---

### Test 2.3: Verify validation error when First Name is empty
**Description:** Verify form validation requires First Name field.

**Steps:**
1. Navigate to checkout information page
   - **Expected:** Checkout form is displayed
2. Leave First Name empty, fill Last Name and Postal Code, click Continue
   - **Expected:** Error message appears: "Error: First Name is required"; user remains on checkout information page

---

### Test 2.4: Verify validation error when Last Name is empty
**Description:** Verify form validation requires Last Name field.

**Steps:**
1. Navigate to checkout information page and fill First Name and Postal Code but leave Last Name empty
   - **Expected:** Form is filled except Last Name
2. Click Continue button
   - **Expected:** Error message appears: "Error: Last Name is required"; user remains on checkout information page

---

### Test 2.5: Verify validation error when Postal Code is empty
**Description:** Verify form validation requires Postal Code field.

**Steps:**
1. Navigate to checkout information page and fill First Name and Last Name but leave Postal Code empty
   - **Expected:** Form is partially filled
2. Click Continue button
   - **Expected:** Error message appears: "Error: Postal Code is required"; user remains on checkout information page

---

### Test 2.6: Verify validation error when all fields are empty
**Description:** Verify form shows validation error when no fields are filled.

**Steps:**
1. Navigate to checkout information page
   - **Expected:** Checkout form is displayed
2. Leave all fields empty and click Continue
   - **Expected:** Error message appears indicating one or more required fields; user remains on checkout page

---

## Test Suite 3: AC3 - Order Overview

### Test 3.1: Verify order overview displays all items and pricing
**Description:** Verify the order overview page shows all items and correct pricing.

**Steps:**
1. Login, add Backpack and Bike Light to cart, proceed through checkout info form
   - **Expected:** User reaches checkout overview page (checkout-step-two)
2. Verify all items from cart are displayed in order summary
   - **Expected:** Both items (Backpack and Bike Light) are shown in the overview
3. Verify pricing breakdown: item prices, subtotal, tax, and total
   - **Expected:** Subtotal, tax, and total are displayed with correct calculations

---

### Test 3.2: Verify order overview displays payment and shipping information
**Description:** Verify order overview shows payment and shipping details.

**Steps:**
1. Navigate to checkout overview page after filling checkout info
   - **Expected:** Overview page is displayed
2. Verify payment and shipping information sections are visible
   - **Expected:** Payment information is displayed; shipping information (e.g., address) is displayed

---

### Test 3.3: Verify Cancel and Finish buttons on overview page
**Description:** Verify action buttons are available on order overview page.

**Steps:**
1. Navigate to checkout overview page
   - **Expected:** Overview page displays with items and pricing
2. Verify Cancel button is present
   - **Expected:** Cancel button is visible and clickable; clicking Cancel returns to cart page
3. Navigate back to overview page and verify Finish button
   - **Expected:** Finish button is visible and enabled

---

## Test Suite 4: AC4 - Order Completion

### Test 4.1: Verify successful order completion shows confirmation
**Description:** Verify order completion displays success message and confirmation page.

**Steps:**
1. Complete full checkout workflow: login, add items, proceed through all steps with valid data
   - **Expected:** User reaches checkout overview page
2. Click Finish button
   - **Expected:** User is redirected to order confirmation page (checkout-complete)
3. Verify success message is displayed
   - **Expected:** Success message appears: "Thank you for your order!"

---

### Test 4.2: Verify Back Home button on confirmation page
**Description:** Verify user can navigate back to products after order completion.

**Steps:**
1. Complete order and reach confirmation page
   - **Expected:** Order confirmation page is displayed with success message
2. Verify Back Home button is present and functional
   - **Expected:** Back Home button is visible; clicking it navigates to inventory page

---

### Test 4.3: Verify cart is cleared after successful order
**Description:** Verify cart becomes empty after order is completed.

**Steps:**
1. Complete order successfully and view confirmation page
   - **Expected:** Confirmation shows order completed
2. Click Back Home and navigate to cart
   - **Expected:** Cart is empty after order completion; cart count badge is gone or shows 0

---

## Test Suite 5: AC5 - Error Handling and Navigation

### Test 5.1: Verify appropriate validation messages for invalid data
**Description:** Verify form handles special characters appropriately.

**Steps:**
1. Navigate to checkout form
   - **Expected:** Checkout information page is displayed
2. Enter special characters in First Name field: '@#$%'
   - **Expected:** Field accepts input (may or may not show error depending on validation); form submission is handled appropriately

---

### Test 5.2: Verify user cannot proceed without completing mandatory fields
**Description:** Verify form prevents submission with empty mandatory fields.

**Steps:**
1. Navigate to checkout information page
   - **Expected:** Form is displayed
2. Leave at least one required field empty
   - **Expected:** Cannot click Continue or Continue button shows validation error

---

### Test 5.3: Verify checkout can be cancelled and user returned to cart
**Description:** Verify cancel functionality returns user to cart with items intact.

**Steps:**
1. Login, add items, proceed to checkout overview page
   - **Expected:** Overview page is displayed
2. Click Cancel button
   - **Expected:** User is returned to cart page; cart items are still present

---

### Test 5.4: Verify back button navigation works correctly through checkout flow
**Description:** Verify browser back button works through checkout steps.

**Steps:**
1. Complete checkout steps then use browser back button from overview page
   - **Expected:** Browser back button navigates to checkout information page; browser back button navigates to cart page

---

## Test Data Requirements
- Test User: standard_user / secret_sauce
- First Name: John (or any valid name)
- Last Name: Doe (or any valid surname)
- Postal Code: 12345 (or any valid zip code)
- Items: Sauce Labs Backpack, Sauce Labs Bike Light

## Browser Coverage
- Chrome (Chromium)
- Firefox
- Safari

## Key Selectors Used
- `input[data-test="username"]` - Login username field
- `input[data-test="password"]` - Login password field
- `input[data-test="login-button"]` - Login button
- `[data-test="shopping-cart-link"]` - Shopping cart link
- `[data-test="checkout"]` - Checkout button
- `[data-test="firstName"]` - First Name input
- `[data-test="lastName"]` - Last Name input
- `[data-test="postalCode"]` - Postal Code input
- `[data-test="continue"]` - Continue button
- `[data-test="finish"]` - Finish button
- `[data-test="checkout-complete-container"]` - Order confirmation container
- `[data-test="error-message"]` - Error message container
