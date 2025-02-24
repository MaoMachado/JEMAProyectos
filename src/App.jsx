import "./App.css";

import {
  Header,
  CardsSection,
  ImgComparar,
  JoyasInmobiliarias,
  Contacto,
  IconoWhatsApp,
  Footer,
} from "./index";

function App() {
  return (
    <>
      <Header />
      <main>
        <CardsSection />
        <ImgComparar />
        <JoyasInmobiliarias />
        <Contacto />
      </main>
      <IconoWhatsApp />
      <Footer />
    </>
  );
}

export default App;
