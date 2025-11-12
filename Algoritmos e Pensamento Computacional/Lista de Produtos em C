/*
SISTEMA DE CADASTRO DE PRODUTOS - LOJA
Descrição: Sistema completo com manipulação de arquivos, estruturas de dados, ponteiros e algoritmos de ordenação
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

// Define o tamanho máximo do vetor de produtos
#define MAX_PRODUTOS 1000
// Define o nome do arquivo de dados
#define ARQUIVO "produtos.txt"
// Define o nome do arquivo CSV para exportação
#define ARQUIVO_CSV "produtos.csv"

// Estrutura que representa um produto
typedef struct {
    int id;              // ID único e incremental do produto
    char nome[50];       // Nome do produto (máximo 50 caracteres)
    char categoria[30];  // Categoria do produto (máximo 30 caracteres)
    float preco;         // Preço do produto
} Produto;

// ==================== FUNÇÕES AUXILIARES ====================
/*
Função: str_lower
Descrição: Converte uma string para minúsculas (case-insensitive)
Parâmetros: 
   - dest: ponteiro para string de destino
   - src: ponteiro para string de origem
*/
void str_lower(char *dest, const char *src) {
    int i = 0;
    // Percorre cada caractere da string de origem
    while (src[i]) {
        // Converte para minúscula e armazena no destino
        dest[i] = tolower(src[i]);
        i++;
    }
    // Adiciona o terminador de string
    dest[i] = '\0';
}

/*
Função: obter_proximo_id
Descrição: Lê o arquivo e retorna o próximo ID disponível (maior ID + 1)
Retorno: Próximo ID a ser utilizado
*/
int obter_proximo_id() {
    FILE *arquivo;           // Ponteiro para o arquivo
    Produto temp;            // Estrutura temporária para leitura
    int maior_id = 0;        // Armazena o maior ID encontrado
    
    // Tenta abrir o arquivo em modo leitura
    arquivo = fopen(ARQUIVO, "r");
    
    // Se o arquivo não existe, começa com ID 1
    if (arquivo == NULL) {
        return 1;
    }
    
    // Lê cada linha do arquivo até o final
    while (fscanf(arquivo, "%d|%49[^|]|%29[^|]|%f\n", &temp.id, temp.nome, temp.categoria, &temp.preco) == 4) {
        // Verifica se o ID atual é maior que o maior ID encontrado
        if (temp.id > maior_id) {
            maior_id = temp.id;
        }
    }
    
    // Fecha o arquivo
    fclose(arquivo);
    
    // Retorna o próximo ID (maior ID + 1)
    return maior_id + 1;
}

/*
Função: produto_existe
Descrição: Verifica se já existe um produto com o mesmo nome (case-insensitive)
Parâmetros:
   - nome: nome do produto a ser verificado
Retorno: 1 se existe, 0 se não existe
*/
int produto_existe(const char *nome) {
    FILE *arquivo;                  // Ponteiro para o arquivo
    Produto temp;                   // Estrutura temporária para leitura
    char nome_lower[50];            // Nome convertido para minúsculas
    char temp_nome_lower[50];       // Nome temporário convertido
    
    // Converte o nome buscado para minúsculas
    str_lower(nome_lower, nome);
    
    // Abre o arquivo em modo leitura
    arquivo = fopen(ARQUIVO, "r");
    
    // Se o arquivo não existe, o produto não existe
    if (arquivo == NULL) {
        return 0;
    }
    
    // Lê cada produto do arquivo
    while (fscanf(arquivo, "%d|%49[^|]|%29[^|]|%f\n", &temp.id, temp.nome, temp.categoria, &temp.preco) == 4) {
        // Converte o nome do produto lido para minúsculas
        str_lower(temp_nome_lower, temp.nome);
        
        // Compara os nomes (case-insensitive)
        if (strcmp(temp_nome_lower, nome_lower) == 0) {
            // Produto encontrado, fecha o arquivo e retorna 1
            fclose(arquivo);
            return 1;
        }
    }
    
    // Produto não encontrado, fecha o arquivo e retorna 0
    fclose(arquivo);
    return 0;
}

