function del(){
	if(confirm("Delete all notes")){
		localStorage.clear();
	}
}
function cle(){
	text.value = "";
}
function imp(){
	set(text.value);
}
function exp(){
	for(var i=0; i<localStorage.length; i++) {
		const k = localStorage.key(i);
		const v = localStorage.getItem(k);
		text.value += k+v;
	}
}
function sel(){
	text.focus();
	document.execCommand('selectAll', false, null);
}
function copy(){
	sel();
	document.execCommand('copy');
	text.blur();
}
function openFile(event){
	const input = event.target;
	const reader = new FileReader();
	reader.onload = function(){
		set(reader.result);
	};
	reader.readAsText(input.files[0]);
}
function set(t){
	const kv = t.split('}');
	for (var i=0; i<kv.length-1; i++){
		const kv1 = kv[i].split('{');
		localStorage.setItem(kv1[0], '{'+kv1[1]+'}');
	}
}
