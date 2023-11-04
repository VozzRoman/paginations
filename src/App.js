
import { Route, Routes } from 'react-router-dom';
import './App.css';
import "reset-css";
import LoadMore from './pages/LoadMore/LoadMore';
import Layout from './components/Layout/Layout';
import  Pagination  from './pages/Pagination/Pagination';
import InfinitScroll from './pages/InfinitScroll/InfinitScroll';


function App() {

  return (
	
<Routes>
	<Route path='/' element={<Layout/>}>
		<Route index element={<LoadMore/>}/>
		<Route path='pagination' element={<Pagination/>}/>
		<Route path='infinitscroll' element={<InfinitScroll/>}/>

		
	</Route>
</Routes>
    
  );
}

export default App;
