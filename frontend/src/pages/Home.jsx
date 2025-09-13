import React from "react";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import Sobre from "../components/Sobre";
import Footer from "../components/Footer";


const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section id="home" className="py-16">
          <div className="text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Bem-vindo à Passa a Bola!</h1>
            <p className="text-gray-700 text-lg">
              Conectando pessoas através do esporte e criando experiências inesquecíveis.
            </p>
          </div>
        </section>
        <Sobre />
        <Login />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
