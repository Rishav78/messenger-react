const login = require('./loginController');
const signup = require('./signupController');
const validtoken = require('./validTokenController');
const chats = require('./chatController');
const friends = require('./friendsController');
const messages = require('./messagesController');

module.exports = {
    login,
    signup,
    validtoken,
    chats,
    friends,
    messages,
}