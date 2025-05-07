document.addEventListener('DOMContentLoaded', () => {
    const page = window.location.pathname.split('/').pop();

    switch (page) {
        case 'welcome.html':
            import('./welcome.js')
            .then(module => {
                if (typeof module.init === 'function') {
                module.init();
                }
            })
        .catch(err => console.error('Erro ao carregar welcome.js:', err));
        break;

        case 'login.html':
            import('./login.js')
            .then(module => {
            if (typeof module.init === 'function') {
                module.init();
            }
            })
            .catch(err => console.error('Erro ao carregar login.js:', err));
        break;

        case 'signup.html':
            import('./signup.js')
            .then(module => {
            if (typeof module.init === 'function') {
                module.init();
            }
            })
            .catch(err => console.error('Erro ao carregar signup.js:', err));
            break;

        case 'dashboard.html':
            import('./dashboard.js')
            .then(module => {
            if (typeof module.init === 'function') {
                module.init();
            }
            })
            .catch(err => console.error('Erro ao carregar dashboard.js:', err));
            break;

        case 'checklists.html':
            import('./checklists.js')
            .then(module => {
            if (typeof module.init === 'function') {
                module.init();
            }
            })
            .catch(err => console.error('Erro ao carregar checklists.js:', err));
            break;

        case 'settings.html':
            import('./settings.js')
            .then(module => {
            if (typeof module.init === 'function') {
                module.init();
            }
            })
            .catch(err => console.error('Erro ao carregar settings.js:', err));
            break;

        default:
            console.log('Nenhum módulo carregado para esta página:', page);
    }

    import('./utils.js')
    .then(utils => {
      if (typeof utils.init === 'function') {
        utils.init();
      }
    })
    .catch(err => console.error('Erro ao carregar utils.js:', err));
});