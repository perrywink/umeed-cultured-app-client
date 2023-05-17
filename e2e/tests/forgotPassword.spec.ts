import { test, expect } from '@playwright/test';

const E2E_EMAIL = "test@gmail.com"
const E2E_PASSWORD = "test@1234"

test.describe.skip('Forgot Password Page', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
      await page.goto('#/login');
      await expect(page.getByRole('img', { name: 'Cultured Up All Logo' })).toBeVisible();
      await page.getByText('Forgot Password?').click();
      await expect(page).toHaveURL('#/reset-password');
  });

   test('should render forget password page', async ({ page }) => {
     await expect(page.getByText('Forgot your password?')).toBeVisible();

     await expect(page.getByText('Don\'t fret! We\'ll send you reset instructions.')).toBeVisible();

     await expect(page.getByText("Email")).toBeVisible();

     await expect(page.getByRole('button', { name: 'Send' })).toBeVisible();

     await expect(page.getByText('Reset done? Back to Login')).toBeVisible();

     await expect(page.getByRole('img', { name: 'all hands in' })).toBeVisible();
  });

   test('should go back to login page', async ({ page }) => {
     await page.getByText('Back to Login').click();

     await expect(page).toHaveURL('#/login');
  });

   test('should send mail on the press of send button', async ({ page }) => {
    
  });
});
