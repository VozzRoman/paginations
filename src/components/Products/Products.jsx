import scss from "./Products.module.scss"

const Products = ({item}) => {
	return(
		<>
		<li className={scss.itemItem} key={item.id}>
			<div className={scss.itemProd}>
				<p>{item.brand}</p>
				<img src={item.images[0]} alt="" width="200" height="200" />
			</div>
		</li>
		</>
	)
}

export default Products;