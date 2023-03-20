import { atom } from 'recoil'

const tableState = atom({
    key: 'tableState',
    default: {
        data: {
            year: 0,
            class: 0,
        },
    },
})

export default tableState
