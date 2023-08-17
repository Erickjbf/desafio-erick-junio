class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens){
        // Tabela com preços e descrições dos itens
        const menu = {
            'cafe': { descricao: 'Café', valor: 3.00 },
            'chantily': { descricao: 'Chantily', valor: 1.50 },
            'suco': { descricao: 'Suco Natural', valor: 6.20 },
            'sanduiche': { descricao: 'Sanduíche', valor: 6.50 },
            'queijo': { descricao: 'Queijo', valor: 2.00 },
            'salgado': { descricao: 'Salgado', valor: 7.25 },
            'combo1': { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            'combo2': { descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
        };

        // Validando a forma de pagamento
        if (!['dinheiro', 'debito', 'credito'].includes(metodoDePagamento)){
            return "Forma de pagamento inválida!";
        }

        let total = 0;
        let cafePedido = false;
        let chantilyPedido = false;
        let sanduichePedido = false;
        let queijoPedido = false;

        for (const itemQuantidade of itens){
            const [itemCodigo, quantidade] = itemQuantidade.split(',');

            if (quantidade == 0){
                return "Quantidade inválida!";
            }

            if (!menu[itemCodigo]){
                return "Item inválido!";
            }

            const item = menu[itemCodigo];
            const valorItem = item.valor * parseInt(quantidade);

            total += valorItem;

            if (itemCodigo === 'cafe'){
                cafePedido = true;
            } else if (itemCodigo === 'chantily'){
                chantilyPedido = true;
            } else if (itemCodigo === 'sanduiche'){
                sanduichePedido = true;
            } else if (itemCodigo === 'queijo'){
                queijoPedido = true;
            }
        }

        if (chantilyPedido && !cafePedido){
            return "Item extra não pode ser pedido sem o principal";
        }

        if (queijoPedido && !sanduichePedido){
            return "Item extra não pode ser pedido sem o principal";
        }

        // Aplicando descontos e taxas
        if (metodoDePagamento === 'dinheiro'){
            total *= 0.95; // 5% de desconto
        } else if (metodoDePagamento === 'credito'){
            total *= 1.03; // 3% de acréscimo
        }

        // Formatando o valor total da compra com vírgula separando os reais dos centavos
        const formattedTotal = total.toFixed(2).replace('.', ',');

        // Verificando se há itens no carrinho de compra
        if (itens.length === 0){
            return "Não há itens no carrinho de compra!";
        }

        // Retornando o valor total com a formatacao correta
        return `R$ ${formattedTotal}`;
    }
}

export { CaixaDaLanchonete };