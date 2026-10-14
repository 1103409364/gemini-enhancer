// ==UserScript==
// @name         Gemini Sidebar Auto Hide
// @namespace    https://github.com/gemini-enhancer
// @version      1.0
// @description  Auto hide sidebar in Gemini
// @author       You
// @match        https://gemini.google.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function closeSidebar() {
    document.querySelector('.sidenav-header-buttons .close-sidenav-button button')?.click();
  }

  function openSidebar() {
    document.querySelector('.side-nav-menu-button button')?.click();
  }

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .sidenav-with-history-container {
        border-right: 1px solid var(--bard-color-custom-primary-container, #f0f0f0);
      }
    `;
    document.head.appendChild(style);
  }

  function waitAndInit() {
    const observer = new MutationObserver(() => {
      const container = document.querySelector('.sidenav-with-history-container');
      if (container) {
        observer.disconnect();
        injectStyles();
        closeSidebar();
        container.addEventListener('mouseenter', openSidebar);
        container.addEventListener('mouseleave', closeSidebar);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  waitAndInit();
})();
