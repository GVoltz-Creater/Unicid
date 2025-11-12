// ============================================
// MERAKI VITALSYNC - ALTERNADOR DE TEMA
// Sistema de Modo Claro/Escuro com LocalStorage
// ============================================

// Função para aplicar o tema
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Atualizar o ícone do botão
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        if (theme === 'dark') {
            toggleBtn.innerHTML = '☀️'; // Sol para modo escuro (clique para claro)
            toggleBtn.setAttribute('aria-label', 'Mudar para modo claro');
        } else {
            toggleBtn.innerHTML = '🌙'; // Lua para modo claro (clique para escuro)
            toggleBtn.setAttribute('aria-label', 'Mudar para modo escuro');
        }
    }
}

// Função para alternar o tema
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

// Inicializar o tema ao carregar a página
function initTheme() {
    // Verificar se há tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // Usar tema salvo
        applyTheme(savedTheme);
    } else {
        // Verificar preferência do sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }
}

// Executar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initTheme);