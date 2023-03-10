import './App.scss';
import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import AddProduct from './pages/AddProduct';
import AllProducts from './pages/AllProducts';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route index element={<AllProducts />} />
                    <Route path='/addProduct' element={<AddProduct />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
