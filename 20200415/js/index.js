let flexModule = (function () {
    let columns = Array.from(document.querySelectorAll('.column')),
        _data = [];

    //AJAX
    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', 'json/data.json', false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                _data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    };

    //渲染
    let bindHTML = function bindHTML() {
        _data = _data.map(item => {
            let w = item.width,
                h = item.height;
            h = h / (w / 230);
            item.width = 230;
            item.height = h;
            return item;
        });
        for (let i = 0; i < _data.length; i += 3) {
            let group = _data.slice(i, i + 3);
            group.sort((a, b) => {
                return a.height - b.height;
            });
            columns.sort((a, b) => {
                return b.offsetHeight - a.offsetHeight;
            });
            group.forEach((item, index) => {
                let {
                    pic,
                    link,
                    title,
                    height
                } = item;
                let card = document.createElement('div');
                card.className = "card";
                card.innerHTML = `<a href="${link}">
                                    <div class="imgBox" style="height:${height}px">
                                        <img src = "${pic}" alt = "">
                                    </div>
                                    <p>${title}</p>
                                </a>`;
                columns[index].appendChild(card);
            });
        }
    };
    // 延迟加载
    let lazyFunc = function lazyFunc() {
        let imgBoxs = document.querySelectorAll('.imgBox');
        [].forEach.call(imgBoxs, imgBox => {
            let isLoad = imgBox.getAttribute('isLoad');
            if (isLoad === "true") return;
            let B = offset(imgBox).top +
                imgBox.offsetHeight / 2;
            let A = document.documentElement.clientHeight +
                document.documentElement.scrollTop;
            if (B <= A) {
                lazyImg(imgBox);
            }
        });
    };
    let lazyImg = function lazyImg(imgBox) {
        let img = imgBox.querySelector('img'),
            dataImage = img.getAttribute('src'),
            tempImage = new Image;
        tempImage.src = dataImage;
        tempImage.onload = () => {
            img.src = dataImage;
            css(img, 'opacity', 1);
        };
        img.removeAttribute('src');
        tempImage = null;
        imgBox.setAttribute('isLoad', 'true');
    };

    // 加载更多数据
    let isRender;
    let loadMoreData = function loadMoreData() {
        let HTML = document.documentElement;
        if (HTML.clientHeight + HTML.clientHeight / 2 + HTML.scrollTop >= HTML.scrollHeight) {
            if (isRender) return;
            isRender = true;
            queryData();
            bindHTML();
            lazyFunc();
            isRender = false;
        }
    };
    //方法
    function getCss(element, attr) {
        let value = window.getComputedStyle(element)[attr],
            reg = /^\d+(px|rem|em)?$/i;
        if (reg.test(value)) {
            value = parseFloat(value);
        }
        return value;
    }

    function setCss(element, attr, value) {
        if (attr === "opacity") {
            element['style']['opacity'] = value;
            element['style']['filter'] = `alpha(opacity=${value*100})`;
            return;
        }
        let reg = /^(width|height|margin|padding)?(top|left|bottom|right)?$/i;
        if (reg.test(attr)) {

            if (!isNaN(value)) {
                value += 'px';
            }
        }
        element['style'][attr] = value;
    }

    function setGroupCss(element, options) {
        for (let key in options) {
            if (!options.hasOwnProperty(key)) break;
            setCss(element, key, options[key]);
        }
    }

    function css(element) {
        let len = arguments.length,
            attr = arguments[1],
            value = arguments[2];
        if (len >= 3) {
            // 单一设置样式
            setCss(element, attr, value);
            return;
        }
        if (attr !== null && typeof attr === "object") {
            // 批量设置
            setGroupCss(element, attr);
            return;
        }
        // 获取样式
        return getCss(element, attr);
    }

    function offset(element) {
        let parent = element.offsetParent,
            top = element.offsetTop,
            left = element.offsetLeft;
        while (parent) {
            if (!/MSIE 8/.test(navigator.userAgent)) {
                left += parent.clientLeft;
                top += parent.clientTop;
            }
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {
            top,
            left
        };
    }
    return {
        init() {
            queryData();
            bindHTML();
            lazyFunc();
            window.onscroll = function () {
                lazyFunc();
                loadMoreData();
            };
        }
    }
})();
flexModule.init();