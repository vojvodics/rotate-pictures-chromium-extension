let images = document.getElementsByTagName('img');

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.status === 'rotate') {
        const parsedImages = message.images;
        console.log(parsedImages, images);
        for (const img of parsedImages) {
            for (const image of images) {
                if (image.src === img.src) {
                    image.style.transform = `rotate(${img.rotate}deg)`;
                    break;
                }
            }
        }
    } else if (message.status === 'get') {
        const parsedImages = [];
        for (const img of images) {
            parsedImages.push({src: img.src, style: img.style})
        }

        sendResponse({images: parsedImages});
    }
    
});