// ==================== FUNÇÕES DE MANIPULAÇÃO ====================

/*
Função: criar_arquivo
Descrição: Cria um arquivo vazio se ele não existir
*/
void criar_arquivo() {
    FILE *arquivo;
    
    // Tenta abrir o arquivo em modo leitura
    arquivo = fopen(ARQUIVO, "r");
    
    // Se o arquivo não existe
    if (arquivo == NULL) {
        // Cria o arquivo em modo escrita
        arquivo = fopen(ARQUIVO, "w");
        
        if (arquivo == NULL) {
            printf("\n[ERRO] Não foi possível criar o arquivo!\n");
            return;
        }
        
        // Fecha o arquivo recém-criado
        fclose(arquivo);
        printf("\n[SUCESSO] Arquivo '%s' criado com sucesso!\n", ARQUIVO);
    } else {
        // O arquivo já existe
        fclose(arquivo);
        printf("\n[INFO] Arquivo '%s' já existe.\n", ARQUIVO);
    }
}

/*
Função: inserir_produto
Descrição: Insere um novo produto no arquivo com ID automático
*/
void inserir_produto() {
    FILE *arquivo;
    Produto novo;  // Estrutura para o novo produto
    
    printf("\n========== INSERIR NOVO PRODUTO ==========\n");
    
    // Solicita o nome do produto
    printf("Nome do produto: ");
    scanf(" %49[^\n]", novo.nome);
    
    // Verifica se já existe um produto com este nome
    if (produto_existe(novo.nome)) {
        printf("\n[ERRO] Produto '%s' já cadastrado! Não é possível cadastrar duplicatas.\n", novo.nome);
        return;
    }
    
    // Solicita a categoria
    printf("Categoria: ");
    scanf(" %29[^\n]", novo.categoria);
    
    // Solicita o preço
    printf("Preço: R$ ");
    scanf("%f", &novo.preco);
    
    // Gera automaticamente o próximo ID
    novo.id = obter_proximo_id();
    
    // Abre o arquivo em modo append (adicionar ao final)
    arquivo = fopen(ARQUIVO, "a");
    
    if (arquivo == NULL) {
        printf("\n[ERRO] Não foi possível abrir o arquivo!\n");
        return;
    }
    
    // Grava o produto no arquivo no formato: id|nome|categoria|preco
    fprintf(arquivo, "%d|%s|%s|%.2f\n", novo.id, novo.nome, novo.categoria, novo.preco);
    
    // Fecha o arquivo
    fclose(arquivo);
    
    printf("\n[SUCESSO] Produto cadastrado com ID: %d\n", novo.id);
}

/*
Função: listar_produtos
Descrição: Lista todos os produtos cadastrados em formato de tabela
*/
void listar_produtos() {
    FILE *arquivo;
    Produto p;  // Estrutura temporária para leitura
    int contador = 0;  // Contador de produtos
    
    printf("\n========== LISTA DE PRODUTOS ==========\n");
    
    // Abre o arquivo em modo leitura
    arquivo = fopen(ARQUIVO, "r");
    
    if (arquivo == NULL) {
        printf("\n[ERRO] Arquivo não encontrado ou vazio!\n");
        return;
    }
    
    // Imprime o cabeçalho da tabela
    printf("\n%-5s %-30s %-20s %10s\n", "ID", "NOME", "CATEGORIA", "PREÇO");
    printf("-----------------------------------------------------------------------\n");
    
    // Lê cada produto do arquivo e imprime na tabela
    while (fscanf(arquivo, "%d|%49[^|]|%29[^|]|%f\n", 
                  &p.id, p.nome, p.categoria, &p.preco) == 4) {
        printf("%-5d %-30s %-20s R$ %8.2f\n", p.id, p.nome, p.categoria, p.preco);
        contador++;
    }
    
    printf("-----------------------------------------------------------------------\n");
    printf("Total de produtos: %d\n", contador);
    
    // Fecha o arquivo
    fclose(arquivo);
}

