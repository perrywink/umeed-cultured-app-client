import { test, expect } from '@playwright/test';

const E2E_WRONG_EMAIL= "test"
const E2E_EMAIL = "test@gmail.com"
const E2E_PASSWORD = "test@1234"

test.describe.skip('Login Page', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
      await page.goto('/login');
      await expect(page.getByRole('img', { name: 'Cultured Up All Logo' })).toBeVisible();
  });

   test('should render login page', async ({ page }) => {
     await expect(page.getByText('Hi Again!')).toBeVisible();

     await expect(page.getByText('Enter your details to continue.')).toBeVisible();

     await expect(page.getByText("Email")).toBeVisible();

     await expect(page.getByText('Password', { exact: true })).toBeVisible();

    //  await expect(page.getByText('Remember me')).toBeVisible();

     await expect(page.getByText('Forgot Password?')).toBeVisible();

     await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

     await expect(page.getByText('Don\'t have an account? Register now')).toBeVisible();

     await expect(page.getByRole('img', { name: 'all hands in' })).toBeVisible();
  });

  test('should throw error on entering wrong email', async ({ page }) => {
    await page.getByPlaceholder('john@doe.com').fill(E2E_WRONG_EMAIL);

    await page.getByPlaceholder('Minimum 6 characters.').fill(E2E_PASSWORD);

    // await page.getByRole('checkbox').click();

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Please check your email')).toBeVisible();
  });

    test('should throw error on entering wrong credentials', async ({ page }) => {
    await page.getByPlaceholder('john@doe.com').fill(E2E_EMAIL);

    await page.getByPlaceholder('Minimum 6 characters.').fill(E2E_PASSWORD);

    // await page.getByRole('checkbox').click();

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Incorrect username or password')).toBeVisible();
  });
});