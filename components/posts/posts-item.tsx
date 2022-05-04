import Link from 'next/link'
import Image from 'next/image'
import Post from '../../interfaces/Post'
import classes from './posts-item.module.css'

interface Props {
	post: Post
}

export default function PostItem({ post }: Props) {
	const { title, image, excerpt, date, slug } = post

	const formattedDate = new Date(date).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC',
	})

	const imagePath = `/images/posts/${slug}/${image}`
	const linkPath = `/posts/${slug}`

	return (
		<li className={classes.post}>
			<Link href={linkPath}>
				<a>
					<div className={classes.image}>
						<Image
							src={imagePath}
							alt={title}
							width={300}
							height={200}
							layout='responsive'
						/>
					</div>
					<div className={classes.content}>
						<h3>{title}</h3>
						<time>{formattedDate}</time>
						<p>{excerpt}</p>
					</div>
				</a>
			</Link>
		</li>
	)
}
