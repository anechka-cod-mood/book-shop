import {
  RouterProvider,
  useRouter,
} from "./context/RouterContext";
import { ShopProvider } from "./context/ShopContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { BookDetailsPage } from "./pages/BookDetailsPage";
import { CartPage } from "./pages/CartPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ManagerPage } from "./pages/ManagerPage";
import { ManagerBooksPage } from "./pages/ManagerBooksPage";
import { ReportsPage } from "./pages/ReportsPage";
import { AdminPage } from "./pages/AdminPage";

function Routes() {
  const { currentPath } = useRouter();
  const { isAuthenticated } = useAuth();

  // Если не авторизован, показываем страницу входа или регистрации
  if (
    !isAuthenticated &&
    currentPath !== "/login" &&
    currentPath !== "/register"
  ) {
    return <LoginPage />;
  }

  // Страница входа
  if (currentPath === "/login") {
    return <LoginPage />;
  }

  // Страница регистрации
  if (currentPath === "/register") {
    return <RegisterPage />;
  }

  if (currentPath.startsWith("/book/")) {
    return <BookDetailsPage />;
  }

  switch (currentPath) {
    case "/":
      return <HomePage />;
    case "/catalog":
      return <CatalogPage />;
    case "/cart":
      return <CartPage />;
    case "/favorites":
      return <FavoritesPage />;
    case "/profile":
      return <ProfilePage />;
    case "/manager":
      return <ManagerPage />;
    case "/manager/books":
      return <ManagerBooksPage />;
    case "/manager/reports":
      return <ReportsPage />;
    case "/admin":
      return <AdminPage />;
    default:
      return <HomePage />;
  }
}

export default function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <ShopProvider>
          <AppContent />
        </ShopProvider>
      </AuthProvider>
    </RouterProvider>
  );
}

function AppContent() {
  const { currentPath } = useRouter();
  const { isAuthenticated } = useAuth();

  // На странице входа или регистрации не показываем Header и Footer
  if (
    currentPath === "/login" ||
    currentPath === "/register" ||
    !isAuthenticated
  ) {
    return <Routes />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Routes />
      </main>
      <Footer />
    </div>
  );
}