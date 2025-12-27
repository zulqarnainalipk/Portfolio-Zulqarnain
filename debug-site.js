const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Capture console messages
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });

  // Capture page errors
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push(error.message);
  });

  try {
    console.log('Navigating to: https://94mnrosqjda1.space.minimax.io');
    await page.goto('https://94mnrosqjda1.space.minimax.io', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait for any potential errors to appear
    await page.waitForTimeout(3000);

    console.log('\n=== Page Title ===');
    console.log(await page.title());

    console.log('\n=== Console Messages ===');
    consoleMessages.forEach(msg => {
      console.log(`[${msg.type}] ${msg.text}`);
    });

    console.log('\n=== Page Errors ===');
    if (pageErrors.length === 0) {
      console.log('No page errors detected');
    } else {
      pageErrors.forEach(error => {
        console.log(`ERROR: ${error}`);
      });
    }

    // Check if main content is visible
    console.log('\n=== Element Visibility ===');
    const navbarVisible = await page.locator('nav').isVisible();
    console.log(`Navbar visible: ${navbarVisible}`);

    const heroVisible = await page.locator('section').first().isVisible();
    console.log(`First section visible: ${heroVisible}`);

  } catch (error) {
    console.error('Navigation error:', error.message);
  }

  await browser.close();
})();