/*
Função: buscar_por_nome
Descrição: Busca produtos por nome (case-insensitive, busca parcial)
*/
void buscar_por_nome() {
    FILE *arquivo;
    Produto p;
    char busca[50];           // String de busca
    char busca_lower[50];     // Busca em minúsculas
    char nome_lower[50];      // Nome do produto em minúsculas
    int encontrou = 0;        // Flag para indicar se encontrou produtos
    
    printf("\n========== BUSCAR PRODUTO POR NOME ==========\n");
    printf("Digite o nome (ou parte dele): ");
    scanf(" %49[^\n]", busca);
    
    // Converte a busca para minúsculas
    str_lower(busca_lower, busca);
    
    // Abre o arquivo
    arquivo = fopen(ARQUIVO, "r");
    
    if (arquivo == NULL) {
        printf("\n[ERRO] Arquivo não encontrado!\n");
        return;
    }
    
    printf("\n%-5s %-30s %-20s %10s\n", "ID", "NOME", "CATEGORIA", "PREÇO");
    printf("-----------------------------------------------------------------------\n");
    
    // Lê cada produto
    while (fscanf(arquivo, "%d|%49[^|]|%29[^|]|%f\n", 
                  &p.id, p.nome, p.categoria, &p.preco) == 4) {
        // Converte o nome do produto para minúsculas
        str_lower(nome_lower, p.nome);
        
        // Verifica se a busca está contida no nome (strstr busca substring)
        if (strstr(nome_lower, busca_lower) != NULL) {
            printf("%-5d %-30s %-20s R$ %8.2f\n", p.id, p.nome, p.categoria, p.preco);
            encontrou = 1;
        }
    }
    
    if (!encontrou) {
        printf("Nenhum produto encontrado com '%s'.\n", busca);
    }
    
    printf("-----------------------------------------------------------------------\n");
    
    fclose(arquivo);
}

/*
Função: buscar_por_categoria
Descrição: Busca produtos por categoria (case-insensitive)
*/
void buscar_por_categoria() {
    FILE *arquivo;
    Produto p;
    char busca[30];
    char busca_lower[30];
    char cat_lower[30];
    int encontrou = 0;
    
    printf("\n========== BUSCAR PRODUTO POR CATEGORIA ==========\n");
    printf("Digite a categoria: ");
    scanf(" %29[^\n]", busca);
    
    // Converte para minúsculas
    str_lower(busca_lower, busca);
    
    arquivo = fopen(ARQUIVO, "r");
    
    if (arquivo == NULL) {
        printf("\n[ERRO] Arquivo não encontrado!\n");
        return;
    }
    
    printf("\n%-5s %-30s %-20s %10s\n", "ID", "NOME", "CATEGORIA", "PREÇO");
    printf("-----------------------------------------------------------------------\n");
    
    // Lê e compara cada produto
    while (fscanf(arquivo, "%d|%49[^|]|%29[^|]|%f\n", 
                  &p.id, p.nome, p.categoria, &p.preco) == 4) {
        str_lower(cat_lower, p.categoria);
        
        // Verifica se a categoria contém a busca
        if (strstr(cat_lower, busca_lower) != NULL) {
            printf("%-5d %-30s %-20s R$ %8.2f\n", p.id, p.nome, p.categoria, p.preco);
            encontrou = 1;
        }
    }
    
    if (!encontrou) {
        printf("Nenhum produto encontrado na categoria '%s'.\n", busca);
    }
    
    printf("-----------------------------------------------------------------------\n");
    
    fclose(arquivo);
}

