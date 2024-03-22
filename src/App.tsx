import HeaderBanner from "./components/HeaderBanner";
import Footer from "./components/Footer";
import ProductsContainer from "./components/ProductsContainer";
import SaleBanner from "./components/SaleBanner";

function App() {
  return (
    <div className="App">
      <main>
        <HeaderBanner />
        <SaleBanner />
        <ProductsContainer />
        <Footer />
      </main>
    </div>
  );
}

export default App;
