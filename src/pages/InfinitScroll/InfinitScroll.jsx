import { useEffect, useRef, useState } from "react";
import { getProduct } from "../../api/api";
import scss from "../Pagination/Pagination.module.scss";
import '../../App.css';
import Products from "../../components/Products/Products";
const  InfinitScroll = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsloading] = useState(false);
	const [error, setError] = useState(null);
	const [skip, setSkip] = useState(0);
	// const [total, setTotal] = useState();
	const [pageSize] = useState(10); // сколько элементов на странице
	const total = useRef();
	console.log(error);
	console.log("SKIP--->",skip);
	

	
	console.log("TOTAL--->",total.current);

	useEffect(() => {

		const getProd = async () => {
			try {
				
				setIsloading(true);
				const response = await getProduct(pageSize ,skip);
				console.log(response);
				if(skip === 0) {
					setIsloading(false);
					return setData(response.products);
				}
				total.current = response.total;
				setData(prev => [...prev, ...response.products]);
				setError('');
				setIsloading(false);
			} catch (error) {
				setError(error);
			}
	
		}
		getProd();
		if(skip >= total.current){
				
			return alert('больше нету')
		}
	}, [skip, pageSize]);

	useEffect(() => {
		const handleScroll = (e) => {
			const scrollHeight = e.target.documentElement.scrollHeight;
			const currentHeight = e.target.documentElement.scrollTop + window.innerHeight
			if(currentHeight + 1 > scrollHeight){
				setSkip(skip + 10);
			}
		}
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [skip])

  return (
	
    <div className="App">
		<ul className={scss.itemList}>
			{data?.map(item => {
				return(
				
				 <Products key={item.id} item={item}/>
				)
			})}
		</ul>
		{isLoading && <h1 style={{margin: "20px"}}>....Loading</h1>}
      </div>
    
  );
}

export default InfinitScroll;