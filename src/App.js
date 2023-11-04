import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './components/Home';
import { Container } from 'react-bootstrap';
import Detail from './components/Detail';
import Dashboard from './components/Dashboard';
import Add from './components/Add';
import Delete from './components/Delete';
import Edit from './components/Edit';

function App() {
    return (
        <BrowserRouter>
            <div>
                <NavBar />
                <Container>
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/detail/:id" element={<Detail />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/add" element={<Add />} />
                        <Route path="/delete/:id" element={<Delete />} />
                        <Route path="/edit/:id" element={<Edit />} />
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;
