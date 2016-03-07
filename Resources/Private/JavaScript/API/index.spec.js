import api, {createPlugin} from './index.js';

describe('Neos JS API', () => {
    it('should throw an error if no csrfToken was passed.', () => {
        const fn = () => api({});

        expect(fn).to.throw();
    });

    it('should place itself inside the specified parent object with the specified alias.', () => {
        const win = {};

        api(win, 'csrfToken', 'test');

        expect(win.test).to.exist; // eslint-disable-line
    });

    it('should throw an error, if a value already exists under the given alias in parent.', () => {
        const win = {};
        const fn = () => api(win);

        api(win, 'csrfToken');

        expect(fn).to.throw();
    });

    it('should have a fallback alias "neos" if none was specified.', () => {
        const win = {};

        api(win, 'csrfToken');

        expect(win.neos).to.exist; // eslint-disable-line
    });

    it('should not be writable.', () => {
        const win = {};
        const fn = () => {
            win.neos = 'test';
        };

        api(win, 'csrfToken');

        const oldApi = win.neos;

        expect(fn).to.throw();
        expect(win.neos).to.equal(oldApi);
    });

    it('should expose the use method by default.', () => {
        const win = {};

        api(win, 'csrfToken');

        expect(win.neos.use).to.be.an('function');
    });

    it('should expose a method to create plugins which will add the given identifier to the constructor.', () => {
        const plugin = createPlugin('myName', () => null);

        expect(plugin.identifier).to.equal('myName');
    });
});
