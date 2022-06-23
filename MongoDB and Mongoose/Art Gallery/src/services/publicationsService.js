const {Publication} = require('../models/Publication');

async function create({title,paintingTechnique,artPicture,certificateOfAuthenticity}) {
    if(!title || !paintingTechnique || !artPicture || !certificateOfAuthenticity) {
        throw new Error('All fields must be filled!');
    }

    title = title.trim();
    paintingTechnique = paintingTechnique.trim();
    artPicture = artPicture.trim();
    certificateOfAuthenticity = certificateOfAuthenticity.trim().toLowerCase();

    await Publication.create({title,paintingTechnique,artPicture,certificateOfAuthenticity});
}

module.exports = {
    create
}