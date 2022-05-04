import { GetStaticPropsContext } from 'next'
import Head from 'next/head'
import PostContent from '../../components/posts/post-detail/post-content'
import Post from '../../interfaces/Post'
import { getPostData, getPostsFiles } from '../../lib/posts-util'

interface Props {
	post: Post
}

export default function PostDetailPage({ post }: Props) {
	return (
		<>
			<Head>
				<title>{post.title}</title>
				<meta name='description' content={post.excerpt} />
			</Head>
			<PostContent post={post} />
		</>
	)
}

export const getStaticPaths = () => {
	const postsFilenames = getPostsFiles()
	const slugs = postsFilenames.map(filename => filename.replace(/\.md$/, ''))
	return {
		paths: slugs.map(slug => ({ params: { slug } })),
		fallback: false,
	}
}

export const getStaticProps = (context: GetStaticPropsContext) => {
	const slug = context.params!.slug as string
	const postData = getPostData(slug)
	return {
		props: {
			post: postData,
		},
		revalidate: 600,
	}
}
