import os
import pytest
from playwright.sync_api import Page, expect


@pytest.fixture(scope="session")
def base_url() -> str:
    """Base URL for the AUT. Can be overridden with BASE_URL env var."""
    return os.getenv("BASE_URL", "https://opensource-demo.orangehrmlive.com")


@pytest.fixture
def login(page: Page, base_url: str):
    """Helper fixture that performs login. Returns a callable so tests can pass credentials when needed.

    Uses the stable selectors discovered during exploratory testing.
    """
    def _login(username: str = "Admin", password: str = "admin123"):
        # Navigate to base URL and wait for login controls
        page.goto(base_url)
        page.locator('input[name="username"]').wait_for(state="visible", timeout=10000)
        page.fill('input[name="username"]', username)
        page.fill('input[name="password"]', password)
        page.click('button:has-text("Login")')

        # Wait for a dashboard indicator: the PIM navigation link is a reliable signal
        expect(page.locator('a[href="/web/index.php/pim/viewPimModule"]')).to_be_visible(timeout=10000)

    return _login