/*
Função: alterar_produto
Descrição: Altera os dados de um produto existente usando arquivo temporário
*/
void alterar_produto() {
    FILE *arquivo, *temp;  // Ponteiros para arquivo original e temporário
    Produto p;
    int id_busca;
    int encontrou = 0;
    
    printf("\n========== ALTERAR PRODUTO ==========\n");
    printf("Digite o ID do produto a alterar: ");
    scanf("%d", &id_busca);
    
    // Abre o arquivo original para leitura
    arquivo = fopen(ARQUIVO, "r");
    
    if (arquivo == NULL) {
        printf("\n[ERRO] Arquivo não encontrado!\n");
        return;
    }
    
    // Cria um arquivo temporário para escrita
    temp = fopen("temp.txt", "w");
    
    if (temp == NULL) {
        printf("\n[ERRO] Não foi possível criar arquivo temporário!\n");
        fclose(arquivo);
        return;
    }
    
    // Lê cada produto do arquivo original
    while (fscanf(arquivo, "%d|%49[^|]|%29[^|]|%f\n", 
                  &p.id, p.nome, p.categoria, &p.preco) == 4) {
        
        // Se for o produto a ser alterado
        if (p.id == id_busca) {
            encontrou = 1;
            
            printf("\nProduto encontrado:\n");
            printf("Nome: %s\n", p.nome);
            printf("Categoria: %s\n", p.categoria);
            printf("Preço: R$ %.2f\n", p.preco);
            printf("\n--- Digite os novos dados ---\n");
            
            // Solicita os novos dados
            printf("Novo nome: ");
            scanf(" %49[^\n]", p.nome);
            
            printf("Nova categoria: ");
            scanf(" %29[^\n]", p.categoria);
            
            printf("Novo preço: R$ ");
            scanf("%f", &p.preco);
            
            printf("\n[SUCESSO] Produto alterado!\n");
        }
        
        // Escreve o produto (alterado ou não) no arquivo temporário
        fprintf(temp, "%d|%s|%s|%.2f\n", p.id, p.nome, p.categoria, p.preco);
    }
    
    // Fecha ambos os arquivos
    fclose(arquivo);
    fclose(temp);
    
    if (!encontrou) {
        printf("\n[ERRO] Produto com ID %d não encontrado!\n", id_busca);
        remove("temp.txt");  // Remove o arquivo temporário
        return;
    }
    
    // Remove o arquivo original e renomeia o temporário
    remove(ARQUIVO);
    rename("temp.txt", ARQUIVO);
}

/*
Função: excluir_produto
Descrição: Exclui um produto do arquivo usando arquivo temporário
*/
void excluir_produto() {
    FILE *arquivo, *temp;
    Produto p;
    int id_busca;
    int encontrou = 0;
    
    printf("\n========== EXCLUIR PRODUTO ==========\n");
    printf("Digite o ID do produto a excluir: ");
    scanf("%d", &id_busca);
    
    // Abre o arquivo original
    arquivo = fopen(ARQUIVO, "r");
    
    if (arquivo == NULL) {
        printf("\n[ERRO] Arquivo não encontrado!\n");
        return;
    }
    
    // Cria arquivo temporário
    temp = fopen("temp.txt", "w");
    
    if (temp == NULL) {
        printf("\n[ERRO] Não foi possível criar arquivo temporário!\n");
        fclose(arquivo);
        return;
    }
    
    // Lê cada produto
    while (fscanf(arquivo, "%d|%49[^|]|%29[^|]|%f\n", 
                  &p.id, p.nome, p.categoria, &p.preco) == 4) {
        
        // Se for o produto a excluir, pula (não escreve no temporário)
        if (p.id == id_busca) {
            encontrou = 1;
            printf("\n[SUCESSO] Produto '%s' excluído!\n", p.nome);
            continue;  // Pula para o próximo produto
        }
        
        // Escreve os outros produtos no temporário
        fprintf(temp, "%d|%s|%s|%.2f\n", p.id, p.nome, p.categoria, p.preco);
    }
    
    fclose(arquivo);
    fclose(temp);
    
    if (!encontrou) {
        printf("\n[ERRO] Produto com ID %d não encontrado!\n", id_busca);
        remove("temp.txt");
        return;
    }
    
    // Substitui o arquivo original pelo temporário
    remove(ARQUIVO);
    rename("temp.txt", ARQUIVO);
}

// ==================== FUNÇÕES DE ORDENAÇÃO ====================

