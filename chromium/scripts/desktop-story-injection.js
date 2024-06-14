'use strict';

(() => {
    const url = document.querySelector('#stories_list video').src;

    const label = document.createElement('span');
    label.innerText = 'Скачать:';
    label.style.marginRight = '2px';
    
    const panel = document.createElement('div');
    panel.id = 'vkStoryDownloaderPanel';
    panel.style.position = 'fixed';
    panel.style.left = '16px';
    panel.style.bottom = '16px';
    panel.style.zIndex = '2147483647';
    panel.style.padding = '4px';
    panel.style.color = '#fff';
    panel.style.backgroundColor = '#07f';
    panel.style.border = '1px solid #fff';
    panel.appendChild(label);


    if (typeof url !== 'undefined') {
        const aTag = document.createElement('a');
        aTag.href = url;
        aTag.innerText = 'load';
        aTag.style.margin = '0 2px';
        aTag.style.color = '#fff';
        panel.appendChild(aTag);
    }

    document.body.appendChild(panel);
})();