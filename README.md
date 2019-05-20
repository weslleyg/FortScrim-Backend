# FortScrim - Backend

Backend em NodeJS de um site de e-sports do jogo fortnite para postar torneios , desenvolvido em ``Node.js e ReactJS``.

## Scripts disponíveis

```bash
NPM START ou YARN START
```
Inicia o servidor node.js na porta 3333

```bash
NPM DEV ou YARN DEV
```
Inicia o servidor com o nodemon para desenvolvimento

## MongoDB

No arquivo ``src/server.js``

```javascript
mongoose.connect('INSIRA SUA URL', {
	useNewUrlParser: true,
	useCreateIndex: true
});
```

## Contribuições

Pull requests são bem-vindos. Para mudanças importantes, por favor, abra uma issue primeiro para discutir o que você gostaria de mudar.