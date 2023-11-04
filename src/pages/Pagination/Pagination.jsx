import { useCallback, useEffect, useState } from "react";
import scss from "./Pagination.module.scss";
import { getProduct } from "../../api/api";
import '../../App.css';
import Products from "../../components/Products/Products";
const  Pagination = () => {
	const [data, setData] = useState([]);// запрос данных
	const [isLoading, setIsloading] = useState(false);
	const [error, setError] = useState(null);
	const [skip, setSkip] = useState(0);//сколько пропусать страниц
	const [total, setTotal] = useState(null); //количество страниц
	const [pageSize] = useState(12); // сколько элементов на странице
	const [activeIdex, setActiveIndex] = useState(0);//index активной страницы
console.log(error);

//функция подсчета страниц где value - это общее количество страниц (response.total) а pageSize - limit
const calculatePagination = useCallback((value) => {
	//создаем массив из номеров страниц, что бы отрисовать в разметке мепом - total.map()
	let pages = [];
	const amount = value / pageSize
	for (let index = 1; index <= amount; index+=1) {
		pages.push(index);

	}
		setTotal(pages);
}, [pageSize])

	useEffect(() => {
		const getProd = async () => {
			try {
				setIsloading(true);
				const response = await getProduct(pageSize, skip);
				console.log(response);
				calculatePagination(response.total);
				setData(response.products);
				setError('');
				setIsloading(false);
			} catch (error) {
				setError(error);
			}
		}
		getProd();
	}, [skip, calculatePagination, pageSize]);

	const nextBth = () => {
		setSkip(prev => prev + 10); //по бекенду skip - скольео страниц пропустить
		setActiveIndex(prev => prev + 1); // получаем индекс текущей страници и + следующий индекс (щетчик), таки образом добовляем класс актив (active page) для страници используя кнопки prev next!
		//<prev 1 2 3 [4] 5 6  next>
	}
	const prevBth = () => {
		setSkip(prev => prev - 10);
		setActiveIndex(prev => prev - 1);
		
	}
	const paginationPage = (idx) => {
		// console.log("BTH",idx * 10);
		setActiveIndex(idx); // получаем index кнопки страници
		let res = idx * 10; // умножем index на 10 что бы получить нужное количество пропущеных страниц
		//index = 0 * 10 = 0 пропускаем 0 страниц
		//index = 1 * 10 = 10 пропускаем 10 страниц
		//2, 3, 4........
 		setSkip(res);
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
		<nav aria-label="Page navigation example">
  <ul className="pagination" style={{justifyContent:"center", margin:"30px"}}>
    <li onClick={prevBth} className= "page-item"><button className="page-link">Previous</button></li>
    {total?.map((item, index) => {
		return (
			<>
			 <li key={index} className={`page-item ${activeIdex === index ? 'active' : null}`}><button className="page-link" onClick={() => paginationPage(Number(index))}>{item}</button></li>
			</>
		)
	 })}
    <li onClick={nextBth} className="page-item"><button className="page-link">Next</button></li>
  </ul>
</nav>
		
      </div>
    
  );
}

export default Pagination;