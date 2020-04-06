let shopModule = (function () {
    let navList = document.querySelectorAll('.navBox a'),
        cardList = document.querySelector('.cardBox'),
        data = null;

    let queryData = function queryData(){
        let xhr = new XMLHttpRequest;
        xhr.open('GET','./json/product.json',false);
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState===4&&xhr.status===200){
                data = JSON.parse(xhr.responseText);
            }
        }
        xhr.send(null);
    };
    let render = function render(){
        let str = ``;
        data.forEach(item => {
            let {
                id,
                title,
                price,
                time,
                hot,
                img
            }=item;
            str += `<li>
                        <img src="${img}" alt="">
                        <span>${title}</span>
                        <span>${price}</span>
                        <span>${time}</span>
                        <span>${hot}</span>
                    </li>`
        });
    };
    let handle = function handle(){

    };
    let clear = function clear(){

    };



    return {
        init() {

        }
    }
})();