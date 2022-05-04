import Post from '../../interfaces/Post'
import classes from './all-posts.module.css'
import PostsGrid from './posts-grid'

interface Props {
	posts: Post[]
}

export default function AllPosts({ posts }: Props) {
	return (
		<section className={classes.posts}>
			<h1>All Posts</h1>
			<PostsGrid posts={posts} />
		</section>
	)
}
