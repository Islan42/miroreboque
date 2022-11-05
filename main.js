const section = document.querySelector('main section');
/*
const para = document.createElement('p');
para.textContent = 'TESTE';

section.appendChild(para);
*/
const url = 'reboques.json';
fetch(url)
	.then((response) => response.json())
	.then((rjson) => parserJson(rjson))
	.catch((error) => console.error('Could not fetch file: ' + error))

function parserJson(json) {
	const ul = document.createElement('ul');
	section.appendChild(ul);
	list = json.lista;
	for (const rbq of list) {
		const article = document.createElement('article');
		const h1 = document.createElement('h1');
		const medidas = document.createElement('p');
		const preco = document.createElement('p');
		const img = document.createElement('img')
		const li = document.createElement('li');
		
		ul.appendChild(li);
		li.appendChild(article);
		article.appendChild(h1);
		article.appendChild(img);
		article.appendChild(preco);
		article.appendChild(medidas);
		
		h1.textContent = rbq.nome;
		medidas.textContent = `${rbq.comp1} x ${rbq.comp2} x ${rbq.altura}`;
		preco.textContent = `R$${rbq.preco},00`; //Substituir pela função imbutida que adiciona dois zeros no final do número
		img.setAttribute('src', `images/${rbq.img}.png`);
	}
}