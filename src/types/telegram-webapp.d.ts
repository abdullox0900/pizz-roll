interface TelegramWebAppUser {
	id: number
	first_name?: string
	last_name?: string
	username?: string
	language_code?: string
}

interface TelegramWebAppInitDataUnsafe {
	user?: TelegramWebAppUser
	query_id?: string
	auth_date?: number
	hash?: string
}

interface TelegramWebApp {
	initDataUnsafe?: TelegramWebAppInitDataUnsafe
	MainButton: {
		text: string
		setText(text: string): void
	}
}

declare global {
	interface Window {
		Telegram: {
			WebApp: TelegramWebApp
		}
	}
}
