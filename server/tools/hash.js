var bcrypt = require('bcryptjs');


export const hashString = async (password) => {
    let hash_pass = await bcrypt.hash(password, 10);
    return hash_pass
}


