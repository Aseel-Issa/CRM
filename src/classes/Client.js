import {observable, makeObservable} from 'mobx'


class Client {

    constructor(id, name, surname, country, firstContact, email, sold, owner, show){
        this.id = id
        this.name = name
        this.surname = surname
        this.country = country
        this.firstContact = firstContact
        this.email = email
        this.sold = sold
        this.owner = owner
        this.show = show

        makeObservable(this, {
            name: observable,
            surname: observable,
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