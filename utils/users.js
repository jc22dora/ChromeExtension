var users = [];

function userJoin(id, username, room) {
    const user = { id, username, room };

    users.push(user);

    return user;

}
function userDisconnect(id) {
    users = users.filter(function (ele) {
        return ele.id !== id;
    });
    for (let i = 0; i < users.length; i++) {
        console.log(users[i].username);
    }

}

function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

function getUserList() {
    return users;
}

module.exports = {
    userJoin, getCurrentUser, getUserList, userDisconnect
};