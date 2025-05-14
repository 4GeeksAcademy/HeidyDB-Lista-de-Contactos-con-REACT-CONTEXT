import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex justify-content-end">
				
				<div className="ml-auto">
					<Link to = "/add-contact" >
						<button className="btn btn-success">Add new Contact </button>
					</Link>
				</div>
			</div>
		</nav>
	);
};