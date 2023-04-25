// import { test } from '../fixtures';
import { test, expect } from "@playwright/test";
test("check email validation", async ({ page }, testInfo) => {
  await page.goto("https://areena.yle.fi/tv");

  const popup = page.getByRole("button", { name: "Hyväksy kaikki" });
  if (popup && (await popup.isVisible())) popup.click();

  const kirjauduButton = page.getByRole("button", {
    name: "Kirjaudu",
    exact: true,
  });

  if (kirjauduButton && (await kirjauduButton.isVisible())) {
    await kirjauduButton.click({ force: true });
  }

  const frameLocator = page.frameLocator(
    'internal:role=dialog[name="kirjaudu sisään"i] >> iframe'
  );

  const sahkopostiLabel = frameLocator.getByLabel("#email");
  const salasanaLabel = frameLocator.getByLabel("Salasana", { exact: true });

  if (sahkopostiLabel && (await sahkopostiLabel.isVisible()))
    await sahkopostiLabel.click();

  if (sahkopostiLabel && (await sahkopostiLabel.isVisible()))
    await sahkopostiLabel.fill("test");

  if (salasanaLabel && (await salasanaLabel.isVisible()))
    await salasanaLabel.click();

  if (salasanaLabel && (await salasanaLabel.isVisible()))
    await salasanaLabel.fill("test");

  const errorLabel = frameLocator.getByText(
    "Tarkista sähköpostiosoitteen muoto.",
    { exact: true }
  );

  expect(errorLabel).toBeTruthy();

  await page.screenshot({
    path: `validate.png`,
    fullPage: true,
    type: "png",
    timeout: 30000,
  });

  await expect(page).toHaveScreenshot();

  await page.evaluate((_) => {},
  `browserstack_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { status: testInfo.status === "passed" ? "passed" : "failed", reason: testInfo.error?.message } })}`);
});
