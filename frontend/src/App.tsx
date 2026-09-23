import { BrowserRouter } from 'react-router-dom';
import { ClinicProvider } from './context/ClinicContext';
import { ToastProvider } from './context/ToastContext';
import { AppRoutes } from './routes/AppRoutes';

export function App() {
  return (
    <BrowserRouter>
      <ClinicProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </ClinicProvider>
    </BrowserRouter>
  );
}

export default App;
