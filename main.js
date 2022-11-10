const section = document.querySelector('main section');
const form = document.querySelector('aside form');
const disp = document.getElementById('disp');
const preco = document.getElementById('preco');
const tamanho = document.getElementById('tamanho');

document.addEventListener('DOMContentLoaded', () => submitSearch('reboques.json'));

preco.addEventListener('input', () => {
	const output = document.querySelector('#output output');
	output.textContent = preco.value;
});
form.addEventListener('submit', (event) => {
	event.preventDefault();
	submitSearch('reboques.json');
})

function submitSearch(url) {
	fetch(url)
	.then((response) => response.json())
	.then((rjson) => select(rjson.lista))
	.catch((error) => console.error('Could not fetch file: ' + error))
}


function displayContent(list) {
	const ul = document.querySelector('section ul');
	
	while (ul.firstChild) {
		ul.removeChild(ul.firstChild);
	}
	
	if (list.length === 0) {
		const li = document.createElement('li');
		const para = document.createElement('p');
		
		para.textContent = 'Nenhum resultado encontrado. Tente redefinir a busca.';
		
		li.appendChild(para);
		ul.appendChild(li);
	} else {
		for (const rbq of list) {
			const article = document.createElement('article');
			const h1 = document.createElement('h1');
			const medidas = document.createElement('p');
			const preco = document.createElement('p');
			const containerImg = document.createElement('div');
			const img = document.createElement('img')
			const li = document.createElement('li');
			
			ul.appendChild(li);
			li.appendChild(article);
			article.appendChild(h1);
			article.appendChild(containerImg);
			article.appendChild(preco);
			article.appendChild(medidas);
			containerImg.appendChild(img)
			
			h1.textContent = rbq.nome;
			medidas.textContent = `${rbq.comp1} x ${rbq.comp2} x ${rbq.altura}`;
			preco.textContent = `Valor da diária\nR$${rbq.preco},00`; //Substituir pela função imbutida que adiciona dois zeros no final do número
			img.setAttribute('src', `images/a.png`);
			article.className = rbq.disp? 'disponivel' : 'indisponivel';
		}
	}
	
}

function select(list) {
	const newlist = [];
	const precoValue = preco.value;
	const dispValue = disp.checked;
	const tamValue = tamanho.value;
	
	for (const item of list) {
		if ((!dispValue || dispValue === item.disp) && item.preco <= precoValue && (tamValue === 'Todas' || tamValue === item.tamanho)) {
			newlist.push(item);
		}
	}
	displayContent(newlist);
}