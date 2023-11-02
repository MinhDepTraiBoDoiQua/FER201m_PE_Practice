import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Cart from './components/Cart';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/carts/user/:id" element={<Cart />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
