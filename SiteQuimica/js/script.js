document.addEventListener('DOMContentLoaded', () => {
    // 1. Controle do Menu Mobile Definitivo (Usa a classe .is-open)
    const botaoMenu = document.getElementById('botao-menu');
    const menuMobile = document.getElementById('menu-mobile');
    const linksMobile = document.querySelectorAll('.link-mobile');

    if (botaoMenu && menuMobile) {
        const definirMenu = (aberto) => {
            menuMobile.classList.toggle('is-open', aberto);
            botaoMenu.setAttribute('aria-expanded', String(aberto));
            botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
            const icone = botaoMenu.querySelector('i');
            if (icone) {
                icone.classList.toggle('fa-bars', !aberto);
                icone.classList.toggle('fa-xmark', aberto);
            }
        };

        botaoMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            definirMenu(!menuMobile.classList.contains('is-open'));
        });

        linksMobile.forEach(link => {
            link.addEventListener('click', () => definirMenu(false));
        });

        // Fecha o menu ao tocar fora dele
        document.addEventListener('click', (e) => {
            if (!menuMobile.contains(e.target) && !botaoMenu.contains(e.target)) {
                definirMenu(false);
            }
        });

        // Fecha com Esc e ao girar/redimensionar para tela grande
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') definirMenu(false);
        });
        window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
            if (e.matches) definirMenu(false);
        });
    }

    // 2. Botão Flutuante "Voltar ao Topo" com transição de rolagem
    const botaoVoltarAoTopo = document.getElementById('botao-voltar-ao-topo');

    if (botaoVoltarAoTopo) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 450) {
                botaoVoltarAoTopo.classList.remove('hidden');
            } else {
                botaoVoltarAoTopo.classList.add('hidden');
            }
        });

        botaoVoltarAoTopo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 3. Animação simples de revelação em cascata (Intersection Observer) para os cards
    const observerOptions = {
        threshold: 0.1
    };

    const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window);
    const observer = semAnimacao ? null : new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementosAnimaveis = document.querySelectorAll('.cartao-recurso, .item-aplicacao, .cartao-perfil');
    if (!semAnimacao) elementosAnimaveis.forEach(el => {
        el.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-700');
        observer.observe(el);
    });
});