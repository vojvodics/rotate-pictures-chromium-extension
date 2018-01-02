chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, {status: 'get'}, function(response) {
            const images = response.images;
            const imagesHTML = document.querySelector('#images');
            for (const img of images) {
                // create a div for each image
                const divWrapper = document.createElement('div');
                divWrapper.className = 'img-wrapper';

                const newImage = document.createElement('img');
                newImage.src = img.src;
                newImage.height = newImage.width = 20;

                const input = document.createElement('input');
                input.type = 'number';

                divWrapper.appendChild(newImage);
                divWrapper.appendChild(input);
                imagesHTML.appendChild(divWrapper);
            }
            console.log(imagesHTML, images);
        });
    }
});
document.querySelector('#btn').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs.length > 0) {
            const images = document.querySelector('#images').children;
            const parsedImages = [];
            for (const img of images) {
                console.log(img);
                if (img.children[1].value) {
                    parsedImages.push({src: img.children[0].src, rotate: img.children[1].value});
                }
            }
            chrome.tabs.sendMessage(tabs[0].id, {status: 'rotate', images: parsedImages})
        }
    })
});
