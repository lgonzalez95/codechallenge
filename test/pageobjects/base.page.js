import * as EC from 'wdio-wait-for';

import { $, browser } from '@wdio/globals';

import regexes from '../constants/regexes';

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class BasePage {
  /**
   * Opens a sub page of the base url
   * @param url path of the sub page (e.g. /path/to/page.html)
   */
  open(url) {
    return browser.url(url);
  }

  /**
 * Clicks on the specified element after waiting for it to be displayed and clickable.
 *
 * @param {Promise<WebdriverIO.Element>} element - The element to be clicked.
 * @returns {Promise<void>} A promise that resolves when the click action is completed.
 */
  async click(element) {
    const elementFound = await element;
    await elementFound.waitForDisplayed();
    await browser.waitUntil(() => elementFound.isClickable());
    await elementFound.click();
  }

  /**
   * Clicks on the specified web element using JavaScript.
   *
   * @param {WebdriverIO.Element} webElement - The web element to be clicked using JavaScript.
   * @returns {Promise<void>} A promise that resolves when the click action is completed.
   */
  async clickUsingJavascript(webElement) {
    await browser.execute(element => {
      element.click();
    }, webElement);
  }


  /**
   * Sets the value of the specified element after waiting for it to be displayed.
   * Clears any existing value before setting the new value.
   *
   * @param {Promise<WebdriverIO.Element>} element - The element where the value will be set.
   * @param {string} text - The value to be set.
   * @returns {Promise<void>} A promise that resolves when the value is set.
   */
  async setValue(element, text) {
    const elementFound = await element;
    await elementFound.waitForDisplayed();
    await elementFound.setValue('');
    await elementFound.setValue(text);
  }

  /**
   * Retrieves the value of the specified element after waiting for it to be displayed.
   *
   * @param {Promise<WebdriverIO.Element>} element - The element from which to retrieve the value.
   * @returns {Promise<string>} The value of the element.
   */
  async getValue(element) {
    const elementFound = await element;
    await elementFound.waitForDisplayed();
    return elementFound.getValue();
  }

  /**
   * Sets the value of the specified element using JavaScript.
   * This bypasses the typical WebDriver interaction for value setting.
   *
   * @param {Promise<WebdriverIO.Element>} elementToSetValue - The element where the value will be set using JavaScript.
   * @param {string} text - The value to be set.
   * @returns {Promise<void>} A promise that resolves when the value is set.
   */
  async setValueWithJavascript(elementToSetValue, text) {
    const elementFound = await elementToSetValue;
    await browser.execute(
      (element, valueToSet) => {
        const elementToChange = element;
        elementToChange.value = valueToSet;
        document.body.click();
      },
      elementFound,
      text,
    );
  }

  /**
   * Retrieves the text content of the specified element after waiting for it to be displayed.
   *
   * @param {Promise<WebdriverIO.Element>} element - The element from which to retrieve the text.
   * @returns {Promise<string>} The text content of the element.
   */
  async getText(element) {
    const elementFound = await element;
    await elementFound.waitForDisplayed();
    return elementFound.getText();
  }

  /**
   * Checks if the specified element is displayed on the page.
   *
   * @param {Promise<WebdriverIO.Element>} element - The element to check for visibility.
   * @returns {Promise<boolean>} True if the element is displayed, false otherwise.
   */
  async isDisplayed(element) {
    const elementFound = await element;
    return elementFound.isDisplayed();
  }

  /**
   * Checks if the specified element is selected.
   *
   * @param {Promise<WebdriverIO.Element>} element - The element to check for selection status.
   * @returns {Promise<boolean>} True if the element is selected, false otherwise.
   */
  async isSelected(element) {
    const elementFound = await element;
    return elementFound.isSelected();
  }

  /**
   * Waits for the specified element to be displayed, with an optional reverse validation.
   *
   * @param {Promise<WebdriverIO.Element>} element - The element to wait for.
   * @param {boolean} [reversedValidation=false] - Whether to wait for the element to disappear instead of being displayed.
   * @returns {Promise<void>} A promise that resolves when the wait condition is met.
   */
  async waitForDisplayed(element, reversedValidation = false) {
    const elementFound = await element;
    await elementFound.waitForDisplayed({ reverse: reversedValidation });
  }

  /**
   * Waits for the specified element to be clickable, with an optional reverse validation.
   *
   * @param {Promise<WebdriverIO.Element>} element - The element to wait for.
   * @param {boolean} [reversedValidation=false] - Whether to wait for the element to become unclickable.
   * @returns {Promise<void>} A promise that resolves when the wait condition is met.
   */
  async waitForClickable(element, reversedValidation = false) {
    const elementFound = await element;
    await elementFound.waitForClickable({ reversed: reversedValidation });
  }

  /**
   * Waits for the specified element to disappear from the page.
   *
   * @param {Promise<WebdriverIO.Element>} element - The element to wait for.
   * @returns {Promise<void>} A promise that resolves when the element is no longer displayed.
   */
  async waitForElementToDissapear(element) {
    const elementFound = await element;
    await elementFound.waitForDisplayed({ reverse: true });
  }

  /**
   * Pauses the execution for the specified amount of time.
   *
   * @param {number} [secondsToWait=1] - The amount of time to wait in seconds.
   * @returns {Promise<void>} A promise that resolves when the pause is over.
   */
  async waitForTime(secondsToWait = 1) {
    const second = 1000;
    await browser.pause(second * secondsToWait);
  }

  /**
   * Sends keyboard keys to the browser.
   *
   * @param {string|string[]} key - The key or combination of keys to send.
   * @returns {Promise<void>} A promise that resolves when the keys are sent.
   */
  async sendKeyboardKeys(key) {
    await browser.keys(key);
  }

  /**
   * Finds and returns the first web element containing the specified text.
   * @param {string} text - The text to search for in the element.
   * @returns {WebdriverIO.Element} The first element containing the specified text.
   */
  getElementContainingText(text) {
    return $(`//*[contains(text(), '${text}')]`);
  }

  /**
   * Finds and returns all web elements containing the specified text.
   * @param {string} text - The text to search for in the elements.
   * @returns {WebdriverIO.ElementArray} An array of elements containing the specified text.
   */
  getElementsContainingText(text) {
    return $$(`//*[contains(text(), '${text}')]`);
  }

  /**
   * Finds and returns the first web element contained within a parent element that contains the specified text.
   * @param {string} text - The text to search for in the child elements.
   * @param {WebdriverIO.Element} container - The parent element in which to search for child elements.
   * @returns {WebdriverIO.Element} The first element inside the container that contains the specified text.
   */
  getElementContainedInParentElementByText(text, container) {
    return container.$(`.//*[contains(text(), '${text}')]`);
  }

  /**
   * Finds and returns the first web element of a specific type that contains the exact specified text.
   * @param {string} elementType - The type of element to search for (e.g., 'div', 'span').
   * @param {string} text - The exact text the element must contain.
   * @returns {WebdriverIO.Element} The first element of the specified type containing the exact text.
   */
  getElementByExactText(elementType, text) {
    return $(`${elementType}=${text}`);
  }

  /**
   * Finds and returns all web elements that contain the exact specified text.
   * @param {string} text - The exact text to search for in the elements.
   * @returns {WebdriverIO.ElementArray} An array of elements containing the exact text.
   */
  getElementsByExactText(text) {
    return $$(`.//*[text() = '${text}']`);
  }
}
