import { Navbar }         from './components/Navbar';
import { Hero }           from './components/Hero';
import { Beneficios }     from './components/Beneficios';
import { Apartaestudios } from './components/Apartaestudios';
import { Galeria }        from './components/Galeria';
import { Ubicacion }      from './components/Ubicacion';
import { Resenas }        from './components/Resenas';
import { CTAFinal }       from './components/CTAFinal';
import { Footer }         from './components/Footer';
import { WhatsappFloat }  from './components/WhatsappFloat';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Beneficios />
        <Apartaestudios />
        <Galeria />
        <Ubicacion />
        <Resenas />
        <CTAFinal />
      </main>
      <Footer />
      <WhatsappFloat />
    </>
  );
}
