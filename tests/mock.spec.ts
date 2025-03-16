import { test } from '@playwright/test';
import {SmallLoanPage} from "../page-objects/pages/SmallLoanPage";

test.describe('Loan app mock test', async () => {
    test('TL-21-1 base test', async ({ page }) => {
        const expectedMonthlyAmount = 100005;
        const smallLoanPage = new SmallLoanPage(page);

        await page.route("**/api/loan-calc*", async (request) => {
            const responseBody = {paymentAmountMonthly: expectedMonthlyAmount};
            await request.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(responseBody)
            });
        });

        const loanCalcResponse = page.waitForResponse("**/api/loan-calc*");

        await page.goto("http://localhost:3000");
        await loanCalcResponse;
        await smallLoanPage.checkMonthlyAmount(expectedMonthlyAmount);
    });

    test('TL-21-2 500 response', async ({ page }) => {

        const expectedErrorText = "Oops, something went wrong"
        const smallLoanPage = new SmallLoanPage(page);

        await page.route("**/api/loan-calc*", async (request) => {
            const responseBody = {"": ""};
            await request.fulfill({
                status: 500,
                contentType: "application/json",
                body: JSON.stringify(responseBody)
                });
        });

            const loanCalcResponse = page.waitForResponse("**/api/loan-calc*");
            await page.goto("http://localhost:3000");
            await loanCalcResponse;
            await smallLoanPage.checkMonthlyAmountErrorText(expectedErrorText);

    });

    test('TL-21-3 200 response, empty body', async ({ page }) => {

        const expectedErrorText = "undefined"
        const smallLoanPage = new SmallLoanPage(page);

        await page.route("**/api/loan-calc*", async (request) => {
            const responseBody = {"": ""};
            await request.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(responseBody)
            });
        });

        const loanCalcResponse = page.waitForResponse("**/api/loan-calc*");
        await page.goto("http://localhost:3000");
        await loanCalcResponse;
        await smallLoanPage.checkMonthlyAmountUndefined(expectedErrorText);

    });

    test('TL-21-4 200 response, empty body', async ({ page }) => {
        const expectedMonthlyAmount = 100005;
        const expectedErrorText = "undefined"
        const smallLoanPage = new SmallLoanPage(page);

        await page.route("**/api/loan-calc*", async (request) => {
            const responseBody = {paymentOshibkaKlu4a: expectedMonthlyAmount};
            await request.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(responseBody)
            });
        });

        const loanCalcResponse = page.waitForResponse("**/api/loan-calc*");
        await page.goto("http://localhost:3000");
        await loanCalcResponse;
        await smallLoanPage.checkMonthlyAmountUndefined(expectedErrorText);

    });

});
