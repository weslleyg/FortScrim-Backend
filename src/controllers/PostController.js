const Post = require('../models/post');

class PostController {
	async post(req, res) {
		try {
			const post = await Post.create({ user: req.userId, ...req.body });

			await req.io.emit('post', post);

			return res.json(post);
		} catch (err) {
			return res.status(400).send({ error: 'Erro ao criar o post' });
		}
	}
	async getOne(req, res) {
		try {
			const post = await Post.findById(req.params.id).populate('user');

			return res.json(post);
		} catch (err) {
			return res.status(400).send({ error: 'Não encontrado' });
		}
	}
	async getAll(req, res) {
		try {
			const post = await Post.find(req.body).populate('user').setOptions({
				sort: {
					createdAt: -1
				}
			});

			return res.json(post);
		} catch (err) {
			return res.status(400).send({ error: 'Não encontrado' });
		}
	}
	async update(req, res) {
		try {
			const post = await Post.findById(req.params.id);

			await post.updateOne(req.body);

			res.status(200).send({ message: 'Atualizado com sucesso!' });
		} catch (err) {
			return res.status(400).send({ error: 'Erro ao editar' });
		}
	}
	async del(req, res) {
		try {
			await Post.findByIdAndDelete(req.params.id);

			res.status(200).send({ message: 'Deletado com sucesso!' });
		} catch (err) {
			return res.status(400).send({ error: 'Erro ao deletar' });
		}
	}
}

module.exports = new PostController();
