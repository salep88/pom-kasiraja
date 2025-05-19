import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page_objects/UI/loginPage';
import { authFlow } from '../../page_objects/API/login';

let loginPage: LoginPage;
let auth: authFlow;

test.beforeEach(async () => {
    auth = new authFlow();
});

test('Test login with valid credentials', async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('https://kasirdemo.vercel.app');
    await loginPage.login('Maximilian.Pacocha@hotmail.com', 'Test12345');
    
    await expect(page.getByRole('heading', { name: 'kasirAja' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'dashboard' })).toBeVisible();
});

test('Test create 1 new admin', async () => {
    const userId = await auth.createNewUser();
    const userDetails = await auth.getUserDetails(userId);
    await expect(userDetails).toHaveProperty('id');
    await expect(userDetails).toHaveProperty('name');
    await expect(userDetails).toHaveProperty('email');
    await expect(userDetails.id).toEqual(userId);
    await expect(userDetails.name).toBeDefined();
    await expect(userDetails.email).toBeDefined();
});

test('Mock Dashboard API response', async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.route('https://kasir-api.zelz.my.id/dashboard', async route => {
        await route.fulfill({
            status:200,
            contentType : 'application/json',
            body: JSON.stringify({
                status: 'success',
                data: {
                    saleCount: "1000",
                    purchaseCount: "100",
                    saleYesterdayCount: "25",
                    purchaseYesterdayCount: "25",
                    grownSale: 25,
                    grownPurchase: 15,
                    graphSale: [
                        { date: "2025-10-04", count: 70000 },
                        { date: "2025-10-03", count: 120000 }
                    ],
                    graphPurchase: [
                        { date: "2025-10-04", count: 50000 },
                        { date: "2025-10-03", count: 75000 }
                    ],
                    totalSales: 750000,
                    totalPurchases: 500000
                }
            })
        });
    });

    await page.goto('https://kasirdemo.vercel.app');
    await loginPage.login('Maximilian.Pacocha@hotmail.com', 'Test12345');
    await expect(page.getByRole('heading', { name: 'kasirAja' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'dashboard' })).toBeVisible();
    await page.screenshot({ path: 'screenshot/dashboard.png', fullPage: true });
    await expect(page.locator('#root > div > div > div.css-1r35f0l > div.chakra-container.css-9rmdie > div > div.css-trlcwy > div:nth-child(6) > div > dl > dd')).toContainText('500.000');
    await page.close();
});