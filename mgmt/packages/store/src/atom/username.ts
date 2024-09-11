
import {atom} from 'recoil'

export const userName = atom<string>({
    key : 'userName',
    default : ""
})