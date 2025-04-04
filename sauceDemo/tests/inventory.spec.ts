import { test } from "@playwright/test";
import { InventoryPage } from "../pages/inventoryPage";

test("Verify sorting functionality on inventory page", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // Step 1: Navigate to the Inventory Page
    await inventoryPage.navigate();

    // Step 2: Select "Price (Low to High)" from dropdown
    await inventoryPage.selectSorting("lohi");

    //Step 3: Verify sorting order
    await inventoryPage.verifyPricesSortedLowToHigh();
});
