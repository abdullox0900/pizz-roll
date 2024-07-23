import { CSSProperties, ReactNode } from 'react'

export interface MainSectionChildren {
	children?: ReactNode
	style?: CSSProperties
	sectionClass?: string
}

export interface PizzaData {
	name: string
	price: number
	description: string
	id: number
	categoryId: number
	createdAt: string
}
