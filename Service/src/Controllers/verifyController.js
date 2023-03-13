require('dotenv').config()

const verify = async (req, res) => {
    try {
        const password = req.body.password
        const success = password===process.env.verifyPassword
        return res.status(201).send({success});
    }catch (err) {
        console.log('verify error');
        console.log(err);
    }

}

module.exports = {
    verify
}