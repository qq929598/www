let choose = document.getElementById("choose"),
	ul = document.getElementById("type"),
	oLis = ul.getElementsByTagName("li"),
	option = ul.getElementsByTagName("a");

for(let i=0;i<oLis.length;i++){
	oLis[i].index = i;
}
let arr = [];
for(let i=0;i<option.length;i++){
	option[i].onclick  = function(){
		let siblings = this.parentNode.children;
		let id  = this.parentNode.index;
		for(let j=0;j<siblings.length;j++){
			siblings[j].style.color="";
		}
		this.style.color="red";
		let mark = document.createElement("mark");
		mark.innerHTML = this.innerHTML;
		let a = document.createElement("a");
		a.innerHTML="X";
		let that = this;
		a.onclick = function(){
			this.parentNode.parentNode.removeChild(this.parentNode);
			that.style.color="";
			arr[id]=undefined;
		}
		mark.appendChild(a);
		arr[id]=mark;
		choose.innerHTML="你的选择:"
		for(let i=0;i<arr.length;i++){
			if(arr[i]!==undefined){
				choose.appendChild(arr[i]);
			}
		}
	}
}