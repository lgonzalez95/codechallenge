import BasePage from "./base.page.js";
import { Key } from 'webdriverio';
import { generateRandomNumber } from "../utils/genericUtils.js";

class HomePage extends BasePage {
    open() {
        return super.open('/');
    }

    get inputSearchBox() {
        return $('[name="q"]');
    }

    get buttonGoogleSearch() {
        return $('[name="btnK"]');
    }

    get linksSearchResults() {
        return $$('a h3');
    }

    async performSearch(keyword) {
        await super.setValue(this.inputSearchBox, keyword);
        await super.sendKeyboardKeys(Key.Enter);
    }

    async openRandomLinkResult() {
        const elementsDisplayed = await this.linksSearchResults;
        const randomNumber = generateRandomNumber(elementsDisplayed.length);
        await super.click(elementsDisplayed[randomNumber]);
    }
}

export default new HomePage();
