import bcryptjs from "bcryptjs";

const users = [
    {
        name: 'Minhaj',
        email: 'minhaj@gmail.com',
        password: bcryptjs.hashSync('1234', 10),
        isAdmin: true
    },
    {
        name: 'Mujahid',
        email: 'mujahid@gmail.com',
        password: bcryptjs.hashSync('1234', 10),
    },
    {
        name: 'Ruma',
        email: 'ruma@gmail.com',
        password: bcryptjs.hashSync('1234', 10),
    },
]

export default users