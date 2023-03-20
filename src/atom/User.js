import { atom } from 'recoil'

const userState = atom({
    key: 'userState',
    default: {
        name: '',
        email: '',
        uuid: '',
    },
})