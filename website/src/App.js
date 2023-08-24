import './App.css';
import NavBar from './components/utils/NavBar';
import SideBar from './components/utils/SideBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './components/dashboard/Dashboard';
import AllCategories from './components/category/AllCategories'
import CreateCategory from './components/category/CreateCategory'
import UpdateCategory from './components/category/UpdateCategory'

import AllExpenses from './components/expenses/AllExpenses'
import CreateExpenses from './components/expenses/CreateExpenses'
import UpdateExpenses from './components/expenses/UpdateExpenses'

function App() {
  return (

    <BrowserRouter>

      <div className="">

        <NavBar/>
        <SideBar/>

        <div className='app-body'>
          <Routes>

            <Route path='/' element={<Dashboard/>}/>

            <Route path='/AllCategories' element={<AllCategories/>}/>
            <Route path='/CreateCategory' element={<CreateCategory/>}/>
            <Route path='/UpdateCategory' element={<UpdateCategory/>}/>
            
            <Route path='/AllExpenses' element={<AllExpenses/>}/>
            <Route path='/CreateExpenses' element={<CreateExpenses/>}/>
            <Route path='/UpdateExpenses' element={<UpdateExpenses/>}/>

          </Routes>
        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;
