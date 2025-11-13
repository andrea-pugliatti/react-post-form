import { useState } from "react";

export default function Main() {
	const postsEndpoint = "https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts";

	const emptyPost = {
		author: "",
		title: "",
		body: "",
		public: false,
	};

	const [formPost, setFormPost] = useState(emptyPost);
	return (
		<main className="container">
			<h2>Crea un nuovo post</h2>

			<form>
				<div className="">
					<label htmlFor="author" className="">
						Autore
					</label>
					<input
						type="text"
						name="author"
						className=""
						value={formPost.author}
						onChange={handleInput}
						required
					/>
				</div>

				<div className="">
					<label htmlFor="title" className="">
						Titolo
					</label>
					<input
						type="text"
						name="title"
						className=""
						value={formPost.title}
						onChange={handleInput}
						required
					/>
				</div>

				<div className="">
					<label htmlFor="body" className="">
						Testo
					</label>
					<textarea
						name="body"
						className=""
						rows="5"
						value={formPost.body}
						onChange={handleInput}
						required
					/>
				</div>

				<div className="">
					<label htmlFor="public" className="">
						Pubblica
					</label>
					<input
						type="checkbox"
						name="public"
						className=""
						checked={formPost.public}
						onChange={handleInput}
					/>
				</div>
				<button type="submit">Post</button>
			</form>
		</main>
	);
}