/*
Função: carregar_produtos
Descrição: Carrega todos os produtos do arquivo para um vetor na memória
Parâmetros:
   - lista: ponteiro para o vetor de produtos
Retorno: Número de produtos carregados
*/
int carregar_produtos(Produto *lista) {
    FILE *arquivo;
    int count = 0;  // Contador de produtos
    
    // Abre o arquivo
    arquivo = fopen(ARQUIVO, "r");
    
    if (arquivo == NULL) {
        return 0;
    }
    
    // Lê cada produto e armazena no vetor
    while (fscanf(arquivo, "%d|%49[^|]|%29[^|]|%f\n", 
                  &lista[count].id, lista[count].nome, 
                  lista[count].categoria, &lista[count].preco) == 4) {
        count++;
        
        // Verifica se atingiu o limite máximo
        if (count >= MAX_PRODUTOS) {
            break;
        }
    }
    
    fclose(arquivo);
    return count;
}

/*
Função: exibir_produtos
Descrição: Exibe os produtos do vetor em formato de tabela
Parâmetros:
  - lista: ponteiro para o vetor de produtos
  - total: número de produtos no vetor
*/
void exibir_produtos(Produto *lista, int total) {
    int i;
    
    printf("\n%-5s %-30s %-20s %10s\n", "ID", "NOME", "CATEGORIA", "PREÇO");
    printf("-----------------------------------------------------------------------\n");
    
    // Percorre o vetor e exibe cada produto
    for (i = 0; i < total; i++) {
        printf("%-5d %-30s %-20s R$ %8.2f\n", 
               lista[i].id, lista[i].nome, lista[i].categoria, lista[i].preco);
    }
    
    printf("-----------------------------------------------------------------------\n");
    printf("Total: %d produtos\n", total);
}

/*
Função: ordenar_nome_az
Descrição: Ordena produtos por nome (A-Z) usando Bubble Sort
*/
void ordenar_nome_az() {
    Produto lista[MAX_PRODUTOS];  // Vetor para armazenar produtos
    Produto temp;                  // Variável temporária para troca
    int total, i, j;
    char nome1_lower[50], nome2_lower[50];
    
    printf("\n========== ORDENAR POR NOME (A-Z) ==========\n");
    
    // Carrega todos os produtos do arquivo para o vetor
    total = carregar_produtos(lista);
    
    if (total == 0) {
        printf("\n[ERRO] Nenhum produto para ordenar!\n");
        return;
    }
    
    // Algoritmo Bubble Sort - percorre o vetor
    for (i = 0; i < total - 1; i++) {
        // Compara cada elemento com os seguintes
        for (j = 0; j < total - i - 1; j++) {
            // Converte ambos os nomes para minúsculas
            str_lower(nome1_lower, lista[j].nome);
            str_lower(nome2_lower, lista[j + 1].nome);
            
            // Se o nome atual é maior que o próximo (ordem alfabética)
            if (strcmp(nome1_lower, nome2_lower) > 0) {
                // Troca os produtos de posição
                temp = lista[j];
                lista[j] = lista[j + 1];
                lista[j + 1] = temp;
            }
        }
    }
    
    // Exibe os produtos ordenados
    exibir_produtos(lista, total);
}

/*
Função: ordenar_nome_za
Descrição: Ordena produtos por nome (Z-A) usando Bubble Sort
*/
void ordenar_nome_za() {
    Produto lista[MAX_PRODUTOS];
    Produto temp;
    int total, i, j;
    char nome1_lower[50], nome2_lower[50];
    
    printf("\n========== ORDENAR POR NOME (Z-A) ==========\n");
    
    total = carregar_produtos(lista);
    
    if (total == 0) {
        printf("\n[ERRO] Nenhum produto para ordenar!\n");
        return;
    }
    
    // Bubble Sort em ordem decrescente
    for (i = 0; i < total - 1; i++) {
        for (j = 0; j < total - i - 1; j++) {
            str_lower(nome1_lower, lista[j].nome);
            str_lower(nome2_lower, lista[j + 1].nome);
            
            // Inverte a comparação para ordem decrescente
            if (strcmp(nome1_lower, nome2_lower) < 0) {
                temp = lista[j];
                lista[j] = lista[j + 1];
                lista[j + 1] = temp;
            }
        }
    }
    
    exibir_produtos(lista, total);
}

