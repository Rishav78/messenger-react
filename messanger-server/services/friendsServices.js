const users = require('../models/users');


function buildQuery(frnds, _id) {
    // const { search } = req.body;
    const friends = [...frnds.friends, _id];
    const query = [
        {
            '_id': {
                '$nin': friends
            }
        }
    ];
    // if(search) query.push({ userName: new RegExp(search) });
    return query;
}

exports.searchNewFriend = async (_id) => {
    const friends = await users.findById(_id , { friends: 1 });
    const query = buildQuery(friends, _id);
    const usrs =  await users.find({ '$and': query }, {
        firstname:1,
        lastname: 1,
        imageid: 1,
    });
    return usrs;
}

exports.addnewfriend = async (_id, friendid) => {
    try {
        await users.updateOne({ _id }, { '$push': { 'friends': friendid } });
        await users.updateOne({ _id: friendid }, { '$push': { 'friends': _id } });
        return { success: true };
    } catch (err) {
        return { success: false };
    }
}

exports.getfriends = async _id => {
    const friends = await users.findById(_id, { friends: 1 })
    .populate({
        'path': 'friends',
        'select': {
            firstname: 1,
            lastname: 1,
            imageid: 1,
        },
        'options': { 'sort': { 'firstname': 1 } } 
    });
    return friends;
}