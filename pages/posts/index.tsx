import Head from 'next/head'
import AllPosts from '../../components/posts/all-posts'
import Post from '../../interfaces/Post'
import { getAllPosts } from '../../lib/posts-util'

interface Props {
	posts: Post[]
}

export default function AllPostsPage({ posts }: Props) {
	return (
		<>
			<Head>
				<title>All My Posts</title>
				<meta
					name='description'
					content='A list of all programming-related tutorials and posts!'
				/>
			</Head>
			<AllPosts posts={posts} />
		</>
	)
}

export const getStaticProps = () => {
	const allPosts = getAllPosts()

	return {
		props: {
			posts: allPosts,
		},
	}
}
