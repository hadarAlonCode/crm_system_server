const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema

const contactSchema = new Schema({
    img: String,
    name: String,
    email: String,
    phone: String,
    firstContact: Date,
    country: String,
    status: String, //  Lead / contacted /sold / lost
    company: String,
    position: String

})

contactSchema.plugin(mongoosePaginate);

contactSchema.set('toJSON', {
    transform(doc, ret) {
        delete ret.__v
    },
})

contactSchema.set('toObject', {
    transform(doc, ret) {
        delete ret.__v
    },
})

contactSchema.statics.getById = async function getById(_id) {
    const query = this.findOne({ _id })
    return query.exec().then((contact) => (contact ? contact : undefined))
}

contactSchema.statics.createNew = async function createNew(contact) {
    try {
        return new Contact(contact).save()
    } catch (error) {
        return undefined
    }
}

contactSchema.statics.destroy = async function destroy(_id) {
    const query = this.remove({ _id })
    return query.exec().then((contact) => (contact ? contact : undefined))
}

contactSchema.statics.revise = async function revise(contact, _id) {
    console.log(contact , "contact");
    console.log(_id , "_id");
    
    const $set = contact
    const query = this.findOneAndUpdate({ _id }, { $set }, { new: true }) 
    return query.exec().then((contact) => (contact ? contact : undefined))
}

contactSchema.statics.getByCountry = async function getByCountry(country) {
    const query = this.find({ country })
    return query.exec().then((contact) => (contact ? contact : undefined))
}


contactSchema.statics.getAll = async function getAll() {
    const query = this.find({})
    return query.exec().then((contact) => (contact ? contact : undefined))
}


contactSchema.statics.getPagination = async function getPagination(limit, page) {
    const query = this.paginate({}, { page: page, limit: limit })
    return query.then((result) => (result ? result.docs : undefined))

}

// contactSchema.statics.getPagination = async function getPagination(limit, page) {
//     const query = this.paginate({}, { page: page, limit: limit })
//     return query.then((result) => (result ? result.docs : undefined))

// }

contactSchema.statics.searchByName = async function searchByName(name) {
    const query = this.find( { name: { $regex: name } } )
    return query.exec().then((contact) => (contact ? contact : undefined))
}





const Contact = mongoose.model("Contact", contactSchema)

module.exports = Contact