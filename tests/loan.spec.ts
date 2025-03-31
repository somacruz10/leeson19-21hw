import { test, expect } from "@playwright/test";
import { SmallLoanPage } from "../page-objects/pages/SmallLoanPage";
import { LoanDecisionPage } from "../page-objects/pages/LoanDecisionPage";

test.describe("Loan app tests", async () => {
  test("TL-20-1 base test", async ({ page }) => {
    const smallLoanPage = new SmallLoanPage(page);
    const loanDecisionPage = new LoanDecisionPage(page);
    await smallLoanPage.open();
    const prefilledAmount = await smallLoanPage.amountInput.getCurrentValue();
    const prefilledPeriod = await smallLoanPage.getFirstPeriodOption();
    await smallLoanPage.applyButton.click();
    await smallLoanPage.usernameInput.fill("test");
    await smallLoanPage.passwordInput.fill("test");
    await smallLoanPage.continueButton.click();
    const finalAmount = await loanDecisionPage.getFinalAmountValue();
    const finalPeriod = await loanDecisionPage.getFinalPeriodValue();

    expect(finalAmount).toEqual(prefilledAmount);
    expect(finalPeriod).toEqual(prefilledPeriod);
  });

  test("TL-20-2 test scrolling", async ({ page }) => {
    const smallLoanPage = new SmallLoanPage(page);
    await smallLoanPage.open();

    await smallLoanPage.scrollButton1.scrollIntoViewIfNeeded();
    await smallLoanPage.scrollButton1.click();
    await expect(smallLoanPage.amountInput.inputLocator).toBeInViewport();
    await smallLoanPage.scrollButton2.scrollIntoViewIfNeeded();
    await smallLoanPage.scrollButton2.click();
    await expect(smallLoanPage.periodSelect).toBeInViewport();
  });

  test("TL-20-3 Slider Test", async ({ page }) => {
    const smallLoanPage = new SmallLoanPage(page);
    await smallLoanPage.open();

    await smallLoanPage.sliderAmount.focus();
    for (let i = 0; i < 5; i++) {
      await smallLoanPage.sliderAmount.press("ArrowRight");
    }

    const inputValue = await smallLoanPage.amountInput.getCurrentValue();
    expect(inputValue).toEqual("505");

    await smallLoanPage.sliderPeriod.focus();
    for (let i = 0; i < 2; i++) {
      await smallLoanPage.sliderPeriod.press("ArrowRight");
    }

    const periodValue = await smallLoanPage.sliderPeriod.inputValue();
    expect(periodValue).toEqual("20");
  });
});
