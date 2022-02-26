


const handleRegister = (db , bcryptNodejs) => (req, res) => {
    const { email, name, password } = req.body;
    if(!email || !name || !password){
      return  req.status(400).json('incorrect form submission');
    }
    const hash = bcryptNodejs.hashSync(password);


    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                    .returning('*')
                    .insert({
                        name:name,
                        email:loginEmail[0].email,
                        joined: new Date()
                    })
                    .then(response => res.json(response[0]))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json(`err in ${err.message}`));

}


module.exports = {
    handleRegister: handleRegister
}