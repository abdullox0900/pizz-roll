import { CSSProperties, ReactNode } from 'react'

export interface MainSectionChildren {
	children?: ReactNode
	style?: CSSProperties
	sectionClass?: string
}

export interface PizzaData {
	product_name: string
	product_img: string
	product_price: string
	product_urls: string[]
	product_discount: string
	product_description: string
	productId: string
}
