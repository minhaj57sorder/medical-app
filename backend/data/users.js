import bcryptjs from "bcryptjs";

const users = [
    {
        name: 'Minhaj',
        email: 'niloy@gmail.com',
        password: bcryptjs.hashSync('1234', 10),
        isAdmin: true
    }
]

export default users