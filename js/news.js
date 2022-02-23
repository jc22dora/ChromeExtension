

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log('news received refresh');
    console.log(msg.html);
    if (msg.type === 'refresh-payload') {
        const div = document.createElement('div');
        div.classList.add('test');
        div.innerHTML = msg.html;
        document.getElementById('id').appendChild(div);

        const divtwo = document.createElement('div');
        divtwo.classList.add('testtwo');
        divtwo.innerHTML = msg.userhtml;
        document.getElementById('blog_post').appendChild(divtwo);
    }
    
});


document.getElementById('refresh').addEventListener('click',
    function () {
        event.preventDefault();
        console.log('refresh button');

        chrome.runtime.sendMessage({type: 'refresh' }, response => {
            console.log(response);
        })
    });