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
    position: String,
    user_key: String

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

    
    const $set = contact
    const query = this.findOneAndUpdate({ _id }, { $set }, { new: true }) 
    return query.exec().then((contact) => (contact ? contact : undefined))
}

contactSchema.statics.getBy = async function getBy(user_key , key , value) {
    const query =  this.find({ user_key , [key]: value })
    return query.exec().then((contact) => (contact ? contact : undefined))
}


contactSchema.statics.getAll = async function getAll(user_key) {
    const query = this.find({ user_key})
    return query.exec().then((contact) => (contact ? contact : undefined))
}


contactSchema.statics.getPagination = async function getPagination(limit, page , user_key) {
    const query = this.paginate({user_key}, { page: page, limit: limit })
    return query.then((result) => (result ? result.docs : undefined))

}



// === counting:

contactSchema.statics.countBy = async function countBy(match_key, group , match_status) {

    let query

    if(match_status){
        
      query = this.aggregate( [
        {$match: {status: match_status , user_key: match_key }},
        {$group: {_id: `$${group}`, count: {$sum: 1}}} ,
        { $sort: { count: -1 } }
       ] ) 

    }else{
    
       query = this.aggregate( [
            {$match: {user_key: match_key}},
            {$group: {_id: `$${group}` , count: {$sum: 1}}}  ,
            { $sort: { count: -1 } }
        ] )
    }
    
    return query.exec().then((result) => (result ? result : undefined))
}



const Contact = mongoose.model("Contact", contactSchema)

module.exports = Contact