import github from '../assets/github.png';  

const Footer = () => {
  return (
    <footer className="bg-[#8A0500] text-white py-4 w-full bottom-0">
      <div className="flex flex-wrap justify-center gap-6 items-center sm:gap-4">
        {/* Desenvolvedores com links do GitHub */}
        <a
          href="https://github.com/biaag10"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center hover:bg-red-600 p-2 rounded-full transition-colors duration-300 flex items-center gap-2 sm:w-1/2 md:w-auto"
        >
          <img
            src={github}
            alt="Bianca Andrade"
            className="w-12 h-12 rounded-full"
          />
          <p className="text-sm">Bianca Andrade</p>
        </a>

        <a
          href="https://github.com/juliaiervese"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center hover:bg-red-600 p-2 rounded-full transition-colors duration-300 flex items-center gap-2 sm:w-1/2 md:w-auto"
        >
          <img
            src={github}
            alt="Julia Ierseve"
            className="w-12 h-12 rounded-full"
          />
          <p className="text-sm">João Vitor</p>
        </a>

        <a
          href="https://github.com/PPedrinho"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center hover:bg-red-600 p-2 rounded-full transition-colors duration-300 flex items-center gap-2 sm:w-1/2 md:w-auto"
        >
          <img
            src={github}
            alt="Pedro Lima"
            className="w-12 h-12 rounded-full"
          />
          <p className="text-sm">Pedro Lima</p>
        </a>

        <a
          href="https://github.com/athaliba"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center hover:bg-red-600 p-2 rounded-full transition-colors duration-300 flex items-center gap-2 sm:w-1/2 md:w-auto"
        >
          <img
            src={github}
            alt="Rafael Althabia"
            className="w-12 h-12 rounded-full"
          />
          <p className="text-sm">Rafael Althabia</p>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
