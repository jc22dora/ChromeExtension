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

}

 function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

 function getUserList() {
    return users;
}

function updateUserInfo(id, username, room) {
    let user = getCurrentUser(id);
    user.username = username;
    user.room = room;
}

module.exports = {
    userJoin, getCurrentUser, getUserList, userDisconnect
};