const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

test('Service Worker', async (t) => {
    const listeners = {};
    const mockSelf = {
        addEventListener: (event, callback) => {
            listeners[event] = callback;
        },
        skipWaiting: () => Promise.resolve(),
        clients: {
            claim: () => Promise.resolve()
        }
    };

    const mockLocation = {
        origin: 'https://chinmaydhok.pages.dev'
    };

    const swPath = path.join(__dirname, 'service-worker.js');
    const swCode = fs.readFileSync(swPath, 'utf8');

    const sandbox = {
        self: mockSelf,
        location: mockLocation,
        URL: URL,
        console: console,
        caches: {
            open: () => Promise.resolve({
                addAll: () => Promise.resolve(),
                put: () => Promise.resolve(),
            }),
            keys: () => Promise.resolve([]),
            delete: () => Promise.resolve(),
            match: () => Promise.resolve(null),
        },
        fetch: () => Promise.resolve({
            clone: () => ({}),
            status: 200
        }),
        Response: class {},
        Promise: Promise
    };

    vm.createContext(sandbox);
    vm.runInContext(swCode, sandbox);

    await t.test('fetch listener skips cross-origin requests', () => {
        const fetchListener = listeners['fetch'];
        assert.ok(fetchListener, 'fetch listener should be registered');

        let respondWithCalled = false;

        const mockEvent = {
            request: {
                method: 'GET',
                url: 'https://cross-origin.com/api/data',
                headers: {
                    get: () => 'text/html'
                }
            },
            respondWith: () => {
                respondWithCalled = true;
            }
        };

        fetchListener(mockEvent);

        assert.strictEqual(respondWithCalled, false, 'respondWith should not be called for cross-origin requests');
    });

    await t.test('fetch listener skips non-GET requests', () => {
        const fetchListener = listeners['fetch'];
        assert.ok(fetchListener, 'fetch listener should be registered');

        let respondWithCalled = false;

        const mockEvent = {
            request: {
                method: 'POST',
                url: 'https://chinmaydhok.pages.dev/api/data',
                headers: {
                    get: () => 'text/html'
                }
            },
            respondWith: () => {
                respondWithCalled = true;
            }
        };

        fetchListener(mockEvent);

        assert.strictEqual(respondWithCalled, false, 'respondWith should not be called for non-GET requests');
    });

    await t.test('fetch listener handles same-origin HTML GET requests', () => {
        const fetchListener = listeners['fetch'];
        assert.ok(fetchListener, 'fetch listener should be registered');

        let respondWithCalled = false;

        const mockEvent = {
            request: {
                method: 'GET',
                url: 'https://chinmaydhok.pages.dev/index.html',
                headers: {
                    get: () => 'text/html'
                }
            },
            respondWith: () => {
                respondWithCalled = true;
            }
        };

        fetchListener(mockEvent);

        assert.strictEqual(respondWithCalled, true, 'respondWith should be called for same-origin GET requests');
    });
});
