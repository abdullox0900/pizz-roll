interface TelegramWebApp {
	ready: () => void
	onEvent: (eventType: string, eventHandler: () => void) => void
	offEvent: (eventType: string, eventHandler: () => void) => void
	backgroundColor: string
	textColor: string
	hintColor: string
	linkColor: string
	buttonColor: string
	buttonTextColor: string
	secondaryBackgroundColor: string
	colorScheme: 'light' | 'dark'
}

interface Window {
	Telegram: {
		WebApp: TelegramWebApp
	}
}
