import { Routes, Route } from 'react-router-dom';

import { Home, Login, SignUp } from './pages';
import { Profile } from './pages/Profile';
import { Basket } from './pages/Basket';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/basket" element={<Basket />} />
            </Routes>
        </>
    );
}

export default App;
