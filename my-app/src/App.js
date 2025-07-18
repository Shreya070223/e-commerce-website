
import './App.css';
import Nav from './components/nev';
import Footer from './components/footer';
import Signup from './components/signup';
import Login from "./components/login";
import PrivateComponent from './components/privateComponent';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AddProduct from './components/addProduct';
import ProductsList from './components/productsList';
import UpdateProduct from './components/updateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <h1>E-Dashboard</h1>
      <Routes>
        <Route element={<PrivateComponent/>}>
        <Route path="/" element={<h1>Home</h1>}/>
        <Route path="/pr/" element={<ProductsList/>}/>
        <Route path="/add" element={<AddProduct/>}/>
        <Route path="/update/:id" element={<UpdateProduct/>}/>
        <Route path="/logout" element={<h1>Logout from the Product listing component</h1>}/>
        <Route path="/profil" element={<h1>edit profile</h1>}/>
        </Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
       <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
