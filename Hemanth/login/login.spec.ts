import test, { chromium, expect } from "playwright/test";

test("login page", async({}) => {
  const launchedBrowser = await chromium.launch();
  const context = await launchedBrowser.newContext();
  const page = await context.newPage();
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
  console.log(await page.title());
  await page.locator('//input[@id="input-email"]').click();
  await page.locator('//input[@id="input-email"]').fill("hemanth10@gmail.com");
  await page.locator('//input[@id="input-password"]').click();
  await page.locator('//input[@id="input-password"]').fill("Hemanth@10");
  await page.waitForTimeout(3000);
  await page.locator('//input[@type="submit"]').click();
  let text =  await page.locator("//*[contains(text(),'Warning: No match for E-Mail Address and/or Password.')]").innerText();
  expect(text).toBe("Warning: No match for E-Mail Address and/or Password.");
  console.log(text);
  await page.waitForTimeout(3000);
  expect(await page.title()).toBe("Account Login");
  await page.screenshot({ path: `login.png` });
  await page.close();

});