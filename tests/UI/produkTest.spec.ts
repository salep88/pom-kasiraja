import { test } from '@playwright/test';
import { ProdukPage } from '../../page_objects/UI/features/produk/produkPage';
import { AddProdukPage } from '../../page_objects/UI/features/produk/addProdukPage';
import { UbahProdukPage } from '../../page_objects/UI/features/produk/ubahProdukPage';
import { LoginPage } from '../../page_objects/UI/loginPage';
import { faker } from '@faker-js/faker';
import 'dotenv/config';

let produkPage: ProdukPage;
let addProdukPage: AddProdukPage;
let loginPage: LoginPage;
let ubahProdukPage: UbahProdukPage
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

    const { hargaBeli, hargaJual } = await addProdukPage.validPrice();

    const produkData = {
        nama: faker.commerce.productName(),
        deskripsi: faker.commerce.productDescription(),
        hargaBeli: hargaBeli.toString(),
        hargaJual: hargaJual,
        stok: faker.number.int({ min: 1, max: 100 }).toString(),
    }

    await produkPage.navigateToAddProdukPage();
    await addProdukPage.addProduk(produkData);
    await produkPage.assertToastPopup('success');
    await produkPage.assertToastPopup('item ditambahkan');
    await page.waitForTimeout(3000);
});

test("Add new product - all field empty @negative", async ({page}) => {
    produkPage = new ProdukPage(page);
    addProdukPage = new AddProdukPage(page);

    const produkData = {
        nama: '',
        deskripsi: '',
        hargaBeli: '',
        hargaJual: '',
        stok: '',
    };

    await produkPage.navigateToAddProdukPage();
    await addProdukPage.addProduk(produkData);
    await addProdukPage.assertAlertFormMessage('"name" is not allowed to be empty');
    await page.waitForTimeout(3000);
});

test("Change product details @positive", async ({page}) => {
    produkPage = new ProdukPage(page);
    addProdukPage = new AddProdukPage(page);
    ubahProdukPage = new UbahProdukPage(page);
    const { hargaBeli, hargaJual } = await addProdukPage.validPrice();

    const produkData = {
        hargaBeli: hargaBeli.toString(),
        hargaJual: hargaJual,
    };

    await produkPage.navigateToUpdateProdukPage();
    await ubahProdukPage.ubahProduk(produkData);
    await produkPage.assertToastPopup('success');
    await produkPage.assertToastPopup('item diubah');
    await page.waitForTimeout(3000);
});

test("Change product details - all field empty @negative", async ({page}) => {
    produkPage = new ProdukPage(page);
    addProdukPage = new AddProdukPage(page);
    ubahProdukPage = new UbahProdukPage(page);
    const produkData = {
        nama: '',
        deskripsi: '',
        hargaBeli: '',
        hargaJual: '',
        stok: '',
    };
    await produkPage.navigateToUpdateProdukPage();
    await ubahProdukPage.ubahProduk(produkData);
    await addProdukPage.assertAlertFormMessage('"name" is not allowed to be empty');
    await page.waitForTimeout(3000);
});




// test.afterAll('Teardown', async ({page}) => {
//     await page.close();
// });