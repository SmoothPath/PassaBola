import React from "react";

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/logo.png" alt="Logo" className="logo" />
          <div className="brand">PASSA A BOLA</div>
        </div>
        <div className="navbar-right">
          <a href="#">Login</a>
          <a href="#">Camisa 10</a>
          <a href="#">Joga Junto</a>
          <a href="#">Voluntários</a>
          <a href="#">Doação</a>
          <a href="#">Parceiros</a>
        </div>
      </nav>

      <main className="container">
        <h1>Entre na sua conta</h1>
        <form>
          <input type="email" placeholder="Email" className="input-field" />
          <input type="password" placeholder="Senha" className="input-field" />
          <button type="submit" className="button-pink">Entrar</button>
        </form>
        <p>
          Não tem uma conta? <a href="#">Cadastre-se</a>
        </p>
      </main>
    </>
  );
}

export default App;
