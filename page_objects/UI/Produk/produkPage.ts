import { Page } from '@playwright/test';
import { LocatorRoleName, LocatorLabelName } from '../../../src/interfaces/locatorInterface';

export class ProdukPage {
    readonly page: Page;
    readonly produkMenu: LocatorRoleName;
    readonly tambahBttn: LocatorRoleName;
    readonly searchField: LocatorRoleName;
    readonly searchBttn: string;
    readonly categoryField: LocatorLabelName;
    
    constructor(page: Page) {
        this.page = page;
        this.produkMenu = { role: 'link', name: 'produk'};
        this.tambahBttn = { role: 'link', name: 'tambah' };
        this.searchField = { role: 'textbox', name: 'cari' };
        this.searchBttn = '.chakra-input__right-element';
        this.categoryField = { label: "", options: { exact: true } };
    };

    public async clickProdukMenu(): Promise<void> {
        await this.page.getByRole(this.produkMenu.role, { name: this.produkMenu.name }).click();
    };

    public async clickTambahBttn(): Promise<void> {
        await this.page.getByRole(this.tambahBttn.role, { name: this.tambahBttn.name }).click();
    };

    public async fillSearchField(searchText: string): Promise<void> {
        await this.page.getByRole(this.searchField.role, { name: this.searchField.name }).fill(searchText);
    };

    public async clickSearchBttn(): Promise<void> {
        await this.page.locator(this.searchBttn).click();
    };

    public async openCategoryPopup(): Promise<void> {
        await this.page.getByLabel(this.categoryField.label, this.categoryField.options).click();
    };

    public async navigateToAddProdukPage(): Promise<void> {
        await this.clickProdukMenu();
        await this.clickTambahBttn();
    };

};