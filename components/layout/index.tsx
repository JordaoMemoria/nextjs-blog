import { ReactNode } from 'react'
import MainNavigation from './main-navigation'

interface Props {
	children: ReactNode
}

export default function Layout({ children }: Props) {
	return (
		<>
			<MainNavigation />
			<main>{children}</main>
		</>
	)
}
