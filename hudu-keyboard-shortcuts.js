// ==UserScript==
// @name         Hudu Keyboard Navigation Shortcuts
// @namespace    https://bramtech.net
// @version      0.1
// @description  Add keyboard navigation hotkeys to Hudu
// @author       Sean Fried
// @match        https://*.huducloud.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const Filter = {
        None: -1,
        Companies: 0,
        Assets: 1,
        Passwords: 2,
        Articles: 3,
        Websites: 4
    }

    let target = { value: Filter.None }
    const handler = {
        set(obj, prop, value){
            if(prop === 'value'){
                updateFilter(value)
            }
            return Reflect.set(...arguments)
        }
    }
    let currentFilter = new Proxy(target, handler)
    const searchInputEl = document.querySelector('#mainSearchInput')

    searchInputEl.onkeyup = selectTopEntry
    document.onkeyup = handleShortcuts

    function updateFilter(inFilter){
        switch(inFilter){
            case Filter.None:
                filterNone()
                break;
            case Filter.Companies:
                filterCompanies()
                break;
            case Filter.Assets:
                filterAssets()
                break;
            case Filter.Passwords:
                filterPasswords()
                break;
            case Filter.Articles:
                filterArticles()
                break;
            case Filter.Websites:
                filterWebsites()
                break;
            default:
                console.log(`Filter ${inFilter} not set up yet.`)
        }
    }

    function filterSection(inSection, sections){
        if(inSection !== Filter.None){
            for(let i=0; i<sections.length; i++){
                if(i==inSection){
                    sections[i].style.display = 'initial'
                } else {
                    sections[i].style.display = 'none'
                }
            }
        } else {
            for(let i=0; i<sections.length; i++){
               sections[i].style.display = 'initial'
            }
        }
    }

    function filterNone(){
        const sections = document.querySelectorAll('.searcher__columns section')
        if(!sections) return
        filterSection(Filter.None, sections)
    }

    function filterCompanies(){
        const sections = document.querySelectorAll('.searcher__columns section')
        if(!sections){
            currentFilter.value = Filter.None
            return
        }
        filterSection(Filter.Companies, sections)

        const searcherButtons = document.querySelectorAll('.searcher__header a')
        if(searcherButtons.length > 3){
            searcherButtons[0].click()
        }
    }

    function filterAssets(){
        const sections = document.querySelectorAll('.searcher__columns section')
        if(!sections){
            currentFilter.value = Filter.None
            return
        }
        filterSection(Filter.Assets, sections)
    }

    function filterPasswords(){
        const sections = document.querySelectorAll('.searcher__columns section')
        if(!sections){
            currentFilter.value = Filter.None
            return
        }
        filterSection(Filter.Passwords, sections)
    }

    function filterArticles(){
        const sections = document.querySelectorAll('.searcher__columns section')
        if(!sections){
            currentFilter.value = Filter.None
            return
        }
        filterSection(Filter.Articles, sections)
    }

    function filterWebsites(){
        const sections = document.querySelectorAll('.searcher__columns section')
        if(!sections){
            currentFilter.value = Filter.None
            return
        }
        filterSection(Filter.Websites, sections)
    }

    function selectTopEntry(e){
        if(e.key == 'Enter' && currentFilter.value !== Filter.None){
            const topEntry = document.querySelector('.searcher__columns section[style="display: initial;"] main a')
            topEntry.click()
        }
    }

    function handleShortcuts(e){
        if (e.ctrlKey && e.altKey){
            if(e.key == 'o'){
                if(currentFilter.value === Filter.Companies){
                    currentFilter.value = Filter.None
                } else {
                    currentFilter.value = Filter.Companies
                }
            } else if(e.key == 'a'){
                if(currentFilter.value === Filter.Assets){
                    currentFilter.value = Filter.None
                } else {
                    currentFilter.value = Filter.Assets
                }
            } else if (e.key == 'p'){
                if(currentFilter.value === Filter.Passwords){
                    currentFilter.value = Filter.None
                } else {
                    currentFilter.value = Filter.Passwords
                }
            } else if (e.key == 'r'){
                if(currentFilter.value === Filter.Articles){
                    currentFilter.value = Filter.None
                } else {
                    currentFilter.value = Filter.Articles
                }
            } else if (e.key == 'w'){
                if(currentFilter.value === Filter.Websites){
                    currentFilter.value = Filter.None
                } else {
                    currentFilter.value = Filter.Websites
                }
            }
        }
    }
})();
