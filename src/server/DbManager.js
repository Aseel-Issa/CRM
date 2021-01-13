
const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:1234@localhost/CRM')

class DbManager{

    constructor(){
    }

    async getEmployeeId(employeeName){
        // assuming that the name of the employee is unique
        const result = await sequelize.query(`SELECT id FROM Employees WHERE name = '${employeeName}'`)
        if(result[0][0]){
            return result[0][0].id
        }
        return null
    }

    async saveEmployee(employeeName){
        const ownerId = await this.getEmployeeId(employeeName)
        if (ownerId != null){
            return ownerId
        }
        try{
            const result = await sequelize.query(`INSERT INTO Employees VALUES(null, '${employeeName}')`)
            return result[0]
        }catch(e){
            console.log(e)
            return null
        }
    }

    async getCountryId(country){
        // assuming that the name of the country is unique
        const result = await sequelize.query(`SELECT id FROM Country WHERE name = '${country}'`)
        if(result[0][0]){
            return result[0][0].id
        }
        return null
    }

    async saveCountry(country){
        const countryId = await this.getCountryId(country)
        if (countryId != null){
            return countryId
        }
        try{
            const result = await sequelize.query(`INSERT INTO Country VALUES(null, '${country}')`)
            return result[0]
        }catch(e){
            console.log(e)
            return null
        }
        
    }

    //recieves an object with the following fromat:
    // {
    //     long_id: String,
    //     name: String,
    //     email: String,
    //     firstContact: DATE,
    //     emailType: CHAR,
    //     sold: BOOLEAN,
    //     owner: INT,
    //     country: INT, 
    // }
    async saveClient(client){
        // @TODO saving employee and country should run in parallel
        const owner = await this.saveEmployee(client.owner)
        const country = await this.saveCountry(client.country)
        let cols = '(id, '
        let values = 'VALUES(null, '
        for (const key in client) {
            switch(key){
                case 'owner': values+=owner +", "
                            cols+=`${key}, `
                            continue
                case 'country': values+=country+ ", "
                                cols+=`${key}, `   
                                continue
                case '_id': cols+=`long_id, `
                    break
                default: cols+=`${key}, `
            }
            if(client[key] == null){
                values+='null, '
            }else{
                if(key == 'firstContact'){
                    values+= `'${client[key].substring(0,10)}', `
                }else if(key == 'sold'){
                    values+=`${+client[key]}, `
                }else{
                    values+=`'${client[key]}', `
                }
            }
        }
        values = values.substring(0, values.length-2) + ')'
        const query = 'INSERT INTO Clients ' + cols.substring(0, cols.length-2) + ') '+ values
        console.log(query)
        try{
            const result = await sequelize.query(query)//`INSERT INTO Clients VALUES(null, '${client._id}','${client.name}', '${client.email}', '${client.firstContact.substring(0,9)}', '${client.emailType}', ${client.sold}, ${owner}, ${country})`)
            return true
        }catch(e){
            console.log('Error: Record of client with id: '+client._id+' was not saved to database')
            console.log(e)
            return false
        }
    }
    
    // client object should have an id
    // attributes that can be updated in this method are: owner, sold, emailType only and once at a time
    async updateClient(client){
        let field
        let value
        if(client.owner){
            field = "owner"
            const employeeId = await this.getEmployeeId(client.owner)
            if(employeeId == null){
                console.log('Error: This owner does not exist')
                return
            }
            value = employeeId
        }else if(client.sold){
            field = 'sold'
            value = +client.sold
        }else if(client.emailType){
            field = "emailType"
            value = `'${client.emailType}'`
        }

        let query = `UPDATE Clients SET ${field} = ${value} WHERE id = ${client.id}`
        try{
            const result = await sequelize.query(query)
            return true
        }catch(e){
            console.log('Error: Record of client with id: '+client._id+' was not updated into the database')
            console.log(e)
            return false
        }
    }

    async getAllClients() {
        try{
            const result = await sequelize.query(`SELECT cl.id, cl.name, cl.email, cl.firstContact, cl.emailType, cl.sold, e.name as owner, co.name as country `
            +`FROM Clients as cl, Country co, Employees e `
            +`WHERE cl.country=co.id AND cl.owner = e.id `
            +`ORDER BY cl.firstContact DESC`)
            return result[0]
        }catch(e){
            console.log('Error: Cannot return data from db')
            console.log(e)
            return []
        }
    }

}

module.exports = DbManager