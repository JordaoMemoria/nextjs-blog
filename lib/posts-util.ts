import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

const getPostsFiles = () => fs.readdirSync(postsDirectory) as string[]

const getPostData = (postIdentifier: string) => {
	const postSlug = postIdentifier.replace(/\.md$/, '') // removes the file extension
	const filePath = path.join(postsDirectory, `${postSlug}.md`)
	const fileContent = fs.readFileSync(filePath, 'utf-8')
	const { data, content } = matter(fileContent)
	const postData = {
		slug: postSlug,
		...data,
		content,
	}

	return postData
}

const getAllPosts = () => {
	const postFiles = getPostsFiles()
	const allPosts = postFiles.map(postFile => getPostData(postFile))
	return allPosts.sort((pA: any, pB: any) => (pA.date > pB.date ? -1 : 1))
}

const getFeaturedPosts = () => {
	return getAllPosts().filter((post: any) => post.isFeatured)
}

export { getAllPosts, getFeaturedPosts, getPostData, getPostsFiles }
