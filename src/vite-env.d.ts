/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_BASE_URL: string
	// boshqa environment o'zgaruvchilarni ham shu yerga qo'shishingiz mumkin
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
