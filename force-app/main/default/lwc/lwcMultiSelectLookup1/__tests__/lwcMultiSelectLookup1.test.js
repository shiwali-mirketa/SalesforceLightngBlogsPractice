import { createElement } from 'lwc';
import LwcMultiSelectLookup1 from 'c/lwcMultiSelectLookup1';

describe('c-lwc-multi-select-lookup1', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        // Arrange
        const element = createElement('c-lwc-multi-select-lookup1', {
            is: LwcMultiSelectLookup1
        });

        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
    });
});