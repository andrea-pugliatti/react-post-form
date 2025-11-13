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
	const [success, setSuccess] = useState("");

	const handleInput = (e) => {
		const value =
			e.target.type === "checkbox" ? e.target.checked : e.target.value;
		setFormPost({
			...formPost,
			[e.target.name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formPost);

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formPost),
			redirect: "follow",
		};

		fetch(postsEndpoint, requestOptions)
			.then((response) => {
				if (response.status === 201) {
					setSuccess("Ticket inviato con successo");
				}
				setFormPost(emptyPost);

				return response.text();
			})
			.then((result) => console.log(result))
			.catch((error) => console.error(error));
	};

	return (
		<main className="container">
			<h2>Crea un nuovo post</h2>
			<p className="success">{success}</p>
			<form onSubmit={handleSubmit}>
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
