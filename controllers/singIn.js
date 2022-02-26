

const handleSingIn = (db , bcryptNodejs) => (req, res) =>{
    const { email, password } = req.body;

    if(!email || !password){
      return  req.status(400).json('incorrect form submission');
    }

    db.select('email', 'hash').from('login')
    .where('email' ,'=' , email)
    .then(data => {

        const isAllow = bcryptNodejs.compareSync(password, data[0].hash)
        
        if(isAllow) {
            return db.select('*').from('users')
            .where('email' ,'=' , email)
            .then(data => res.json(data[0]))
        }else {
            throw new Error('Invalid data')
        }

      
    })
    .catch(err => res.status(400).json(err.message))



}


module.exports = {
    handleSingIn:handleSingIn
}