import Error404 from './Error404';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
/* Importaciones Users */
import Contacto from './Views/Contacto';
import Catalogue from './Views/Catalogue';
import Home from './Views/Home';
import Viewproduct from './Views/Viewproduct';
import Login from './Views/Login';
import Register from './Views/Register';
import Services from './Views/Services';
import ServicesForm from './Views/ServicesForm';

/* Importaciones Dashboard */
import Dashboard from './Views/Dashboard';
import Home_Dash from './Views/Home_Dash';
import Users_Dash from './Views/Users_Dash';
import Tickets_Dash from './Views/Tickets_Dash';
import EditarUsuario from './Components/Dashboard/Users/EditarUsuario';
import CrearTicket_Dash from './Views/CrearTicket_Dash';
import PrivateRoute from './PrivateRoute';
import Pedidos_Dash from './Views/Pedidos_Dash';
import Productos_Dash from './Views/Productos_Dash';
import EditarProducto from './Components/Dashboard/Productos/EditarProducto';
import AgregarProducto from './Components/Dashboard/Productos/AgregarProducto';
import AgregarUsuario from './Components/Dashboard/Users/AgregarUsuario';
import  Services_Dash  from './Views/Services_Dash';
import EditarServicio from './Components/Dashboard/Services/EditarServicio';
import AgregarServicio from './Components/Dashboard/Services/AgregarServicio';
import Cart from './Views/CartLayout';
import OrderSummary from './Views/OrderSummary';
import OrderLayout from './Views/OrderLayout';
import OrderUser from './Views/OrderUser';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Rutas Users */}
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/product/:name" element={<Viewproduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/form" element={<ServicesForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order_summary" element={<OrderSummary />} />
          <Route path="/order_user" element={<OrderLayout />} />

          {/* Rutas Dashboard */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Home_Dash />} />
              <Route path="users" element={<Users_Dash />}></Route>
              <Route path="update-user" element={<EditarUsuario />}></Route>
              <Route path="tickets" element={<Tickets_Dash />}></Route>
              <Route path="add-ticket" element={<CrearTicket_Dash />}></Route>
              <Route path="orders" element={<Pedidos_Dash />}></Route>
              <Route path="products" element={<Productos_Dash />}></Route>
              <Route path="update-products/:id" element={<EditarProducto />}></Route>
              <Route path="add-product" element={<AgregarProducto />}></Route>
              <Route path="add-user" element={<AgregarUsuario />}></Route>
              <Route path="services" element={<Services_Dash />}></Route>
              <Route path="/dashboard/edit-service/:serviceId" element={<EditarServicio/>} />
              <Route path="add-service" element={<AgregarServicio />}></Route>
            </Route>
          </Route>

          {/* Rutas Error */}
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
