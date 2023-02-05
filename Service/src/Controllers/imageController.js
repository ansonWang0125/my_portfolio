const db = require("../Model");
require('dotenv').config()

const Image = db.image;

const uploadImage = async (req, res) => {
    try {
        console.log('upload req file: ', req.file)
        console.log('req body: ', req.body)
        if (req.file !== undefined) {
            const data = {
                data: req.file.buffer,
                articleID: req.body.articleID,
                originalname: req.file.originalname
            };
            const sameNameImage = await Image.findOne({
                where: {
                    originalname: req.file.originalname
                }});
    
            console.log('data: ', data)
            if ( !sameNameImage ) {
                const image = await Image.create(data);
            
                if (image) {
                    console.log('id',image.id)
                    return res.status(201).send({success:true,id: image.id});
                } else {
                    return res.status(201).send({success:false, message: 'Something went wrong', id: -1});
                }
            } else {
                return res.status(201).send({success:false, message: 'Has Same Name Image', id: sameNameImage.id});
            }
        }

    }catch (err) {
        console.log('upload error');
        console.log(err);
    }
}

const getImage = async (req, res) => {
    try {
        console.log( req.params.id)
        const image = await Image.findOne({
            where: {
                id: req.params.id
            }});
        if (image) {
            return res.status(201).send({success:true,image: image.data});
        } else {
            return res.status(201).send({success:false, message: 'Error ID'});
        }
        
    }catch (err) {
        console.log('get error');
        console.log(err);
    }
}

module.exports = {
    uploadImage,
    getImage
}