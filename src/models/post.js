const mongoose = require('mongoose');

const Post = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true
		},
		description: {
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		},
		slug: {
			type: String,
			required: [ true, 'O slug é obrigatório' ],
			trim: true,
			index: true,
			unique: true
		},
		tags: [
			{
				type: String,
				require: true
			}
		],
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Post', Post);
