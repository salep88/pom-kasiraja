import { Page } from '@playwright/test';

export class PembelianPage {
    readonly page: Page;
    readonly pembelianMenu: { role: 'link'; name: string};
    readonly tambahBttn: { role: 'button'; name: string};
    readonly datepickerStart: "#popover-trigger-16";
    readonly datepickerEnd: "#popover-trigger-18"; 
    readonly searchField: { role: 'textbox'; name: string}; 

    constructor(page: Page) {
        this.page = page;
    }

}