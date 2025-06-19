![image](https://github.com/user-attachments/assets/ff023adb-e1c2-49c0-baa4-0985433bd921)

https://dvalenascimento.github.io/singplay/

# 🎤 SingPlay

**SingPlay** é um aplicativo web de letras e reprodução de músicas, desenvolvido com HTML, CSS e JavaScript puro. Ele permite ao usuário **buscar músicas**, **ouvir o áudio** e **visualizar a letra sincronizada**, mesmo **offline**, graças ao suporte de Service Worker.

---

## 📦 Funcionalidades

- 🎧 Reproduz áudios `.mp3` armazenados localmente
- 🎤 Exibe letras formatadas com rolagem automática
- 🔍 Busca por nome da música ou artista
- 📱 Design responsivo (mobile e desktop)
- 📡 Suporte offline via cache local
- 💾 Pode ser instalado como um PWA

---

## 📁 Estrutura do Projeto

```

/singplay
├── index.html                # Página principal
├── css/
│   └── styles.css            # Estilos da interface
├── js/
│   └── script.js             # Lógica da aplicação
├── songs/
│   └── songs.js              # Base de dados de letras
├── audios/
│   └── audios.js             # Base de dados de áudios
├── img/
│   └── singplaylogo.png      # Logomarca do app
├── service-worker.js         # Cache offline
└── manifest.json             # Configuração PWA

````

---

## 🚀 Como usar

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/singplay.git
````

2. Hospede os arquivos localmente ou ative o GitHub Pages.
3. Acesse `index.html` pelo navegador.
4. O Service Worker será registrado automaticamente.

---

## 📱 Compatibilidade

* Funciona nos principais navegadores modernos (Chrome, Edge, Firefox)
* Compatível com Android e iOS via navegador
* Instalação como app (PWA) disponível

---

## 🛠 Tecnologias Utilizadas

* HTML5
* CSS3 (Flexbox, Media Queries)
* JavaScript Vanilla (DOM, eventos, cache)
* Font Awesome
* Service Workers + Cache API

---

## 🖼 Imagens da Interface

![image](https://github.com/user-attachments/assets/f7b5b477-4e52-4b20-a489-5115994b00bd)

![image](https://github.com/user-attachments/assets/f7b5b477-4e52-4b20-a489-5115994b00bd)

---

## 📃 Licença

Este projeto é de uso livre e pode ser adaptado ou expandido conforme necessário.

---

## ✨ Autor

Desenvolvido por **Diego Vale do Nascimento**

---

````

---

### ✅ Próximo passo:
- Salve este conteúdo como `README.md` na raiz do repositório.
- Suba para o GitHub com:

```bash
git add README.md
git commit -m "Adiciona documentação do projeto"
git push origin main
````

