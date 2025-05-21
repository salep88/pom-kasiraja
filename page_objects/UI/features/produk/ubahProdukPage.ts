import { Page } from '@playwright/test';
import { ProdukData } from '../../../../src/interfaces/produkInterface';
import { AddProdukPage } from './addProdukPage';

export class UbahProdukPage extends AddProdukPage {

    constructor(page: Page) {
        super(page);
    };

    public async ubahProduk(data: ProdukData): Promise<void> {
        if (typeof data.nama === 'string') {
            await this.fillNamaField(data.nama);
        }
        if (typeof data.deskripsi === 'string') {
            await this.fillDeskripsiField(data.deskripsi);
        }
        if (typeof data.hargaBeli === 'string') {
            await this.fillHargaBeliField(data.hargaBeli);
        }
        if (typeof data.hargaJual === 'string') {
            await this.fillHargaJualField(data.hargaJual);
        }
        if (typeof data.stok === 'string') {
            await this.fillStokField(data.stok);
        }
        await this.openKategoriPopup();
        await this.pickRandomKategori();
        await this.clickSimpanBttn();
    };
};