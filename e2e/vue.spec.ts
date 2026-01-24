import { test, expect } from '@playwright/test';

test.describe('Admin Authentication & Profile', () => {

  test.beforeEach(async ({ page }) => {
    // 1. Mock Supabase Auth (Login Token)
    // This allows the app to think it has a valid logged-in user
    await page.route('**/auth/v1/token?*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          access_token: 'fake-access-token',
          token_type: 'bearer',
          expires_in: 3600,
          refresh_token: 'fake-refresh-token',
          user: {
            id: 'test-user-id',
            aud: 'authenticated',
            role: 'authenticated',
            email: 'phath@example.com',
          }
        })
      });
    });

    // 2. CRITICAL FIX: Mock the Profiles Table
    // This handles the Router Guard's check: .from('profiles').select('role').single()
    await page.route('**/rest/v1/profiles*', async route => {
      const request = route.request();
      const headers = request.headers();
      const acceptHeader = headers['accept'] || '';

      const adminProfile = { role: 'admin' };

      // Supabase .single() sends a special Accept header.
      // We must reply with the correct Content-Type or the client throws an error.
      if (acceptHeader.includes('application/vnd.pgrst.object+json')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/vnd.pgrst.object+json',
          body: JSON.stringify(adminProfile)
        });
      } else {
        // Fallback for standard array queries (like listing users)
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          headers: { 'content-range': '0-0/1' },
          body: JSON.stringify([adminProfile])
        });
      }
    });

    // 3. Mock Products (Prevents errors on the dashboard)
    await page.route('**/rest/v1/products*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });

    // --- Perform Login ---
    await page.goto('/login');

    // Using robust selectors that ignore casing
    await page.getByLabel('Email Address', { exact: false }).fill('phath@example.com');
    await page.getByLabel('Password', { exact: false }).fill('123456789');

    // Handle any "Access Denied" alerts automatically
    page.on('dialog', dialog => dialog.accept());

    await page.getByRole('button', { name: /Sign In/i }).click();

    // 4. Wait for redirection to /admin
    await expect(page).toHaveURL('/admin');
  });

  test('admin dashboard loads correctly after login', async ({ page }) => {
    // If we are here, the URL check in beforeEach already passed
    await expect(page).toHaveURL('/admin');

    // Optional: Check for a dashboard element if you know one exists
    // await expect(page.getByText('Dashboard')).toBeVisible();
  });

  test('admin session persists after page reload', async ({ page }) => {
    await page.reload();
    await expect(page).toHaveURL('/admin');
  });
});
