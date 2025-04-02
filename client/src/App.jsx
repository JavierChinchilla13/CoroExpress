import { AuthProvider } from "./auth/context/AuthProvider";
import { AppProvider } from "./coro/context";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
