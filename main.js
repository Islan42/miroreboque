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
			const containerInfo = document.createElement('div');
			const overlay = document.createElement('div')
			const img = document.createElement('img')
			const li = document.createElement('li');
			const button = document.createElement('a');
			
			ul.appendChild(li);
			li.appendChild(article);
			article.appendChild(h1);
			article.appendChild(containerImg);
			article.appendChild(containerInfo)
			containerInfo.appendChild(preco);
			containerInfo.appendChild(medidas);
			containerInfo.appendChild(button);
			containerImg.appendChild(img)
			containerImg.appendChild(overlay);
			
			h1.textContent = rbq.nome;
			medidas.textContent = `${rbq.comp1.toFixed(2)} x ${rbq.comp2.toFixed(2)} x ${rbq.altura.toFixed(2)}`;
			preco.textContent = `Valor da diária\nR$${rbq.preco.toFixed(2)}`;
			button.textContent = 'ALUGAR';
			button.setAttribute('href', '#');
			img.setAttribute('src', `images/a.png`);
			containerInfo.className = 'containerInfo';
			overlay.className = 'overlay';
			article.className = rbq.disp? 'disponivel' : 'indisponivel';
			
			containerImg.addEventListener('click', (e) => openBigArticle(rbq));
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

function openBigArticle(rbq) {
	const article = document.createElement('article');
	const overlay = document.createElement('div');
	const div1 = document.createElement('div');
	const div2 = document.createElement('div');
	const closeBtn = document.createElement('div');
	const alugar = document.createElement('a');
	const containerAlugar = document.createElement('div');
	const bigContainer = document.getElementById('bigContainer');
	
	while(bigContainer.firstChild) {
		bigContainer.removeChild(bigContainer.firstChild)
	}
	
	bigContainer.appendChild(overlay);
	bigContainer.appendChild(article);
	
	article.appendChild(div1);
	article.appendChild(div2);
	article.appendChild(closeBtn);
	article.className = rbq.disp?'bigArticle disponivel':'bigArticle';
	
	createGallery();
	createTable();
	div2.appendChild(containerAlugar);
	containerAlugar.appendChild(alugar);
	alugar.setAttribute('href', '#');
	alugar.textContent = 'ALUGAR';
	
	closeBtn.id = 'closeBtn';
	overlay.id = 'overlayArticle';
	div1.id = 'pictures';
	div2.id = 'table';
	
	closeBtn.addEventListener('click', () => {
		bigContainer.removeChild(overlay);
		bigContainer.removeChild(article);
	});
	
	function createGallery() {
		const picture = document.createElement('img');
		const srcset = ['images/a.png', 'images/b.png', 'images/c.png']
		const containerImg = document.createElement('div');
		const next = document.createElement('div');
		const prev  = document.createElement('div');
		let i = 0
		
		div1.appendChild(containerImg);
		containerImg.appendChild(picture)
		containerImg.appendChild(prev);
		containerImg.appendChild(next);
		
		picture.setAttribute('src', srcset[0]);
		containerImg.id = 'containerImg';
		next.id = 'nextBtn';
		prev.id = 'prevBtn';
		next.addEventListener('click', () => nextPict());
		prev.addEventListener('click', () => prevPict())
		
		function nextPict() {
			if (i >= srcset.length - 1) {
				i = 0;
			} else {
				i ++;
			}
			picture.setAttribute('src', srcset[i]);
		}
		function prevPict() {
			if (i <= 0) {
				i = srcset.length - 1;
			} else {
				i--;
			}
			picture.setAttribute('src', srcset[i]);
		}
	}
	
	function createTable() {
		const table = document.createElement('table');
		const tbody = document.createElement('tbody');
		div2.appendChild(table);
		table.appendChild(tbody);
		
		tbody.innerHTML = 
		`
		<tr>
			<th>Medidas</th>
			<td>${rbq.comp1.toFixed(2)}m x ${rbq.comp2.toFixed(2)}m x ${rbq.altura.toFixed(2)}m</td>
		</tr>
		<tr>
			<th>Status</th>
			<td>${rbq.disp?'Disponível':'Indisponível'}</td>
		</tr>
		<tr>
			<th>Previsão de chegada</th>
			<td>${rbq.disp?'':'Daqui a 12 horas'}</td>
		</tr>
		<tr>
			<th>Valor</th>
			<td>R$${rbq.preco.toFixed(2)}</td>
		</tr>`
	}
}