/*
Função: ordenar_preco_menor_maior
Descrição: Ordena produtos por preço (menor para maior) usando Bubble Sort
*/
void ordenar_preco_menor_maior() {
    Produto lista[MAX_PRODUTOS];
    Produto temp;
    int total, i, j;
    
    printf("\n========== ORDENAR POR PREÇO (MENOR → MAIOR) ==========\n");
    
    total = carregar_produtos(lista);
    
    if (total == 0) {
        printf("\n[ERRO] Nenhum produto para ordenar!\n");
        return;
    }
    
    // Bubble Sort comparando preços
    for (i = 0; i < total - 1; i++) {
        for (j = 0; j < total - i - 1; j++) {
            // Se o preço atual é maior que o próximo
            if (lista[j].preco > lista[j + 1].preco) {
                // Troca os produtos
                temp = lista[j];
                lista[j] = lista[j + 1];
                lista[j + 1] = temp;
            }
        }
    }
    
    exibir_produtos(lista, total);
}

/*
Função: ordenar_preco_maior_menor
Descrição: Ordena produtos por preço (maior para menor) usando Bubble Sort
*/
void ordenar_preco_maior_menor() {
    Produto lista[MAX_PRODUTOS];
    Produto temp;
    int total, i, j;
    
    printf("\n========== ORDENAR POR PREÇO (MAIOR → MENOR) ==========\n");
    
    total = carregar_produtos(lista);
    
    if (total == 0) {
        printf("\n[ERRO] Nenhum produto para ordenar!\n");
        return;
    }
    
    // Bubble Sort em ordem decrescente de preço
    for (i = 0; i < total - 1; i++) {
        for (j = 0; j < total - i - 1; j++) {
            // Inverte a comparação para ordem decrescente
            if (lista[j].preco < lista[j + 1].preco) {
                temp = lista[j];
                lista[j] = lista[j + 1];
                lista[j + 1] = temp;
            }
        }
    }
    
    exibir_produtos(lista, total);
}

/*
Função: exportar_csv
Descrição: Exporta todos os produtos para um arquivo CSV
*/
void exportar_csv() {
    FILE *arquivo_txt, *arquivo_csv;
    Produto p;
    int contador = 0;
    
    printf("\n========== EXPORTAR PARA CSV ==========\n");
    
    // Abre o arquivo de texto
    arquivo_txt = fopen(ARQUIVO, "r");
    
    if (arquivo_txt == NULL) {
        printf("\n[ERRO] Arquivo de produtos não encontrado!\n");
        return;
    }
    
    // Cria o arquivo CSV
    arquivo_csv = fopen(ARQUIVO_CSV, "w");
    
    if (arquivo_csv == NULL) {
        printf("\n[ERRO] Não foi possível criar o arquivo CSV!\n");
        fclose(arquivo_txt);
        return;
    }
    
    // Escreve o cabeçalho do CSV
    fprintf(arquivo_csv, "ID,Nome,Categoria,Preco\n");
    
    // Função auxiliar para imprimir campo CSV corretamente
    auto void print_csv_field(FILE *f, const char *field) {
        int needs_quotes = 0;
        const char *ptr = field;
        while (*ptr) {
            if (*ptr == ',' || *ptr == '"' || *ptr == '\n' || *ptr == '\r') {
                needs_quotes = 1;
                break;
            }
            ptr++;
        }
        if (!needs_quotes) {
            fprintf(f, "%s", field);
        } else {
            fputc('"', f);
            ptr = field;
            while (*ptr) {
                if (*ptr == '"')
                    fputc('"', f); // double the quote
                fputc(*ptr, f);
                ptr++;
            }
            fputc('"', f);
        }
    }
    
    // Lê cada produto e escreve no CSV
    while (fscanf(arquivo_txt, "%d|%49[^|]|%29[^|]|%f\n", 
                  &p.id, p.nome, p.categoria, &p.preco) == 4) {
        fprintf(arquivo_csv, "%d,", p.id);
        print_csv_field(arquivo_csv, p.nome);
        fputc(',', arquivo_csv);
        print_csv_field(arquivo_csv, p.categoria);
        fprintf(arquivo_csv, ",%.2f\n", p.preco);
        contador++;
    }
    
    if (fclose(arquivo_txt) != 0) {
        printf("\n[ERRO] Falha ao fechar o arquivo de produtos!\n");
    }
    if (fclose(arquivo_csv) != 0) {
        printf("\n[ERRO] Falha ao fechar o arquivo CSV!\n");
    }
    printf("\n[SUCESSO] %d produtos exportados para '%s'\n", contador, ARQUIVO_CSV);
}

