import { AuthProvider } from "./auth/context/AuthProvider";
import { RoleProvider } from "./auth/context/RoleProvider";
import { AppProvider } from "./coro/context";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <RoleProvider>
          <AppRouter />
        </RoleProvider>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
