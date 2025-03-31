import { expect, Locator, Page } from "@playwright/test";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

const url = "https://loan-app.tallinn-learning.ee/small-loan";

export class SmallLoanPage {
  readonly page: Page;
  readonly applyButton: Button;
  readonly applyImage1: Button;
  readonly applyImage2: Button;
  readonly amountInput: Input;
  readonly amountInputError: Locator;
  readonly periodSelect: Locator;
  readonly periodOptions: Locator;
  readonly usernameInput: Input;
  readonly passwordInput: Input;
  readonly continueButton: Button;
  readonly monthlyAmountSPan: Locator;
  readonly scrollButton1: Button;
  readonly scrollButton2: Button;
  readonly sliderAmount: Locator;
  readonly sliderPeriod: Locator;

  constructor(page: Page) {
    this.page = page;
    this.applyButton = new Button(page, "id-small-loan-calculator-field-apply");
    this.applyImage1 = new Button(page, "id-image-element-button-image-1");
    this.applyImage2 = new Button(page, "id-image-element-button-image-2");
    this.amountInput = new Input(page, "id-small-loan-calculator-field-amount");
    this.amountInputError = page.getByTestId(
      "id-small-loan-calculator-field-error",
    );
    this.periodSelect = page.getByTestId(
      "ib-small-loan-calculator-field-period",
    );
    //this.periodOptions = this.periodSelect.locator("option")
    this.periodOptions = this.periodSelect.locator("option");
    this.usernameInput = new Input(page, "login-popup-username-input");
    this.passwordInput = new Input(page, "login-popup-password-input");
    this.continueButton = new Button(page, "login-popup-continue-button");
    this.monthlyAmountSPan = page.getByTestId(
      "ib-small-loan-calculator-field-monthlyPayment",
    );
    this.scrollButton1 = new Button(page, "id-image-element-button-image-1");
    this.scrollButton2 = new Button(page, "id-image-element-button-image-2");
    this.sliderAmount = page.getByTestId(
      "id-small-loan-calculator-field-amount-slider",
    );
    this.sliderPeriod = page.getByTestId(
      "ib-small-loan-calculator-field-period-slider",
    );
  }

  async open(): Promise<void> {
    await this.page.goto(url);
  }

  async getFirstPeriodOption(): Promise<string> {
    const allOptions = await this.periodOptions.all();
    return await allOptions[0].innerText();
  }

  async thirdFirstPeriodOption(): Promise<string> {
    const allOptions = await this.periodOptions.all();
    return await allOptions[2].innerText();
  }

  async checkMonthlyAmount(expected: number): Promise<void> {
    const innerText = await this.monthlyAmountSPan.innerText();
    const summ = +innerText.split(" ")[0];
    expect(expected).toEqual(summ);
  }

  async checkMonthlyAmountErrorText(expected: string): Promise<void> {
    const innerText = await this.amountInputError.innerText();
    expect(expected).toEqual(innerText);
  }

  async checkMonthlyAmountUndefined(expected: string): Promise<void> {
    const innerText = await this.monthlyAmountSPan.innerText();
    const undefinedText = innerText.split(" ")[0];
    expect(expected).toEqual(undefinedText);
  }
}
