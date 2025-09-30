const isAdmin = (req, res, next) => {

    if (!req.user) {

        console.error("Tentativa de acesso admin sem usuário logado no token.");
        
        return res.status(403).json({
            erro: "Acesso negado. Token de autenticação não fornecido ou inválido."
        });
    }

    if (req.user.administrador === true) {

        next();

    } else {

        return res.status(403).json({
            erro: "Acesso negado. Você não tem permissão de administrador para realizar esta ação."
        });

    }
};

export default isAdmin;