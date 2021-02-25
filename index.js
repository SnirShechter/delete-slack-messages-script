const { webkit } = require('playwright')

// Change these
const WORKSPACE_URL = 'https://myworkspace.slack.com/'
const EMAIL = 'email@example.com'
const PASSWORD = 'password'

;(async () => {
	const browser = await webkit.launch({
		headless: false,
		slowMo: 200
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
		await page.waitForSelector('button[data-qa="close_fullscreen_modal"]')
		await page.click('button[data-qa="close_fullscreen_modal"]')
	} catch {
		console.warn("Could not close the full screen dialog. It's possible that it just did not appear.")
	}
	// Delete last message
	let tryCount = 0
	while (true) {
		if (tryCount >= 5) break
		tryCount++
		// Wait for the message element (since it might be loading it)
		await bestEffort(() =>
			page.waitForSelector('.c-virtual_list__item:last-child .c-message_kit__background', {
				timeout: 1000,
			})
		)
		// Hover to show the message menu
		await bestEffort(() => page.hover('.c-virtual_list__item:last-child .c-message_kit__background',{timeout:1000}))
		// Message menu: click the three dots ("More actions") to open the sub-menu
		await bestEffort(() => page.click('.c-message__actions button[data-qa="more_message_actions"]',{timeout:1000}))
		// Click "delete message" in the sub-menu
		await bestEffort(() => page.click('.p-message_actions_menu__delete_message',{timeout:1000}))
		// Confirm the delete dialog
		await bestEffort(() => page.click('button[data-qa="dialog_go"]',{timeout:1000}))
		tryCount = 0
	}
})()

async function bestEffort(func) {
	try {
		return await func()
	} catch (error) {}
}
