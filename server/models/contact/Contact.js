const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({
    img: String,
    name: String,
    email: String,
    phone: String,
    firstContact: Date,
    country: String,
    status: String, //  Lead / contacted /sold / lost
    cpmpany: String,
    position: String

})


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

contactSchema.statics.revise = async function revise(contact) {
    const { _id } = contact
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


const Contact = mongoose.model("Contact", contactSchema)

module.exports = Contact