import pytest
from playwright.sync_api import expect

def test_LOGIN_01_user_can_login(page, base_url, login):
    """LOGIN-01: Verify a user can log in with valid credentials.

    Uses stable selectors discovered during exploratory testing:
    - input[name="username"], input[name="password"], button:has-text("Login")
    """
    # Perform login using shared fixture
    login()

    # Wait for a dashboard-visible navigation link that indicates a successful login
    pim_link = page.locator('a[href="/web/index.php/pim/viewPimModule"]')
    expect(pim_link).to_be_visible(timeout=10000)

    # Basic sanity assertion: URL contains the dashboard path or the PIM link is visible
    assert "/web/index.php" in page.url


