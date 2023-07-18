const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { user } = require("../user.js");

test("valid login", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.fill('[placeholder="Email"]', user.email);
  await page.fill('[placeholder="Пароль"]', user.psswrd);
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://netology.ru/profile' }*/),
    page.click('[data-testid="login-submit-btn"]'),
  ]);
  await expect(page).toHaveURL("https://netology.ru/profile");
  await expect(page.locator("h2")).toContainText(["Мои курсы и профессии"]);
});

test("invalid login", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.fill('[placeholder="Email"]', user.email);
  await page.fill('[placeholder="Пароль"]', "invalidP1!");
  await page.click('[data-testid="login-submit-btn"]');
  const error = await page.locator('[data-testid="login-error-hint"]');
  await expect(error).toHaveText("Вы ввели неправильно логин или пароль");
});
