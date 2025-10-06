// Middleware que verifica se o usuário autenticado possui permissão de administrador
const isAdmin = (req, res, next) => {

    // Verifica se há um usuário autenticado no token
    if (!req.user) {

        // Loga tentativa de acesso sem autenticação
        console.error("Tentativa de acesso admin sem usuário logado no token.");
        
        // Retorna erro 403 (proibido) por ausência de autenticação
        return res.status(403).json({
            erro: "Acesso negado. Token de autenticação não fornecido ou inválido."
        });
    }

    // Verifica se o usuário possui a flag de administrador
    if (req.user.administrador === true) {

        // Se for administrador, permite que a requisição continue
        next();

    } else {

        // Se não for administrador, retorna erro 403 (proibido)
        return res.status(403).json({
            erro: "Acesso negado. Você não tem permissão de administrador para realizar esta ação."
        });

    }
};

// Exporta o middleware para uso em rotas protegidas
export default isAdmin;
