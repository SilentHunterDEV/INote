var list = [];
var current, moved;
var scrolly = 0;
addItems();
addTouchEdit();
addTouchItems();
function openNote(item){
	open(true);
	if(item){
		const n = JSON.parse(localStorage.getItem(item.id+""));
		const d = new Date(+n.date);
		panel.childNodes[0].nodeValue = getDateString(d);
		note.value = n.text;
		note.scrollTop = note.scrollHeight;
	} else {
		current = null;
		panel.childNodes[0].nodeValue = 'New';
		note.value = "";
	}
	note.focus();
	scrolly = window.scrollY;
}
function closeNote(){
	open(false);
	if(current){
		current.style.background = "#ffffff";
	}
	window.scrollTo(0, scrolly);
	note.blur();
}
function doneNote(){
	const t = note.value;
	if(t.length == 0){
		closeNote();
		return;
	} else if(t == 'backup'){
		document.location = 'backup.html';
		closeNote();
		return;
	}
	var dt = Date.now();
	if(current){
		const n = JSON.parse(localStorage.getItem(current.id+""));
		n.text = t;
		n.date = dt;
		current.querySelector('.text').innerText = t;
		current.querySelector('.date').textContent = getDateString(new Date(+current.id))+' ('+getDateString(new Date())+')';
		localStorage.setItem(current.id+"", JSON.stringify(n));
	} else {
		const n = {"date":dt,"text":t,"tag":false};
		list.unshift(dt+"");
		items.insertBefore(getItem(dt, n), items.children[0]);
		localStorage.setItem(dt, JSON.stringify(n));
		localStorage.setItem("sorted", '{'+list.join()+'}');
		updCount();
	}
	closeNote();
}
function addItems(){
	const iit = localStorage.getItem("sorted");
	if(iit){
		const ii = iit.slice(1, -1);
		if(ii.length > 0){
			list = ii.split(',');
		}
		for(var i=0; i<list.length; i++) {
			items.appendChild(getItem(list[i], JSON.parse(localStorage.getItem(list[i]))));
		}
	}
	updCount();
}
function getItem(id, n){
	const item = document.createElement("div");
	const itemT = document.createElement("div");
	const itemD = document.createElement("div");
	item.className = "item";
	itemT.className = "text";
	itemD.className = "date";
	item.id = id;
	itemT.innerText = n.text;
	const d = new Date(+id);
	const de = new Date(+n.date);
	itemD.textContent = de.getTime()==id ? getDateString(d) : getDateString(d)+' ('+getDateString(de)+')';
	if(n.tag){
		itemT.style.background = "#ffff00";
	}
	item.appendChild(itemT);
	item.appendChild(itemD);
	return item;
}
function updCount(){
	const n = list.length;
	var text = n+' notes';
	if(n==1 || (n>20 && n%10==1)){
		text = n+' note';
	} else if((n>1 && n<5) || (n>21 && n%10>1 && n%10<5)) {
		text = n+' notes';
	}
	var co = items.querySelector('.count');
	if(co){
		co.textContent = text;
	} else {
		co = document.createElement("div");
		co.className = "count";
		co.textContent = text;
		items.appendChild(co);
	}
}
function getDateString(d){
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const da = d.getDate();
	const mo = d.getMonth()+1;
	const ho = d.getHours();
	const mi = d.getMinutes();
	return days[d.getDay()]+', '+(da<10 ? '0'+da : da)+'.'+(mo<10 ? '0'+mo : mo)+'.'+d.getFullYear()+' '+(ho<10 ? '0'+ho : ho)+':'+(mi<10 ? '0'+mi : mi);
};
function addTouchEdit(){
	var sx;
	edit.addEventListener('touchstart', function(event) {
		sx = event.touches[0].clientX;
		if(sx > 10){
			sx = -1;
			return;
		}
		note.blur();
		window.scrollTo(0, scrolly);
		edit.style.transition = items.style.transition = '';
	});
	edit.addEventListener('touchmove', function(event) {
		if(sx < 0) return;
		event.preventDefault();
		var dx = event.touches[0].clientX-sx;
		dx = dx<0 ? 0 : dx;
		edit.style.transform = 'translateX('+dx+'px)';
		edit.style.boxShadow = '-320px 44px 0px rgba(0,0,0,'+(320-dx)/1600+')';
		items.style.transform = 'translateX('+(dx/4-80)+'px)';
	});
	edit.addEventListener('touchend', function(event) {
		if(sx < 0) return;
		if((event.changedTouches[0].clientX-sx) > 160){
			closeNote();
		} else {
			open(true);
		}
		edit.style.boxShadow = '';
		sx = -1;
	});
}
function addTouchItems(){
	var touch = 1;  //0-none, 1-click, 2-moveX
	var stamp = 0;
	var sx, sy;
	items.addEventListener('touchstart', function(event) {
		const item = event.target.closest('.item');
		item.style.transition = 'background .5s';
		item.style.background = "#bebebe";
		touch = 1;
		current = item;
		sx = event.touches[0].clientX;
		sy = event.touches[0].clientY;
		stamp = event.timeStamp;
		items.removeAttribute('data-state');
	});
	items.addEventListener('touchmove', function(event) {
		const item = event.target.closest('.item');
		if(touch == 1){
			if((event.touches[0].clientY-sy)>10 || (event.touches[0].clientY-sy)<-10){
				touch = 0;
			} else if((event.touches[0].clientX-sx)>20 || (event.touches[0].clientX-sx)<-20){
				touch = 2;
			}
		} else if(touch == 2){
			event.preventDefault();
			item.style.background = "#ffffff";
			item.style.transform = 'translateX('+(event.touches[0].clientX-sx)+'px)';
			const ir = item.getBoundingClientRect();
			const iy = ir.top + window.scrollY + ir.height/2 - 15;
			if((event.touches[0].clientX-sx)>0 && items.dataset.state!='tag'){
				items.style.background = "fixed #ff9400 url(tag.png) no-repeat center "+iy+"px/30px 30px";
				items.setAttribute('data-state', 'tag');
			} else if((event.touches[0].clientX-sx)<-0 && items.dataset.state!='del'){
				items.style.background = "fixed #ff3b30 url(del.png) no-repeat center "+iy+"px/30px 30px";
				items.setAttribute('data-state', 'del');
			}
		} else {
			item.style.background = "#ffffff";
		}
	});
	items.addEventListener('touchcancel', function(event) {
		const item = event.target.closest('.item');
		touch = 0;
		item.style.background = "#ffffff";
	});
	items.addEventListener('touchend', function(event) {
		const item = event.target.closest('.item');
		item.style.height = item.scrollHeight;
		item.style.transition = 'background .5s, transform .25s, height .25s';
		if(touch == 1){
			if(event.timeStamp-stamp>2000 && !moved){
				moved = current;
			} else if(moved){
				const move = list.indexOf(moved.id+"");
				const to = list.indexOf(item.id+"");
				list.splice(move, 1);
				list.splice(to, 0, moved.id+"");
				localStorage.setItem("sorted", '{'+list.join()+'}');
				items.insertBefore(moved, items.children[move<to ? to+1 : to]);
				current.style.background = moved.style.background = "#ffffff";
				moved = null;
			} else {
				openNote(item);
			}
		} else if(((event.changedTouches[0].clientX-sx)<-160) && touch==2){
			if(confirm('Delete?')){
				item.style.transform = 'translateX(-100%)';
				item.style.height = '0';
				item.addEventListener('transitionend', function(event) {
					if(event.propertyName != 'height') return;
					list.splice(list.indexOf(item.id+""), 1);
					localStorage.setItem("sorted", '{'+list.join()+'}');
					localStorage.removeItem(item.id+"");
					updCount();
					items.removeChild(item);
				});
				return;
			}
		} else if(((event.changedTouches[0].clientX-sx)>160) && touch==2){
			const n = JSON.parse(localStorage.getItem(item.id+""));
			n.tag = !n.tag;
			localStorage.setItem(current.id+"", JSON.stringify(n));
			current.querySelector('.text').style.background = n.tag ? "#ffff00" : "";
		}
		item.style.transform = 'translateX(0px)';
		item.style.height = 'auto';
	});
}
function open(o){
	edit.style.transition = items.style.transition = 'transform .25s';
	edit.style.transform = 'translateX('+(o ? 0 : 100)+'%)';
	items.style.transform = 'translateX('+(o ? -25 : 0)+'%)';
}