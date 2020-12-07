import React from "react";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Welcome to page</h1>
      </header>
      <main>
        <h2>Main page</h2>
      </main>
      <footer className="footer">
        <a href="https://www.nestoria.co.uk">
          <img
            src="https://resources.nestimg.com/nestoria/img/pbr_v1.png"
            alt="powered by nestoria.co.uk"
            width="200"
            height="22"
          />
        </a>
      </footer>
    </div>
  );
}

export default App;
