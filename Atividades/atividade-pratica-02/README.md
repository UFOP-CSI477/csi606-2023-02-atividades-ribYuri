# Atividade prática 2

## Tecnologias utilizadas

Para o desenvolvimento foram utilizados O React + [Vite](https://vitejs.dev/guide/), as bibliotecas sass para estilização e axios para comunicação com o [servidor backend](https://github.com/UFOP-CSI477/csi606-2023-02-atividades-ribYuri/tree/master/Atividades/atividade-pratica-01). Para formatação, extensão Prettier.

## Instalação

Para começar basta clonar o projeto para sua máquina e excutar `npm install` no terminal para instalar as devidas dependências.
(necessário [node](https://nodejs.org/en) instalado)

## Configuração

O projeto não precisa de nenhuma configuração caso seja utilizado com servidor backend [aqui disponível](https://github.com/UFOP-CSI477/csi606-2023-02-atividades-ribYuri/tree/master/Atividades/atividade-pratica-01).

Caso deseje trocar a rota de acesso ao servidor basta acessar `src > services > api.js` e então trocar a rota localizada em `baseURL`.

OBS: caso utilize um backend diferente do disponibilizado, se atente aos objetos de response esperados pelo front.
Como por exemplo o response esperado para locais de coleta:

```
{
        "id": 1,
        "nome": "NomeLocal",
        "rua": "Rua",
        "numero": "11",
        "complemento": "complemento",
        "cidade": {
            ...
            "estado": {...}
        },
        ...
    },
```

Considere objetos aninhados para as relações que podem ser consultadas no [diagrama do banco](https://github.com/UFOP-CSI477/csi606-2023-02-atividades-ribYuri/blob/master/Atividades/atividade-pratica-01/CSI606-sistema-doacao-sangue.png)

## Rodando o projeto

Para executar o projeto basta agora inicializar o servidor backend e então no terminal executar `npm run dev`. A rota do servidor será mostrada no terminal. Por fim basta abrir no navegador.
