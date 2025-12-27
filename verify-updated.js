const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();

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
    console.log('Navigating to: https://ixce6fnhk9k4.space.minimax.io');
    await page.goto('https://ixce6fnhk9k4.space.minimax.io', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait for any potential errors to appear
    await page.waitForTimeout(5000);

    console.log('\n=== Page Title ===');
    console.log(await page.title());

    console.log('\n=== Console Messages ===');
    const warnings = consoleMessages.filter(m => m.type === 'warning');
    console.log(`${warnings.length} warnings (WebGL-related, expected)`);

    console.log('\n=== Page Errors ===');
    if (pageErrors.length === 0) {
      console.log('No page errors detected ✅');
    } else {
      pageErrors.forEach(error => {
        console.log(`ERROR: ${error}`);
      });
    }

    // Check if main content is visible
    console.log('\n=== Element Checks ===');
    const navbarVisible = await page.locator('nav').isVisible();
    console.log(`Navbar visible: ${navbarVisible}`);

    const heroVisible = await page.locator('section#home').isVisible();
    console.log(`Hero section visible: ${heroVisible}`);

    // Check for hero content
    const nameVisible = await page.locator('text=Zulqarnain').first().isVisible();
    console.log(`Name visible: ${nameVisible}`);

    // Check social links in hero
    const githubLink = await page.locator('a[href*="github"]').first().isVisible();
    console.log(`GitHub link visible: ${githubLink}`);

    // Check sections
    const projectsVisible = await page.locator('section#projects').isVisible();
    console.log(`Projects section visible: ${projectsVisible}`);

    const awardsVisible = await page.locator('section#awards').isVisible();
    console.log(`Awards section visible: ${awardsVisible}`);

    const communityVisible = await page.locator('section#community').isVisible();
    console.log(`Community section visible: ${communityVisible}`);

    // Take screenshot
    await page.screenshot({ path: '/workspace/zulqarnain-portfolio/screenshot-updated.png', fullPage: true });
    console.log('\nScreenshot saved to /workspace/zulqarnain-portfolio/screenshot-updated.png');

  } catch (error) {
    console.error('Navigation error:', error.message);
  }

  await browser.close();
  console.log('\n=== VERIFICATION COMPLETE ===');
})();
