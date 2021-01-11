const data = require('./data2.json')
const DbManager = require('./DbManager')

const dbManager = new DbManager()

const addCRMRecordToDB = async function(client){
    return dbManager.saveClient(client)
}

const transferDataToCRMTable = async function(){
    for(let i=0; i<data.length; i++){
        await addCRMRecordToDB(data[i])
    }
}

transferDataToCRMTable()

