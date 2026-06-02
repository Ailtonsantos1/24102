import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Toast } from '../../components/Toast';
import { criarServico, uploadMultipleImages } from '../../services/api';

interface FormData {
  titulo: string;
  descricao: string;
  categoria: string;
  preco: number;
  urgente: boolean;
  contato: string;
  localizacao: string;
}

interface ToastState {
  message: string;
  isError: boolean;
}

const PostService: React.FC = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    titulo: '',
    descricao: '',
    categoria: '',
    preco: 0,
    urgente: false,
    contato: '',
    localizacao: '',
  });

  const [fotos, setFotos] = useState<File[]>([]);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categorias: string[] = [
    'Elétrica',
    'Hidráulica',
    'Pintura',
    'Limpeza',
    'Construção',
    'Outros',
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFotos((prev) => [...prev, ...files]);
  };

  const removerFoto = (index: number) => {
    setFotos((prev) => prev.filter((_, i) => i !== index));
  };

  const validarFormulario = (): boolean => {
    if (!formData.titulo.trim()) {
      mostrarToast('Informe o título', true);
      return false;
    }
    if (!formData.descricao.trim()) {
      mostrarToast('Informe a descrição', true);
      return false;
    }
    if (!formData.categoria) {
      mostrarToast('Selecione uma categoria', true);
      return false;
    }
    if (!formData.preco || isNaN(Number(formData.preco))) {
      mostrarToast('Informe um valor válido', true);
      return false;
    }
    if (!formData.contato.trim()) {
      mostrarToast('Informe um contato', true);
      return false;
    }
    if (!formData.localizacao.trim()) {
      mostrarToast('Informe sua localização', true);
      return false;
    }
    return true;
  };

  const mostrarToast = (msg: string, isError: boolean = false) => {
    setToast({ message: msg, isError });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validarFormulario() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      let fotoUrls: string[] = [];
      if (fotos.length > 0) {
        const uploadResult = await uploadMultipleImages(fotos);
        fotoUrls = uploadResult.urls;
      }

      const dadosServico = {
        titulo: formData.titulo,
        descricao: formData.descricao,
        categoria: formData.categoria,
        preco: formData.preco,
        urgente: formData.urgente,
        contato: formData.contato,
        localizacao: formData.localizacao,
        fotos: fotoUrls,
      };
      await criarServico(dadosServico);
      mostrarToast('✅ Serviço publicado com sucesso!');
      setTimeout(() => navigate('/client/services'), 1300);
    } catch (error) {
      console.error(error);
      mostrarToast('Erro ao publicar serviço', true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: #f0f4fa; color: #1e293b; padding: 1.5rem; min-height: 100vh; }
    .publish-container { max-width: 920px; margin: 0 auto; background: white; border-radius: 32px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 1px solid #e6eef8; }
    .form-header { background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 2rem 2.25rem; display: flex; justify-content: space-between; align-items: center; }
    .header-content h1 { font-size: 1.75rem; font-weight: 800; margin-bottom: 0.3rem; }
    .subhead { opacity: 0.95; font-size: 0.95rem; }
    .back-btn { background: rgba(255,255,255,0.18); border: none; color: white; padding: 0.65rem 1.2rem; border-radius: 24px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; transition: 0.3s; }
    .back-btn:hover { background: rgba(255,255,255,0.28); }
    .form-content { padding: 2.25rem; }
    .field-group { margin-bottom: 1.6rem; }
    .field-label { font-weight: 700; margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.45rem; color: #0f172a; }
    .required-star { color: #dc2626; }
    input, textarea { width: 100%; padding: 0.9rem 1rem; border: 1px solid #dbe5f5; border-radius: 16px; font-size: 0.95rem; transition: 0.3s; background: white; font-family: inherit; }
    input:focus, textarea:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.18); }
    textarea { min-height: 130px; resize: vertical; }
    .hint-text { margin-top: 0.5rem; font-size: 0.85rem; color: #64748b; }
    .upload-area { border: 2px dashed #cbd5e1; border-radius: 18px; padding: 2.25rem; text-align: center; cursor: pointer; transition: 0.3s; background: #f8fafc; }
    .upload-area:hover { border-color: #3b82f6; background: #eff6ff; }
    .upload-area i { font-size: 3rem; color: #3b82f6; margin-bottom: 0.8rem; }
    .file-list { margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.75rem; }
    .file-tag { background: #eff6ff; color: #1d4ed8; padding: 0.6rem 0.85rem; border-radius: 24px; font-size: 0.85rem; display: flex; align-items: center; gap: 0.5rem; }
    .file-tag img { width: 44px; height: 44px; object-fit: cover; border-radius: 10px; }
    .checkbox-group, .radio-group { display: flex; flex-wrap: wrap; gap: 0.75rem; }
    .checkbox-item, .radio-item { background: #f8fafc; border: 1px solid #dbe5f5; border-radius: 16px; padding: 0.7rem 1.1rem; cursor: pointer; transition: 0.3s; display: flex; align-items: center; gap: 0.5rem; font-weight: 500; }
    .checkbox-item:hover, .radio-item:hover { border-color: #93c5fd; }
    .checkbox-item.selected, .radio-item.selected { border-color: #3b82f6; background: #eff6ff; color: #1d4ed8; }
    .double-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
    .publish-btn { width: 100%; border: none; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 1rem; border-radius: 20px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
    .publish-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 24px rgba(59, 130, 246, 0.3); }
    .publish-btn:disabled { opacity: 0.6; cursor: not-allowed; }
    @media (max-width: 768px) { .double-row { grid-template-columns: 1fr; } .form-header { flex-direction: column; align-items: flex-start; gap: 0.8rem; } .form-content { padding: 1.5rem; } }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="publish-container">
        <div className="form-header">
          <div className="header-content">
            <h1>
              <i className="fas fa-plus-circle"></i> Publicar novo serviço
            </h1>
            <div className="subhead">
              Preencha os dados abaixo para encontrar o profissional ideal
            </div>
          </div>
          <button
            className="back-btn"
            onClick={() => navigate('/client/services')}
          >
            <i className="fas fa-arrow-left"></i> Voltar
          </button>
        </div>
        <form onSubmit={handleSubmit} className="form-content">
          <div className="field-group">
            <div className="field-label">
              <i className="fas fa-heading"></i> Título do serviço
              <span className="required-star">*</span>
            </div>
            <input
              type="text"
              name="titulo"
              placeholder="Ex: Instalação elétrica residencial"
              value={formData.titulo}
              onChange={handleChange}
            />
          </div>

          <div className="field-group">
            <div className="field-label">
              <i className="fas fa-align-left"></i> Descrição detalhada
              <span className="required-star">*</span>
            </div>
            <textarea
              name="descricao"
              placeholder="Descreva o serviço, materiais inclusos, garantia, etc."
              value={formData.descricao}
              onChange={handleChange}
            />
            <div className="hint-text">
              Seja o mais claro possível para atrair profissionais qualificados.
            </div>
          </div>

          <div className="field-group">
            <div className="field-label">
              <i className="fas fa-camera"></i> Fotos do serviço
            </div>
            <div className="upload-area" onClick={handleUploadClick}>
              <i className="fas fa-cloud-upload-alt"></i>
              <div style={{ fontWeight: 600, marginBottom: '0.3rem' }}>
                Clique ou arraste imagens aqui
              </div>
              <div className="hint-text">JPG, PNG até 5MB cada</div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
            {fotos.length > 0 && (
              <div className="file-list">
                {fotos.map((foto, idx) => (
                  <div key={idx} className="file-tag">
                    <img src={URL.createObjectURL(foto)} alt={foto.name} />
                    {foto.name.length > 20
                      ? foto.name.substring(0, 17) + '...'
                      : foto.name}
                    <i
                      className="fas fa-times-circle"
                      style={{
                        cursor: 'pointer',
                        color: '#dc2626',
                        fontSize: '1.1rem',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        removerFoto(idx);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="field-group">
            <div className="field-label">
              <i className="fas fa-tags"></i> Categoria
              <span className="required-star">*</span>
            </div>
            <div className="radio-group">
              {categorias.map((cat) => (
                <label
                  key={cat}
                  className={`radio-item ${formData.categoria === cat ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="categoria"
                    value={cat}
                    checked={formData.categoria === cat}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div className="double-row">
            <div className="field-group">
              <div className="field-label">
                <i className="fas fa-dollar-sign"></i> Preço sugerido (R$)
                <span className="required-star">*</span>
              </div>
              <input
                type="number"
                name="preco"
                placeholder="Ex: 150"
                value={formData.preco}
                onChange={handleChange}
                step="0.01"
              />
            </div>

            <div className="field-group">
              <div className="field-label">
                <i className="fas fa-bolt"></i> Urgência
              </div>
              <label className="checkbox-item" style={{ marginTop: '0.6rem' }}>
                <input
                  type="checkbox"
                  name="urgente"
                  checked={formData.urgente}
                  onChange={handleChange}
                />{' '}
                Este serviço é urgente (precisa de atendimento rápido)
              </label>
            </div>
          </div>

          <div className="double-row">
            <div className="field-group">
              <div className="field-label">
                <i className="fas fa-phone-alt"></i> Contato
                <span className="required-star">*</span>
              </div>
              <input
                type="text"
                name="contato"
                placeholder="Telefone ou e-mail"
                value={formData.contato}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <div className="field-label">
                <i className="fas fa-map-marker-alt"></i> Localização
                <span className="required-star">*</span>
              </div>
              <input
                type="text"
                name="localizacao"
                placeholder="Cidade, bairro ou região"
                value={formData.localizacao}
                onChange={handleChange}
              />
              <div className="hint-text">
                O profissional verá essa informação
              </div>
            </div>
          </div>

          <button type="submit" className="publish-btn" disabled={isSubmitting}>
            <i className="fas fa-paper-plane"></i>{' '}
            {isSubmitting ? 'Publicando...' : 'Publicar serviço'}
          </button>
        </form>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.isError ? 'error' : 'success'}
          onClose={() => setToast(null)}
        />
      )}

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
    </>
  );
};

export default PostService;
