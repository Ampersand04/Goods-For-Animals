import { Routes, Route } from 'react-router-dom';

import { Dashboard, Home, Login, SignUp } from './pages';
import { Profile } from './pages/Profile';
import { Basket } from './pages/Basket';
import { Product } from './pages/Product';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/product/:id" element={<Product />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/basket" element={<Basket />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </>
    );
}

export default App;
