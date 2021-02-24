const { webkit } = require('playwright')

// Change these
const WORKSPACE_URL = 'https://myworkspace.slack.com/'
const EMAIL = 'email@example.com'
const PASSWORD = 'password'

;(async () => {
	const browser = await webkit.launch({
		headless: false,
	})

	// Navigate to Slack
	const page = await browser.newPage()
	await page.goto(WORKSPACE_URL)

	// Login
	await page.fill('input[name="email"]', EMAIL)
	await page.fill('input[name="password"]', PASSWORD)
	await page.click('button[type="submit"]')

	// Close the annoying full screen dialog
	try {
		await page.waitForSelector('button[aria-label="Close"]')
		await page.click('button[aria-label="Close"]')
	} catch {
		console.warn("Could not close the full screen dialog. It's possible that it just did not appear.")
	}
	// Delete last message
	while (true) {
		// Wait for the message element (since it might be loading it)
		await page.waitForSelector('.c-virtual_list__item:last-child .c-message_kit__background')
		// Hover to show the message menu
		await page.hover('.c-virtual_list__item:last-child .c-message_kit__background')
		// Message menu: click the three dots ("More actions") to open the sub-menu
		await page.click('.c-message__actions button[data-qa="more_message_actions"]')
		// Click "delete message" in the sub-menu
		await page.click('.p-message_actions_menu__delete_message')
		// Confirm the delete dialog
		await page.click('button[data-qa="dialog_go"]')
	}
})()
