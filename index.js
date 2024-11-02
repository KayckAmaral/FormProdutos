import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));

const porta = 3000;
const host = '0.0.0.0';

var listaProdutos = []; // Lista global para armazenar os produtos cadastrados

function cadastroProdutoView(req, resp) {
    resp.send(`
        <html>
            <head>
                <title>Cadastro de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body { background-color: #f8f9fa; }
                    .container { margin-top: 50px; }
                    .form-title { font-size: 24px; font-weight: 600; color: #333; margin-bottom: 20px; }
                    .btn-primary { background-color: #4caf50; border-color: #4caf50; }
                    .table { margin-top: 20px; }
                    .btn-secondary { margin-right: 10px; }
                </style>
            </head>
            <body>
                <div class="container text-center">
                    <h1 class="form-title">Cadastro de Produtos</h1>
                    <form method="POST" action="/cadastrarProduto" class="border p-4 row g-3">
                        <div class="col-md-6">
                            <label for="nome" class="form-label">Nome do Produto</label>
                            <input type="text" class="form-control" id="nome" name="nome" placeholder="Nome do Produto" required>
                        </div>
                        <div class="col-md-6">
                            <label for="categoria" class="form-label">Categoria</label>
                            <input type="text" class="form-control" id="categoria" name="categoria" placeholder="Categoria" required>
                        </div>
                        <div class="col-md-6">
                            <label for="preco" class="form-label">Preço</label>
                            <input type="number" class="form-control" id="preco" name="preco" placeholder="Preço" required>
                        </div>
                        <div class="col-md-6">
                            <label for="descricao" class="form-label">Descrição</label>
                            <textarea class="form-control" id="descricao" name="descricao" rows="2" placeholder="Descrição do Produto" required></textarea>
                        </div>
                        <div class="col-12">
                            <button class="btn btn-primary" type="submit">Cadastrar Produto</button>
                            <a href="/" class="btn btn-secondary">Voltar para o Menu Principal</a>
                        </div>
                    </form>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </html>
    `);
}


function visualizarProdutosView(req, resp) {
    let html = `
        <html>
            <head>
                <title>Lista de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    .container { margin-top: 30px; }
                    .btn-primary { background-color: #4caf50; border-color: #4caf50; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Produtos Cadastrados</h2>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Preço</th>
                                <th scope="col">Descrição</th>
                            </tr>
                        </thead>
                        <tbody>`;

    if (listaProdutos.length === 0) {
        html += `<tr><td colspan="4" class="text-center">Nenhum produto cadastrado</td></tr>`;
    } else {
        for (const produto of listaProdutos) {
            html += `<tr>
                        <td>${produto.nome}</td>
                        <td>${produto.categoria}</td>
                        <td>R$ ${produto.preco}</td>
                        <td>${produto.descricao}</td>
                    </tr>`;
        }
    }

    html += `</tbody> 
                    </table>
                    <a class="btn btn-secondary" href="/">Voltar para o Menu</a>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </html>
    `;
    
    resp.send(html);
}

function menuView(req, resp) {
    resp.send(`
        <html>
            <head>
                <title>Menu</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body { display: flex; min-height: 100vh; background-color: #f8f9fa; }
                    .sidebar { width: 250px; background-color: #343a40; color: white; padding-top: 20px; }
                    .sidebar a { color: white; padding: 15px; text-decoration: none; display: block; font-weight: 500; }
                    .sidebar a:hover { background-color: #495057; }
                    .content { flex-grow: 1; padding: 20px; }
                    .navbar-brand { font-weight: 600; font-size: 18px; padding-left: 15px; }
                </style>
            </head>
            <body>
                <div class="sidebar">
                    <a class="navbar-brand" href="#">MENU</a>
                    <a class="nav-link" href="/cadastrarProduto">Cadastrar Produto</a>
                    <a class="nav-link" href="/visualizarProdutos">Visualizar Produtos</a>
                </div>
                <div class="content">
                    <h2>Bem-vindo ao sistema de gerenciamento de produtos</h2>
                    <p>Use o menu à esquerda para navegar entre as opções de cadastro e visualização de produtos.</p>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </html>
    `);
}


function cadastrarProduto(req, resp){
    const { nome, categoria, preco, descricao } = req.body;
    const produto = { nome, categoria, preco, descricao };

    listaProdutos.push(produto);

    resp.redirect('/visualizarProdutos'); // Redireciona para a página de visualização de produtos
}

app.get('/', menuView);
app.get('/cadastrarProduto', cadastroProdutoView);
app.get('/visualizarProdutos', visualizarProdutosView); // Nova rota para visualização dos produtos
app.post('/cadastrarProduto', cadastrarProduto);

app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}`);
});
