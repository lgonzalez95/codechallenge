import { expect } from '@wdio/globals';
import homePage from '../pageobjects/homePage.page';

describe('Google Search Tests', async () => {
    it('should be able to perform a google search and display results', async () => {
        const searchKeyword = "Dogs";
        await homePage.open();
        await homePage.performSearch(searchKeyword);
        await expect(homePage.linksSearchResults.every(async link => {
            const linkText = await homePage.getText(link);
            console.log(linkText);
            return linkText.includes(searchKeyword);
        })).toBeTruthy();
    });

    it('should be able to perform a google search and open any result', async () => {
        const searchKeyword = "Dogs";
        let currentPageUrl;
        await homePage.open();
        await homePage.performSearch(searchKeyword);
        currentPageUrl = await browser.getUrl();
        await homePage.openRandomLinkResult();
        await expect(currentPageUrl).not.toBe(await browser.getUrl());
    });
});
