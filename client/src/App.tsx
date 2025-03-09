import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import FiboCalculatorPage from './pages/FiboCalculatorPage';
import TermsPage from './pages/TermsPage';
import Navigation from './components/Navigation';

const App: FC = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route index path="/" element={<FiboCalculatorPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
