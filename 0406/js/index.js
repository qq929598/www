let shopModule = (function () {
    let navList = document.querySelectorAll('.navBox a'),
        cardList = document.querySelector('.cardBox'),
        data = null;

    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './json/product.json', false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        }
        xhr.send(null)
    }

    let render = function render() {
        let str = ``;
        data.forEach(item => {
            let {
                id,
                title,
                price,
                time,
                hot,
                img
            } = item;
            str += `<li>
                        <img src="${img}" alt="">
                        <span>${title}</span>
                        <span>价格: ${price.toFixed(2)}</span>
                        <span>日期: ${time}</span>
                        <span>销量: ${hot}</span>
                    </li>`
        });
        cardList.innerHTML = str;
    }

    let handle = function handle() {
        Array.from(navList).forEach((item)=>{
            item.flag=-1;
            item.onclick=function(){
                this.flag *= -1;
                clear.call(this);
                let pai = this.getAttribute("data-pai");
                data.sort((a,b)=>{
                    a = String(a[pai]).replace(/-/g,'');
                    b = String(b[pai]).replace(/-/g,'');
                    return (a-b)*this.flag;
                })
                render()
            }
        })
    }

    let clear = function clear() {
         Array.from(navList).forEach((item) => {
             if(item !== this){
                item.flag = -1;
             }
         });
    }

    return {
        init() {
            queryData()
            render()
            handle()
        }
    }
})();
shopModule.init();