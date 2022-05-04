import Head from 'next/head'
import FeaturedPosts from '../components/home-page/feature-posts'
import Hero from '../components/home-page/hero'
import Post from '../interfaces/Post'
import { getFeaturedPosts } from '../lib/posts-util'

interface Props {
	posts: Post[]
}

export default function HomePage({ posts }: Props) {
	return (
		<>
			<Head>
				<title>Jordan&apos;s Blog</title>
				<meta
					name='description'
					content='I post about programming and web development'
				/>
			</Head>
			<Hero />
			<FeaturedPosts posts={posts} />
		</>
	)
}

export const getStaticProps = () => {
	const featuredPosts = getFeaturedPosts()

	return {
		props: {
			posts: featuredPosts,
		},
	}
}
