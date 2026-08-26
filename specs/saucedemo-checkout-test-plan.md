# Test Plan: SCRUM-201 - OrangeHRM Core Workflows (Login, PIM, Leave)

Source user story: SCRUM-201 (provided)
Application URL: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
Test Credentials: Username: `Admin`, Password: `admin123`

Scope: Login, PIM Add Employee, PIM Edit/View Employee, Leave Application, Cross-module navigation, and UI validation.

Test Data Notes:
- Admin account: Admin / admin123
- New employee sample data sets (see each test):
  - Employee A: FirstName: "Alex", LastName: "Morgan", EmployeeID: auto or "E1001"
  - Employee B (edge): FirstName: "A", LastName: "B", EmployeeID: "E9999"
- Leave sample data:
  - LeaveType: "CAN - Vacation" (or available leave type in UI)
  - Valid date ranges and invalid ranges (To before From)

Structure: Each test case includes Title, Preconditions, Steps, Test Data, and Expected Results.

---

## 1. Login — Happy Path

Title: Login with valid Admin credentials
Preconditions: Browser launched, application URL reachable.
Test Data: Admin / admin123
Steps:
  1. Navigate to the login URL.
  2. Enter Username: Admin.
  3. Enter Password: admin123.
  4. Click "Login" button.
Expected Results:
  - Step 1: Login page loads with username and password fields visible.
  - Step 4: User is authenticated and lands on Dashboard; page title or header shows "Dashboard" and user avatar/name visible.

---

## 2. Login — Invalid Credentials (Negative)

Title: Login with invalid username/password
Preconditions: Login page open.
Test Data: username: "WrongUser", password: "wrongpass"
Steps:
  1. Navigate to login page.
  2. Enter invalid username and password.
  3. Click "Login".
Expected Results:
  - Login attempt fails; a validation error message appears (e.g., "Invalid credentials") and user remains on login page.
  - No access to Dashboard.

---

## 3. Login — Empty Fields Validation

Title: Login with empty username or password
Preconditions: Login page open.
Test Data: empty username/password combinations
Steps:
  1. Leave Username empty; enter valid password; click "Login".
  2. Leave Password empty; enter valid username; click "Login".
  3. Leave both empty; click "Login".
Expected Results:
  - For each step, a "Required" validation message appears near the empty field(s) and user stays on login page.
  - No authentication occurs.

---

## 4. Logout

Title: Logout returns user to Login page
Preconditions: User logged in (use Test Case 1).
Steps:
  1. From Dashboard, open user menu (avatar) and click "Logout".
Expected Results:
  - User is logged out and redirected to the login page; session cookies cleared or UI shows login form.

---

## 5. Navigation — Side Menu Basic Functionality

Title: Side menu navigation between Admin, PIM, Leave
Preconditions: User logged in
Steps:
  1. Click "Admin" in side menu; verify page loads.
  2. Click "PIM"; verify Employee List or PIM landing page loads.
  3. Click "Leave"; verify Leave landing page loads.
Expected Results:
  - Each click navigates to corresponding module; headers/menu items update; no JavaScript errors shown.

---

## 6. Deep Linking — Direct URL Access

Title: Navigate directly to module URL
Preconditions: User logged in via previous step or include auth in session
Test Data: Known module URLs (e.g., /pim/viewEmployeeList, /leave/viewLeaveModule — verify actual paths)
Steps:
  1. Enter module URL directly in address bar and press Enter.
Expected Results:
  - If authenticated, the correct page loads; if not authenticated, application redirects to login.

---

## 7. PIM — Add Employee (Happy Path)

Title: Add a new employee with required fields
Preconditions: User logged in, PIM module accessible.
Test Data: FirstName: Alex, LastName: Morgan, EmployeeID: leave blank for auto or set E1001
Steps:
  1. Navigate to PIM > Add Employee.
  2. Fill First Name = Alex, Last Name = Morgan. Leave Employee ID blank (or set custom: E1001).
  3. Click "Save".
  4. Navigate to Employee List and search for Alex Morgan.
