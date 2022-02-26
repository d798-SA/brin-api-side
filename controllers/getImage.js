
const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '809d9ee6fbca4d40a5165553e917984d'
});



//this.state.UserInput
const handleApiCall = (req, res) => {
    app.models
    .predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.UserInput
    )
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to work with API'))
}


const handleGetImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where(`id`, `=`, id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries)
        })
        .catch(err => {
            res.status(400).json(`unable to get count or entries!`)
        })
}

module.exports = {
    handleGetImage: handleGetImage,
    handleApiCall:handleApiCall
}