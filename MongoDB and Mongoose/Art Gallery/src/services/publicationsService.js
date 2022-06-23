const {Publication} = require('../models/Publication');

async function create({title,paintingTechnique,artPicture,certificateOfAuthenticity}, {_id}) {
    if(!title || !paintingTechnique || !artPicture || !certificateOfAuthenticity) {
        throw new Error('All fields must be filled!');
    }

    title = title.trim();
    paintingTechnique = paintingTechnique.trim();
    artPicture = artPicture.trim();
    certificateOfAuthenticity = certificateOfAuthenticity.trim().toLowerCase();

    await Publication.create({title,paintingTechnique,artPicture,certificateOfAuthenticity,author : _id});
}

async function getAll() {
    let publications = await Publication.find().lean();

    return publications;
}


async function getById({publicationId}) {
    if(!publicationId) {
        throw new Error('Invalid Publication')
    }

    let publication = await Publication.findById({_id : publicationId}).populate('author').lean();

    console.log(publication);

    if(!publication) {
        throw new Error('Invalid Publication')
    }

    return publication;
}

module.exports = {
    create,
    getAll,
    getById
}