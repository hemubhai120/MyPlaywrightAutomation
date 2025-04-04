import { Page, expect } from "@playwright/test";

export class InventoryPage {
    private page: Page;
    private sortDropdown = '[class="product_sort_container"]'; // Sorting dropdown selector
    private inventoryItems = '.inventory_item_price'; // Price elements

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/v1/inventory.html');
    }

    async selectSorting(option: string): Promise<void> {
        await this.page.selectOption(this.sortDropdown, option);
    }

    async getPrices(): Promise<number[]> {
        return await this.page.$$eval(this.inventoryItems, items =>
            items.map(item => parseFloat((item as HTMLElement).innerText.replace('$', '')))
        );
    }

    async verifyPricesSortedLowToHigh(): Promise<void> {
        const prices = await this.getPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    }
}
