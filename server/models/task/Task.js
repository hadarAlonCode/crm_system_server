const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');
import { ObjectID } from 'mongodb'

const Schema = mongoose.Schema

const taskSchema = new Schema({
    text: String,
    date: Date,
    contact_id: {type: Schema.Types.ObjectId, ref: "Contact"},
    status: Boolean,
    user_key: String

})

taskSchema.plugin(mongoosePaginate);

taskSchema.set('toJSON', {
    transform(doc, ret) {
        delete ret.__v
    },
})

taskSchema.set('toObject', {
    transform(doc, ret) {
        delete ret.__v
    },
})

taskSchema.statics.getById = async function getById(_id) {
    const query = this.findOne({ _id })
    return query.exec().then((task) => (task ? task : undefined))
}

taskSchema.statics.createNew = async function createNew(task) {
    try {
        return new Task(task).save()
    } catch (error) {
        return undefined
    }
}

taskSchema.statics.destroy = async function destroy(_id) {
    const query = this.remove({ _id })
    return query.exec().then((task) => (task ? task : undefined))
}


taskSchema.statics.revise = async function revise(task, _id) {

    const $set = task
    const query = this.findOneAndUpdate({ _id }, { $set }, { new: true }) 
    return query.exec().then((task) => (task ? task : undefined))
}


taskSchema.statics.getOpenTasks = async function getOpenTasks(user) {
    const query = this.find({user_key: user , status: false }).populate('contact_id')
    return query.exec().then((task) => (task ? task : undefined))
}


taskSchema.statics.getPagination = async function getPagination(limit, page, user) {
    const query = this.paginate({user_key: user}, { page: page, limit: limit , populate: 'contact_id' ,sort: 'date'  , })
    return query.then((result) => (result ? result.docs : undefined))
}


const Task = mongoose.model("Task", taskSchema)

module.exports = Task