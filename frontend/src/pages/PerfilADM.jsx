// frontend/src/pages/PerfilADM.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { postsService } from "../services/posts";
import {
  ShieldCheck,
  User,
  Mail,
  CalendarPlus,
  ClipboardList,
  FileDown,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";

export default function PerfilADM() {
  const { user, token } = useAuth();
  const nome = user?.name || "Administrador(a)";
  const email = user?.email || "admin@passabola.com";
  const isAdmin = user?.role === "admin" || user?.isAdmin;
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAdmin) {
      fetchPosts();
    }
  }, [isAdmin]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postsService.getAll();
      const postsData = response.posts || [];
      setPosts(Array.isArray(postsData) ? postsData : []);
      setError("");
    } catch (err) {
      console.error("Erro ao buscar postagens:", err);
      setError("Erro ao carregar postagens");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      return alert("Preencha todos os campos");
    }

    try {
      setLoading(true);
      const response = await postsService.create({
        title: newPostTitle,
        content: newPostContent,
      });
      
      if (response.post) {
        setPosts((prev) => [response.post, ...prev]);
        setNewPostTitle("");
        setNewPostContent("");
        setError("");
        alert("Postagem criada com sucesso!");
      }
    } catch (err) {
      console.error("Erro ao criar postagem:", err);
      const errorMessage = err.response?.data?.error || "Erro ao criar postagem";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    const postToEdit = posts.find((p) => p.id === id);
    if (!postToEdit) return;

    const updatedTitle = prompt("Novo título:", postToEdit.title);
    if (!updatedTitle?.trim()) return;

    const updatedContent = prompt("Novo conteúdo:", postToEdit.content);
    if (!updatedContent?.trim()) return;

    try {
      setLoading(true);
      const response = await postsService.update(id, {
        title: updatedTitle,
        content: updatedContent,
      });
      
      if (response.post) {
        setPosts((prev) =>
          prev.map((p) => (p.id === id ? response.post : p))
        );
        setError("");
        alert("Postagem atualizada com sucesso!");
      }
    } catch (err) {
      console.error("Erro ao atualizar postagem:", err);
      const errorMessage = err.response?.data?.error || "Erro ao atualizar postagem";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const postToDelete = posts.find((p) => p.id === id);
    if (!postToDelete) return;

    if (!window.confirm(`Tem certeza que deseja excluir a postagem "${postToDelete.title}"?`)) {
      return;
    }

    try {
      setLoading(true);
      await postsService.delete(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setError("");
      alert("Postagem excluída com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir postagem:", err);
      const errorMessage = err.response?.data?.error || "Erro ao excluir postagem";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-violet-50 to-white font-poppins text-gray-900">
      {/* Cabeçalho */}
      <header className="border-b border-slate-200 bg-white py-8 shadow-sm text-center">
        <h1 className="text-4xl font-extrabold flex justify-center items-center gap-2 text-gray-900">
          <ShieldCheck className="text-violet-700 w-8 h-8" />
          Painel Administrativo
        </h1>
        <p className="text-gray-600 text-base mt-2">
          Gerencie eventos, inscrições e postagens do site.
        </p>
      </header>

      <main className="mx-auto mt-12 max-w-5xl px-12 space-y-10">
        {/* Informações do Administrador */}
        <section className="bg-white rounded-2xl shadow-md border border-slate-100 p-8">
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-violet-700">
            <User className="w-5 h-5" /> Informações da Conta
          </h2>

          {!isAdmin && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              ⚠️ Seu usuário não possui permissão de administrador.
            </div>
          )}

          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-bold text-gray-500">NOME</p>
              <p className="text-base font-semibold">{nome}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500">EMAIL</p>
              <p className="text-base font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4 text-violet-600" />
                {email}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500">PERFIL</p>
              <p className="text-base font-semibold">
                {isAdmin ? "Administrador(a)" : "Usuário comum"}
              </p>
            </div>
          </div>
        </section>

        {/* Ações do Administrador */}
        <section className="grid grid-cols-2 gap-10">
          {/* Criar Evento */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8 hover:shadow-lg transition-all">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-violet-700">
              <CalendarPlus className="w-5 h-5" /> Criar evento
            </h3>
            <p className="text-sm text-gray-600">
              Cadastre um novo evento no sistema.
            </p>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => navigate("/admin/eventos/novo")}
                className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-700 transition"
              >
                Novo evento
              </button>
              <button
                onClick={() => navigate("/eventos/novo?template=rapido")}
                className="rounded-xl border border-violet-600 px-5 py-2.5 text-sm font-bold text-violet-700 hover:bg-violet-50 transition"
              >
                Modelo rápido
              </button>
            </div>
          </div>

          {/* Gerenciar Eventos */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8 hover:shadow-lg transition-all">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-violet-700">
              <ClipboardList className="w-5 h-5" /> Gerenciar eventos
            </h3>
            <p className="text-sm text-gray-600">
              Edite inscrições, presença e exporte relatórios.
            </p>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => navigate("/admin/eventos")}
                className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-700 transition"
              >
                Abrir lista
              </button>
              <button
                onClick={() => alert("Exportar CSV – integração com /api/eventos/export")}
                className="rounded-xl border border-violet-600 px-5 py-2.5 text-sm font-bold text-violet-700 hover:bg-violet-50 transition flex items-center gap-2"
              >
                <FileDown className="w-4 h-4" /> Exportar CSV
              </button>
            </div>
          </div>
        </section>

        {/* Postagens */}
        {isAdmin && (
          <section className="bg-white rounded-2xl shadow-md border border-slate-100 p-8">
            <h2 className="text-xl font-bold mb-5 text-violet-700 flex items-center gap-2">
              <ClipboardList className="w-5 h-5" /> Gerenciar Postagens
            </h2>

            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            {/* Formulário de criação */}
            <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-violet-700">
                <Plus className="w-5 h-5" /> Nova Postagem
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Título da postagem"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <textarea
                  placeholder="Conteúdo da postagem"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <button
                  onClick={handleCreate}
                  disabled={loading || !newPostTitle.trim() || !newPostContent.trim()}
                  className="rounded-xl bg-violet-600 text-white px-6 py-3 font-bold hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? "Criando..." : "Criar Postagem"}
                </button>
              </div>
            </div>

            {/* Lista de postagens */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4">Postagens Existentes</h3>
              
              {loading && posts.length === 0 ? (
                <p className="text-gray-600">Carregando postagens...</p>
              ) : posts.length === 0 ? (
                <p className="text-gray-600">Nenhuma postagem criada ainda.</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
                    >
                      <h3 className="font-bold text-lg mb-2 text-gray-900">{post.title}</h3>
                      <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Por: {post.author}</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleEdit(post.id)}
                          disabled={loading}
                          className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
                        >
                          <Edit className="w-4 h-4" /> Editar
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={loading}
                          className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" /> Excluir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Botão Ranking */}
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/ranking")}
                className="rounded-xl bg-yellow-500 text-white px-6 py-3 font-bold hover:bg-yellow-600 transition flex items-center gap-2"
              >
                🏆 Ver Ranking de Jogadoras
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}