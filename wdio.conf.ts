import type { Options } from '@wdio/types';
import { join } from 'path';
import { existsSync, rmSync, mkdirSync } from 'fs';
import os from 'os';

const isHeadless = process.env.HEADLESS !== 'false';

const platformName = os.platform() === 'win32' ? 'Windows' : os.platform() === 'darwin' ? 'macOS' : 'Linux';
const platformVersion = os.release();
const deviceName = os.hostname();

export const config: Options.Testrunner = {
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true,
        },
    },

    baseUrl: 'https://the-internet.herokuapp.com',

    specs: [
        './tests/features/**/*.feature',
    ],

    maxInstances: 1,

    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    ...(isHeadless ? ['--headless=new'] : []),
                ],
            },
            'cjson:metadata': {
                device: deviceName,
                platform: {
                    name: platformName,
                    version: platformVersion,
                },
            },
        } as WebdriverIO.Capabilities,
        {
            browserName: 'firefox',
            'moz:firefoxOptions': {
                args: [
                    ...(isHeadless ? ['-headless'] : []),
                ],
            },
            'cjson:metadata': {
                device: deviceName,
                platform: {
                    name: platformName,
                    version: platformVersion,
                },
            },
        } as WebdriverIO.Capabilities,
    ],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'cucumber',
    cucumberOpts: {
        require: [
            './tests/step-definitions/**/*.ts',
        ],
        backtrace: false,
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tagExpression: process.env.TAG || '',
        timeout: 60000,
    },

    reporters: [
        'spec',
        ['cucumberjs-json', {
            jsonFolder: '.tmp/json/',
            language: 'en',
        }],
    ],

    onPrepare: function () {
        const tmpDir = join(process.cwd(), '.tmp');
        if (existsSync(tmpDir)) {
            rmSync(tmpDir, { recursive: true, force: true });
        }
        mkdirSync(join(process.cwd(), '.tmp', 'json'), { recursive: true });
    },

    beforeScenario: function (world) {
        console.log(`\n--- Starting scenario: ${world.pickle.name} ---`);
    },

    afterScenario: function (world, result) {
        console.log(`--- Completed scenario: ${world.pickle.name} - ${result.passed ? 'PASSED' : 'FAILED'} ---\n`);
    },

    onComplete: function () {
        try {
            const reporter = require('multiple-cucumber-html-reporter');
            reporter.generate({
                jsonDir: '.tmp/json/',
                reportPath: '.tmp/report/',
                reportName: 'WDIO Demo - Cross Browser Test Report',
                pageTitle: 'Login Scenarios - Cross Browser Report',
                displayDuration: true,
                displayReportTime: true,
            });
            console.log('\nReport generated at .tmp/report/index.html');
        } catch (err) {
            console.error('Report generation failed:', err);
        }
    },
};
