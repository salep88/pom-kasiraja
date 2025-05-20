# POM KasirAja

A Playwright-based end-to-end (E2E) testing project for the KasirAja web application, using the Page Object Model (POM) pattern for maintainable and scalable UI automation.

## Features

- **Page Object Model:** Clean separation of page interactions and test logic.
- **Playwright:** Fast, reliable browser automation.
- **Faker:** Random test data generation for robust test coverage.
- **Environment Variables:** Secure and flexible configuration via `.env` files.
- **CI Integration:** Example GitHub Actions workflow for automated test runs.

## Project Structure

```
pom-kasiraja/
├── page_objects/         # Page Object classes for UI interactions
│   └── UI/
│       └── Produk/
│           ├── addProdukPage.ts
│           ├── produkPage.ts
│           └── ubahProdukPage.ts
├── src/
│   └── interfaces/      # TypeScript interfaces for locators and data
├── tests/
│   └── UI/
│       └── produkTest.spec.ts
├── .env.example         # Example environment variables
├── .gitignore
├── package.json
└── playwright.config.ts
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` to set your `BASE_URL`, `EMAIL_ADMIN`, `PASS_ADMIN`, etc.

### 3. Run Tests Locally

```bash
npx playwright test
```

### 4. Run Tests in CI

This project includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) for automated testing on push and PR.

## Writing Tests

- Test specs are in `tests/UI/`.
- Use the provided Page Object classes for all UI interactions.
- Generate random data with `faker` for more robust tests.

## Example Test

```typescript
test("Add new product @positive", async ({ page }) => {
  const produkPage = new ProdukPage(page);
  const addProdukPage = new AddProdukPage(page);
  const { hargaBeli, hargaJual } = await addProdukPage.validPrice();

  const produkData = {
    nama: faker.commerce.productName(),
    deskripsi: faker.commerce.productDescription(),
    hargaBeli: hargaBeli.toString(),
    hargaJual: hargaJual,
    stok: faker.number.int({ min: 1, max: 100 }).toString(),
  };

  await produkPage.navigateToAddProdukPage();
  await addProdukPage.addProduk(produkData);
  await produkPage.assertToastPopup("success");
  await produkPage.assertToastPopup("item ditambahkan");
});
```

## Contributing

1. Fork this repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

MIT

---

**Happy testing!**
