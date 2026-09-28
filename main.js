(() => {
  'use strict';

  const DATA = { es: window.PORTFOLIO, en: window.PORTFOLIO_EN };
  const HOST = DATA.es.profile.host;

  const win = document.getElementById('window');
  const screen = document.getElementById('screen');
  const out = document.getElementById('output');
  const form = document.getElementById('prompt-form');
  const input = document.getElementById('cmd');
  const promptEl = document.getElementById('prompt');
  const titleEl = document.getElementById('title');
  const hero = document.getElementById('hero');
  const langBtn = document.getElementById('lang-btn');

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer: fine)').matches;

  const state = { cwd: [], history: [], hIdx: null, draft: '' };

  // Idioma activo: contenido (D, P), textos de la interfaz (T) y sistema de archivos (FS)
  let lang, D, P, T, FS, USER;

  // ---------------------------------------------------------------- utilidades

  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem('pf.' + key); return v === null ? fallback : JSON.parse(v); } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem('pf.' + key, JSON.stringify(value)); } catch { /* sin almacenamiento */ }
    },
  };

  const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

  const span = (cls, html) => `<span class="${cls}">${html}</span>`;
  const err = msg => span('err', esc(msg));
  const chip = (cmd, label = cmd, cls = '') => `<button type="button" class="chip ${cls}" data-cmd="${esc(cmd)}">${esc(label)}</button>`;
  const link = (href, label = href) => `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
  const bareUrl = url => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  // Formato mínimo para los textos de data.js: **negrita** y `comando` clicable
  const fmt = s => esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, (_, c) => `<button type="button" class="chip" data-cmd="${c}">${c}</button>`);

  // Nombre visible de un comando en el idioma activo (internamente se usan los nombres en español)
  const EN_NAMES = { experiencia: 'experience', educacion: 'education', proyectos: 'projects', publicaciones: 'publications', empresa: 'company', contacto: 'contact' };
  const cn = key => (lang === 'en' && EN_NAMES[key]) || key;

  const heading = s => `<div class="section-title">${esc(s)}</div>`;
  const tagList = arr => (arr && arr.length ? `<div class="tags">${arr.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>` : '');
  const next = (...cmds) => `<div class="next">${span('muted', T.next)} ${cmds.map(c => chip(cn(c))).join(' ')}</div>`;

  function print(html, cls = '') {
    const el = document.createElement('div');
    el.className = 'block' + (cls ? ' ' + cls : '');
    el.innerHTML = html;
    out.appendChild(el);
    return el;
  }

  function scrollBottom() {
    screen.scrollTop = screen.scrollHeight;
  }

  // ---------------------------------------------------------------- textos de la interfaz

  const I18N = {
    es: {
      user: 'visitante',
      next: '↳ sigue explorando:',
      kv: { role: 'rol', location: 'ubicación', now: 'ahora' },
      h: { exp: 'experiencia', edu: 'educación', proj: 'proyectos', pubs: 'publicaciones', company: 'empresa', contact: 'contacto', help: 'ayuda', themes: 'temas', lang: 'idioma' },
      fs: { about: 'sobre-mi.txt', exp: 'experiencia', edu: 'educacion', proj: 'proyectos', pubs: 'publicaciones.txt', contact: 'contacto.txt' },
      projNotFound: a => `proyectos: no existe el proyecto '${a}'.`,
      available: 'Disponibles:',
      allProjects: '← todos los proyectos',
      others: '· otros:',
      open: 'abrir →',
      projHint: c => `${span('muted', '↳ abre uno con')} ${span('typed', esc(c) + ' &lt;nombre&gt;')} ${span('muted', 'o pulsa en')} ${span('typed', 'abrir')}`,
      lead: 'especialidad',
      companyRow: 'empresa',
      lsErr: t => `ls: no se puede acceder a '${t}': No existe el archivo o directorio`,
      lsHint: 'usa ls &lt;carpeta&gt; y cat &lt;carpeta&gt;/&lt;archivo&gt;, o pulsa sobre ellos',
      catMissing: 'cat: falta el nombre del archivo.',
      catLook: 'Mira qué hay con',
      catNoFile: a => `cat: ${a}: No existe el archivo o directorio`,
      catIsDir: a => `cat: ${a}: Es un directorio`,
      openDir: 'abrir',
      treeCount: (d, f) => `${d} directorios, ${f} archivos`,
      themes: { verde: ['verde', 'fósforo verde'], ambar: ['ambar', 'monitor ámbar'], dracula: ['dracula', 'dracula'], claro: ['claro', 'claro, para valientes'] },
      current: '← actual',
      themeNotFound: a => `theme: no existe el tema '${a}'.`,
      themeSet: n => `tema: ${n}`,
      crt: on => `efecto CRT ${on ? 'activado' : 'desactivado'}`,
      groups: { sobre: 'sobre mí', nav: 'explorar archivos', sys: 'terminal' },
      tips: 'Atajos: <kbd>Tab</kbd> autocompleta · <kbd>↑</kbd> <kbd>↓</kbd> historial · <kbd>Ctrl</kbd>+<kbd>L</kbd> limpia. Puedes encadenar con <kbd>&amp;&amp;</kbd>.',
      desc: {
        whoami: 'Quién soy, en pocas líneas',
        timeline: 'Mi trayectoria, de los 14 años a hoy',
        experiencia: 'Dónde he trabajado',
        educacion: 'Grado, Erasmus y máster',
        proyectos: 'Resumen de proyectos; con nombre, el detalle',
        publicaciones: 'Mis artículos en CinC y CASEIB',
        skills: 'Con qué trabajo',
        empresa: 'Nódicus, mi consultora de IA',
        contacto: 'Cómo hablar conmigo',
        ls: 'Lista archivos y carpetas',
        cat: 'Muestra un archivo',
        tree: 'Todo el árbol de archivos',
        help: 'Esta ayuda',
        lang: 'Cambia el idioma (es / en)',
        neofetch: 'Información del sistema',
        theme: 'Cambia los colores',
        crt: 'Efecto de monitor antiguo',
        history: 'Comandos que has escrito',
        clear: 'Limpia la pantalla',
      },
      usage: { name: '[nombre]', path: '[ruta]', file: '<archivo>' },
      notFound: n => `${n}: comando no encontrado.`,
      didYouMean: '¿Querías decir',
      typeHelp: ['Escribe', 'para ver la lista.'],
      start: 'Empieza por:',
      or: '· o',
      boot: ['Iniciando portfolio-sh v1.0', `Montando /home/${HOST}`, 'Cargando datasets de trayectoria', 'Cargando modelos (ya estaban entrenados)', 'Sincronizando gemelo digital'],
      langSet: 'Idioma: español',
      langNames: { es: 'español', en: 'inglés' },
      langBtn: 'Switch to English',
      sudoOk: '[sudo] permiso concedido.',
      sudoNo: u => `${u} no está en el archivo sudoers. Este incidente será reportado.`,
      sudoTry: ['(prueba con', 'sudo contratar'],
      rm: ['rm: permiso denegado.', 'Mi trayectoria no se borra tan fácilmente.'],
      exit: 'No hay salida… salvo escribirme:',
      hello: ['¡Hola! Encantado de verte por aquí. Prueba con', '.'],
      vim: n => `${n}: aquí no hay editor. Este portfolio es de solo lectura (y así nadie se queda atrapado en vim).`,
      cafe: 'Recargando energía… listo.',
    },
    en: {
      user: 'visitor',
      next: '↳ keep exploring:',
      kv: { role: 'role', location: 'location', now: 'now' },
      h: { exp: 'experience', edu: 'education', proj: 'projects', pubs: 'publications', company: 'company', contact: 'contact', help: 'help', themes: 'themes', lang: 'language' },
      fs: { about: 'about.txt', exp: 'experience', edu: 'education', proj: 'projects', pubs: 'publications.txt', contact: 'contact.txt' },
      projNotFound: a => `projects: there is no project called '${a}'.`,
      available: 'Available:',
      allProjects: '← all projects',
      others: '· others:',
      open: 'open →',
      projHint: c => `${span('muted', '↳ open one with')} ${span('typed', esc(c) + ' &lt;name&gt;')} ${span('muted', 'or click')} ${span('typed', 'open')}`,
      lead: 'focus',
      companyRow: 'company',
      lsErr: t => `ls: cannot access '${t}': No such file or directory`,
      lsHint: 'use ls &lt;folder&gt; and cat &lt;folder&gt;/&lt;file&gt;, or click on them',
      catMissing: 'cat: missing file name.',
      catLook: 'See what’s there with',
      catNoFile: a => `cat: ${a}: No such file or directory`,
      catIsDir: a => `cat: ${a}: Is a directory`,
      openDir: 'open',
      treeCount: (d, f) => `${d} directories, ${f} files`,
      themes: { verde: ['green', 'green phosphor'], ambar: ['amber', 'amber monitor'], dracula: ['dracula', 'dracula'], claro: ['light', 'light, for the brave'] },
      current: '← current',
      themeNotFound: a => `theme: there is no theme called '${a}'.`,
      themeSet: n => `theme: ${n}`,
      crt: on => `CRT effect ${on ? 'on' : 'off'}`,
      groups: { sobre: 'about me', nav: 'explore files', sys: 'terminal' },
      tips: 'Shortcuts: <kbd>Tab</kbd> autocomplete · <kbd>↑</kbd> <kbd>↓</kbd> history · <kbd>Ctrl</kbd>+<kbd>L</kbd> clear. You can chain commands with <kbd>&amp;&amp;</kbd>.',
      desc: {
        whoami: 'Who I am, in a few lines',
        timeline: 'My path, from age 14 to today',
        experiencia: 'Where I’ve worked',
        educacion: 'Degree, Erasmus and master’s',
        proyectos: 'Project overview; with a name, the details',
        publicaciones: 'My papers at CinC and CASEIB',
        skills: 'What I work with',
        empresa: 'Nódicus, my AI consultancy',
        contacto: 'How to reach me',
        ls: 'List files and folders',
        cat: 'Show a file',
        tree: 'The whole file tree',
        help: 'This help',
        lang: 'Change language (es / en)',
        neofetch: 'System information',
        theme: 'Change the colours',
        crt: 'Old monitor effect',
        history: 'Commands you have typed',
        clear: 'Clear the screen',
      },
      usage: { name: '[name]', path: '[path]', file: '<file>' },
      notFound: n => `${n}: command not found.`,
      didYouMean: 'Did you mean',
      typeHelp: ['Type', 'to see the list.'],
      start: 'Start with:',
      or: '· or',
      boot: ['Starting portfolio-sh v1.0', `Mounting /home/${HOST}`, 'Loading career datasets', 'Loading models (already trained)', 'Syncing digital twin'],
      langSet: 'Language: English',
      langNames: { es: 'Spanish', en: 'English' },
      langBtn: 'Cambiar a español',
      sudoOk: '[sudo] permission granted.',
      sudoNo: u => `${u} is not in the sudoers file. This incident will be reported.`,
      sudoTry: ['(try', 'sudo hire'],
      rm: ['rm: permission denied.', 'My track record doesn’t delete that easily.'],
      exit: 'There’s no way out… except writing to me:',
      hello: ['Hi! Great to see you here. Try', '.'],
      vim: n => `${n}: there’s no editor here. This portfolio is read-only (so nobody gets stuck in vim).`,
      cafe: 'Recharging… done.',
    },
  };

  // ---------------------------------------------------------------- sistema de archivos

  const file = render => ({ type: 'file', render });
  const dir = children => ({ type: 'dir', children });

  function buildFS() {
    const filesOf = (list, render) => dir(Object.fromEntries(list.map(e => [e.file, file(() => render(e))])));
    return dir({
      [T.fs.about]: file(() => about()),
      'timeline.log': file(() => timeline()),
      [T.fs.exp]: filesOf(D.experience, entry),
      [T.fs.edu]: filesOf(D.education, entry),
      [T.fs.proj]: filesOf(D.projects, projectDetail),
      [T.fs.pubs]: file(() => publications()),
      'skills.txt': file(() => skills()),
      [T.fs.contact]: file(() => contact()),
    });
  }

  const pathStr = segs => '~' + segs.map(s => '/' + s).join('');

  function resolve(path = '') {
    const segs = /^[~/]/.test(path) ? [] : state.cwd.slice();
    for (const part of path.replace(/^~/, '').split('/')) {
      if (!part || part === '.') continue;
      if (part === '..') segs.pop();
      else segs.push(norm(part));
    }
    let node = FS;
    for (const s of segs) {
      if (node.type !== 'dir' || !has(node.children, s)) return null;
      node = node.children[s];
    }
    return { node, segs };
  }

  const entryChip = (name, node, segs) => {
    const abs = pathStr([...segs, name]);
    return node.type === 'dir'
      ? chip(`ls ${abs}`, name + '/', 'bare dir')
      : chip(`cat ${abs}`, name, 'bare file');
  };

  // ---------------------------------------------------------------- secciones

  function about() {
    const kv = [[T.kv.role, P.role], [T.kv.location, P.location], [T.kv.now, P.status]].filter(([, v]) => v);
    return heading('whoami') +
      `<div class="about-name">${esc(P.name)}</div>` +
      D.about.map(p => `<p>${fmt(p)}</p>`).join('') +
      `<dl class="kv">${kv.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>` +
      next('timeline', 'experiencia', 'proyectos', 'contacto');
  }

  function timeline() {
    const items = D.timeline.map(t => `
      <div class="tl-item${t.now ? ' now' : ''}">
        <div class="tl-when">${esc(t.when)}</div>
        <div class="tl-body">
          <div class="tl-title">${esc(t.title)}</div>
          <div class="tl-text">${fmt(t.text)}</div>
        </div>
      </div>`).join('');
    return heading('timeline') + `<div class="timeline">${items}</div>` + next('experiencia', 'educacion', 'proyectos');
  }

  function entry(e) {
    return `<article class="entry">
      <div class="entry-head">
        <span class="entry-title">${esc(e.title)}</span>
        ${e.org ? `<span class="entry-org">@ ${esc(e.org)}</span>` : ''}
        ${e.when ? `<span class="entry-when">${esc(e.when)}</span>` : ''}
      </div>
      ${e.sub ? `<div class="entry-sub">${esc(e.sub)}</div>` : ''}
      ${e.bullets && e.bullets.length ? `<ul class="bullets">${e.bullets.map(b => `<li>${fmt(b)}</li>`).join('')}</ul>` : ''}
      ${tagList(e.tags)}
    </article>`;
  }

  const section = (title, list, ...nxt) => heading(title) + list.map(entry).join('') + next(...nxt);

  // Vista completa de un proyecto: cabecera, esquema del proceso y secciones
  function projectDetail(p) {
    const flow = p.flow && p.flow.length
      ? `<div class="flow">${p.flow.map(s => `<span class="flow-step">${esc(s)}</span>`).join('<span class="flow-arrow">→</span>')}</div>`
      : '';
    const sections = (p.sections || []).map(s => `
      <section class="proj-sec">
        <div class="proj-sec-title">${esc(s.title)}</div>
        ${s.text ? `<p>${fmt(s.text)}</p>` : ''}
        ${s.bullets && s.bullets.length ? `<ul class="bullets">${s.bullets.map(b => `<li>${fmt(b)}</li>`).join('')}</ul>` : ''}
      </section>`).join('');
    const links = (p.links || []).map(l => chip(l.cmd, l.label)).join(' ');
    return `<article class="entry project">
      <div class="entry-head">
        <span class="entry-title">${esc(p.title)}</span>
        ${p.org ? `<span class="entry-org">@ ${esc(p.org)}</span>` : ''}
        ${p.when ? `<span class="entry-when">${esc(p.when)}</span>` : ''}
      </div>
      ${p.summary ? `<p class="proj-summary">${fmt(p.summary)}</p>` : ''}
      ${flow}
      ${sections}
      ${tagList(p.tags)}
      ${links ? `<div class="proj-links">${links}</div>` : ''}
    </article>`;
  }

  // `proyectos` lista un resumen de cada uno; `proyectos <id|número>` abre el detalle.
  // Acepta el id en cualquier idioma (p. ej. `projects garantias` en inglés).
  function projects(args) {
    const cmd = cn('proyectos');
    if (args.length) {
      const key = norm(args.join(' '));
      const find = list => list.findIndex((p, n) => key === String(n + 1) || norm(p.id).startsWith(key));
      let i = find(D.projects);
      if (i < 0) i = find(DATA[lang === 'es' ? 'en' : 'es'].projects);
      if (i < 0 || !D.projects[i]) {
        return err(T.projNotFound(args.join(' '))) + ' ' + span('muted', T.available) + ' ' +
          D.projects.map(p => chip(`${cmd} ${p.id}`, p.id)).join(' ');
      }
      const others = D.projects.filter((_, n) => n !== i);
      return heading(`${T.h.proj} / ${D.projects[i].id}`) + projectDetail(D.projects[i]) +
        `<div class="next">${span('muted', '↳')} ${chip(cmd, T.allProjects)} ${span('muted', T.others)} ${others.map(p => chip(`${cmd} ${p.id}`, p.id)).join(' ')}</div>`;
    }
    return heading(T.h.proj) + D.projects.map((p, n) => `
      <div class="proj">
        <span class="pub-n">[${n + 1}]</span>
        <div>
          <div class="entry-head">
            ${chip(`${cmd} ${p.id}`, p.title, 'bare proj-title')}
            ${p.org ? `<span class="entry-org">@ ${esc(p.org)}</span>` : ''}
            ${p.when ? `<span class="entry-when">${esc(p.when)}</span>` : ''}
          </div>
          <div>${fmt(p.short || p.summary || '')}</div>
          <div class="proj-open">${chip(`${cmd} ${p.id}`, T.open)}</div>
        </div>
      </div>`).join('') +
      `<div class="next">${T.projHint(cmd)}</div>`;
  }

  function company() {
    const C = D.company;
    return heading(T.h.company) + `<article class="entry">
      <div class="entry-head">
        <span class="entry-title">${esc(C.name || C.tagline)}</span>
        ${C.since ? `<span class="entry-when">${esc(C.since)}</span>` : ''}
      </div>
      ${C.name ? `<div class="entry-sub">${esc(C.tagline)}</div>` : ''}
      <p>${fmt(C.story)}</p>
      <ul class="bullets">${C.services.map(s => `<li>${fmt(s)}</li>`).join('')}</ul>
      ${C.url ? `<p>${link(C.url, bareUrl(C.url) + ' →')}</p>` : ''}
    </article>` + next('contacto', 'experiencia');
  }

  function publications() {
    return heading(T.h.pubs) + D.publications.map((p, i) => {
      const links = [
        p.pdf && link(p.pdf, '[pdf]'),
        p.doi && link('https://doi.org/' + p.doi, `[doi:${p.doi}]`),
      ].filter(Boolean).join(' ');
      return `
      <div class="pub">
        <span class="pub-n">[${i + 1}]</span>
        <div>
          ${p.authors ? `<div class="pub-authors">${fmt(p.authors)}</div>` : ''}
          <div class="pub-title">${esc(p.title)}</div>
          <div class="pub-venue">${esc(p.venue)}${p.details ? span('muted', ', ' + esc(p.details)) : ''}</div>
          ${p.note ? `<div class="muted">${fmt(p.note)}</div>` : ''}
          ${links ? `<div class="pub-links">${links}</div>` : ''}
        </div>
      </div>`;
    }).join('') + next('proyectos', 'educacion');
  }

  function skills() {
    return heading('skills') +
      (D.skillsLead ? `<p class="skills-lead">${span('muted', T.lead)} ${fmt(D.skillsLead)}</p>` : '') +
      `<dl class="kv skills">${D.skills.map(g => `<dt>${esc(g.group)}</dt><dd>${tagList(g.items)}</dd>`).join('')}</dl>`;
  }

  function contact() {
    const rows = [
      ['email', P.email && `<a href="mailto:${esc(P.email)}">${esc(P.email)}</a>`],
      ['linkedin', P.linkedin && link(P.linkedin, bareUrl(P.linkedin))],
      ['x', P.x && link(P.x, '@' + bareUrl(P.x).split('/').pop())],
      [T.companyRow, D.company.url && link(D.company.url, bareUrl(D.company.url))],
    ].filter(([, v]) => v);
    return heading(T.h.contact) +
      `<p>${fmt(D.contactIntro)}</p>` +
      `<dl class="kv">${rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${v}</dd>`).join('')}</dl>` +
      next('empresa', 'whoami');
  }

  // ---------------------------------------------------------------- comandos de sistema

  function ls(args) {
    const target = args.filter(a => !a.startsWith('-'))[0] || '.';
    const r = resolve(target);
    if (!r) return err(T.lsErr(target));
    if (r.node.type === 'file') return entryChip(r.segs[r.segs.length - 1], r.node, r.segs.slice(0, -1));
    return `<div class="ls">${Object.entries(r.node.children).map(([n, node]) => entryChip(n, node, r.segs)).join('')}</div>` +
      span('muted small', T.lsHint);
  }

  function cat(args) {
    if (!args.length) return err(T.catMissing) + ' ' + span('muted', T.catLook) + ' ' + chip('ls');
    return args.map(a => {
      const r = resolve(a);
      if (!r) return `<div>${err(T.catNoFile(a))}</div>`;
      if (r.node.type === 'dir') return `<div>${err(T.catIsDir(a))} ${chip(`ls ${pathStr(r.segs)}`, T.openDir)}</div>`;
      return r.node.render();
    }).join('');
  }

  function tree() {
    const lines = [span('path', '~')];
    let dirs = 0, files = 0;
    const walk = (node, prefix, segs) => {
      const entries = Object.entries(node.children);
      entries.forEach(([name, child], i) => {
        const last = i === entries.length - 1;
        lines.push(span('muted', prefix + (last ? '└── ' : '├── ')) + entryChip(name, child, segs));
        if (child.type === 'dir') {
          dirs++;
          walk(child, prefix + (last ? '    ' : '│   '), [...segs, name]);
        } else {
          files++;
        }
      });
    };
    walk(FS, '', []);
    return `<div class="pre">${lines.join('\n')}\n\n${span('muted', T.treeCount(dirs, files))}</div>`;
  }

  const THEME_KEYS = ['verde', 'ambar', 'dracula', 'claro'];
  const THEME_ALIASES = { green: 'verde', amber: 'ambar', light: 'claro', dark: 'verde' };

  function setTheme(name) {
    document.documentElement.dataset.theme = name;
    store.set('theme', name);
  }

  function theme(args) {
    const current = document.documentElement.dataset.theme || 'verde';
    let name = norm(args[0] || '');
    if (!name) {
      return heading(T.h.themes) + THEME_KEYS.map(k => {
        const [label, desc] = T.themes[k];
        return `<div>${chip('theme ' + label, label)} ${span('muted', esc(desc))}${k === current ? ' ' + span('ok', T.current) : ''}</div>`;
      }).join('');
    }
    if (name === 'siguiente' || name === 'next') name = THEME_KEYS[(THEME_KEYS.indexOf(current) + 1) % THEME_KEYS.length];
    name = THEME_ALIASES[name] || name;
    if (!THEME_KEYS.includes(name)) {
      return err(T.themeNotFound(args[0])) + ' ' + span('muted', T.available) + ' ' +
        THEME_KEYS.map(k => chip('theme ' + T.themes[k][0], T.themes[k][0])).join(' ');
    }
    setTheme(name);
    return span('ok', '✓') + ' ' + esc(T.themeSet(T.themes[name][0]));
  }

  function crt() {
    const on = win.classList.toggle('crt');
    store.set('crt', on);
    return span('ok', '✓') + ' ' + esc(T.crt(on));
  }

  const LANG_ALIASES = { es: 'es', espanol: 'es', spanish: 'es', castellano: 'es', en: 'en', english: 'en', ingles: 'en' };

  function langCmd(args) {
    let target = norm(args[0] || '');
    if (!target) {
      return heading(T.h.lang) + ['es', 'en'].map(l =>
        `<div>${chip('lang ' + l, l)} ${span('muted', esc(T.langNames[l]))}${l === lang ? ' ' + span('ok', T.current) : ''}</div>`).join('');
    }
    if (target === 'toggle') target = lang === 'es' ? 'en' : 'es';
    target = LANG_ALIASES[target];
    if (!target) return err(`lang: es | en`);
    setLang(target);
    return span('ok', '✓') + ' ' + esc(T.langSet) + ' ' + span('muted', T.next) + ' ' + ['whoami', 'proyectos', 'help'].map(c => chip(cn(c))).join(' ');
  }

  function neofetch() {
    const logo = String.raw`
   ____
  |  _ \
  | |_) |
  |  __/
  |_|`.slice(1);
    const current = document.documentElement.dataset.theme || 'verde';
    const rows = [...D.neofetch, ['Theme', T.themes[current] ? T.themes[current][0] : current]];
    const swatches = ['accent', 'accent2', 'warn', 'err', 'link', 'muted'].map(c => `<i style="background:var(--${c})"></i>`).join('');
    return `<div class="neofetch">
      <pre class="neo-logo">${esc(logo)}</pre>
      <div>
        <div>${span('accent strong', esc(USER))}@${span('accent strong', esc(HOST))}</div>
        <div class="muted">${'-'.repeat(USER.length + HOST.length + 1)}</div>
        ${rows.map(([k, v]) => `<div>${span('accent strong', esc(k))}: ${esc(v)}</div>`).join('')}
        <div class="swatches">${swatches}</div>
      </div>
    </div>`;
  }

  function help() {
    let html = heading(T.h.help);
    for (const [g, label] of Object.entries(T.groups)) {
      const rows = Object.entries(COMMANDS).filter(([, c]) => c.group === g)
        .map(([n, c]) => `<dt>${chip(cn(n))}${c.usage ? ' ' + span('muted', esc(T.usage[c.usage])) : ''}</dt><dd>${esc(T.desc[n])}</dd>`).join('');
      html += `<div class="help-group">${span('muted', '# ' + label)}</div><dl class="kv help">${rows}</dl>`;
    }
    html += `<p class="muted small">${T.tips}</p>`;
    return html;
  }

  const COMMANDS = {
    whoami:        { group: 'sobre', run: about },
    timeline:      { group: 'sobre', run: timeline },
    experiencia:   { group: 'sobre', run: () => section(T.h.exp, D.experience, 'proyectos', 'skills') },
    educacion:     { group: 'sobre', run: () => section(T.h.edu, D.education, 'publicaciones', 'experiencia') },
    proyectos:     { group: 'sobre', usage: 'name', run: projects },
    publicaciones: { group: 'sobre', run: publications },
    skills:        { group: 'sobre', run: skills },
    empresa:       { group: 'sobre', run: company },
    contacto:      { group: 'sobre', run: contact },
    ls:            { group: 'nav', usage: 'path', run: ls },
    cat:           { group: 'nav', usage: 'file', run: cat },
    tree:          { group: 'nav', run: tree },
    help:          { group: 'sys', run: help },
    lang:          { group: 'sys', run: langCmd },
    neofetch:      { group: 'sys', run: neofetch },
    theme:         { group: 'sys', usage: 'name', run: theme },
    crt:           { group: 'sys', run: crt },
    history:       { group: 'sys', run: () => `<div class="pre">${state.history.map((h, i) => span('muted', String(i + 1).padStart(4)) + '  ' + esc(h)).join('\n')}</div>` },
    clear:         { group: 'sys', run: () => { out.innerHTML = ''; } },
  };

  const ALIASES = {
    about: 'whoami', 'sobre-mi': 'whoami', sobremi: 'whoami', bio: 'whoami', quien: 'whoami',
    trayectoria: 'timeline', historia: 'timeline',
    experience: 'experiencia', exp: 'experiencia', trabajo: 'experiencia', work: 'experiencia',
    education: 'educacion', estudios: 'educacion',
    projects: 'proyectos', project: 'proyectos', proyecto: 'proyectos',
    publications: 'publicaciones', papers: 'publicaciones', paper: 'publicaciones',
    skill: 'skills', stack: 'skills', habilidades: 'skills',
    company: 'empresa', startup: 'empresa', consultora: 'empresa',
    contact: 'contacto', contratar: 'contacto', hire: 'contacto', email: 'contacto',
    ll: 'ls', dir: 'ls', open: 'cat', less: 'cat', more: 'cat',
    ayuda: 'help', man: 'help', '?': 'help', comandos: 'help',
    idioma: 'lang', language: 'lang', lengua: 'lang',
    tema: 'theme', cls: 'clear', fetch: 'neofetch',
  };

  // Comandos que no aparecen en la ayuda
  const HIDDEN = {
    sudo: args => /contrat|hire/.test(norm(args.join(' ')))
      ? span('ok', esc(T.sudoOk)) + contact()
      : `${span('err', '[sudo]')} ${esc(T.sudoNo(USER))}<br>${span('muted', T.sudoTry[0])} ${chip(T.sudoTry[1])}${span('muted', ')')}`,
    rm: () => err(T.rm[0]) + ' ' + esc(T.rm[1]),
    exit: () => `${esc(T.exit)} ${chip(cn('contacto'))}`,
    hola: () => `${esc(T.hello[0])} ${chip('whoami')}${T.hello[1]}`,
    vim: (args, name) => esc(T.vim(name)),
    cafe: () => `<div class="pre">${esc('   ( (\n    ) )\n  ........\n  |      |]\n  \\      /\n   `----\'')}</div>${esc(T.cafe)}`,
    ping: () => 'pong',
  };
  Object.assign(HIDDEN, { quit: HIDDEN.exit, logout: HIDDEN.exit, hello: HIDDEN.hola, hi: HIDDEN.hola, nano: HIDDEN.vim, emacs: HIDDEN.vim, vi: HIDDEN.vim, coffee: HIDDEN.cafe });

  // ---------------------------------------------------------------- ejecución

  function levenshtein(a, b) {
    const dp = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      let prev = dp[0];
      dp[0] = i;
      for (let j = 1; j <= b.length; j++) {
        const tmp = dp[j];
        dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
        prev = tmp;
      }
    }
    return dp[b.length];
  }

  function notFound(name) {
    const key = norm(name);
    // Con palabras de 1-2 letras cualquier sugerencia sería casual
    let best = null, bestDist = key.length > 3 ? 3 : key.length > 2 ? 2 : 0;
    for (const c of [...Object.keys(COMMANDS), ...Object.keys(ALIASES)]) {
      const d = levenshtein(key, c);
      if (d < bestDist) { bestDist = d; best = cn(ALIASES[c] || c); }
    }
    print(err(T.notFound(name)) +
      (best ? ` ${esc(T.didYouMean)} ${chip(best)}?` : '') +
      ` ${span('muted', T.typeHelp[0])} ${chip('help')} ${span('muted', T.typeHelp[1])}`);
  }

  function promptHTML() {
    return `<span class="userhost">${esc(USER)}@${esc(HOST)}</span><span class="userhost">:</span><span class="path">${esc(pathStr(state.cwd))}</span><span class="dollar">$</span>`;
  }

  function updatePrompt() {
    promptEl.innerHTML = promptHTML();
    titleEl.textContent = `${USER}@${HOST}: ${pathStr(state.cwd)}`;
  }

  function runOne(line) {
    const [first, ...args] = line.split(/\s+/);
    const key = norm(first);
    const name = ALIASES[key] || key;
    const fn = has(COMMANDS, name) ? COMMANDS[name].run : has(HIDDEN, name) ? HIDDEN[name] : null;
    if (!fn) return notFound(first);
    try {
      const html = fn(args, name);
      if (html) print(html);
    } catch (e) {
      console.error(e);
      print(err(`${name}: ${e.message}`));
    }
  }

  function execute(raw) {
    const cmdEl = print(`<span class="prompt">${promptHTML()}</span> <span class="typed">${esc(raw)}</span>`, 'cmdline');
    const line = raw.trim();
    if (line) {
      if (state.history[state.history.length - 1] !== line) state.history.push(line);
      for (const part of line.split(/\s*(?:&&|;)\s*/)) if (part) runOne(part);
    }
    state.hIdx = null;

    // Si la salida no cabe, deja el comando arriba para leer desde el principio
    if (cmdEl.isConnected && out.scrollHeight - cmdEl.offsetTop > screen.clientHeight) {
      screen.scrollTo({ top: cmdEl.offsetTop - 12, behavior: reduceMotion ? 'auto' : 'smooth' });
    } else {
      scrollBottom();
    }
  }

  // ---------------------------------------------------------------- autocompletado

  function completions(seg) {
    const cmdOnly = seg.match(/^(\s*)(\S*)$/);
    if (cmdOnly) {
      return { head: cmdOnly[1], frag: cmdOnly[2], list: Object.keys(COMMANDS).map(k => cn(k) + ' ') };
    }
    const cut = seg.search(/\S*$/);
    const head = seg.slice(0, cut);
    const frag = seg.slice(cut);
    const first = norm(seg.trim().split(/\s+/)[0]);
    const name = ALIASES[first] || first;

    if (name === 'theme') return { head, frag, list: THEME_KEYS.map(k => T.themes[k][0]) };
    if (name === 'lang') return { head, frag, list: ['es', 'en'] };
    if (name === 'help') return { head, frag, list: Object.keys(COMMANDS).map(cn) };
    if (name === 'proyectos') return { head, frag, list: D.projects.map(p => p.id) };
    if (!['cat', 'ls', 'tree'].includes(name)) return null;

    const slash = frag.lastIndexOf('/');
    const base = frag.slice(0, slash + 1);
    const r = resolve(base || '.');
    if (!r || r.node.type !== 'dir') return null;
    const list = Object.entries(r.node.children)
      .map(([n, node]) => base + n + (node.type === 'dir' ? '/' : ' '));
    return { head, frag, list };
  }

  function complete() {
    const val = input.value;
    const [, before = '', seg] = val.match(/^(.*(?:&&|;)\s*)?(.*)$/s);
    const c = completions(seg);
    if (!c) return;
    const matches = c.list.filter(x => norm(x).startsWith(norm(c.frag)));
    if (!matches.length) return;
    if (matches.length === 1) {
      input.value = before + c.head + matches[0];
      return;
    }
    let common = matches[0];
    for (const m of matches) while (!m.startsWith(common)) common = common.slice(0, -1);
    if (common.length > c.frag.length) {
      input.value = before + c.head + common;
      return;
    }
    print(`<span class="prompt">${promptHTML()}</span> <span class="typed">${esc(val)}</span>`, 'cmdline');
    print(`<div class="ls">${matches.map(m => span('muted', esc(m.trim()))).join('')}</div>`);
    scrollBottom();
  }

  // ---------------------------------------------------------------- eventos

  form.addEventListener('submit', e => {
    e.preventDefault();
    const value = input.value;
    input.value = '';
    execute(value);
  });

  const moveCaretToEnd = () => requestAnimationFrame(() => input.setSelectionRange(input.value.length, input.value.length));

  input.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    if (e.key === 'Tab' && input.value) {
      e.preventDefault();
      complete();
    } else if (e.key === 'ArrowUp') {
      if (!state.history.length) return;
      e.preventDefault();
      if (state.hIdx === null) { state.draft = input.value; state.hIdx = state.history.length; }
      state.hIdx = Math.max(0, state.hIdx - 1);
      input.value = state.history[state.hIdx];
      moveCaretToEnd();
    } else if (e.key === 'ArrowDown') {
      if (state.hIdx === null) return;
      e.preventDefault();
      state.hIdx++;
      if (state.hIdx >= state.history.length) { state.hIdx = null; input.value = state.draft; }
      else input.value = state.history[state.hIdx];
      moveCaretToEnd();
    } else if (e.ctrlKey && key === 'l') {
      e.preventDefault();
      out.innerHTML = '';
    } else if (e.ctrlKey && key === 'c' && input.selectionStart === input.selectionEnd && !String(getSelection())) {
      e.preventDefault();
      print(`<span class="prompt">${promptHTML()}</span> <span class="typed">${esc(input.value)}</span>${span('muted', '^C')}`, 'cmdline');
      input.value = '';
      state.hIdx = null;
      scrollBottom();
    }
  });

  // Mantiene el prompt a la vista mientras se escribe
  input.addEventListener('input', () => form.scrollIntoView({ block: 'nearest' }));

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-cmd]');
    if (btn) {
      if (form.hidden) return;
      execute(btn.dataset.cmd);
      if (finePointer) input.focus({ preventScroll: true });
      return;
    }
    if (e.target.closest('a, button, input')) return;
    if (e.target.closest('#screen') && !String(getSelection()) && !form.hidden) input.focus();
  });

  // ---------------------------------------------------------------- idioma y arranque

  function setLang(l) {
    lang = l;
    D = DATA[l];
    P = D.profile;
    T = I18N[l];
    USER = T.user;
    FS = buildFS();
    document.documentElement.lang = l;
    store.set('lang', l);
    langBtn.textContent = l === 'es' ? 'EN' : 'ES';
    langBtn.title = T.langBtn;
    langBtn.setAttribute('aria-label', T.langBtn);
    updatePrompt();
    if (!hero.hidden) welcome();
  }

  // Cabecera fija: queda fuera de la zona con scroll y no se borra con `clear`
  function welcome() {
    hero.innerHTML = `<div class="hero">` +
      `<pre class="banner" role="img" aria-label="${esc(P.name)}">${esc(D.banner)}</pre>` +
      (D.bannerLabel ? `<span class="banner-label">${esc(D.bannerLabel)}</span>` : '') +
      `</div>` +
      `<div class="welcome-role">${esc(P.role)}</div>` +
      `<div class="start">${span('muted', T.start)} ${['whoami', 'timeline', 'proyectos', 'skills', 'contacto'].map(c => chip(cn(c))).join(' ')} ${span('muted', T.or)} ${chip('help')}</div>`;
    hero.hidden = false;
  }

  // Escribe un comando letra a letra, como si lo tecleara alguien. Si el visitante
  // pulsa una tecla o hace clic, se cancela y le deja el prompt libre.
  async function autoType(cmd) {
    let aborted = false;
    const abort = () => { aborted = true; input.value = ''; };
    addEventListener('keydown', abort, { capture: true, once: true });
    addEventListener('pointerdown', abort, { capture: true, once: true });
    const stop = () => {
      removeEventListener('keydown', abort, { capture: true });
      removeEventListener('pointerdown', abort, { capture: true });
    };
    await wait(reduceMotion ? 0 : 400);
    for (const ch of cmd) {
      if (aborted) return stop();
      input.value += ch;
      if (!reduceMotion) await wait(90);
    }
    if (!reduceMotion) await wait(300);
    stop();
    if (aborted) return;
    input.value = '';
    execute(cmd);
  }

  async function boot() {
    if (store.get('crt', false)) win.classList.add('crt');
    const saved = store.get('lang', null);
    setLang(saved === 'es' || saved === 'en' ? saved : /^es\b/i.test(navigator.language || '') ? 'es' : 'en');

    let skip = reduceMotion;
    const skipBoot = () => { skip = true; };
    addEventListener('keydown', skipBoot);
    addEventListener('pointerdown', skipBoot);
    for (const l of T.boot) {
      if (skip) break;
      print(`${span('muted', '[')}${span('ok', '  OK  ')}${span('muted', ']')} ${esc(l)}`, 'boot');
      scrollBottom();
      await wait(180);
    }
    if (!skip) await wait(250);
    removeEventListener('keydown', skipBoot);
    removeEventListener('pointerdown', skipBoot);

    out.innerHTML = '';
    welcome();
    form.hidden = false;
    input.focus({ preventScroll: true });

    // Permite enlazar directamente a un comando: index.html#timeline
    const hash = decodeURIComponent(location.hash.slice(1)).replace(/\+/g, ' ').trim();
    if (hash) execute(hash);
    else autoType('whoami');
  }

  boot();
})();
