/*var Slider = {
    init: function(config) {
        //create the wrappers
        //create the buil
        //create the pagination
        //craete prev/next buttons
    },
    buildList: () => {
        if (....) return 'invalid something';

        //create the UL
        //foreach this.config.items buildItem(this.config.items[i])

        
        return ul;
    },
    buildItem: function(content) {
        //build the LI
        //insert content

        return item;
    }
}

var slider = Object.assign(Slider);
slider.init({
    items: [
        { body: '<html>'},
        { body: '<html>'},
        { body: '<html>'},
    ],
    containerID: 'container-id',
    classes: ['class1','class2']
});

settingsDefault: {
    items: [
        {
            url: 'test'
        },
        {
            url: 'test2'
        }
    ],
    containerID: 'container-id',
    classList: [] 
}

settingsUser {
    items: [
        {
            url: 'test'
        },
        {
            url: 'test2'
        }
    ],
    containerID: 'container-id',
}

settings = combined
*/

let Slider = (function(){
    let targetContainer;
    let sliderList;
    let html = '';
    let slidesCount = 1;
    let listWidth = 0;
    let activeSlide = 0;

    console.log(this);
    let buildArrows = () => {
        let html = '';

        html += buildHTML('span', '', 'left-arrow');
        html += buildHTML('span', '', 'right-arrow');

        return html;
    }

    let buildSlider = (config) => {
        let classes = 'slider-wrapper';
        let html = '';
        
        config.wrapperClasses.map(el => {
            classes += ' ' + el;
        });

        html = buildHTML('div', buildList(config), classes);

        return html;
    }

    let buildList = (config) => {
        let html = '';
        let items = buildItem(config);

        html += buildArrows();
        html += buildHTML('ul', items, '', 'slider-list');

        return html;
    }

    let buildItem = (config) => {
        let html = '';

        config.items.map(el => {
            html += buildHTML('li', '<img alt="' + el.name + '" src="' + el.url + '" />');
        });

        return html;
    }

    let buildHTML = (tag, content, className, idName) => {
        let html;

        if (!className || !idName) { html = buildHtmlWithoutAttr(tag, content); }
        if (idName && className) { html = buildHtmlWithClassID(tag, content, className, idName); }
        if (className && !idName) { html = buildHtmlWithClass(tag, content, className); }
        if (idName && !className) { html = buildHtmlWithID(tag, content, className, idName); }

        return html;
    }

    let buildHtmlWithClass = (tag, content, className) => { return '<' + tag + ' class="' + className + '">' + content + '</' + tag + '>'; }
    let buildHtmlWithID = (tag, content, className, idName) => { return '<' + tag + ' id="' + idName + '">' + content + '</' + tag + '>'; }
    let buildHtmlWithClassID = (tag, content, className, idName) => { return '<' + tag + ' class="' + className + '" id="' + idName + '">' + content + '</' + tag + '>'; }
    let buildHtmlWithoutAttr = (tag, content) => { return '<' + tag + '>' + content + '</' + tag + '>'; }

    let calcListSize = (config) => {
        let width = parseInt(window.getComputedStyle(this.targetContainer).width);

        return width * this.slidesCount;
    }

    let distributeEvents = () => {
        this.targetContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('left-arrow')) { prevSlide(e); }
            if (e.target.classList.contains('right-arrow')) { nextSlide(e); }
        });

        return this;
    }

    let nextSlide = (e) => {
        console.log(activeSlide); //this is 0 as expected
        console.log(this.activeSlide); //this is undefined because the context is Window... why?
        this.activeSlide -= this.listSize;
        this.sliderList.style.transform = 'translate(' + this.activeSlide + 'px, 0)';
    }

    let prevSlide = (e) => {

    }

    return {
        init: (config) => {
            this.html = buildSlider(config);
            this.slidesCount = config.items.length;
            this.targetContainer = document.getElementById(config.containerID);
            
            this.targetContainer.innerHTML = this.html;

            
            this.sliderList = document.getElementById('slider-list');
            this.listSize = calcListSize(config);
            
            this.sliderList.style.width = calcListSize(config) + 'px';

            distributeEvents();

            return this;
        }
    }
})();


var slider = Object.assign(Slider);
slider.init({
    items: [
        {
            url: 'https://cdn.pixabay.com/photo/2017/01/06/23/21/soap-bubble-1959327_960_720.jpg',
            name: 'test'
        },
        {
            url: 'https://cdn.pixabay.com/photo/2017/01/06/19/15/soap-bubble-1958650_960_720.jpg',
            name: 'test2'
        }
    ],
    containerID: 'container-id',
    wrapperClasses: ['class1', 'class2']
});

