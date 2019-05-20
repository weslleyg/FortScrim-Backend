const Torneios = require('../models/torneios');

class TorneioController {
	async post(req, res) {
		try {
			const torneio = await Torneios.create({
				user: req.userId,
				...req.body
			});

			await req.io.emit('torneio', torneio);

			return res.json({
				torneio
			});
		} catch (err) {
			return res.status(400).send({ error: 'Erro ao cadastrar' });
		}
	}
	async getOne(req, res) {
		try {
			const torneio = await Torneios.findById(req.params.id).populate('user');

			return res.json(torneio);
		} catch (err) {
			return res.status(400).send({ error: 'Não encontrado' });
		}
	}
	async getAll(req, res) {
		try {
			const torneio = await Torneios.find(req.body).populate('user').setOptions({
				sort: {
					createdAt: -1
				}
			});

			return res.json(torneio);
		} catch (err) {
			return res.status(400).send({ error: 'Não encontrado' });
		}
	}
	async update(req, res) {
		try {
			const torneio = await Torneios.findById(req.params.id);

			await torneio.updateOne(req.body);

			res.status(200).send({ message: 'Atualizado com sucesso!' });
		} catch (err) {
			return res.status(400).send({ error: 'Erro ao editar' });
		}
	}
	async del(req, res) {
		try {
			await Torneios.findByIdAndDelete(req.params.id);

			res.status(200).send({ message: 'Deletado com sucesso!' });
		} catch (err) {
			return res.status(400).send({ error: 'Erro ao deletar' });
		}
	}
}

module.exports = new TorneioController();
