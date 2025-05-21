import { Page, expect } from '@playwright/test';
// import { LocatorRoleName, LocatorLabelName } from '../../../../src/interfaces/locatorInterface';
import { produkPage } from '../../locators/produkPageLocators';

export class ProdukPage {
    protected page: Page;
    protected produkMenu = produkPage.produkMenu;
    protected tambahBttn = produkPage.tambahBttn;
    protected searchField = produkPage.searchField;
    protected searchBttn = produkPage.searchBttn;
    protected categoryField = produkPage.categoryField;
    protected toastPopup = produkPage.toastPopup;
    protected produkMenuItem = produkPage.produkMenuItem;
    protected ubahEllipsisMenuItem = produkPage.ubahEllipsisMenuItem;
    
    constructor(page: Page) {
        this.page = page;
    };

    protected async clickProdukMenu(): Promise<void> {
        await this.page.getByRole(this.produkMenu.role, { name: this.produkMenu.name }).click();
    };

    protected async clickTambahBttn(): Promise<void> {
        await this.page.getByRole(this.tambahBttn.role, { name: this.tambahBttn.name }).click();
    };

    protected async fillSearchField(searchText: string): Promise<void> {
        await this.page.getByRole(this.searchField.role, { name: this.searchField.name }).fill(searchText);
    };

    protected async clickSearchBttn(): Promise<void> {
        await this.page.locator(this.searchBttn).click();
    };

    protected async openCategoryPopup(): Promise<void> {
        await this.page.getByLabel(this.categoryField.label, this.categoryField.options).click();
    };

    public async navigateToAddProdukPage(): Promise<void> {
        await this.clickProdukMenu();
        await this.clickTambahBttn();
    };

    public async searchProduk(produk: string): Promise<void> {
        await this.clickProdukMenu();
        await this.fillSearchField(produk);
    };

    public async assertToastPopup(message: string): Promise<void> {
        await expect(this.page.locator(this.toastPopup)).toBeVisible();
        await expect(this.page.locator(this.toastPopup)
            .filter({ has: this.page.getByRole('alert')
            .filter({ hasText: message})}))
            .toBeVisible();
    };

    public async navigateToUpdateProdukPage(): Promise<void> {
        await this.clickProdukMenu();
        await this.page.locator(this.produkMenuItem)
            .filter({has: this.page.locator('[data-icon="ellipsis-v"]')})
            .first()
            .click();
        await this.page.getByRole(this.ubahEllipsisMenuItem.role, { name: 'ubah' }).click();
    };

};