import { expect, test } from "@playwright/test";

test("renders the scaffold landing page", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Local palette workspace")).toBeVisible();
  await expect(page.getByRole("button", { name: "Toggle theme" })).toBeVisible();

  await page.getByRole("button", { name: "Toggle theme" }).click();

  await expect(page.getByText("Light bench active")).toBeVisible();
});
