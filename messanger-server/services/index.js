const validuser = require('./validuserService');
const user = require('./userService');
const chats = require('./chatsService');
const friends = require('./friendsServices');
const messages = require('./messageService');
const profilepic = require('./profilePicServices');

module.exports = {
    validuser,
    user,
    chats,
    friends,
    messages,
    profilepic
}