// ==================== MENU PRINCIPAL ====================

/*
Função: exibir_menu
Descrição: Exibe o menu principal do sistema
*/
void exibir_menu() {
    printf("\n");
    printf("╔════════════════════════════════════════════════════════╗\n");
    printf("║       SISTEMA DE GERENCIAMENTO DE PRODUTOS - LOJA     ║\n");
    printf("╠════════════════════════════════════════════════════════╣\n");
    printf("║  1  - Criar arquivo                                    ║\n");
    printf("║  2  - Inserir produto                                  ║\n");
    printf("║  3  - Listar todos os produtos                         ║\n");
    printf("║  4  - Buscar produto por nome                          ║\n");
    printf("║  5  - Buscar produto por categoria                     ║\n");
    printf("║  6  - Alterar produto                                  ║\n");
    printf("║  7  - Excluir produto                                  ║\n");
    printf("║  8  - Ordenar por nome (A-Z)                           ║\n");
    printf("║  9  - Ordenar por nome (Z-A)                           ║\n");
    printf("║  10 - Ordenar por preço (menor → maior)                ║\n");
    printf("║  11 - Ordenar por preço (maior → menor)                ║\n");
    printf("║  12 - Exportar para CSV                                ║\n");
    printf("║  0  - Sair                                             ║\n");
    printf("╚════════════════════════════════════════════════════════╝\n");
    printf("\nEscolha uma opção: ");
}

/*
Função: main
Descrição: Função principal que controla o fluxo do programa
*/
int main() {
    int opcao;  // Armazena a opção escolhida pelo usuário
    
    // Loop infinito até o usuário escolher sair
    do {
        exibir_menu();
        scanf("%d", &opcao);
        
        // Estrutura switch para executar a função correspondente
        switch (opcao) {
            case 1:
                criar_arquivo();
                break;
            case 2:
                inserir_produto();
                break;
            case 3:
                listar_produtos();
                break;
            case 4:
                buscar_por_nome();
                break;
            case 5:
                buscar_por_categoria();
                break;
            case 6:
                alterar_produto();
                break;
            case 7:
                excluir_produto();
                break;
            case 8:
                ordenar_nome_az();
                break;
            case 9:
                ordenar_nome_za();
                break;
            case 10:
                ordenar_preco_menor_maior();
                break;
            case 11:
                ordenar_preco_maior_menor();
                break;
            case 12:
                exportar_csv();
                break;
            case 0:
                printf("\n[INFO] Encerrando o sistema...\n");
                printf("Até logo!\n\n");
                break;
            default:
                printf("\n[ERRO] Opção inválida! Tente novamente.\n");
        }
        
        // Pausa para o usuário ler a mensagem antes de voltar ao menu
        if (opcao != 0) {
            printf("\nPressione ENTER para continuar...");
            getchar();  // Limpa o buffer
            getchar();  // Aguarda o ENTER
        }
        
    } while (opcao != 0);  // Continua até o usuário escolher sair
    
    return 0;  // Retorna 0 indicando execução bem-sucedida
}
