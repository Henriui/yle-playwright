import { defineConfig, devices } from '@playwright/test';
require('dotenv').config;

const fixtures = ({ browser }) => {
	const caps = {
		'os': 'osx',
		'os_version': 'catalina',
		'browser': browser,
		'project': 'playwright yle test',
		'build': 'playwright-build-yle',
		'browserstack.username':
			process.env.BROWSERSTACK_USERNAME || 'rasmushy_67bQsn',
		'browserstack.accessKey':
			process.env.BROWSERSTACK_ACCESS_KEY || 'fFB4DhNgQdPxJPCQFXWM',
		/* 		'proxy': {
			server: 'http://localhost',
			username: 'rasmushy',
			password: 'https://6bed-91-158-44-187.ngrok-free.app',
			port: 3029,
		}, */
	};

	return `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
		JSON.stringify(caps),
	)}`;
};

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: false,
	retries: 0,
	workers: 3,
	reporter: 'html',
	timeout: 60000,
	use: {
		trace: 'on-first-retry',
	},

	projects: [
		// -- BrowserStack Projects --
		// name should be of the format browser@browser_version:os os_version@browserstack
		{
			name: 'chrome@latest:OSX Catalina@browserstack',
			use: {
				browserName: 'chromium',
				channel: 'chrome',
				ignoreHTTPSErrors: true,
				viewport: null,
				connectOptions: {
					wsEndpoint: fixtures({ browser: 'chrome' }),
				},
			},
		},
		{
			name: 'playwright-firefox@latest:OSX Catalina@browserstack',
			use: {
				browserName: 'firefox',
				ignoreHTTPSErrors: true,
				viewport: null,

				connectOptions: {
					wsEndpoint: fixtures({ browser: 'playwright-firefox' }),
				},
			},
		},
		/* 		{
			name: 'playwright-chromium@latest:OSX Catalina@browserstack',
			use: {
				browserName: 'chromium',
				ignoreHTTPSErrors: true,
				viewport: null,
				connectOptions: {
					wsEndpoint: fixtures({ browser: 'playwright-chromium' }),
				},
			},
		}, */
		/* 		{
			// viewport cant be null
			name: 'playwright-webkit@latest:OSX Catalina@browserstack',
			use: {
				browserName: 'webkit',
				ignoreHTTPSErrors: true,
				connectOptions: {
					wsEndpoint: fixtures({ browser: 'playwright-webkit' }),
				},
			},
		}, */
	],
});
