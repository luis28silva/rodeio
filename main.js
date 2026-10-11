const ZAP = '5551999999999'; // trocar pelo número real

// ===== PRODUTOS (exemplo: é só editar/adicionar) =====
const produtos = [
  { nome: 'Rapaduras', desc: 'Doces e macias, no ponto certo.', itens: [
    { n: 'Tradicional', d: 'Rapadura pura de cana, feita no tacho.', img: 'img/rapadura-tradicional.jpg' },
    { n: 'Com amendoim', d: 'Crocante, com amendoim em pedaços.', img: 'img/rapadura-amendoim.jpg' },
    { n: 'Com coco', d: 'Toque de coco ralado.', img: 'img/rapadura-coco.jpg' }
  ]},
  { nome: 'Paçocas', desc: 'Esfarelam na boca, derretem no coração.', itens: [
    { n: 'Tradicional', d: 'Amendoim moído com açúcar.', img: 'img/pacoca-tradicional.jpg' },
    { n: 'Rolha', d: 'O clássico formato rolha.', img: 'img/pacoca-rolha.jpg' }
  ]},
  { nome: 'Alfajores', desc: 'Macios e recheados com carinho.', itens: [
    { n: 'Doce de leite', d: 'Recheio cremoso de doce de leite.', img: 'img/alfajor-leite.jpg' },
    { n: 'Chocolate', d: 'Cobertura de chocolate.', img: 'img/alfajor-chocolate.jpg' },
    { n: 'Coco', d: 'Com coco ralado por fora.', img: 'img/alfajor-coco.jpg' }
  ]},
  { nome: 'Amendoim', desc: 'Torrado, doce, crocante e irresistível.', itens: [
    { n: 'Torrado', d: 'Torrado na hora, sabor de roça.', img: 'img/amendoim-torrado.jpg' },
    { n: 'Doce', d: 'Amendoim doce, 400g.', img: 'img/amendoim-doce.jpg' },
    { n: 'Crocante', d: 'Cobertura crocante de açúcar.', img: 'img/amendoim-crocante.jpg' }
  ]},
  { nome: 'Doces', desc: 'Doce de leite, goiabada e muito mais.', itens: [
    { n: 'Doce de leite', d: 'Cremoso, 400g.', img: 'img/doce-leite.jpg' },
    { n: 'Goiabada', d: 'Goiabada cascão artesanal.', img: 'img/doce-goiabada.jpg' },
    { n: 'Bananada', d: 'Bananada macia.', img: 'img/doce-bananada.jpg' }
  ]}
];

// ===== PONTOS DE VENDA (exemplo) =====
const pontos = {
  'Presidente Lucena': [
    { n: 'Mercado Exemplo', e: 'Rua Principal, 100' },
    { n: 'Padaria Exemplo', e: 'Av. Brasil, 250' }
  ],
  'Ivoti': [{ n: 'Feira Colonial (sábados)', e: 'Praça Central' }],
  'Dois Irmãos': [{ n: 'Mercearia Exemplo', e: 'Rua Exemplo, 50' }]
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
const fechar = () => { $('modal').hidden = true; };
$('fechar').onclick = fechar;
$('modal').onclick = e => { if (e.target === $('modal')) fechar(); };
document.onkeydown = e => { if (e.key === 'Escape') fechar(); };

// onde encontrar
$('cidade').innerHTML = '<option value="">Selecione sua cidade</option>' +
  Object.keys(pontos).map(c => `<option>${c}</option>`).join('');
$('cidade').onchange = () => {
  const c = $('cidade').value;
  $('pontos').innerHTML = (pontos[c] || []).map(p => `
    <li><strong>${p.n}</strong><br>${p.e}<br>
    <a target="_blank" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.n + ' ' + p.e + ' ' + c)}">
    <i class="fa-solid fa-location-arrow"></i> Como chegar</a></li>`).join('');
};
$('zapCidade').href = zapLink('Olá! Não encontrei os produtos na minha cidade. Onde posso comprar?');