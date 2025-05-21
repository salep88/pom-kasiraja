import { Page, expect } from '@playwright/test';
import { LocatorRoleName } from '../../../../src/interfaces/locatorInterface';
import { ProdukData } from '../../../../src/interfaces/produkInterface';
import { addProdukPage } from '../../locators/produkPageLocators';
import { faker } from '@faker-js/faker'

export class AddProdukPage {
    readonly page: Page;
    readonly namaField = addProdukPage.namaField;
    readonly deskripsiField = addProdukPage.deskripsiField;
    readonly hargaBeliField = addProdukPage.hargaBeliField;
    readonly hargaJualField = addProdukPage.hargaJualField;
    readonly stokField = addProdukPage.stokField;
    readonly kategoriField = addProdukPage.kategoriField;
    readonly searchfieldKategory = addProdukPage.searchfieldKategory;
    readonly kategoriList = addProdukPage.kategoriList;
    readonly simpanBttn = addProdukPage.simpanBttn;
    readonly formAlertMessage = addProdukPage.formAlertMessage;

    constructor(page: Page) {
        this.page = page;
    };

    public async fillNamaField(nama: string): Promise<void> {
        await this.page.getByRole(this.namaField.role, { name: this.namaField.name }).fill(nama);
    };
    
    public async fillDeskripsiField(deskripsi: string): Promise<void> {
        await this.page.getByRole(this.deskripsiField.role, { name: this.deskripsiField.name }).fill(deskripsi);
    };

    public async fillHargaBeliField(hargaBeli: string): Promise<void> {
        await this.page.getByRole(this.hargaBeliField.role, { name: this.hargaBeliField.name }).fill(hargaBeli);
    };

    public async fillHargaJualField(hargaJual: string): Promise<void> {
        await this.page.getByRole(this.hargaJualField.role, { name: this.hargaJualField.name }).fill(hargaJual);
    };

    public async fillStokField(stok: string): Promise<void> {
        await this.page.getByRole(this.stokField.role, { name: this.stokField.name }).fill(stok);
    };

    public async openKategoriPopup(): Promise<void> {
        await this.page.getByRole(this.kategoriField.role, { name: this.kategoriField.name }).click();
        await this.page.waitForTimeout(3000);
    };

    public async pickRandomKategori(): Promise<void> {
        const kategoriItems = await this.page.getByRole(this.kategoriList.role);
        const count = await kategoriItems.count();
        if (count === 0) throw new Error('No kategori items found');
        const randomIndex = Math.floor(Math.random() * count);
        await kategoriItems.nth(randomIndex).click();
    };

    public async validPrice(): Promise<{ hargaBeli: number; hargaJual: string }> {
        const hargaBeli = faker.number.int({ min: 1000, max: 10000 });
        const hargaJual = faker.number.int( { min: hargaBeli + 500, max: hargaBeli + 50000}).toString();
        return {
            hargaBeli,
            hargaJual
        };
    };

    public async clickSimpanBttn(): Promise<void> {
        await this.page.getByRole(this.simpanBttn.role, { name: this.simpanBttn.name }).click();
    };
    
    public async addProduk(data: ProdukData): Promise<void> {
        await this.fillNamaField(data.nama ?? '');
        await this.fillDeskripsiField(data.deskripsi ?? '');
        await this.fillHargaBeliField(data.hargaBeli ?? '');
        await this.fillHargaJualField(data.hargaJual ?? '');
        await this.fillStokField(data.stok ?? '');
        await this.openKategoriPopup();
        await this.pickRandomKategori();
        await this.clickSimpanBttn();
    };

    public async assertAlertFormMessage(message: string): Promise<void> {
        await expect(this.page.getByRole(this.formAlertMessage.role)).toBeVisible();
        await expect(this.page.getByRole(this.formAlertMessage.role).filter({ hasText: message })).toBeVisible();
    }
};