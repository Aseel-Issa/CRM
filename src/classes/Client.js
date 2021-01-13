import {observable, makeObservable} from 'mobx'


class Client {

    constructor(id, name, surename, country, firstContact, email, sold, owner, show){
        this.id = id
        this.name = name
        this.surename = surename
        this.country = country
        this.firstContact = firstContact
        this.email = email
        this.sold = sold
        this.owner = owner
        this.show = show

        makeObservable(this, {
            name: observable,
            surename: observable,
            country: observable,
            firstContact: observable,
            email: observable,
            sold: observable,
            owner: observable,
            show: observable
        })
    }
}

export default Client