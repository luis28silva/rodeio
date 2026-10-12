const ZAP = '5551999999999'; // trocar pelo número real

// ===== PRODUTOS (exemplo: é só editar/adicionar) =====
const produtos = [
  { nome: 'Rapaduras', desc: 'Doces e macias, no ponto certo.', itens: [
    { n: 'Tradicional', d: 'Rapadura pura de cana, feita no tacho.', img: 'imagens/produtos/rapadura1.jpg' },
    { n: 'Com amendoim', d: 'Crocante, com amendoim em pedaços.', img: 'imagens/produtos/rapadura2.jpg' },
    { n: 'Com coco', d: 'Toque de coco ralado.', img: 'imagens/produtos/rapadura3.jpg' }
  ]},
  { nome: 'Paçocas', desc: 'Esfarelam na boca, derretem no coração.', itens: [
    { n: 'Tradicional', d: 'Amendoim moído com açúcar.', img: 'imagens/produtos/passoca1.jpg' },
    { n: 'Rolha', d: 'O clássico formato rolha.', img: 'imagens/produtos/passoca2.jpg' }
  ]},
  { nome: 'Alfajores', desc: 'Macios e recheados com carinho.', itens: [
    { n: 'Doce de leite', d: 'Recheio cremoso de doce de leite.', img: 'imagens/produtos/alfajor1.jpg' },
    { n: 'Chocolate', d: 'Cobertura de chocolate.', img: 'imagens/produtos/alfajor1.jpg' },
    { n: 'Coco', d: 'Com coco ralado por fora.', img: 'imagens/produtos/alfajor2.jpg' }
  ]},
  { nome: 'Amendoim', desc: 'Torrado, doce, crocante e irresistível.', itens: [
    { n: 'Torrado', d: 'Torrado na hora, sabor de roça.', img: 'imagens/produtos/amendoim1.jpg' },
    { n: 'Doce', d: 'Amendoim doce, 400g.', img: 'imagens/produtos/amendoim3.jpg' },
    { n: 'Crocante', d: 'Cobertura crocante de açúcar.', img: 'imagens/produtos/amendoim2.jpg' }
  ]},
  { nome: 'Doces', desc: 'Doce de leite, goiabada e muito mais.', itens: [
    { n: 'Doce de leite', d: 'Cremoso, 400g.', img: 'imagens/produtos/doce1.jpg' },
    { n: 'Goiabada', d: 'Goiabada cascão artesanal.', img: 'imagens/produtos/doce5.jpg' },
    { n: 'Bananada', d: 'Bananada macia.', img: 'imagens/produtos/doce6.jpg' }
  ]},
  { nome: 'Doces', desc: 'Doce de leite, goiabada e muito mais.', itens: [
    { n: 'Doce de leite', d: 'Cremoso, 400g.', img: 'imagens/produtos/doce3.jpg' },
    { n: 'Goiabada', d: 'Goiabada cascão artesanal.', img: 'imagens/produtos/doce5.jpg' },
    { n: 'Bananada', d: 'Bananada macia.', img: 'imagens/produtos/doce2.jpg' }
  ]},
  { nome: 'Doces', desc: 'Doce de leite, goiabada e muito mais.', itens: [
    { n: 'Doce de leite', d: 'Cremoso, 400g.', img: 'imagens/produtos/doce4.jpg' },
    { n: 'Goiabada', d: 'Goiabada cascão artesanal.', img: 'imagens/produtos/doce1.jpg' },
    { n: 'Bananada', d: 'Bananada macia.', img: 'imagens/produtos/doce5.jpg' }
  ]}
  
];

// ===== PONTOS DE VENDA (nomes fictícios, é só editar/adicionar) =====
const pontos = {
  'Presidente Lucena': [
    'Padaria Becker', 'Fruteira do Aleção', 'Mercado Central', 'Mercearia Dona Rosa',
    'Feira Colonial (sábados)', 'Padaria Pão Quente', 'Empório do Campo', 'Mercado Bom Preço'
  ],
  'Ivoti': [
    'Feira Colonial (sábados)', 'Padaria Flor de Trigo', 'Fruteira Sabor da Terra', 'Mercado Ivoti'
  ],
  'Dois Irmãos': [
    'Mercearia Exemplo', 'Padaria do Vale', 'Fruteira Verde Vida'
  ]
};

const $ = id => document.getElementById(id);
const zapLink = txt => `https://wa.me/${ZAP}?text=${encodeURIComponent(txt)}`;

// menu mobile (hambúrguer vira X)
$('burger').onclick = () => {
  const aberto = $('side').classList.toggle('open');
  $('burger').innerHTML = aberto ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
};
$('side').onclick = e => {
  if (e.target.closest('nav a')) {
    $('side').classList.remove('open');
    $('burger').innerHTML = '<i class="fa-solid fa-bars"></i>';
  }
};

// cards
$('cards').innerHTML = produtos.map((p, i) => `
  <button class="card" data-i="${i}">
    <img src="${p.itens[0].img}" alt="${p.nome}" loading="lazy">
    <div><h3>${p.nome}</h3><p>${p.desc}</p><i class="fa-solid fa-circle-arrow-right"></i></div>
  </button>`).join('');
$('cards').onclick = e => {
  const c = e.target.closest('.card');
  if (c) abrir(+c.dataset.i);
};

// modal
let cat = 0;
function abrir(i) {
  cat = i;
  $('mCat').textContent = produtos[i].nome;
  $('chips').innerHTML = produtos[i].itens.map((s, j) => `<button class="chip" data-j="${j}">${s.n}</button>`).join('');
  sabor(0);
  $('modal').hidden = false;
}
function sabor(j) {
  const p = produtos[cat], s = p.itens[j];
  $('mImg').style.opacity = 0;
  setTimeout(() => { $('mImg').src = s.img; $('mImg').style.opacity = 1; }, 120);
  $('mNome').textContent = `${p.nome} — ${s.n}`;
  $('mDesc').textContent = s.d;
  $('mZap').href = zapLink(`Olá! Tenho interesse em ${p.nome} (${s.n}).`);
  document.querySelectorAll('.chip').forEach((c, k) => c.classList.toggle('on', k === j));
}
$('chips').onclick = e => {
  const c = e.target.closest('.chip');
  if (c) sabor(+c.dataset.j);
};
const fechar = () => {
  $('modal').hidden = true;
  $('modalHist').hidden = true;
};

$('fechar').onclick = fechar;
$('modal').onclick = e => { if (e.target === $('modal')) fechar(); };
document.onkeydown = e => { if (e.key === 'Escape') fechar(); };

// onde encontrar
$('cidade').innerHTML = Object.keys(pontos).map(c => `<option>${c}</option>`).join('');

const mostrarPontos = () => {
  const lista = pontos[$('cidade').value] || [];
  $('pontos').innerHTML = lista.length
    ? lista.map(n => `<li>${n}</li>`).join('')
    : '<li>Em breve!</li>';
};

$('cidade').onchange = mostrarPontos;
mostrarPontos(); // já abre com a primeira cidade (Presidente Lucena)

$('zapCidade').href = zapLink('Olá! Gostaria de fazer um pedido de produtos Rodeio.');

// modal história
$('maisHist').onclick = () => { $('modalHist').hidden = false; };
$('fecharHist').onclick = fechar;
$('modalHist').onclick = e => { if (e.target === $('modalHist')) fechar(); };

