'use strict';

let lastUrl = location.href;
let checkerHasBeenCalled = false;
let showPanelHasBeenCalled = false;

let checkerHasBeenCalledStory = false;
let showPanelHasBeenCalledStory = false;

new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    checkerHasBeenCalled = false;
    showPanelHasBeenCalled = false;

    const old_panel = document.querySelector('#vkVideoDownloaderPanel');
    if (old_panel !== null) {
      old_panel.remove();
    }

    checkerHasBeenCalledStory = false;
    showPanelHasBeenCalledStory = false;
    
    const old_panel_story = document.querySelector('#vkStoryDownloaderPanel');
    if (old_panel_story !== null) {
      old_panel_story.remove();
    }
  }

  if (
    (/z=(?:video|clip)/.test(location.search) || /^\/(?:video|clip)[^\/s]+$/.test(location.pathname)) &&
    !checkerHasBeenCalled
  ) {
    checkerHasBeenCalled = true;
    const checker = setInterval(() => {
      if (!showPanelHasBeenCalled && document.querySelector('#video_player video')) {
        showPanelHasBeenCalled = true;
        clearInterval(checker);
        showDownloadPanel('scripts/desktop-injection.js');
      } else if (!showPanelHasBeenCalled && document.querySelector('#video_player iframe')) {
        showPanelHasBeenCalled = true;
        clearInterval(checker);
        showErrorPanel();
      }
    }, 500);
  }
  if (
    /w=story/.test(location.search) && !checkerHasBeenCalledStory
  ) {
    checkerHasBeenCalledStory = true;
    const storyChecker = setInterval(() => {
      if (!showPanelHasBeenCalledStory && document.querySelector('#stories_list video')) {
        showPanelHasBeenCalledStory = true;
        clearInterval(storyChecker);
        showDownloadPanel('scripts/desktop-story-injection.js');
      }
    }, 500);
  }
}).observe(document.body, { subtree: true, childList: true });

function showDownloadPanel(url) {
  const script = document.createElement('script');
  script.charset = 'utf-8';
  script.type = 'text/javascript';
  script.src = chrome.runtime.getURL(url);
  document.body.appendChild(script);
}

function showErrorPanel() {
  const label = document.createElement('span');
  label.innerText = 'Видео со стороннего сайта. Воспользуйтесь инструментами для скачивания с него.';

  const panel = document.createElement('div');
  panel.id = 'vkVideoDownloaderPanel';
  panel.style.position = 'fixed';
  panel.style.left = '16px';
  panel.style.bottom = '16px';
  panel.style.zIndex = '2147483647';
  panel.style.padding = '4px';
  panel.style.color = '#fff';
  panel.style.backgroundColor = '#07f';
  panel.style.border = '1px solid #fff';
  panel.appendChild(label);

  document.body.appendChild(panel);
}
