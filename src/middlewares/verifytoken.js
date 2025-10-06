// Importa a biblioteca jsonwebtoken para manipulação de tokens JWT
import jwt from 'jsonwebtoken';


// Middleware para verificar se o token JWT é válido
const verifyToken = (req, res, next) => {
    // Obtém o token do cabeçalho Authorization da requisição
    const tokenBearer = req.headers['authorization'];

    // Verifica se o token está presente e se começa com "Bearer "
    if (!tokenBearer || !tokenBearer.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token não fornecido ou formato inválido.' });
    }

    // Extrai o token removendo a palavra "Bearer"
    const token = tokenBearer.split(' ')[1];

    // Verifica novamente se o token foi extraído corretamente
    if (!token) return res.status(401).json({ message: 'Token não fornecido' });

    // Valida o token usando a chave secreta definida nas variáveis de ambiente
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // Se houver erro na verificação, retorna erro 403 (token inválido)
        if (err) return res.status(403).json({ message: 'Token inválido' });

        // Se o token for válido, adiciona os dados do usuário à requisição
        req.user = user;
        // Chama o próximo middleware ou rota
        next();
    });
};

// Exporta o middleware para uso em rotas protegidas
export default verifyToken;
