import { Page, expect } from '@playwright/test';
import { LocatorRoleName, LocatorLabelName } from '../../../src/interfaces/locatorInterface';

export class ProdukPage {
    protected page: Page;
    protected produkMenu: LocatorRoleName;
    protected tambahBttn: LocatorRoleName;
    protected searchField: LocatorRoleName;
    protected searchBttn: string;
    protected categoryField: LocatorLabelName;
    protected toastPopup : string;
    protected produkMenuItem: string;
    protected ubahEllipsisMenuItem: LocatorRoleName
    
    constructor(page: Page) {
        this.page = page;
        this.produkMenu = { role: 'link', name: 'produk'};
        this.tambahBttn = { role: 'link', name: 'tambah' };
        this.searchField = { role: 'textbox', name: 'cari' };
        this.searchBttn = '.chakra-input__right-element';
        this.categoryField = { label: "", options: { exact: true } };
        this.toastPopup = '#chakra-toast-manager-top-right';
        this.produkMenuItem = '[aria-haspopup="menu"]';
        this.ubahEllipsisMenuItem = { role: 'menuitem', name: 'ubah' };
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