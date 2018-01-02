let images = document.getElementsByTagName('img');

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.status === 'rotate') {
        const parsedImages = message.images;
        console.log(parsedImages, images);
        for (const img of parsedImages) {
            for (const image of images) {
                if (image.src === img.src) {
                    image.style.transform = `rotate(${img.rotate}deg)`;
                    // image.parentElement.style.height = 'auto';
                    // TODO change margin depending on the angle of rotation
                    image.style.marginTop = image.style.marginBottom = `${image.width/2}px`;
                    // image.parentElement.style.overflow = 'auto';
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