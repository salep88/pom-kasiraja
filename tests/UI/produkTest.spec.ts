import { test, expect } from '@playwright/test';
import { ProdukPage } from '../../page_objects/UI/Produk/produkPage';
import { AddProdukPage } from '../../page_objects/UI/Produk/addProdukPage';
import { LoginPage } from '../../page_objects/UI/loginPage';
import { faker } from '@faker-js/faker';
import 'dotenv/config';

let produkPage: ProdukPage;
let addProdukPage: AddProdukPage;
let loginPage: LoginPage;
const baseURL: string = process.env.BASE_URL || "";
const adminEmail: string = process.env.EMAIL_ADMIN || "";
const adminPassword: string = process.env.PASS_ADMIN || "";

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    await page.goto(baseURL);
    await loginPage.login(adminEmail, adminPassword);
});

test("Add new product @positive", async ({page}) => {
    produkPage = new ProdukPage(page);
    addProdukPage = new AddProdukPage(page);

    const hargaBeli = faker.number.int({ min: 1000, max: 10000 });
    const hargaJual = faker.number.int({ min: hargaBeli + 500, max: hargaBeli + 50000 }).toString();

    const produkData = {
        nama: faker.commerce.productName(),
        deskripsi: faker.commerce.productDescription(),
        hargaBeli: hargaBeli.toString(),
        hargaJual: hargaJual,
        stok: faker.number.int({ min: 1, max: 100 }).toString(),
    }

    await produkPage.navigateToAddProdukPage();
    await addProdukPage.addProduk(produkData);
})