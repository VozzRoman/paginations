import { Link, Outlet } from "react-router-dom"

const Layout = () => {
	return(
		<div style={{maxWidth:"1100px", margin:"0 auto"}}>
		<header>
			<ul style={{display:"flex", padding:"20px"}}>
				<li style={{marginRight:"15px"}}>
					<Link to="/">Load more</Link>
				</li>
				<li>
					<Link to="/pagination">Pagination</Link>
				</li>
			</ul>
		</header>
		<main>
			<Outlet/>
		</main>
		</div>
	)
}

export default Layout;