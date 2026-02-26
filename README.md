# Fuel & Flow ⚡

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

**Fuel & Flow** é um dashboard pessoal de biohacking e performance, projetado para otimizar seus treinos, nutrição e bem-estar através de uma interface elegante e interativa. O sistema cruza dados de treinos semanais com estados de humor, nutrição e ambiente (vibes musicais) para fornecer uma experiência completa de acompanhamento.

## 🎯 Funcionalidades

- **Seletor de Treinos Interativo**: Escolha entre Push, Pull, Legs, Rest e Cardio
- **Status de Energia Dinâmico**: Cada treino tem seu próprio nível de esforço
- **Sugestões de Nutrição**: Refeições pré e pós-treino personalizadas
- **Vibe Integration**: Playlists e gêneros musicais sugeridos para cada tipo de treino
- **Progresso Semanal**: Acompanhamento visual com streak de dias consecutivos
- **Player de Música Simulado**: Controles interativos dentro do dashboard
- **Tracker de Água**: Monitore sua hidratação durante o dia
- **Checklists Interativos**: Marque refeições como concluídas
- **Design Responsivo**: Funciona perfeitamente em mobile, tablet e desktop

## 🚀 Tecnologias Utilizadas

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Estado**: React Hooks (useState, useEffect)

## 📦 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/fuel-and-flow.git
   cd fuel-and-flow
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o Tailwind CSS** (se necessário)
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

4. **Execute o projeto**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador**
   ```
   http://localhost:3000
   ```

## 📁 Estrutura do Projeto

```
fuel-and-flow/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── types.ts
│   │   │   ├── constants.ts
│   │   │   ├── workout-selector.tsx
│   │   │   ├── energy-card.tsx
│   │   │   ├── nutrition-card.tsx
│   │   │   ├── vibe-card.tsx
│   │   │   └── progress-card.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib/
│       └── utils.ts
├── public/
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── package.json
├── README.md
└── LICENSE
```

## 🎨 Personalização

### Cores por Tipo de Treino

| Treino | Cor | Gradiente |
|--------|-----|-----------|
| Push | Vermelho (#ef4444) | `from-red-500/20 to-orange-500/20` |
| Pull | Azul (#3b82f6) | `from-blue-500/20 to-purple-500/20` |
| Legs | Roxo (#a855f7) | `from-purple-500/20 to-pink-500/20` |
| Rest | Verde (#22c55e) | `from-green-500/20 to-emerald-500/20` |
| Cardio | Amarelo (#eab308) | `from-yellow-500/20 to-orange-500/20` |

### Adicionando Novos Treinos

1. Adicione o tipo no arquivo `types.ts`
2. Configure os dados no `constants.ts`
3. Adicione o ícone correspondente no `workout-selector.tsx`

## 🖥️ Uso

### Selecionando um Treino
Clique nos botões do seletor para mudar o treino do dia. Todos os cards serão atualizados automaticamente com informações específicas.

### Marcando Progresso
Clique nos círculos do progresso semanal para marcar dias como concluídos. O streak é calculado automaticamente.

### Player de Música
No card Vibe-Hub, você pode:
- ▶️ Play/Pause
- ⏮️⏭️ Navegar entre músicas
- 🔊 Ajustar volume
- 📋 Ver playlist completa

### Tracker de Água
No card Nutrition, clique no ícone de gota para abrir o tracker de hidratação.

## 🤝 Contribuição

Contribuições são bem-vindas! Siga os passos:

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Seu Nome
- GitHub: [@graxyzr](https://github.com/graxyzr)
- LinkedIn: [Greice Pereira](https://www.linkedin.com/in/greice-pereira-b04a04318/)

## 🙏 Agradecimentos

- [Tailwind CSS](https://tailwindcss.com/) pela excelente ferramenta de estilização
- [Lucide](https://lucide.dev/) pelos ícones incríveis
- [Next.js](https://nextjs.org/) pelo framework poderoso

## 📊 Roadmap

- [ ] Integração com APIs reais de música (Spotify, Apple Music)
- [ ] Banco de dados para persistência de dados
- [ ] Autenticação de usuários
- [ ] Compartilhamento de treinos
- [ ] Modo competitivo com amigos
- [ ] Integração com wearables (Apple Watch, Garmin)
- [ ] Relatórios detalhados de performance
- [ ] Modo offline com PWA

---