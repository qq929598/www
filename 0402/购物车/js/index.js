let lis = document.getElementsByTagName('li');
let ems = document.querySelectorAll('.info em');
for (var i = 0; i < lis.length; i++) {
    addClick(lis[i])
}

function addClick(li) {
    var tags = li.getElementsByTagName('i');
    var em = li.getElementsByTagName('em')[0];
    var strongs = li.getElementsByTagName('strong');

    tags[0].onclick = function () { //减
        if (em.innerHTML <= 0) {
            em.innerHTML = 0
        } else {
            em.innerHTML = Number(em.innerHTML) - 1;
        }
        strongs[1].innerHTML = parseFloat(strongs[0].innerHTML) * em.innerHTML + '元';
        computed();
    };
    tags[1].onclick = function () { //加
        em.innerHTML = Number(em.innerHTML) + 1;
        strongs[1].innerHTML = parseFloat(strongs[0].innerHTML) * em.innerHTML + '元';
        computed();
    }
}
function computed() {
    let total = 0;
    let allPrice = 0;
    let ary = [0];
    for (var i = 0; i < lis.length; i++) {
        var em = lis[i].getElementsByTagName('em')[0];
        var strongs = lis[i].getElementsByTagName('strong');

        total += Number(em.innerHTML);
        allPrice += parseFloat(strongs[1].innerHTML);
        if (em.innerHTML > 0) {

            ary.push(parseFloat(strongs[0].innerHTML))
        }
    }
    ary.sort((a, b) => b - a);
    ems[0].innerHTML = total;
    ems[1].innerHTML = allPrice;
    ems[2].innerHTML = ary[0];
}