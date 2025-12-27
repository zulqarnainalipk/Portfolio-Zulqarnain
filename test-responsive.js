const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  // Test Mobile View
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 667 } // iPhone SE size
  });
  const mobilePage = await mobileContext.newPage();

  // Capture errors
  const mobileErrors = [];
  mobilePage.on('pageerror', error => {
    mobileErrors.push(error.message);
  });

  try {
    console.log('=== MOBILE VIEW TEST (375x667) ===');
    await mobilePage.goto('https://xhtftnc3avun.space.minimax.io', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    await mobilePage.waitForTimeout(3000);

    console.log('Page Title:', await mobilePage.title());
    console.log('Mobile Errors:', mobileErrors.length === 0 ? 'None' : mobileErrors);

    // Check mobile navbar
    const mobileMenuButton = await mobilePage.locator('button').filter({ has: mobilePage.locator('svg') }).first();
    const menuButtonVisible = await mobileMenuButton.isVisible();
    console.log('Mobile menu button visible:', menuButtonVisible);

    // Check hero text scales properly
    const heroHeading = await mobilePage.locator('h1').first();
    const headingVisible = await heroHeading.isVisible();
    console.log('Hero heading visible:', headingVisible);

    await mobilePage.screenshot({ path: '/workspace/zulqarnain-portfolio/screenshot-mobile.png', fullPage: true });
    console.log('Mobile screenshot saved');

  } catch (error) {
    console.error('Mobile test error:', error.message);
  }

  // Test Tablet View
  const tabletContext = await browser.newContext({
    viewport: { width: 768, height: 1024 } // iPad size
  });
  const tabletPage = await tabletContext.newPage();

  const tabletErrors = [];
  tabletPage.on('pageerror', error => {
    tabletErrors.push(error.message);
  });

  try {
    console.log('\n=== TABLET VIEW TEST (768x1024) ===');
    await tabletPage.goto('https://xhtftnc3avun.space.minimax.io', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    await tabletPage.waitForTimeout(3000);

    console.log('Page Title:', await tabletPage.title());
    console.log('Tablet Errors:', tabletErrors.length === 0 ? 'None' : tabletErrors);

    // Check if desktop navbar is visible on tablet
    const desktopNavVisible = await tabletPage.locator('.hidden.md\\:flex').isVisible();
    console.log('Desktop nav visible on tablet:', desktopNavVisible);

    await tabletPage.screenshot({ path: '/workspace/zulqarnain-portfolio/screenshot-tablet.png', fullPage: true });
    console.log('Tablet screenshot saved');

  } catch (error) {
    console.error('Tablet test error:', error.message);
  }

  await browser.close();
  console.log('\n=== ALL TESTS COMPLETED ===');
})();
