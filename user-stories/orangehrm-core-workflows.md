# User Story: SCRUM-201 - OrangeHRM Core Workflows (Login, PIM, Leave)

## Application URL
https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

## Test Credentials
- Username: `Admin`
- Password: `admin123`

## Description
As an HR administrator, I want to log into the OrangeHRM system, manage employee records
in the PIM module, and submit a leave application, so that I can perform core day-to-day
HR operations reliably.

## Acceptance Criteria

### AC1: Login
1. User can log in with valid Admin credentials and land on the Dashboard
2. Invalid username/password shows a validation error and keeps the user on the login page
3. Empty username or password fields show a "Required" validation message
4. User can log out successfully and is returned to the login page

### AC2: PIM - Add Employee
1. User can navigate to PIM > Add Employee from the side menu
2. User can add a new employee with First Name, Last Name, and an auto-generated or 
   custom Employee ID
3. Required fields (First Name, Last Name) show validation errors if left empty
4. After saving, the new employee appears in the Employee List with correct details
5. User can search for the newly added employee using the Employee List search/filter

### AC3: PIM - Edit/View Employee Details
1. User can open an existing employee's Personal Details tab
2. User can edit and save employee details (e.g. nationality, marital status, date of birth)
3. Changes are persisted and reflected when reopening the employee record

### AC4: Leave - Apply for Leave
1. User can navigate to Leave > Apply
2. User can select a leave type, from/to dates, and submit a leave application
3. Required fields show validation errors if left empty or if the date range is invalid 
   (e.g. "To" date before "From" date)
4. After submission, the leave request appears in "My Leave" list with status "Pending Approval"

### AC5: Navigation and UI
1. Side menu navigation works correctly across all modules used above (Admin, PIM, Leave)
2. Dashboard widgets load without errors after login
3. User can navigate directly via URL to a module and the correct page loads (deep linking)

## Testing Scope
- Login (positive, negative, validation, logout)
- PIM Add Employee (positive, validation, search confirmation)
- PIM Edit Employee (update and persistence)
- Leave Application (positive, validation, status confirmation)
- Cross-module navigation

## Notes
This is a shared public demo instance. Test data created (employees, leave requests) may 
be visible to other users of the same demo and could be reset periodically. Avoid destructive 
bulk actions.
