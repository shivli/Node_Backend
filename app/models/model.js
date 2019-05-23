const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
    name: { type: String, required: true, max: 100 },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    role: { type: Number, required: true },
    // location: {
    //     type: { type: String },
    //     coordinates: []
    // }
})
// userSchema.index({ location: "2dsphere" });

const jobsSchema = mongoose.Schema({
    company_Name: { type: String, required: true },
    position: { type: String, required: true },
    Experience:{type:String,required:true},
    city:{type:String,required:true},
    contact:{type:String,required:true},
    // location: {
    //     type: { type: String },
    //     coordinates: []
    // }
}

)
// jobsSchema.index({ location: "2dsphere" });

const applySchema = mongoose.Schema({
    apply_id: { type: Number, required: true, max: 100 },
    user_id: { type: String, required: true, max: 100 },
    status: { type: Number, required: true },
    company: { type: String, required: true }

});
module.exports =
    {
        a: mongoose.model('user', userSchema),
        b: mongoose.model('jobs', jobsSchema),
        c: mongoose.model('apply', applySchema)
    }

