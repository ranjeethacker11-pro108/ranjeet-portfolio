const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
$('#year').textContent = new Date().getFullYear();

$('#themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
  $('#themeToggle').textContent = document.body.classList.contains('light') ? '☾' : '☼';
  localStorage.setItem('portfolio-theme', document.body.classList.contains('light') ? 'light' : 'dark');
});
if (localStorage.getItem('portfolio-theme') === 'light') {
  document.body.classList.add('light'); $('#themeToggle').textContent = '☾';
}
$('#menuToggle').addEventListener('click', () => $('#nav').classList.toggle('open'));
$$('#nav a').forEach(a => a.addEventListener('click', () => $('#nav').classList.remove('open')));

$$('.filter').forEach(btn => btn.addEventListener('click', () => {
  $$('.filter').forEach(b => b.classList.toggle('active', b === btn));
  $$('.skill-card').forEach(card => card.classList.toggle('hidden', btn.dataset.filter !== 'all' && card.dataset.category !== btn.dataset.filter));
}));

const projectInfo = {
  files: {
    index: 'PROJECT / 01',
    title: 'Secure Local File Management System',
    description: 'A personal project setup that makes file management available through a browser and supports access between trusted devices.',
    bullets: ['Hosted a web-based file-management environment using Termux and Apache Server on Android.', 'Integrated Tiny File Manager for browser-based file operations.', 'Configured Tailscale VPN for remote access between trusted devices.', 'Practised Linux command-line, web-server deployment, and networking concepts.']
  },
  irctc: {
    index: 'PROJECT / 02 · CONCEPT',
    title: 'IRCTC Autofill Chrome Extension',
    description: 'A browser-extension concept focused on reducing repetitive entry in railway booking forms.',
    bullets: ['Identified repeated form fields as an opportunity for workflow automation.', 'Explored a Chrome extension approach to autofill selected fields.', 'Intended to improve convenience while keeping users in control of submission and booking steps.']
  }
};
const dialog = $('#projectDialog');
function openProject(key) {
  const p = projectInfo[key]; if (!p) return;
  $('#dialogIndex').textContent = p.index;
  $('#dialogTitle').textContent = p.title;
  $('#dialogDescription').textContent = p.description;
  $('#dialogBullets').replaceChildren(...p.bullets.map(t => { const li=document.createElement('li'); li.textContent=t; return li; }));
  dialog.showModal();
}
$$('.project-card').forEach(card => {
  card.addEventListener('click', () => openProject(card.dataset.project));
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProject(card.dataset.project); } });
});
$('#closeDialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });

$('#copyEmail').addEventListener('click', async () => {
  const email = 'work.ranjeetkumar011@gmail.com';
  try {
    await navigator.clipboard.writeText(email);
    $('#copyStatus').textContent = 'Email copied to clipboard.';
  } catch {
    $('#copyStatus').textContent = 'Email: ' + email;
  }
});
