import PostHeader from './post-header'
import classes from './post-content.module.css'
import ReactMarkdown from 'react-markdown'
import Post from '../../../interfaces/Post'
import Image from 'next/image'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'

import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'

SyntaxHighlighter.registerLanguage('js', js)
SyntaxHighlighter.registerLanguage('css', css)

interface Props {
	post: Post
}

export default function PostContent({ post }: Props) {
	const { slug, image, title, content } = post
	const imagePath = `/images/posts/${slug}/${image}`

	const customRenderers = {
		// img(image: HTMLImageElement) {
		// 	return (
		// 		<Image
		// 			src={`/images/posts/${post.slug}/${image.src}`}
		// 			alt={image.alt}
		// 			width={600}
		// 			height={300}
		// 		/>
		// 	)
		// },
		p(paragraph: any) {
			const { node } = paragraph
			if (node.children[0].tagName === 'img') {
				const image = node.children[0]
				return (
					<div className={classes.image}>
						<Image
							src={`/images/posts/${post.slug}/${image.properties.src}`}
							alt={image.alt}
							width={600}
							height={300}
						/>
					</div>
				)
			}
			return <p>{paragraph.children}</p>
		},
		code(code: any) {
			const { className, children } = code
			const language = className.split('-')[1]

			return (
				<SyntaxHighlighter language={language} style={atomDark}>
					{children}
				</SyntaxHighlighter>
			)
		},
	}

	return (
		<article className={classes.content}>
			<PostHeader title={title} image={imagePath} />
			<ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
		</article>
	)
}
