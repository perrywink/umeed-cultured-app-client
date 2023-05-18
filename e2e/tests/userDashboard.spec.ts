import { test, expect } from '@playwright/test';

const E2E_USERNAME = "teste2euser"
const E2E_PASSWORD = "teste2euser"
const E2E_CONTACT = "0422222221"
const datetime=Date.now();

test.describe('Interests Page', () => {

    test.describe.configure({ mode: 'serial' });
  
    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
        await page.getByText('Register now').click();
        await expect(page).toHaveURL('/login#/register');
        await expect(page.getByRole('img', { name: 'Cultured Up All Logo' })).toBeVisible();
    });


    test("should register a new user and check their dashboard", async ({page}) => {
        //fill in all the details on the register page
        await page.getByPlaceholder('john@doe.com').fill(E2E_USERNAME+datetime+"@gmail.com");
        await page.getByPlaceholder('john doe').fill(E2E_USERNAME+datetime);
        await page.getByPlaceholder('0412346789').fill(E2E_CONTACT);
        await page.getByPlaceholder('Minimum 6 characters.').fill(E2E_PASSWORD);
        await page.getByPlaceholder('Make sure it matches!').fill(E2E_PASSWORD);
        await page.getByRole('checkbox').click();

        //click on register
        await page.getByRole('button', { name: 'Register' }).click();

        //navigate to the econtact page
        await expect(page).toHaveURL('login#/onboarding');

        // Fill in the emergency contact details
        const nameInput = "Test Emergency Contact UserName1";
        await page.getByPlaceholder('Jane Doe').fill(nameInput);
        const numberInput = "0412345678";
        await page.getByPlaceholder('0412346789').fill(numberInput);
        await page.getByRole('button', { name: "Next" }).click()
        await expect(page.getByText("Get Started")).toBeVisible();
        await expect(page).toHaveURL('login#/onboarding');
        
        //Select an interest
        await page.getByTestId("react-select-3-input").click();
        await expect(page.getByTestId("react-select-3-listbox")).toBeVisible();
        const selected_interest_1 = (await page.getByTestId("react-select-3-option-1").innerText()).valueOf()
        await page.getByTestId("react-select-3-option-1").click();

        //Select another interest
        await page.getByTestId("react-select-3-input").click();
        await expect(page.getByTestId("react-select-3-listbox")).toBeVisible();
        const selected_interest_2 = (await page.getByTestId("react-select-3-option-5").innerText()).valueOf()
        await page.getByTestId("react-select-3-option-5").click();

        //Select another interest
        await page.getByTestId("react-select-3-input").click();
        await expect(page.getByTestId("react-select-3-listbox")).toBeVisible();
        const selected_interest_3 = (await page.getByTestId("react-select-3-option-7").innerText()).valueOf()
        await page.getByTestId("react-select-3-option-7").click();

        await page.getByRole('button', { name: "Get Started" }).click()

        //check that the dashboard for the user is displayed with selected interests
        await expect(page.getByText(selected_interest_1)).toBeVisible();
        await expect(page.getByText(selected_interest_2)).toBeVisible();
        await expect(page.getByText(selected_interest_3)).toBeVisible();

    });

});  
