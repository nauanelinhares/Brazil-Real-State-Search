import Footer from "./components/Footer";
import Header from "./components/Header";
import HouseBox from "./components/HouseBox";

const App = () => {
  return (
    <div>
      <Header />
      <h1>Real State Search</h1>
      <h1>Real State Search</h1>
      <HouseBox
        title={"Casa"}
        description={"SADASDUAWHDWAHUDAUHWDUHAWDUHAWDHUAW"}
        price={"1250"}
        imageUrl={
          "https://resizedimgs.vivareal.com/crop/286x200/named.images.sp/f1e1bb3ef28e073775fc8a1ead80ecfe/foto-1-de-apartamento-com-2-quartos-para-alugar-65m-em-bosque-dos-eucaliptos-sao-jose-dos-campos.webp"
        }
      />
      <h1>Real State Search</h1>
      <HouseBox
        title={"Casa"}
        description={"SADASDUAWHDWAHUDAUHWDUHAWDUHAWDHUAW"}
        price={"1250"}
        imageUrl={
          "https://resizedimgs.vivareal.com/crop/360x240/named.images.sp/5f9ade9e4adbd1f00245237eb45e79f2/foto-1-de-apartamento-com-2-quartos-para-alugar-62m-em-parque-residencial-aquarius-sao-jose-dos-campos.webp"
        }
      />
      <Footer />
    </div>
  );
};

export default App;
