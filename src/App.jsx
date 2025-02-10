import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./Navbar/Navbar";
import ViewDetail from "./components/ViewDetail";
import EditProduct from "./components/EditProduct";
import CreateProduct from "./components/CreateProduct";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ViewDetail />} />
          <Route path="/editProduct" element={<EditProduct/>} />
          <Route path="/addProduct" element={<CreateProduct />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
