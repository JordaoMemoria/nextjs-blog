import Post from '../../interfaces/Post'
import PostsGrid from '../posts/posts-grid'
import classes from './feature-posts.module.css'

interface Props {
	posts: Post[]
}

export default function FeaturedPosts({ posts }: Props) {
	return (
		<section className={classes.latest}>
			<h2>Featured Posts</h2>
			<PostsGrid posts={posts} />
		</section>
	)
}
