import { expect, test } from "@playwright/test";

test("renders the scaffold landing page", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Local palette workspace")).toBeVisible();
});
