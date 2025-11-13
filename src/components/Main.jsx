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
	const [alert, setAlert] = useState("");

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

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formPost),
			redirect: "follow",
		};

		fetch(postsEndpoint, requestOptions)
			.then((response) => {
				if (response.status === 201) {
					setAlert("Post pubblicato con successo!");
				}
				setFormPost(emptyPost);

				return response.text();
			})
			.then((result) => console.log(result))
			.catch((error) => {
				setAlert("Errore nella pubblicazione del post!");
				console.error(error);
			});
	};

	return (
		<main className="container">
			<form onSubmit={handleSubmit}>
				<h2>Crea un nuovo post</h2>

				<div className="form-header">
					<label htmlFor="author" className="form-label">
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

					<label htmlFor="title" className="form-label">
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

					<label htmlFor="public" className="form-label">
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

				<div className="form-body">
					<label htmlFor="body" className="form-label">
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

				<div className="form-submit">
					<button type="submit">Post</button>
					<p className="form-alert">{alert}</p>
				</div>
			</form>
		</main>
	);
}
