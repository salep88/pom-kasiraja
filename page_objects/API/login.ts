import { request } from "@playwright/test";
import { faker } from "@faker-js/faker";
import 'dotenv/config';

export class authFlow {
    private readonly apiBaseUrl: string = process.env.API_BASE_URL || "";
    private readonly emailAdmin: string = process.env.EMAIL_ADMIN || "";
    private readonly passwordAdmin: string = process.env.PASS_ADMIN || "";
    // private accessToken: string | null = null;
    // private refreshToken: string | null = null;

    protected async generateAccessToken(email: string, password: string) {
        const apiContext = await request.newContext();
        const response = await apiContext.post(`${this.apiBaseUrl}/authentications`, {
            data: {
                email: email,
                password: password
            },
        });

        if (!response.ok()) {
            throw new Error(`Failed to generate access token: ${response.status()} ${response.statusText()}`);
        }

        const responseBody = await response.json();
        return responseBody.data?.accessToken;
    };

    private async getAuthHeaders() {
        const accessToken = await this.generateAccessToken(`${this.emailAdmin}`, `${this.passwordAdmin}`);
        return {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
    };

    public async createNewUser() {
        const apiContext = await request.newContext();
        const response = await apiContext.post(`${this.apiBaseUrl}/users`, {
            headers: await this.getAuthHeaders(),
            data: {
                name: faker.person.firstName(),
                email: faker.internet.email(),
                password: `Test12345`
            },
        });

        if (!response.ok()) {
            throw new Error(`Failed to create user: ${response.status()} ${response.statusText()}`);
        }

        const responseBody = await response.json();
        const userId = responseBody.data?.userId;
        return userId
    };

    public async getUserDetails(userId: string) {
        const apiContext = await request.newContext();
        const response = await apiContext.get(`${this.apiBaseUrl}/users/${userId}`, {
            headers: await this.getAuthHeaders(),
        });

        if (!response.ok()) {
            throw new Error(`Failed to get user details: ${response.status()} ${response.statusText()}`);
        }

        const responseBody = await response.json();
        return {
            id: responseBody.data?.user.id,
            name: responseBody.data?.user.name,
            email: responseBody.data?.user.email,
        }
    }
}