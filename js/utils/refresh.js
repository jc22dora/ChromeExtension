function getDiv() {
    var html =

         `<blog id="blog">
            <h1>Blog</h1>
            <div id="blog_post">
                <h2>Hello World</h2>
                <p>
                    Hello World
                </p>
            </div>

        </blog>`
    return html
}


function getUserDiv(data) {
    var html =`<users id= "users">
        <h1>Users</h1>`;
    for (let i = 0; i < data.length; i++) {
        html += `<div id="user">
            <p>
                ${data[i].username}
            </p></div>`
        console.log(data);
    }
    return html +`</users >`

}

module.exports = { getDiv, getUserDiv };