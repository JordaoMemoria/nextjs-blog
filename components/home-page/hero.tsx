import Image from 'next/image'
import classes from './hero.module.css'

export default function Hero() {
	return (
		<section className={classes.hero}>
			<div className={classes.image}>
				<Image
					src='/images/site/jordao.jpg'
					alt='An image showing Jordan'
					width={300}
					height={300}
				/>
			</div>
			<h1>Hi, I&apos;m Jordan</h1>
			<p>
				I blog about web development - especially frontend frameworks like
				Angular ou React.
			</p>
		</section>
	)
}
