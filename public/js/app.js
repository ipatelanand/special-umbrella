class App extends React.Component {
	state = {
		username: "",
		profileImage: "",
		image: "",
		caption: "",
		likes: 0,
		posts: []

	}
	handleChange = (event) => {
     this.setState({
       [event.target.id]: event.target.value,
     })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post('/home', this.state)
      .then((response) =>
        this.setState({ posts: response.data, image: '', username: '' ,caption: "",profileImage: "", likes: ""})
      )
  }



	deletePost = (event) => {
		axios.delete('/home/' + event.target.value).then((response) => {
			this.setState({
				posts: response.data,
			})
		})
	}
	updatePost = (event) => {
		event.preventDefault()
		const id = event.target.id
		axios.put('/home/' + id, this.state).then((response) => {
			this.setState({
				posts: response.data,
				caption: '',
				image: '',
			})
		})
	}

	displayForm = () => {
	 document.querySelector(".updateForm").style.display ="flex"
	}

	displayCreateForm = () => {
	 document.querySelector(".createForm").style.display ="flex"
	}

	hideCreateForm = () => {
	 document.querySelector(".createForm").style.display ="none"
	}

	hideupdateForm = () => {
	 document.querySelector(".updateForm").style.display ="none"
	}

	componentDidMount = () => {
		axios.get('/home').then((response) => {
			this.setState({
				posts: response.data,
			})
		})
	}


	render = () => {
		return (
			<div className="main-container">
				<header>
					<div className="logo-div">
						<img className="logo" src="./images/logo.svg" alt="Besties" />
					</div>
					<div className="logo-desktop-div">
						<img className="logo-desktop" src="./images/logo-desktop.svg" alt="Besties" />
					</div>
					<div className="nav-div">
						<img className="inbox" src="./images/inboxIcon.svg" alt="share"/>

					</div>
					<div className="top-nav">
						<div className="create-Button-desktop">
							<img onClick={this.displayCreateForm} className="create-desktop" src="./images/post-desktop.svg" />
						</div>
						<div className="create-Button-desktop">
							<img onClick={this.displayCreateForm} className="home-desktop" src="./images/home-desktop.svg" />
						</div>
					</div>
				</header>
				{this.state.posts.map((post) => {
					return (
						<div key={post._id} className="post-container">
							<div className="profile-div" >
								<img className="profile-image profile" src={post.profileImage}
								 alt="photo" />
								<h5 className="profile">{post.username}</h5>

								<div className="profile-container">
									<img className="profile-image" src={post.profileImage}
									 alt="photo" />
									<p className="userName">{post.username}</p>
								</div>
								<p className="caption-desktop"> {post.caption}</p>
                <form className="updateForm" id={post._id} onSubmit={this.updatePost}>
                  <br />
                  <input type="text" id="caption" onChange={this.handleChange}  placeholder="caption"/>
                  <br />
                  <input
                    type="text"
                    id="image"
                    onChange={this.handleChange}
                  placeholder="image"/>
                  <br />
                  <input onClick={this.hideupdateForm} type="submit" value="Update Post" />
                </form>
								<div className="editButtton">
									<img onClick={this.displayForm} className="edit" src="./images/editIcon.svg" />
								</div>
							</div>
							<div className="posted-image">
									<img className="image" src={post.image} alt={post.username} />
							</div>
							<div className="like-bar">
								<div className="left-side-icons">
									<div className="likeButton">
										<img src="./images/likeIcon.svg" />
									</div>
									<div className="commentButton">
										<img src="./images/commentIcon.svg" />
									</div>
									<div className="sendButton">
										<img src="./images/sendIcon.svg" />
									</div>
								</div>
								<button onMouseEnter={this.mouseOver} className="deleteButton" value={post._id} onClick={this.deletePost}>
								<img src="./images/delete.svg" />
								</button>
							</div>
							<p className="caption">{post.username} {post.caption}</p>
						</div>
					)
				})}
				<footer>
					<form className="createForm" onSubmit={this.handleSubmit}>
						<input type="text" id="caption" onChange={this.handleChange} value={this.state.caption} placeholder="caption"/>
						<br />
						<input type="text" id="image" onChange={this.handleChange} value={this.state.image} placeholder="image"/>
						<br />
						<input type="text" id="profileImage" onChange={this.handleChange} value={this.state.profileImage} placeholder="profileImage"/>
						<br />
						<input type="text" id="username" onChange={this.handleChange} value={this.state.username} placeholder="username"/>
						<br />
						<input onClick={this.hideCreateForm} type="submit" value="Post" />

					</form>
					<div className="footer-div">
						<div className="homeButton">
							<img className="bottom-nav" src="./images/home.svg" />
						</div>
						<div className="createButton">
							<img onClick={this.displayCreateForm} className="bottom-nav" src="./images/create post.svg" />
						</div>
					</div>
				</footer>
			</div>
		)
	}
}

ReactDOM.render(<App></App>, document.querySelector("main"))
