import Image from 'next/image'
import classes from './post-header.module.css'

interface Props {
	title: string
	image: string
}

export default function PostHeader({ title, image }: Props) {
	return (
		<header className={classes.header}>
			<h1>{title}</h1>
			<Image src={image} alt={title} width={200} height={150} />
		</header>
	)
}
