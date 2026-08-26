Playwright pytest suite for OrangeHRM - run instructions

1) Create a virtualenv (recommended) and install dependencies:

    python -m venv .venv
    .\.venv\Scripts\Activate.ps1   # PowerShell
    pip install -r requirements.txt

2) Install Playwright browsers:

    playwright install

3) Run tests (all browsers by default via parametrization):

    pytest -q

To run a single file:

    pytest -q tests\saucedemo_checkout\test_login.py

Notes:
- Use BASE_URL env var to target a different OrangeHRM instance, e.g.:

    $env:BASE_URL = "https://my.staging.orangehrm"; pytest -q

- The suite relies on stable selectors discovered during exploratory testing (see tests for details).
