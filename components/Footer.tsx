import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent border-t border-[#d0d03d]/20 mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-white">
              Case<span className="text-[#d0d03d]">Flow</span>
            </h2>
            <p className="text-[#A1A1AA] mt-2 text-sm">
              Optimizando la adquisición de casos legales.
            </p>
          </div>
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Soluciones</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-[#A1A1AA] hover:text-white">Para Abogados</a></li>
                <li><a href="#" className="text-base text-[#A1A1AA] hover:text-white">Para Víctimas</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Compañía</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-[#A1A1AA] hover:text-white">Nosotros</a></li>
                <li><a href="#" className="text-base text-[#A1A1AA] hover:text-white">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-[#A1A1AA] hover:text-white">Privacidad</a></li>
                <li><a href="#" className="text-base text-[#A1A1AA] hover:text-white">Términos</a></li>
              </ul>
            </div>
             <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Redes</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-[#A1A1AA] hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="text-base text-[#A1A1AA] hover:text-white">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-[#d0d03d]/20 pt-8 text-center">
          <p className="text-base text-[#A1A1AA]">&copy; {new Date().getFullYear()} CaseFlow. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;