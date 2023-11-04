import { useEffect, useState } from "react";
import { getProduct } from "../../api/api";
import scss from "../Pagination/Pagination.module.scss";
import '../../App.css';
import Products from "../../components/Products/Products";
const  LoadMore = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsloading] = useState(false);
	const [error, setError] = useState(null);
	const [skip, setSkip] = useState(0);
	const [pageSize] = useState(12); // сколько элементов на странице
	console.log(error);
	useEffect(() => {
		// setIsloading(true);
		// getProduct()
		// .then(res => {
		// 	setData(res)
		// 	setError(null)
		// })
		// .catch(err => {
		// 	setError(err)
			
		// })
		// .finally(() => setIsloading(false));
		const getProd = async () => {
			try {
				
				setIsloading(true);
				const response = await getProduct(pageSize ,skip);
				console.log(response);
				if(skip === 0) {
					setIsloading(false);
					return setData(response.products);
				}
				setData(prev => [...prev, ...response.products]);
				setError('');
				setIsloading(false);
			} catch (error) {
				setError(error);
			}
	
		}
		getProd();
	}, [skip, pageSize]);

	const addMore = () => {
		//+ число  должно быть количество pageSize
		setSkip(prev => prev + pageSize);
		
		
	}

  return (
	
    <div className="App">
		<ul className={scss.itemList}>
			{data?.map(item => {
				return(
				
				 <Products key={item.id} item={item}/>
				)
			})}
		</ul>
		{isLoading && <p>....Loading</p>}
		<button onClick={addMore} style={{padding: "20px", background:"blue", color:"white", border:"1px solid blue", borderRadius:"6px", margin:"20px"}}> loadMore</button>
      </div>
    
  );
}

export default LoadMore;