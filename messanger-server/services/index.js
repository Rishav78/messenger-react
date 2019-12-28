const validuser = require('./validuserService');
const user = require('./userService');
const chats = require('./chatsService');
const friends = require('./friendsServices');
const messages = require('./messageService');

module.exports = {
    validuser,
    user,
    chats,
    friends,
    messages,
}