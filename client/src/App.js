import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import GenerateIdeas from "./components/GenerateIdeas";
import CreateArticle from "./components/CreateArticle";
import GenerateResponse from "./components/GenerateResponse";
import History from "./components/History";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import { CSSTransition } from "react-transition-group";
import Suggestions from "./components/Suggestions";
import Calendar from "./components/Calendar";
import SentimentAnalysis from "./components/SentimentAnalysis";
import ExportContent from "./components/ExportContent";
import Dashboard from "./components/Dashboard";
import SeoSuggestions from "./components/SeoSuggestions";
import Templates from "./components/Templates";
import MultiPlatformPost from "./components/MultiPlatformPost";

function App() {
  const [activeTab, setActiveTab] = useState("ideias");
  const [inProp, setInProp] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleLogin = (token) => {
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "ideias":
        return <GenerateIdeas />;
      case "esbocos":
        return <CreateArticle />;
      case "respostas":
        return <GenerateResponse />;
      case "historico":
        return <History />;
      case "sugestoes":
        return <Suggestions />;
      case "calendario":
        return <Calendar />;
      case "analise":
        return <SentimentAnalysis />;
      case "export":
        return <ExportContent />;
      case "dashboard":
        return <Dashboard />;
      case "seo":
        return <SeoSuggestions />;
      case "templates":
        return <Templates />;
      default:
        return <GenerateIdeas />;
      case "multiplatform":
        return <MultiPlatformPost />;
    }
  };

  const handleTabChange = (tab) => {
    setInProp(false);
    setTimeout(() => {
      setActiveTab(tab);
      setInProp(true);
    }, 300);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Projeto Jobcrew</h1>
          {token && (
            <nav className="main-nav">
              <div className="dropdown">
                <button className="dropbtn">Geração de Conteúdo</button>
                <div className="dropdown-content">
                  <button onClick={() => handleTabChange("ideias")}>
                    Gerar Ideias
                  </button>
                  <button onClick={() => handleTabChange("esbocos")}>
                    Criar Esboços
                  </button>
                  <button onClick={() => handleTabChange("respostas")}>
                    Gerar Respostas
                  </button>
                  <button onClick={() => handleTabChange("sugestoes")}>
                    Sugestões
                  </button>
                </div>
              </div>

              <div className="dropdown">
                <button className="dropbtn">Planejamento e Publicação</button>
                <div className="dropdown-content">
                  <button onClick={() => handleTabChange("calendario")}>
                    Calendário
                  </button>
                  <button
                    className={activeTab === "multiplatform" ? "active" : ""}
                    onClick={() => handleTabChange("multiplatform")}
                  >
                    Postagem Multiplataforma
                  </button>
                </div>
              </div>

              <div className="dropdown">
                <button className="dropbtn">Análise e Otimização</button>
                <div className="dropdown-content">
                  <button onClick={() => handleTabChange("analise")}>
                    Análise de Sentimento
                  </button>
                  <button onClick={() => handleTabChange("seo")}>
                    Sugestões de SEO
                  </button>
                  <button onClick={() => handleTabChange("dashboard")}>
                    Dashboard
                  </button>
                </div>
              </div>

              <div className="dropdown">
                <button className="dropbtn">Exportação e Templates</button>
                <div className="dropdown-content">
                  <button onClick={() => handleTabChange("export")}>
                    Exportar Conteúdo
                  </button>
                  <button onClick={() => handleTabChange("templates")}>
                    Templates
                  </button>
                </div>
              </div>

              <button className="logout-btn" onClick={handleLogout}>
                Sair
              </button>
            </nav>
          )}
        </header>

        {token ? (
          <main className="App-main">
            <CSSTransition
              in={inProp}
              timeout={300}
              classNames="fade"
              unmountOnExit
            >
              {renderTabContent()}
            </CSSTransition>
          </main>
        ) : (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/register"
              element={<Register onRegister={handleLogin} />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}

        <footer className="App-footer">
          <p>© 2024 João Pedro. Todos os direitos reservados.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
