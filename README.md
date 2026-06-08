# 🌿 Calculadora de Emissão de CO₂

Uma aplicação web desenvolvida durante o **Bootcamp da DIO**, com o apoio do **GitHub Copilot**, para calcular a emissão de dióxido de carbono (CO₂) em deslocamentos entre cidades brasileiras.

O projeto permite comparar diferentes meios de transporte, estimar a emissão de gases de efeito estufa e calcular a quantidade de créditos de carbono necessária para compensar o impacto ambiental da viagem.

## 🚀 Demonstração

Acesse o projeto:

> (https://polyanalima.github.io/CalculadoraCO2/)

## 📋 Funcionalidades

- Busca de rotas entre cidades brasileiras
- Preenchimento automático da distância
- Inserção manual da distância quando necessário
- Cálculo da emissão de CO₂ por meio de transporte
- Comparação entre diferentes modais
- Cálculo de economia de emissões
- Estimativa de créditos de carbono necessários
- Estimativa de custo para compensação ambiental
- Interface responsiva
- Deploy automático via GitHub Pages

## 🚲 Modais de Transporte

O cálculo considera os seguintes fatores de emissão:

| Transporte | Emissão (kg CO₂/km) |
|------------|---------------------|
| 🚲 Bicicleta | 0 |
| 🚗 Carro | 0.12 |
| 🚌 Ônibus | 0.089 |
| 🚚 Caminhão | 0.96 |

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Git
- GitHub
- GitHub Actions
- GitHub Pages
- GitHub Copilot

## 📂 Estrutura do Projeto

```text
CalculadoraCO2/
│
├── css/
│   └── style.css
│
├── js/
│   ├── routes-data.js
│   ├── config.js
│   ├── calculator.js
│   ├── ui.js
│   └── app.js
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── index.html
└── README.md
```

## ⚙️ Como Executar Localmente

1. Clone o repositório:

```bash
git clone https://github.com/polyanalima/CalculadoraCO2.git
```

2. Acesse a pasta do projeto:

```bash
cd CalculadoraCO2
```

3. Abra o arquivo `index.html` no navegador.

Não é necessário instalar dependências ou executar build.

## 🌱 Créditos de Carbono

A aplicação estima a quantidade de créditos de carbono necessários para compensar a emissão gerada pela viagem.

Para fins educacionais, foi utilizada a seguinte referência:

- 1 crédito de carbono = 1000 kg de CO₂

Além disso, é apresentada uma estimativa de valor para compensação ambiental.

## 🎯 Objetivos de Aprendizagem

Este projeto foi desenvolvido para praticar:

- Estruturação semântica com HTML5
- Estilização moderna com CSS3
- Manipulação do DOM
- Modularização em JavaScript
- Organização de código utilizando objetos globais
- Consumo e tratamento de dados locais
- Deploy automatizado com GitHub Actions
- Utilização do GitHub Copilot como ferramenta de produtividade

## 💡 Sobre o Projeto

Este projeto foi desenvolvido durante o **Bootcamp da DIO (Digital Innovation One)** como exercício prático de desenvolvimento front-end e integração com ferramentas de IA para programação.

Grande parte da implementação foi construída com auxílio do **GitHub Copilot**, explorando boas práticas de desenvolvimento e automação de tarefas.

## ❤️ Autora

**Polyana Lima**

Desenvolvido com ❤️ durante o Bootcamp da DIO.

---

### 📜 Licença

Este projeto foi desenvolvido para fins educacionais.
