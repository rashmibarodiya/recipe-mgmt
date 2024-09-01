

import mongoose from 'mongoose'

export async function connect() {
    try{
const mongId = process.env.MONG!
console.log(mongId)
    }catch(e){
console.error("error occured "+ e)
    }
}