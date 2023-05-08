import { test, expect } from '@playwright/test';

const E2E_EMAIL = "teste2eusergit@gmail.com"
const E2E_USERNAME = "teste2eusergit"
const E2E_PASSWORD = "teste2eusergit"
const E2E_CONTACT = "0422222222"

test.describe('Econtact Page', () => {
    test.describe.configure({ mode: 'serial' });
  
    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
        await page.getByText('Register now').click();
        await expect(page).toHaveURL('/login#/register');
        await expect(page.getByRole('img', { name: 'Cultured Up All Logo' })).toBeVisible();

        //fill in all the details on the register page
        await page.getByPlaceholder('john@doe.com').fill(E2E_EMAIL);
        await page.getByPlaceholder('john doe').fill(E2E_USERNAME);
        await page.getByPlaceholder('0412346789').fill(E2E_CONTACT);
        await page.getByPlaceholder('Minimum 6 characters.').fill(E2E_PASSWORD);
        await page.getByPlaceholder('Make sure it matches!').fill(E2E_PASSWORD);
        await page.getByRole('checkbox').click();

        //click on register
        await page.getByRole('button', { name: 'Register' }).click();

        //navigate to the econtact page
        await expect(page).toHaveURL('login#/onboarding');
    });


  test('should register with proper credentials and fill the emergency contact', async ({ page }) => {
    // Fill in name field
    const nameInput = "Test Emergency Contact UserName";
    await page.getByPlaceholder('Jane Doe').fill(nameInput);

    // Fill in contact number field
    const numberInput = "0412346789";
     await page.getByPlaceholder('0412346789').fill(numberInput);

    // Click the Next button
    await page.getByRole('button', { name: "Next" }).click()

    //Check we are on next page
    await expect(page.getByText("Get Started")).toBeVisible();

  });

});  