Expected Results:
  - Step 1: Add Employee form displays fields for First Name, Last Name, Employee ID.
  - Step 3: Save succeeds; confirmation/success message may appear and user can view Personal Details of created employee.
  - Step 4: Employee List search returns the newly added employee with correct First Name, Last Name, and Employee ID.

---

## 8. PIM — Add Employee Validation (Negative)

Title: Add Employee with empty required fields
Preconditions: User logged in; Add Employee form open.
Test Data: FirstName: "", LastName: ""
Steps:
  1. Open Add Employee form.
  2. Clear First Name and Last Name fields.
  3. Click "Save".
Expected Results:
  - Required field validation messages appear for First Name and Last Name (e.g., "Required").
  - Save is blocked and no new employee is created.

---

## 9. PIM — Add Employee with Edge Case Data

Title: Add employee with minimal/long/Unicode names
Preconditions: Add Employee form open
Test Data:
  - Minimal: FirstName: "A", LastName: "B"
  - Long: FirstName: 255 chars, LastName: 255 chars
  - Unicode: FirstName: "Łukasz", LastName: "李"
Steps:
  1. For each test data set, populate fields and click "Save".
Expected Results:
  - Minimal/Unicode: Save succeeds and employee appears in list with exact names.
  - Long: Either save succeeds (if supported) or a validation error is shown specifying maximum length — behavior should be documented.

---

## 10. PIM — Employee Search/Filter

Title: Search for newly added employee in Employee List
Preconditions: Employee exists from Test Case 7 or 9.
Test Data: Names/EmployeeID used earlier.
Steps:
  1. Navigate to PIM > Employee List.
  2. Enter employee name or ID in search/filter fields and click "Search".
Expected Results:
  - Search returns matching employee row(s) containing correct details. Pagination should accommodate results if needed.

---

## 11. PIM — View Personal Details

Title: Open existing employee Personal Details
Preconditions: Employee exists
Steps:
  1. From Employee List, click the employee name to open details.
  2. Verify Personal Details tab is active and fields are populated.
Expected Results:
  - Personal Details loads with fields (First Name, Middle Name, Last Name, Nationality, Marital Status, DOB, etc.) populated as created.

---

## 12. PIM — Edit and Save Employee Details (Happy Path)

Title: Edit employee details and persist changes
Preconditions: Employee Personal Details open
Test Data: Change Nationality to "Indian", Marital Status to "Married", DOB to "1990-05-15"
Steps:
  1. Click "Edit" (or enable edit mode).
  2. Change Nationality, Marital Status, DOB as per test data.
  3. Click "Save".
  4. Reopen the employee details or refresh and verify values.
Expected Results:
  - Step 3: Save succeeds; success message appears.
  - Step 4: Updated values persist and are displayed correctly.

---

## 13. PIM — Edit Validation (Negative)

Title: Attempt to save invalid employee data
Preconditions: Personal Details edit mode open
Test Data: DOB set to future date; invalid date format; required fields blank
Steps:
  1. Enter invalid DOB (future date) and click "Save".
  2. Clear required fields and click "Save".
Expected Results:
  - Validation error messages appear for invalid/required fields and save is blocked.

---

## 14. Leave — Apply for Leave (Happy Path)

Title: Apply for leave and see it in My Leave (Pending Approval)
Preconditions: User logged in; Leave module accessible; user has entitlement for selected leave type
Test Data: LeaveType: available type (e.g., "CAN - Vacation"), From: today+7, To: today+9, Partial day: if supported
Steps:
  1. Navigate to Leave > Apply.
  2. Select Employee (if required), choose Leave Type, pick From and To dates, enter Comment optional.
  3. Click "Apply" or "Submit".
  4. Navigate to Leave > My Leave and locate the request.
Expected Results:
  - Step 3: Submission succeeds and confirmation displayed.
  - Step 4: Leave list shows new request with status "Pending Approval" and correct dates and type.

---

## 15. Leave — Validation (Negative)

