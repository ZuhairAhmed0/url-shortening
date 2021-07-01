const links = document.querySelector('.links');
const bars = document.querySelector('.bars');
const inputShorten = document.querySelector('input[placeholder="Shorten a link here..."]');
const shorten = document.querySelector('#shorten');
const newshort = document.querySelector('.short');
let test = true;
bars.addEventListener('click', function() {
    if (test) {
        links.style = 'left: 0; transition: 1s;';
        this.style = 'transform: rotateZ(90deg); transition: 1s';
        test = false
    } else {
        links.style = 'left: -200%; transition: 1s;';
        this.style = 'transform: rotateZ(0deg); transition: 1s';
        test = true;
    }
})
let link = [];
shorten.addEventListener('click', function(e) {
    e.preventDefault();
    if (inputShorten.value.startsWith('http://') || inputShorten.value.startsWith('https://')) {
        let url = inputShorten.value.slice(0, 7) == 'http://' ? inputShorten.value.slice(7) : inputShorten.value.slice(8);
        fetch(`https://api.shrtco.de/v2/shorten?url=${url}`, { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                link.push(data.result.full_short_link);
                localStorage.setItem('link', JSON.stringify(link));
                newshort.innerHTML +=
                    `<div class="newlink">
                            <p class="linkCopy"><a href="${data.result.full_short_link}">${data.result.full_short_link}</a></p>
                            <button class"copy">Copy</button>
                        </div>`

                abc();
            })
            .catch((error) => {
                console.log(error);
            })
        inputShorten.value = '';
        inputShorten.placeholder = "Shorten a link here...";
        inputShorten.style.border = 'none';
    } else {
        inputShorten.value = '';
        inputShorten.placeholder = 'Please enter a valid URL';
        inputShorten.style.border = '1px solid red';
    }
});

for (let item of JSON.parse(localStorage.getItem('link')) || link) {
    newshort.innerHTML +=
        `<div class="newlink">
            <p class="linkCopy"><a href="${item}">${item}</a></p>
            <button class"copy">Copy</button>
        </div>`
}


function abc() {
    document.querySelectorAll('.newlink').forEach(a => {
        a.addEventListener('click', function abc(e) {
            if (e.target.classList = 'copy') {
                let copytext = this.firstElementChild.textContent;

                function copys(text) {
                    let inputs = document.createElement('input');
                    inputs.setAttribute('value', text);
                    document.body.appendChild(inputs);
                    inputs.select();
                    let result = document.execCommand('copy');
                    document.body.removeChild(inputs);
                    return result;
                }
                copys(copytext)
            }
        })
    })
}
abc();