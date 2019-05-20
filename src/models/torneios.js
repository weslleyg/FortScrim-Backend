const mongoose = require('mongoose');
const shortid = require('shortid');

const Torneios = new mongoose.Schema(
	{
		_id: {
			type: String,
			default: shortid.generate
		},
		name: {
			type: String,
			required: true
		},
		plataforma: {
			type: String,
			required: true
		},
		modo: {
			type: String,
			required: true
		},
		vagas: {
			type: String,
			required: true
		},
		dataJogo: {
			type: String,
			required: true
		},
		link: {
			type: String,
			unique: true,
			required: true
		},
		taxa: {
			type: String,
			required: true
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Torneios', Torneios);
