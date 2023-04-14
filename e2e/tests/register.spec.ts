import { test, expect } from '@playwright/test';

const E2E_WRONG_EMAIL= "test"
const E2E_EMAIL = "test@gmail.com"
const E2E_PASSWORD = "test@1234"

test.describe('Register Page', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
      await page.goto('/login');
      await page.getByRole('button', { name: 'Register' }).click();
      await expect(page).toHaveURL('/register');
      await expect(page).toHaveTitle(/Cultured UP App/);
  });

  test('should render register page', async ({ page }) => {
     await expect(page.getByText("Email")).toBeVisible();

     await expect(page.getByText('Password', { exact: true })).toBeVisible();

     await expect(page.getByText(/Confirm Password/)).toBeVisible();

     await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();

     await expect(page.getByRole('button', { name: 'Forgot Password' })).toBeVisible();

     await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('should redirect to login page', async ({ page }) => {
     await page.getByRole('button', { name: 'Login' }).click();

     await expect(page).toHaveURL('/login');
  });

 test('should throw error on entering wrong credentials', async ({ page }) => {
    await page.locator('input[type="text"]').fill(E2E_WRONG_EMAIL);

    await page.getByRole('textbox').nth(1).fill(E2E_PASSWORD);

    await page.getByRole('textbox').nth(2).fill(E2E_PASSWORD);

    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.getByText(/Please check your email/)).toBeVisible();
  });

  test('should throw error on entering unmatched passwords', async ({ page }) => {
    await page.locator('input[type="text"]').fill(E2E_EMAIL);

    await page.getByRole('textbox').nth(1).fill(E2E_PASSWORD);

    await page.getByRole('textbox').nth(2).fill(E2E_PASSWORD + " ");

    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.getByText(/Make sure your password match up!/)).toBeVisible();
  });


  test('should register with proper credentials', async ({ page }) => {

    await page.locator('input[type="text"]').fill(E2E_EMAIL);

    await page.getByRole('textbox').nth(1).fill(E2E_PASSWORD);

    await page.getByRole('textbox').nth(2).fill(E2E_PASSWORD);

  //  await page.getByRole('button', { name: 'Register' }).click();

  //  await expect(page).toHaveURL('/login');
  });
});
