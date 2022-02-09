var users = [];

export function userJoin(id, username, room) {
    const user = { id, username, room };

    users.push(user);

    return user;

}
export function userDisconnect(id) {
    users = users.filter(function (ele) {
        return ele.id !== id;
    });
    for (let i = 0; i < users.length; i++) {
        console.log(users[i].username);
    }

}

export function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

export function getUserList() {
    return users;
}

//module.exports = {
//    userJoin, getCurrentUser, getUserList, userDisconnect
//};