Title: Leave application validation for missing or invalid dates
Preconditions: Leave > Apply form open
Test Data: Missing Leave Type, missing dates, To date before From date
Steps:
  1. Attempt to submit without selecting Leave Type.
  2. Attempt to submit with missing From or To date.
  3. Attempt to submit with To date earlier than From date.
Expected Results:
  - For each case, appropriate validation error messages appear (e.g., "Required", "End date must be after start date") and submission is blocked.

---

## 16. Leave — Edge Cases

Title: Single-day leave, multi-day leave crossing month/year, overlapping leaves
Preconditions: Leave entitlements available.
Test Data:
  - Single-day: From == To
  - Multi-day crossing month/year: From: 2025-12-30, To: 2026-01-03
  - Overlap: Apply for dates that overlap existing pending/approved leave
Steps:
  1. Submit single-day leave; verify appearance in My Leave.
  2. Submit multi-day cross-year leave; verify accurate days and display.
  3. Submit overlapping leave; observe whether system prevents overlap or flags conflict.
Expected Results:
  - Single-day and multi-day: requests created with correct dates.
  - Overlap: System either prevents duplicate/overlapping requests with validation or shows conflict indicator per application rules — behavior must be documented.

---

## 17. Cross-module Flow — Add Employee then Apply Leave

Title: Add employee and immediately apply leave for them (if admin permitted)
Preconditions: Admin has rights to apply leave on behalf of employee
Test Data: Use employee created in Test Case 7
Steps:
  1. Add new employee (Test Case 7).
  2. Navigate to Leave > Apply and select that employee.
  3. Submit leave application.
Expected Results:
  - Admin can select the new employee and submit a leave; leave appears under My Leave or employee's leave list.

---

## 18. UI Element Validation

Title: Verify presence and labels of key UI elements
Preconditions: Relevant pages loaded
Steps & Expected Results (condensed):
  - Login page: username, password fields, "Login" button, "Forgot Password" link present and correctly labeled.
  - Dashboard: header/title "Dashboard", user avatar/menu visible, side menu items for Admin, PIM, Leave present.
  - Add Employee form: labels for First Name, Middle Name, Last Name, Employee ID, Save/Cancel buttons.
  - Leave Apply form: Leave Type dropdown, From/To date pickers, Comment field, Apply button.
  - All actionable buttons should be enabled only when appropriate and have accessible names.

---

## 19. Accessibility and Responsiveness Checks (Basic)

Title: Basic accessibility and responsive behavior
Preconditions: Pages loaded
Steps:
  1. Verify tab order of key fields (Login, Add Employee, Leave Apply).
  2. Shrink browser window to mobile width and ensure layout degrades gracefully; key actions still reachable.
Expected Results:
  - Logical tab order; focus visible. Pages usable in narrow viewports (no critical elements hidden).

---

## 20. Security/Session Tests

Title: Session timeout and unauthorized access checks
Preconditions: Logged in
Steps:
  1. Leave session idle for configured timeout period; attempt action post-timeout.
  2. Attempt to access PIM or Leave URLs after logout.
Expected Results:
  - After timeout or logout, actions require re-authentication and direct URL access redirects to login.

---

## 21. Data Persistence and Consistency

Title: Verify changes persist across sessions and page reloads
Preconditions: Make edits per Test Case 12
Steps:
  1. Edit employee details and save.
  2. Log out and log back in as Admin.
  3. Reopen employee and verify persisted changes.
Expected Results:
  - Edited fields remain as saved after logout/login and page reload.

---

## 22. Test Execution Notes

- Environment: Browser (Chrome/Edge), stable network.
- Execute happy path tests first to seed created test records.
- Clean-up: Remove or mark test employees to avoid polluting environment (if deletion functionality exists).
- Automation: Identify stable selectors for login, PIM forms, and leave application for script creation.

---

Appendix: Example Test Case Template (for automation or manual tracking)

- ID: LOGIN-01
- Title: Login with valid Admin credentials
- Preconditions: App reachable
- Steps: (as above)
- Expected Results: (as above)
- Test Data: Admin / admin123
- Status: Pending

---

End of Test Plan.
