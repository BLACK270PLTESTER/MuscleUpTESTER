const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse=matchMedia('(pointer:coarse)').matches;
const mobile=matchMedia('(max-width:800px)').matches;
const lowPower=mobile && ((navigator.deviceMemory||4)<=4 || (navigator.hardwareConcurrency||4)<=4);
if(coarse)document.body.classList.add('touch-device');
if(lowPower)document.body.classList.add('low-power');

/* Performance core: one observer, one scroll frame, and no continuous desktop effects on touch devices. */
const revealObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px 120px'});
$$('.reveal').forEach(e=>revealObserver.observe(e));
const glow=$('.cursor-glow');if(glow&&!coarse&&!lowPower)addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true});
let scrollTick=false;addEventListener('scroll',()=>{if(scrollTick)return;scrollTick=true;requestAnimationFrame(()=>{scrollTick=false;const h=document.documentElement.scrollHeight-innerHeight;const p=h?scrollY/h:0;$('#progressLine')?.style.setProperty('width',`${p*100}%`);if(!reduce&&!coarse&&!lowPower&&scrollY<innerHeight){$('.hero-stage')?.style.setProperty('transform',`translateY(${scrollY*.045}px)`);$('.hero-copy')?.style.setProperty('transform',`translateY(${scrollY*.018}px)`)}else{$('.hero-stage')?.style.removeProperty('transform');$('.hero-copy')?.style.removeProperty('transform')}})},{passive:true});

/* Let the browser skip layout/paint work for sections far below the fold on slower phones. */
if(mobile)$$('main>section,footer').forEach(el=>el.style.contentVisibility='auto');

/* Language menu + full-page copy */
const translations={
es:{label:'ES',title:'No entrenes<br><span>en automático.</span><br>Entrena con <em>MuscleUp.</em>',hero:'Una experiencia que entiende tus hábitos, tu progreso y tu salud para acompañarte dentro y fuera del entrenamiento.',nav:['Experiencia','MuscleUp AI','La app','Preguntas'],install:'Instalar app',discover:'Instalar app',explore:'Explorar la app',signals:['CONÓCETE','ENTRENA','EVOLUCIONA'],ticker:['CONÓCETE','ENTRENA','ANALIZA','ADAPTA','MUSCLEUP AI'],exp:'01 / LA EXPERIENCIA',expH:'La primera sesión<br>empieza <em>antes</em><br>del gimnasio.',expP:'MuscleUp empieza por ti: objetivos, experiencia, alimentación, disponibilidad, descanso y el contexto de tu vida real.',app:'05 / DENTRO DE LA APP',ai:'06 / MUSCLEUP AI',screens:'07 / DENTRO DE MUSCLEUP',voice:'08 / LA VOZ',steps:'09 / EL RECORRIDO',faq:'10 / PREGUNTAS',download:'Tu salud y tu entrenamiento<br>están a punto de<br><em>cambiar.</em>',downloadP:'MuscleUp no solo registra series. Te acompaña a entrenar, moverte, descansar, comer mejor y cuidar tu salud.',ready:'¿Estás listo para el día de hoy?',muted:'Voz desactivada',voice:'Voz activa'},
en:{label:'EN',title:'Do not train<br><span>on autopilot.</span><br>Train with <em>MuscleUp.</em>',hero:'An experience that understands your habits, progress and health — inside and outside the gym.',nav:['Experience','MuscleUp AI','The app','Questions'],install:'Install app',discover:'Install app',explore:'Explore the app',signals:['KNOW YOURSELF','TRAIN','EVOLVE'],ticker:['KNOW YOURSELF','TRAIN','ANALYZE','ADAPT','MUSCLEUP AI'],exp:'01 / THE EXPERIENCE',expH:'Your first session<br>starts <em>before</em><br>the gym.',expP:'MuscleUp starts with you: goals, experience, food, availability, recovery and the context of your real life.',app:'05 / INSIDE THE APP',ai:'06 / MUSCLEUP AI',screens:'07 / INSIDE MUSCLEUP',voice:'08 / THE VOICE',steps:'09 / THE JOURNEY',faq:'10 / QUESTIONS',download:'Your health and training<br>are about to<br><em>change.</em>',downloadP:'MuscleUp does more than log sets. It helps you train, move, recover, eat better and care for your health.',ready:'Are you ready for today?',muted:'Voice off',voice:'Voice on'},
ru:{label:'RU',title:'Не тренируйся<br><span>на автопилоте.</span><br>Тренируйся с <em>MuscleUp.</em>',hero:'Опыт, который понимает твои привычки, прогресс и здоровье — в зале и за его пределами.',nav:['Опыт','MuscleUp AI','Приложение','Вопросы'],install:'Установить',discover:'Установить',explore:'Посмотреть приложение',signals:['УЗНАЙ СЕБЯ','ТРЕНИРУЙСЯ','РАСТИ'],ticker:['УЗНАЙ СЕБЯ','ТРЕНИРУЙСЯ','АНАЛИЗИРУЙ','АДАПТИРУЙ','MUSCLEUP AI'],exp:'01 / ОПЫТ',expH:'Первая тренировка<br>начинается <em>до</em><br>зала.',expP:'MuscleUp начинает с тебя: цели, опыт, питание, доступное время, восстановление и реальный контекст твоей жизни.',app:'05 / ВНУТРИ ПРИЛОЖЕНИЯ',ai:'06 / MUSCLEUP AI',screens:'07 / ВНУТРИ MUSCLEUP',voice:'08 / ГОЛОС',steps:'09 / ПУТЬ',faq:'10 / ВОПРОСЫ',download:'Твоё здоровье и тренировки<br>готовы<br><em>измениться.</em>',downloadP:'MuscleUp не просто записывает подходы. Он помогает тренироваться, двигаться, восстанавливаться, питаться и заботиться о здоровье.',ready:'Готов к сегодняшнему дню?',muted:'Голос выключен',voice:'Голос включён'},
pe:{label:'PE',title:'No entrenes<br><span>en automático, causa.</span><br>Entrena con <em>MuscleUp.</em>',hero:'Una experiencia que entiende tus hábitos, tu progreso y tu salud, causa.',nav:['Experiencia','MuscleUp AI','La app','Preguntas'],install:'Instalar app',discover:'Instalar app',explore:'Ver la app',signals:['CONÓCETE CAUSA','ENTRENA CAUSA','EVOLUCIONA CAUSA'],ticker:['CAUSA','ENTRENA','ANALIZA','ADAPTA','MUSCLEUP AI'],exp:'01 / LA EXPERIENCIA',expH:'La primera sesión<br>empieza <em>antes</em><br>del gimnasio, causa.',expP:'MuscleUp empieza por ti: objetivos, alimentación, descanso, movimiento y todo ese contexto de tu día, causa.',app:'05 / DENTRO DE LA APP',ai:'06 / MUSCLEUP AI',screens:'07 / DENTRO DE MUSCLEUP',voice:'08 / LA VOZ',steps:'09 / EL RECORRIDO',faq:'10 / PREGUNTAS',download:'Tu salud y tu entrenamiento<br>van a<br><em>subir de nivel, causa.</em>',downloadP:'MuscleUp no solo registra series, causa. Te acompaña a entrenar, moverte, descansar y cuidarte.',ready:'¿Estás listo para el día de hoy, causa?',muted:'Voz apagada, causa',voice:'Voz activa, causa'}
};
let currentLang='es',peruUnlocked=false;
const langBtn=$('#lang'),langMenu=$('#langMenu');
langBtn?.addEventListener('click',e=>{e.stopPropagation();langMenu?.classList.toggle('open');langBtn.setAttribute('aria-expanded',langMenu?.classList.contains('open')?'true':'false')});
document.addEventListener('click',()=>langMenu?.classList.remove('open'));
langMenu?.addEventListener('click',e=>e.stopPropagation());

function setText(el,text){if(el)el.innerHTML=text}
function applyLanguage(lang){
 const t=translations[lang]||translations.es; currentLang=lang; document.documentElement.lang=lang==='pe'?'es-PE':lang; document.body.dataset.lang=lang;
 if(langBtn)langBtn.innerHTML=`${t.label} ▾`;
 const navLinks=$$('.nav-links a');navLinks.forEach((a,i)=>a.textContent=t.nav[i]||a.textContent);
 $$('.nav-download,.install-trigger').forEach((a,i)=>{if(a.classList.contains('nav-download')||a.classList.contains('button'))a.childNodes[0].textContent=t.install+' '});
 const h1=$('.hero h1');setText(h1,t.title);setText($('.hero-copy>p'),t.hero);
 const heroButtons=$$('.hero-actions .button');if(heroButtons[0])heroButtons[0].childNodes[0].textContent=t.discover+' ';if(heroButtons[1])heroButtons[1].childNodes[0].textContent=t.explore+' ';
 $$('.hero-signals span').forEach((s,i)=>{const n=s.querySelector('b')?.textContent||String(i+1).padStart(2,'0');s.innerHTML=`<b>${n}</b> ${t.signals[i]}`});
 $$('.ticker-track span').forEach((s,i)=>s.textContent=t.ticker[i%t.ticker.length]);
 setText($('.manifesto .section-label'),t.exp);setText($('.manifesto h2'),t.expH);setText($('.manifesto-grid p'),t.expP);setText($('.app-lab .section-label'),t.app);setText($('.ai-section .section-label'),t.ai);setText($('.screens .section-label'),t.screens);setText($('.sound-section .section-label'),t.voice);setText($('.steps .section-label'),t.steps);setText($('.faq .section-label'),t.faq);
 setText($('.download h2'),t.download);setText($('.download p'),t.downloadP);
 const day=$('.day-card b');if(day)day.textContent=t.ready;
 const mute=$('#aiMute');if(mute&&!mute.classList.contains('muted'))mute.setAttribute('title',t.voice);else if(mute)mute.setAttribute('title',t.muted);
 translateAppCards(lang);translateChatPlaceholders(lang);translateAI(lang);
 localStorage.setItem('muscleupLang',lang);
}
function translateAppCards(lang){const es=[['Tu día empieza aquí.','Una vista que reúne entrenamiento, recuperación y hábitos sin llenarte de ruido.'],['La app aprende de ti.','Preferencias, horarios y contexto para que las recomendaciones tengan sentido en tu vida.'],['También importa lo que no entrenas.','Recordatorios para moverte, descansar y cuidar tu salud cuando el trabajo te mantiene sentado.'],['Entrena sin salirte del momento.','Registro rápido, descanso y progreso en una interfaz que desaparece cuando empiezas la serie.'],['Tu progreso tiene memoria.','La app convierte semanas de datos en señales que puedas entender de un vistazo.'],['La app te encuentra en el momento.','Notificaciones con contexto, no una lluvia de recordatorios sin sentido.']];const en=[['Your day starts here.','One view for training, recovery and habits without the noise.'],['The app learns from you.','Preferences, schedules and context make recommendations fit real life.'],['What you do outside the gym matters.','Reminders to move, recover and care for your health when work keeps you seated.'],['Stay inside the moment.','Fast logging, rest and progress in an interface that fades away when you train.'],['Your progress remembers.','Weeks of data become signals you can understand at a glance.'],['The app finds the right moment.','Contextual notifications instead of a stream of meaningless reminders.']];const ru=[['Твой день начинается здесь.','Одна панель для тренировок, восстановления и привычек без лишнего шума.'],['Приложение учится на тебе.','Предпочтения, расписание и контекст делают рекомендации реальными.'],['Важно и то, чего нет в тренировке.','Напоминания двигаться, отдыхать и заботиться о здоровье во время работы.'],['Тренируйся без лишних отвлечений.','Быстрый ввод, отдых и прогресс прямо во время подхода.'],['Прогресс помнит.','Недели данных превращаются в понятные сигналы.'],['Приложение выбирает момент.','Уведомления с контекстом, а не бесконечный поток.']];const arr=lang==='en'?en:lang==='ru'?ru:es;$$('.app-demo-card').forEach((c,i)=>{const h=c.querySelector('h3'),p=c.querySelector('>p');if(h)h.textContent=arr[i][0];if(p)p.textContent=arr[i][1]})}
function translateChatPlaceholders(lang){const input=$('#aiInput');if(input)input.placeholder=lang==='en'?'Describe what is happening…':lang==='ru'?'Опиши, что происходит…':'Describe tu situación…'}
function translateAI(lang){if(lang==='en'){ $$('.demo-prompts button')[0]?.replaceChildren(document.createTextNode("I'm stuck"));$$('.demo-prompts button')[1]?.replaceChildren(document.createTextNode('I slept badly'));$$('.demo-prompts button')[2]?.replaceChildren(document.createTextNode('Should I add weight?'));$$('.demo-prompts button')[3]?.replaceChildren(document.createTextNode('Food & training')); } else if(lang==='ru'){ $$('.demo-prompts button')[0]?.replaceChildren(document.createTextNode('Я застрял'));$$('.demo-prompts button')[1]?.replaceChildren(document.createTextNode('Я плохо спал'));$$('.demo-prompts button')[2]?.replaceChildren(document.createTextNode('Добавить вес?'));$$('.demo-prompts button')[3]?.replaceChildren(document.createTextNode('Питание и тренировка')); } else { $$('.demo-prompts button')[0]?.replaceChildren(document.createTextNode('Estoy estancado'));$$('.demo-prompts button')[1]?.replaceChildren(document.createTextNode('Dormí poco'));$$('.demo-prompts button')[2]?.replaceChildren(document.createTextNode('¿Subo peso?'));$$('.demo-prompts button')[3]?.replaceChildren(document.createTextNode('Comida y entreno')); }}

langMenu?.querySelectorAll('button[data-lang]').forEach(b=>b.addEventListener('click',()=>{const lang=b.dataset.lang;if(lang==='pe'&&!peruUnlocked){showPeruLock();return}applyLanguage(lang)}));
function showPeruLock(){const pass=prompt('🔒 Idioma experimental bloqueado.\nIntroduce la contraseña para desbloquear Perú.');if(pass===null)return;if(pass==='Kevin'){peruUnlocked=true;applyLanguage('pe')}else alert('Contraseña incorrecta. El idioma sigue sin cambiar.')}

/* Onboarding story */
const storySlides=[
`<div class="status">9:41 <span>● ●</span></div><div class="mini-brand">MUSCLEUP</div><div class="onboard-title">¿Qué quieres<br><em>conseguir?</em></div><div class="question">Esto cambia la forma en que te acompañamos.</div><div class="choice selected">Ganar músculo <b>✓</b></div><div class="choice">Ganar fuerza <b>○</b></div><div class="choice">Perder grasa <b>○</b></div><div class="onboard-next">Siguiente <span>→</span></div>`,
`<div class="status">9:41 <span>● ●</span></div><div class="mini-brand">MUSCLEUP</div><div class="onboard-title">También importa<br><em>cómo comes.</em></div><div class="question">¿Cómo suele ser tu alimentación?</div><div class="choice selected">Alta en proteína <b>✓</b></div><div class="choice">Sin una pauta fija <b>○</b></div><div class="choice">Vegetariana <b>○</b></div><div class="onboard-next">Guardar contexto <span>→</span></div>`,
`<div class="status">9:41 <span>● ●</span></div><div class="mini-brand">MUSCLEUP</div><div class="onboard-title">Tu recuperación<br><em>también importa.</em></div><div class="question">¿Cuánto duermes normalmente?</div><div class="choice selected">7 — 8 horas <b>✓</b></div><div class="choice">5 — 6 horas <b>○</b></div><div class="choice">8+ horas <b>○</b></div><div class="onboard-next">Crear mi perfil <span>→</span></div>`
];
function renderStory(i){const box=$('#storyScreen');if(box)box.innerHTML=storySlides[i]};renderStory(0);
const story=$('.onboarding-story');addEventListener('scroll',()=>{if(!story)return;const r=story.getBoundingClientRect();const p=Math.max(0,Math.min(1,(-r.top+innerHeight*.15)/(r.height-innerHeight*.3)));const i=Math.min(2,Math.floor(p*3));renderStory(i);$$('.story-note').forEach((n,k)=>n.classList.toggle('active',k===i))},{passive:true});

/* Product scroll showcase */
const showcase=[{title:'Registra sin romper tu ritmo.',desc:'Peso, repeticiones y descanso. La interfaz desaparece para que tú te concentres.',type:'workout'},{title:'Mira lo que realmente cambió.',desc:'Tu historial deja de ser una lista y se convierte en una historia de rendimiento.',type:'progress'},{title:'Entiende tu contexto.',desc:'Sueño, frecuencia, volumen y sensaciones explican por qué una semana se siente distinta.',type:'context'},{title:'Habla con lo que estás viendo.',desc:'MuscleUp AI conecta preguntas, datos y contexto para ayudarte a pensar el siguiente movimiento.',type:'ai'}];
function screenMarkup(type){if(type==='workout')return `<div class="status">9:41 <span>● ●</span></div><div class="mini-brand">MUSCLEUP / LIVE SESSION</div><div class="hello">PRESS<br><strong>BANCA</strong></div><div class="exercise-card"><div class="ex-head"><span>OBJETIVO</span><b>PR</b></div><strong>82.5<small> kg</small></strong><div class="progress"><i></i></div><div class="ex-foot"><span>3 × 8</span><span>+2.5 kg</span></div></div><div class="sets"><div class="set done"><span>01</span><b>82.5 × 8</b><i>✓</i></div><div class="set"><span>02</span><b>82.5 × 8</b><i>○</i></div></div>`;if(type==='progress')return `<div class="status">9:41 <span>● ●</span></div><div class="mini-brand">MUSCLEUP / HISTORY</div><div class="onboard-title" style="margin:55px 0 35px">Tu fuerza<br><em>subió.</em></div><div class="exercise-card"><div class="ex-head"><span>8 SEMANAS</span><b>+18.4%</b></div><strong>12.4<small>k kg</small></strong><div class="progress"><i style="width:91%"></i></div><div class="ex-foot"><span>VOLUMEN</span><span>MEJOR SEMANA</span></div></div><div class="sets"><div class="set"><span>PRs</span><b>8 nuevos</b><i>↗</i></div><div class="set"><span>Racha</span><b>12 días</b><i>↗</i></div></div>`;if(type==='context')return `<div class="status">9:41 <span>● ●</span></div><div class="mini-brand">MUSCLEUP / CONTEXT</div><div class="onboard-title" style="margin:55px 0 35px">Hoy no es<br><em>un día normal.</em></div><div class="exercise-card"><div class="ex-head"><span>RECUPERACIÓN</span><b>72%</b></div><strong>7h20<small> sueño</small></strong><div class="progress"><i style="width:72%"></i></div><div class="ex-foot"><span>ENERGÍA MEDIA</span><span>VOLUMEN -8%</span></div></div><div class="sets"><div class="set"><span>ESTRÉS</span><b>Moderado</b><i>→</i></div><div class="set"><span>AJUSTE</span><b>Menos series</b><i>✦</i></div></div>`;return `<div class="status">9:41 <span>● ●</span></div><div class="ai-title"><span>✦</span><div><b>MuscleUp AI</b><small>context aware</small></div></div><div class="ai-orb"><i></i><i></i><i></i></div><div class="ai-question">“¿Por qué me siento<br>estancado?”</div><div class="ai-answer">Veo tres señales: subió tu volumen, bajó tu sueño y llevas dos semanas sin un día ligero.</div><div class="voice-wave"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="voice-label">RESPONDIENDO · 00:12</div>`}
function renderShow(i){const s=showcase[i],box=$('#showScreen');if(!box)return;$('#showNumber').textContent=String(i+1).padStart(2,'0');$('#showTitle').textContent=s.title;$('#showDesc').textContent=s.desc;$$('.show-dots i').forEach((d,n)=>d.classList.toggle('active',n===i));box.innerHTML=screenMarkup(s.type)}renderShow(0);
const showcaseSection=$('.scroll-showcase');addEventListener('scroll',()=>{if(!showcaseSection)return;const r=showcaseSection.getBoundingClientRect();const p=Math.max(0,Math.min(1,-r.top/(r.height-innerHeight)));renderShow(Math.min(3,Math.floor(p*4)));const phone=$('.showcase-phone');if(phone&&!reduce&&!matchMedia('(pointer:coarse)').matches)phone.style.transform=`translateY(${Math.sin(p*Math.PI)*-30}px) rotate(${(p-.5)*7}deg)`},{passive:true});

/* App slider — mobile-first touch behavior */
const appSlider=$('#appSlider'),appProgress=$('#appSliderProgress'),mobileHint=$('#mobileSliderHint');
const appCards=appSlider?Array.from(appSlider.querySelectorAll('.app-demo-card')):[];
function updateAppProgress(){if(!appSlider)return;const max=appSlider.scrollWidth-appSlider.clientWidth;const pct=max?Math.max(16.6,Math.min(100,(appSlider.scrollLeft/max)*83.4+16.6)):100;if(appProgress)appProgress.style.width=pct+'%'}
function updateMobileSliderIndex(){if(!appSlider||!mobileHint)return;let best=0,bestDist=Infinity;const center=appSlider.scrollLeft+appSlider.clientWidth/2;appCards.forEach((card,i)=>{const c=card.offsetLeft+card.offsetWidth/2,d=Math.abs(c-center);card.classList.toggle('mobile-active',d<card.offsetWidth*.52);if(d<bestDist){best=i;bestDist=d}});const b=mobileHint.querySelector('b');if(b)b.textContent=String(best+1).padStart(2,'0')+' / '+String(appCards.length).padStart(2,'0')}
$('#appPrev')?.addEventListener('click',()=>appSlider?.scrollBy({left:-appSlider.clientWidth*.86,behavior:'smooth'}));$('#appNext')?.addEventListener('click',()=>appSlider?.scrollBy({left:appSlider.clientWidth*.86,behavior:'smooth'}));
appSlider?.addEventListener('scroll',()=>{updateAppProgress();updateMobileSliderIndex()},{passive:true});addEventListener('resize',()=>{updateAppProgress();updateMobileSliderIndex()});updateAppProgress();updateMobileSliderIndex();
if(appSlider&&'IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('mobile-active')}),{root:appSlider,threshold:.72});appCards.forEach(c=>io.observe(c))}

/* Install modal + device-specific home-screen route */
const modal=$('#installModal'),openInstall=()=>{modal?.classList.add('open');modal?.setAttribute('aria-hidden','false');document.body.classList.add('modal-open')},closeInstall=()=>{modal?.classList.remove('open');modal?.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')};
$('#closeInstall')?.addEventListener('click',closeInstall);modal?.addEventListener('click',e=>{if(e.target===modal)closeInstall()});addEventListener('keydown',e=>{if(e.key==='Escape')closeInstall()});
function detectDevice(){const ua=navigator.userAgent||'',ios=/iPad|iPhone|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1),android=/Android/i.test(ua);return ios?'ios':android?'android':'desktop'}
function downloadWelcome(){const a=document.createElement('a');a.href='videos/BIENVENIDO.mp4';a.download='MuscleUp-Bienvenido.mp4';a.rel='noopener';document.body.appendChild(a);a.click();a.remove();const n=$('#installNote');if(n){n.textContent=currentLang==='en'?'Download started. Welcome to MuscleUp.':currentLang==='ru'?'Загрузка началась. Добро пожаловать в MuscleUp.':'La descarga comenzó. Bienvenido a MuscleUp.';n.classList.add('ok')}}
function openInstallForDevice(device){openInstall();const n=$('#installNote');if(n)n.textContent=device==='ios'?(currentLang==='en'?'iPhone web app: Share → Add to Home Screen. Then it opens without Safari UI.':currentLang==='ru'?'Веб-приложение iPhone: Поделиться → На экран «Домой». После этого оно откроется без интерфейса Safari.':'Web app para iPhone: Compartir → Agregar a pantalla de inicio. Después se abrirá sin la interfaz de Safari.'):(device==='android'?(currentLang==='en'?'Android detected. You can add MuscleUp to Home Screen or download the welcome file.':currentLang==='ru'?'Android обнаружен. Можно добавить MuscleUp на главный экран или скачать файл приветствия.':'Android detectado. Puedes poner MuscleUp en inicio o descargar el archivo de bienvenida.'):(currentLang==='en'?'Choose a route to continue.':currentLang==='ru'?'Выбери путь для продолжения.':'Elige una ruta para continuar.'))}
document.addEventListener('click',e=>{const trigger=e.target.closest?.('.install-trigger');if(!trigger)return;e.preventDefault();e.stopImmediatePropagation();openInstallForDevice(detectDevice())},true);
$('#androidDownload')?.addEventListener('click',e=>{e.preventDefault();downloadWelcome()});
$('#appleDownload')?.addEventListener('click',()=>{const n=$('#installNote');if(!n)return;n.classList.add('ok');n.textContent=detectDevice()==='ios'?(currentLang==='en'?'Add this page to your Home Screen with Share → Add to Home Screen.':currentLang==='ru'?'Добавь страницу на экран «Домой» через Поделиться.':'Agrega esta página a inicio desde Compartir → Agregar a pantalla de inicio.'):(currentLang==='en'?'Use Safari → Share → Add to Home Screen. This is the MuscleUp web app.':currentLang==='ru'?'Открой Safari → Поделиться → На экран «Домой». Это веб-приложение MuscleUp.':'Usa Safari → Compartir → Agregar a pantalla de inicio. Esta es la web app de MuscleUp.')});
let deferredInstallPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstallPrompt=e;document.body.classList.add('pwa-install-ready');const b=$('#homeInstallBtn');if(b)b.textContent='INSTALAR AHORA'});
$('#homeInstallBtn')?.addEventListener('click',async()=>{const type=detectDevice();if(type==='ios'){const n=$('#homeInstallText');if(n)n.textContent='En iPhone: abre esta página en Safari → Compartir → Añadir a pantalla de inicio.';return}if(deferredInstallPrompt){deferredInstallPrompt.prompt();const result=await deferredInstallPrompt.userChoice;deferredInstallPrompt=null;if(result?.outcome==='accepted'){const n=$('#homeInstallText');if(n)n.textContent='MuscleUp quedó añadido a tu pantalla de inicio.'}return}const n=$('#homeInstallText');if(n)n.textContent=type==='android'?'Si el navegador no muestra el instalador, usa su menú → Añadir a pantalla de inicio.':'Busca la opción Instalar aplicación / Añadir a pantalla de inicio en el menú de tu navegador.'});
window.addEventListener('appinstalled',()=>{const n=$('#homeInstallText');if(n)n.textContent='MuscleUp quedó añadido a tu pantalla de inicio.'});
const qr=$('#installQR');if(qr){const qrTarget=new URL(location.href);qrTarget.hash='download';qrTarget.searchParams.set('qr','1');qr.src='https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=8&data='+encodeURIComponent(qrTarget.toString())}
$('#copyInstallLink')?.addEventListener('click',async()=>{try{const u=new URL(location.href);u.searchParams.set('qr','1');u.hash='download';await navigator.clipboard.writeText(u.toString());$('#copyInstallStatus').textContent=' Enlace copiado.'}catch(e){$('#copyInstallStatus').textContent=' Copia la dirección del navegador.'}});
(function handleQRVisit(){const p=new URLSearchParams(location.search);if(p.get('qr')!=='1')return;setTimeout(()=>{downloadWelcome()},900)})();


/* =========================================================
   MUSCLEUP AI — FINAL VOICE ENGINE
   One engine only. Text always works; voice is optional.
   Press-and-hold is supported on desktop/mobile, with click fallback.
   ========================================================= */
class MuscleVoice {
 constructor(){
  this.voices=[]; this.currentVoice=null; this.mode='jarvis'; this.variant='auto'; this.enabled=true; this.speaking=false; this.speakingToken=0;
  this.settings={
   jarvis:{language:'es-MX',preferred:['Microsoft Jorge Online (Natural) - Spanish (Mexico)','Microsoft Jorge','Jorge','Alvaro','Google español de México','Google español','es-MX'],rate:.84,pitch:.70,volume:1},
   siri:{language:'es-MX',preferred:['Microsoft Dalia Online (Natural) - Spanish (Mexico)','Microsoft Dalia','Dalia','Paulina','Monica','Google español de México','Google español','es-MX'],rate:.96,pitch:1.02,volume:1}
  };
  this.loadVoices();
  if('speechSynthesis' in window) window.speechSynthesis.addEventListener?.('voiceschanged',()=>this.loadVoices());
 }
 loadVoices(){if(!('speechSynthesis' in window))return;this.voices=window.speechSynthesis.getVoices()||[];this.selectVoice()}
 selectVoice(){
  const cfg=this.settings[this.mode]; if(!cfg)return null; const es=this.voices.filter(v=>/^es(-|_)/i.test(v.lang)); let selected=null;
  if(this.variant==='loquendo') selected=es.find(v=>/loquendo/i.test(v.name));
  if(!selected) for(const pref of cfg.preferred){const q=pref.toLowerCase();selected=es.find(v=>v.name.toLowerCase().includes(q));if(selected)break}
  if(!selected)selected=es.find(v=>/^es-mx/i.test(v.lang))||es[0]||this.voices[0]||null;
  this.currentVoice=selected; return selected;
 }
 setMode(mode){if(!this.settings[mode])return;this.stop();this.mode=mode;this.variant='auto';this.selectVoice();return this.currentVoice}
 setVariant(v){this.stop();this.variant=v==='loquendo'?'loquendo':'auto';return this.selectVoice()}
 isLoquendoAvailable(){return this.voices.some(v=>/loquendo/i.test(v.name)&&/^es/i.test(v.lang))}
 stop(){this.speakingToken++;if('speechSynthesis'in window){window.speechSynthesis.cancel();window.speechSynthesis.resume?.()}this.speaking=false;document.body.classList.remove('voice-active','ai-speaking');document.dispatchEvent(new CustomEvent('muscleai-finished-speaking'))}
 speak(raw){
  const text=(raw||'').replace(/[*_#`]/g,'').replace(/https?:\/\/\S+/g,'').replace(/\s+/g,' ').trim();
  if(!this.enabled||!text||!('speechSynthesis'in window))return false;
  const token=++this.speakingToken; const cfg=this.settings[this.mode]; this.stop(); this.speakingToken=token; this.selectVoice();
  const u=new SpeechSynthesisUtterance(text); if(this.currentVoice)u.voice=this.currentVoice; u.lang=cfg.language;u.rate=cfg.rate;u.pitch=cfg.pitch;u.volume=cfg.volume;
  u.onstart=()=>{if(token!==this.speakingToken)return;this.speaking=true;document.body.classList.add('voice-active','ai-speaking');document.dispatchEvent(new CustomEvent('muscleai-speaking'))};
  u.onend=u.onerror=()=>{if(token!==this.speakingToken)return;this.speaking=false;document.body.classList.remove('voice-active','ai-speaking');document.dispatchEvent(new CustomEvent('muscleai-finished-speaking'))};
  window.speechSynthesis.speak(u);return true;
 }
 toggle(){this.enabled=!this.enabled;if(!this.enabled)this.stop();return this.enabled}
}
window.MuscleVoice=new MuscleVoice();

/* =========================================================
   MUSCLEUP AI — deterministic demo brain + robust microphone
   ========================================================= */
function obtenerRespuestaDeIA(texto){
 const t=(texto||'').toLowerCase().trim();
 const en=currentLang==='en', ru=currentLang==='ru';
 if(!t)return en?'Tell me what is happening and we will work through it.':ru?'Расскажи, что происходит, и разберём это вместе.':'Cuéntame qué está pasando y lo vemos juntos.';
 if(/^(hola|hey|hello|buenas|hi)\b/.test(t))return en?'Hello. I am MuscleUp AI. Ask me anything about your training, recovery, food or daily movement.':ru?'Привет. Я MuscleUp AI. Спроси меня о тренировках, восстановлении, питании или движении.':'Hola. Soy MuscleUp AI. Pregúntame lo que quieras sobre entrenamiento, recuperación, alimentación o movimiento.';
 if(/cómo te llamas|como te llamas|quién eres|quien eres|what are you|your name/.test(t))return en?'I am MuscleUp AI — your training, recovery and wellbeing assistant.':ru?'Я MuscleUp AI — помощник по тренировкам, восстановлению и самочувствию.':'Soy MuscleUp AI, tu asistente de entrenamiento, recuperación y bienestar.';
 if(/cállate|callate|silencio|shut up/.test(t))return en?'Voice off is one tap away. I will behave... probably.':ru?'Голос можно выключить одной кнопкой. Постараюсь не мешать.':'Puedes apagar la voz con un toque. Me portaré... probablemente.';
 if(/correr|corriendo|carrera|running/.test(t))return en?'If you run every morning, I would first look at weekly volume, intensity, sleep and recovery. More work is not automatically more progress.':'Si corres todas las mañanas, primero revisaría volumen semanal, intensidad, sueño y recuperación. Hacer más no significa automáticamente progresar más.';
 if(/press|banca|estancad|progres/.test(t))return en?'If your press has stalled, check technique, effective volume, recovery and load progression before simply adding more sets.':'Si tu press está estancado, revisaría técnica, volumen efectivo, recuperación y progresión de cargas antes de añadir más series.';
 if(/dorm|sueño|cansad|poco|sleep|tired/.test(t))return en?'If you slept badly, reduce the demand of the session instead of trying to compensate with more work. Recovery is part of training.':ru?'Если ты плохо спал, снизь нагрузку вместо того, чтобы компенсировать это большим объёмом. Восстановление — часть тренировки.':'Si dormiste mal, baja la exigencia de la sesión en vez de compensarlo entrenando más. Recuperarte también es entrenar.';
 if(/comida|aliment|proteína|proteina|nutric|food|protein/.test(t))return en?'Food should match your goal, activity and schedule. For a concrete recommendation I would need your goal, body data, routine and current eating pattern.':'La alimentación debe acompañar tu objetivo, actividad y horarios. Para recomendar algo concreto necesitaría conocer tu objetivo, datos corporales, rutina y cómo comes actualmente.';
 if(/anota|registr|guarda|entrenamiento de hoy|log|record/.test(t))return en?'Tell me the exercises, sets, load and how they felt. I can organize the session in the MuscleUp demo.':'Dime ejercicios, series, carga y cómo se sintieron. Puedo organizar la sesión dentro de la demo de MuscleUp.';
 if(/oficina|sentad|sentado|trabajo|desk|sitting/.test(t))return en?'If you sit for hours, I would add short movement breaks instead of waiting for one big workout to fix the whole day.':'Si pasas horas sentado, añadiría pequeñas pausas de movimiento en vez de esperar que un solo entrenamiento arregle todo el día.';
 if(/ayuda|consejo|qué hago|que hago|cómo mejorar|como mejorar|help|what should i do/.test(t))return en?'Give me your goal, experience, training frequency, sleep and what you want to change. Then we can make the recommendation fit your real life.':'Dame tu objetivo, experiencia, frecuencia de entrenamiento, sueño y qué quieres cambiar. Así podemos adaptar la recomendación a tu vida real.';
 return en?'I understand. Give me your goal, training, recovery and what you are trying to change.':ru?'Понял. Дай цель, тренировки, восстановление и что именно хочешь изменить.':'Entiendo. Dame tu objetivo, entrenamiento, recuperación y qué quieres cambiar.';
}
function addAIMessage(text){const box=$('#chatMessages');if(!box)return;const m=document.createElement('div');m.className='msg ai';m.textContent=text;box.appendChild(m);while(box.children.length>18)box.removeChild(box.firstElementChild);box.scrollTop=box.scrollHeight}
function addUserMessage(text){const box=$('#chatMessages');if(!box)return;const m=document.createElement('div');m.className='msg user';m.textContent=text;box.appendChild(m);box.scrollTop=box.scrollHeight}
async function responderIA(text){
 const clean=(text||'').trim();if(!clean)return;
 addUserMessage(clean);const state=$('#voiceState');if(state)state.textContent='PENSANDO…';
 await new Promise(r=>setTimeout(r,180));const answer=obtenerRespuestaDeIA(clean);addAIMessage(answer);const response=$('#aiResponse');if(response)response.textContent=answer;
 if(state)state.textContent=window.MuscleVoice.enabled?'RESPONDIENDO…':'RESPUESTA LISTA';window.MuscleVoice.speak(answer);return answer;
}
(()=>{
 const input=$('#aiInput'),send=$('#sendBtn'),voiceBtn=$('#voiceBtn'),mute=$('#aiMute'),male=$('#voiceMale'),female=$('#voiceFemale'),loq=$('#voiceLoquendo'),core=$('.voice-core'),talk=$('#aiTalkCore'),state=$('#voiceState');
 const setState=t=>{if(state)state.textContent=t}; const submit=()=>{const t=input?.value.trim();if(!t)return;if(input)input.value='';responderIA(t)};
 send?.addEventListener('click',submit);input?.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();submit()}});
 male?.addEventListener('click',()=>{window.MuscleVoice.setMode('jarvis');male.classList.add('active');female?.classList.remove('active');loq?.classList.remove('active');setState('VOZ HOMBRE · LISTA')});
 female?.addEventListener('click',()=>{window.MuscleVoice.setMode('siri');female.classList.add('active');male?.classList.remove('active');loq?.classList.remove('active');setState('VOZ MUJER · LISTA')});
 loq?.addEventListener('click',()=>{window.MuscleVoice.setVariant('loquendo');loq.classList.add('active');male?.classList.remove('active');female?.classList.remove('active');setState('LOQUENDO-STYLE · PERFIL LISTO')});
 mute?.addEventListener('click',()=>{const on=window.MuscleVoice.toggle();mute.classList.toggle('muted',!on);mute.setAttribute('aria-pressed',String(!on));mute.textContent=on?'🔊':'🔇';setState(on?'VOZ ACTIVA':'SOLO TEXTO')});
 $$('.demo-prompts button').forEach(b=>b.addEventListener('click',()=>{if(input)input.value=b.dataset.q||b.textContent;submit()}));
 let Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;let recognition=null;let listening=false;let pressTimer=null;
 async function micPermission(){if(!navigator.mediaDevices?.getUserMedia)return true;try{const stream=await navigator.mediaDevices.getUserMedia({audio:true});stream.getTracks().forEach(t=>t.stop());return true}catch(err){setState(err?.name==='NotAllowedError'?'MICRÓFONO BLOQUEADO · PERMITE ACCESO EN EL NAVEGADOR':'NO SE ENCONTRÓ UN MICRÓFONO');return false}}
 function startListen(){if(listening)return;if(!Recognition){setState('DICTADO NO DISPONIBLE · ESCRIBE TU MENSAJE');input?.focus();return}micPermission().then(ok=>{if(!ok)return;try{recognition=new Recognition();recognition.lang=currentLang==='en'?'en-US':currentLang==='ru'?'ru-RU':'es-MX';recognition.continuous=false;recognition.interimResults=true;recognition.maxAlternatives=1;listening=true;recognition.onstart=()=>{document.body.classList.add('voice-active');core?.classList.add('listening');talk?.classList.add('listening');setState('ESCUCHANDO · SUELTA PARA ENVIAR')};recognition.onresult=e=>{let text='';for(let i=e.resultIndex;i<e.results.length;i++)text+=e.results[i][0].transcript;if(input)input.value=text};recognition.onerror=e=>{setState(e.error==='not-allowed'?'MICRÓFONO BLOQUEADO · REVISA PERMISOS':e.error==='no-speech'?'NO DETECTÉ VOZ · HABLA MÁS CERCA DEL MICRÓFONO':'ERROR DE MICRÓFONO · INTENTA DE NUEVO')};recognition.onend=()=>{const text=input?.value.trim()||'';listening=false;core?.classList.remove('listening');talk?.classList.remove('listening');document.body.classList.remove('voice-active');if(text)responderIA(text);else setState('PULSA Y HABLA')};recognition.start()}catch(e){listening=false;setState('NO PUDE INICIAR EL MICRÓFONO · INTENTA OTRA VEZ')}})}
 function stopListen(){if(!recognition||!listening)return;try{recognition.stop()}catch{} }
 function bindHold(el){if(!el)return;el.addEventListener('pointerdown',e=>{e.preventDefault();el.setPointerCapture?.(e.pointerId);clearTimeout(pressTimer);pressTimer=setTimeout(startListen,60)},{passive:false});['pointerup','pointercancel','lostpointercapture'].forEach(ev=>el.addEventListener(ev,e=>{e.preventDefault();clearTimeout(pressTimer);if(listening)stopListen()},{passive:false}));el.addEventListener('click',e=>{if(!listening&&(!pressTimer))startListen()});}
 bindHold(voiceBtn);bindHold(core);bindHold(talk);
 document.addEventListener('keydown',e=>{if((e.code==='Space'||e.code==='KeyV')&&document.activeElement!==input&&!e.repeat){e.preventDefault();startListen()}});document.addEventListener('keyup',e=>{if((e.code==='Space'||e.code==='KeyV')&&document.activeElement!==input){e.preventDefault();stopListen()}});
})();

/* Real PWA shell: registers the service worker so an installed iPhone/Android launch can open standalone. */
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));

/* V23 — hide compatibility UI from the public page; device logic remains available to the installer. */
document.body.classList.add('compatibility-hidden');

/* V20 mobile product interactions */
(()=>{
 const track=$('#rotateTrack');
 if(track){
  const cards=[...track.querySelectorAll('.rotate-card')];
  const update=()=>{const center=track.scrollLeft+track.clientWidth/2;cards.forEach(card=>{const phone=card.querySelector('.rotate-phone');if(!phone)return;const c=card.offsetLeft+card.offsetWidth/2;const ratio=Math.max(-1,Math.min(1,(c-center)/(track.clientWidth*.72)));phone.style.transform=`perspective(900px) rotateY(${ratio*11}deg) rotateX(${Math.abs(ratio)*-1.5}deg) scale(${1-Math.abs(ratio)*.045})`})};
  track.addEventListener('scroll',()=>requestAnimationFrame(update),{passive:true});addEventListener('resize',update);update();
 }
 const ctaText={android:'INSTALAR EN ANDROID',ios:'AÑADIR A INICIO',windows:'INSTALAR EN WINDOWS',mac:'INSTALAR EN MAC',desktop:'INSTALAR MUSCLEUP'};
 function deviceType(){const ua=navigator.userAgent||'';if(/iPhone|iPad|iPod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1))return'ios';if(/Android/i.test(ua))return'android';if(/Windows/i.test(ua))return'windows';if(/Macintosh|Mac OS X/i.test(ua))return'mac';return'desktop'}
 const type=deviceType();$$('.install-trigger').forEach(b=>{const text=ctaText[type]||ctaText.desktop;const walker=[...b.childNodes].find(n=>n.nodeType===3&&n.textContent.trim());if(walker)walker.textContent=text+' ';else b.setAttribute('aria-label',text)});
})();

/* Support / donation / rating */
$$('#ratingStars button').forEach(star=>star.addEventListener('click',()=>{const n=Number(star.dataset.rating);$$('#ratingStars button').forEach(s=>s.classList.toggle('active',Number(s.dataset.rating)<=n));const r=$('#ratingResponse');if(!r)return;r.className='rating-response '+(n>=4?'positive':'kind');r.textContent=n>=4?(currentLang==='en'?'Thank you. That means a lot — we will keep building MuscleUp with the same energy.':currentLang==='ru'?'Спасибо. Для нас это много значит — будем развивать MuscleUp с той же энергией.':'Gracias. Significa mucho para nosotros; seguiremos construyendo MuscleUp con la misma energía.'):n===3?(currentLang==='en'?'Thanks for the honest rating. We will keep polishing the experience.':currentLang==='ru'?'Спасибо за честную оценку. Мы продолжим улучшать опыт.':'Gracias por la valoración honesta. Seguiremos puliendo la experiencia.'):(currentLang==='en'?'We hear you. We will do our best to make MuscleUp more useful and closer to what you want.':currentLang==='ru'?'Мы тебя услышали. Постараемся сделать MuscleUp удобнее и ближе к твоим ожиданиям.':'Te escuchamos. Haremos lo posible por que MuscleUp sea más útil y se acerque a lo que tú esperas.');try{localStorage.setItem('muscleupRating',String(n))}catch{}}));
const savedRating=Number(localStorage.getItem('muscleupRating')||0);if(savedRating)$$('#ratingStars button').forEach(s=>s.classList.toggle('active',Number(s.dataset.rating)<=savedRating));
$('#sendIdea')?.addEventListener('click',()=>{const name=$('#ideaName')?.value.trim()||'',idea=$('#ideaText')?.value.trim()||'',status=$('#ideaStatus');if(!idea){if(status)status.textContent=currentLang==='en'?'Write an idea first.':currentLang==='ru'?'Сначала напиши идею.':'Escribe una idea primero.';return}const arr=JSON.parse(localStorage.getItem('muscleupIdeas')||'[]');arr.push({name,idea,date:new Date().toISOString()});localStorage.setItem('muscleupIdeas',JSON.stringify(arr));if(status)status.textContent=currentLang==='en'?'Thanks. Your idea was saved on this device.':currentLang==='ru'?'Спасибо. Идея сохранена на этом устройстве.':'Gracias. Tu idea quedó guardada en este dispositivo.';if($('#ideaText'))$('#ideaText').value='';});
/* Initial language */
applyLanguage(localStorage.getItem('muscleupLang')||'es');

/* Translate the V9 additions without disturbing the V3 visual system. */
const baseApplyLanguageV9=applyLanguage;
applyLanguage=function(lang){
  baseApplyLanguageV9(lang);
  const packs={
    es:{dailyLabel:'08 / UN DÍA CON MUSCLEUP',dailyTitle:'No todo pasa<br><em>en el gimnasio.</em>',dailyIntro:'MuscleUp también está pensado para quien trabaja, estudia, conduce o pasa horas sentado. Estas escenas muestran cómo la app puede aparecer en momentos reales del día.',supportLabel:'11 / APOYA MUSCLEUP',free:'100% GRATUITA',supportTitle:'La app es para todos.<br><em>Y seguirá siéndolo.</em>',supportIntro:'MuscleUp nace para que cuidar tu salud y entender tu entrenamiento no dependa de una suscripción. Si quieres apoyar el proyecto, puedes hacerlo de la forma que más te convenga.',supportBtn:'Apoyar el proyecto',idea:'Dar una idea',panelTitle:'Tu opinión<br><em>también cuenta.</em>',panelText:'¿Qué debería tener MuscleUp después? Déjanos una idea, un problema o una función que quieras ver.',ideaSend:'Enviar sugerencia',ideaNote:'Las sugerencias de esta demo se guardan solo en este dispositivo.'},
    en:{dailyLabel:'08 / A DAY WITH MUSCLEUP',dailyTitle:'Not everything happens<br><em>in the gym.</em>',dailyIntro:'MuscleUp is also built for people who work, study, drive or spend hours sitting. These scenes show how the app can appear in real moments of your day.',supportLabel:'11 / SUPPORT MUSCLEUP',free:'100% FREE',supportTitle:'The app is for everyone.<br><em>And it will stay that way.</em>',supportIntro:'MuscleUp is built so caring for your health and understanding your training does not depend on a subscription. If you want to support the project, choose what feels right.',supportBtn:'Support the project',idea:'Share an idea',panelTitle:'Your opinion<br><em>matters too.</em>',panelText:'What should MuscleUp build next? Leave an idea, a problem or a feature you want to see.',ideaSend:'Send suggestion',ideaNote:'Demo suggestions are saved only on this device.'},
    ru:{dailyLabel:'08 / ДЕНЬ С MUSCLEUP',dailyTitle:'Не всё происходит<br><em>в зале.</em>',dailyIntro:'MuscleUp создан и для тех, кто работает, учится, водит машину или много сидит. Эти сцены показывают приложение в реальных моментах дня.',supportLabel:'11 / ПОДДЕРЖАТЬ MUSCLEUP',free:'100% БЕСПЛАТНО',supportTitle:'Приложение для всех.<br><em>И так будет дальше.</em>',supportIntro:'MuscleUp создан так, чтобы забота о здоровье и понимание тренировок не зависели от подписки. Если хочешь поддержать проект, выбери удобный способ.',supportBtn:'Поддержать проект',idea:'Оставить идею',panelTitle:'Твоё мнение<br><em>тоже важно.</em>',panelText:'Что MuscleUp стоит сделать дальше? Оставь идею, проблему или функцию.',ideaSend:'Отправить',ideaNote:'Идеи из демо сохраняются только на этом устройстве.'},
    pe:{dailyLabel:'08 / UN DÍA CON MUSCLEUP',dailyTitle:'No todo pasa<br><em>en el gimnasio, causa.</em>',dailyIntro:'MuscleUp también está pensado para trabajar, estudiar y pasar horas sentado, causa.',supportLabel:'11 / APOYA MUSCLEUP',free:'100% GRATUITA',supportTitle:'La app es para todos.<br><em>Y seguirá así, causa.</em>',supportIntro:'Cuidar tu salud no debería depender de una suscripción, causa.',supportBtn:'Apoyar el proyecto',idea:'Dar una idea',panelTitle:'Tu opinión<br><em>también cuenta, causa.</em>',panelText:'¿Qué debería tener MuscleUp después, causa?',ideaSend:'Enviar sugerencia',ideaNote:'Las sugerencias se guardan solo en este dispositivo, causa.'}
  };
  const t=packs[lang]||packs.es;
  setText($('#dailyLabel'),t.dailyLabel);setText($('#dailyTitle'),t.dailyTitle);setText($('#dailyIntro'),t.dailyIntro);
  setText($('#supportLabel'),t.supportLabel);setText($('#freeBadge'),t.free);setText($('#supportTitle'),t.supportTitle);setText($('#supportIntro'),t.supportIntro);setText($('#supportBtn'),t.supportBtn);setText($('#ideaLink'),t.idea);setText($('#supportPanelTitle'),t.panelTitle);setText($('#supportPanelText'),t.panelText);setText($('#sendIdea'),t.ideaSend);setText($('#ideaStatus'),t.ideaNote);
  const ph=lang==='en'?'Your name (optional)':lang==='ru'?'Имя (необязательно)': 'Tu nombre (opcional)';const ph2=lang==='en'?'I want MuscleUp to...':lang==='ru'?'Я хочу, чтобы MuscleUp...':'Quiero que MuscleUp...';$('#ideaName')?.setAttribute('placeholder',ph);$('#ideaText')?.setAttribute('placeholder',ph2);
  $$('.daily-card').forEach((c,i)=>{const es=[['Tu día empieza contigo.','Una vista rápida antes de que empiece todo.'],['Tu salud también cuenta.','Recordatorios que aparecen con contexto, no por llenar la pantalla.'],['Cuando entrenas, desaparece el ruido.','Una interfaz pensada para registrar sin romper tu ritmo.'],['También sabe cuándo bajar.','El objetivo no es entrenar más. Es construir una vida más sostenible.']];const en=[['Your day starts with you.','A quick view before everything begins.'],['Your health counts too.','Contextual reminders instead of noise.'],['When you train, the noise disappears.','An interface built to log without breaking your rhythm.'],['It also knows when to slow down.','The goal is not more training. It is a more sustainable life.']];const ru=[['Твой день начинается с тебя.','Быстрый обзор перед началом дня.'],['Здоровье тоже важно.','Напоминания с контекстом, а не шум.'],['Когда ты тренируешься, лишнее исчезает.','Интерфейс для быстрого ввода без отвлечений.'],['Приложение знает, когда замедлиться.','Цель — не больше тренировок, а устойчивый ритм.']];const pe=[['Tu día empieza contigo, causa.','Una vista rápida antes de arrancar.'],['Tu salud también cuenta, causa.','Recordatorios con contexto.'],['Cuando entrenas, desaparece el ruido, causa.','Registra sin romper tu ritmo.'],['También sabe cuándo bajar, causa.','Más sostenible, no solo más fuerte.']];const arr=lang==='en'?en:lang==='ru'?ru:lang==='pe'?pe:es;const h=c.querySelector('h3:last-of-type'),p=c.querySelector('p:last-of-type');if(h)h.textContent=arr[i][0];if(p)p.textContent=arr[i][1]});
};
// Re-apply after wrapping so the new blocks are translated too.
applyLanguage(currentLang);

if('speechSynthesis'in window){speechSynthesis.onvoiceschanged=()=>{window.MuscleVoice?.loadVoices()}}


/* V13 hardening: donation route, rating persistence, and voice state cleanup. */
(()=>{
 const donation=document.querySelector('#donationView');
 const support=document.querySelector('#supportBtn');
 const back=document.querySelector('#donationBack');
 const open=()=>{if(!donation)return;donation.classList.add('open');donation.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');history.pushState({donation:1},'',location.pathname+location.search+'#donation');window.scrollTo({top:0,behavior:'instant'});};
 const close=()=>{if(!donation)return;donation.classList.remove('open');donation.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');if(location.hash==='#donation')history.replaceState({},'',location.pathname+location.search);document.querySelector('#support')?.scrollIntoView({behavior:'smooth',block:'start'});};
 support?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();open()},true);
 back?.addEventListener('click',e=>{e.preventDefault();close()},true);
 window.addEventListener('popstate',()=>{if(donation?.classList.contains('open'))close()});
 if(location.hash==='#donation')open();
 // Make the rating text immediately reflect the selected value after language changes.
 document.querySelectorAll('#ratingStars button').forEach(btn=>btn.setAttribute('aria-checked',btn.classList.contains('active')?'true':'false'));
 document.querySelector('#ratingStars')?.addEventListener('click',()=>{document.querySelectorAll('#ratingStars button').forEach(btn=>btn.setAttribute('aria-checked',btn.classList.contains('active')?'true':'false'))});
})();

/* V14 product demo interactions + voice visualization */
(()=>{
 const demoState=document.querySelector('#interactiveState'),demoTitle=document.querySelector('#interactiveTitle'),demoDesc=document.querySelector('#interactiveDesc'),screen=document.querySelector('#interactiveScreen');
 const data={
  home:['INICIO / TU DÍA','Todo empieza con una vista clara.','Recuperación, energía y el siguiente paso en una sola pantalla.'],
  workout:['ENTRENAR / SESIÓN','Tu entrenamiento, sin ruido.','Series, cargas, descanso y una sugerencia para tu siguiente movimiento.'],
  health:['SALUD / CONTEXTO','También importa cómo estás fuera del gym.','Sueño, movimiento, tiempo sentado y señales de recuperación.'],
  progress:['PROGRESO / HISTORIA','Mira cómo cambia la historia.','PRs, volumen y semanas de constancia convertidos en señales que puedes entender.']
 };
 document.querySelectorAll('.ip-actions button').forEach(btn=>btn.addEventListener('click',()=>{
   const d=data[btn.dataset.demo]||data.home; document.querySelectorAll('.ip-actions button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');
   if(demoState)demoState.textContent=d[0];if(demoTitle)demoTitle.textContent=d[1];if(demoDesc)demoDesc.textContent=d[2];
   if(screen){screen.classList.remove('demo-pulse');void screen.offsetWidth;screen.classList.add('demo-pulse')}
 }));
 const bars=document.querySelectorAll('.voice-orb-bars i');
 const oldSetWave=window.setWave;
 // Existing setWave is lexical, so mirror the same state visually from body class.
 const sync=()=>{document.body.classList.contains('voice-active')?bars.forEach((b,i)=>b.style.animationDelay=(i*45)+'ms'):bars.forEach(b=>b.style.animationDelay='')};
 new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});sync();
})();

/* V14 language layer for the new product-story blocks */
(()=>{
 const packs={
  es:{one:'05.5 / TODO LO QUE BUSCAS',oneh:'Una app.<br><em>Todo tu día.</em>',onep:'No importa si haces gym, CrossFit, calistenia o mezclas disciplinas. MuscleUp busca que tu salud y tu rendimiento tengan un mismo lugar, sin convertirlo en otra app cara y cansada de usar.',gym:'Fuerza & hipertrofia',cross:'Rendimiento',cal:'Control corporal',life:'Salud diaria',day:'05.6 / TU DÍA EN 12 SEGUNDOS',dayh:'La app no desaparece<br><em>cuando sales del gym.</em>',before:'05.7 / ANTES · DESPUÉS',office:'05.8 / MODO OFICINA',hist:'06.5 / TU HISTORIA',know:'06.6 / MUSCLEUP TE CONOCE',freeh:'Todo lo que buscas,<br><em>sin otra suscripción.</em>'},
  en:{one:'05.5 / EVERYTHING YOU LOOK FOR',oneh:'One app.<br><em>Your whole day.</em>',onep:'Whether you train in the gym, CrossFit, calisthenics or a mix, MuscleUp brings health and performance into one place without becoming another expensive app you get tired of.',gym:'Strength & hypertrophy',cross:'Performance',cal:'Body control',life:'Daily health',day:'05.6 / YOUR DAY IN 12 SECONDS',dayh:'The app does not disappear<br><em>when you leave the gym.</em>',before:'05.7 / BEFORE · AFTER',office:'05.8 / OFFICE MODE',hist:'06.5 / YOUR STORY',know:'06.6 / MUSCLEUP KNOWS YOU',freeh:'Everything you look for,<br><em>without another subscription.</em>'},
  ru:{one:'05.5 / ВСЁ, ЧТО ТЕБЕ НУЖНО',oneh:'Одно приложение.<br><em>Весь твой день.</em>',onep:'Зал, CrossFit, калистеника или всё сразу. MuscleUp объединяет здоровье и результат в одном месте, без ещё одной дорогой и утомительной подписки.',gym:'Сила и гипертрофия',cross:'Результат',cal:'Контроль тела',life:'Здоровье каждый день',day:'05.6 / ТВОЙ ДЕНЬ ЗА 12 СЕКУНД',dayh:'Приложение не исчезает<br><em>после зала.</em>',before:'05.7 / ДО · ПОСЛЕ',office:'05.8 / РЕЖИМ ОФИСА',hist:'06.5 / ТВОЯ ИСТОРИЯ',know:'06.6 / MUSCLEUP ЗНАЕТ ТЕБЯ',freeh:'Всё, что тебе нужно,<br><em>без новой подписки.</em>'},
  pe:{one:'05.5 / TODO LO QUE BUSCAS, CAUSA',oneh:'Una app.<br><em>Todo tu día, causa.</em>',onep:'Gym, CrossFit, calistenia o mezcla, causa. MuscleUp junta salud y rendimiento en un solo lugar, sin otra app cara que te canse.',gym:'Fuerza & hipertrofia',cross:'Rendimiento',cal:'Control corporal',life:'Salud diaria',day:'05.6 / TU DÍA EN 12 SEGUNDOS, CAUSA',dayh:'La app no desaparece<br><em>cuando sales del gym, causa.</em>',before:'05.7 / ANTES · DESPUÉS',office:'05.8 / MODO OFICINA',hist:'06.5 / TU HISTORIA',know:'06.6 / MUSCLEUP TE CONOCE',freeh:'Todo lo que buscas,<br><em>sin otra suscripción, causa.</em>'}
 };
 function applyStoryLang(lang){const t=packs[lang]||packs.es;const q=(sel,val)=>{const e=document.querySelector(sel);if(e)e.innerHTML=val};q('.all-in-one .section-label',t.one);q('.all-in-head h2',t.oneh);q('.all-in-head p',t.onep);const ds=document.querySelectorAll('.discipline-grid article b');[t.gym,t.cross,t.cal,t.life].forEach((x,i)=>{if(ds[i])ds[i].textContent=x});q('.day-timeline .section-label',t.day);q('.timeline-head h2',t.dayh);q('.before-after .section-label',t.before);q('.office-mode .section-label',t.office);q('.progress-timeline .section-label',t.hist);q('.knows-you .section-label',t.know);q('.free-panel h2',t.freeh)}
 document.querySelectorAll('#langMenu button[data-lang]').forEach(b=>b.addEventListener('click',()=>{setTimeout(()=>applyStoryLang(document.body.dataset.lang||'es'),30)}));applyStoryLang(document.body.dataset.lang||'es');
})();

/* V21 DEVICE / INSTALL STATUS — no automatic device check */
(function(){
 const setStatus=(type)=>{
  const names={android:'Android · APK',ios:'iPhone / iPad',windows:'Windows',mac:'Mac',other:'Dispositivo'};
  const name=$('#deviceName'),comp=$('#deviceCompatibility'),inst=$('#deviceInstallSteps'),br=$('#deviceBrowser'),mark=$('#deviceCheckMark'),mode=$('#deviceMode'),icon=$('#deviceIcon'),note=$('#deviceRouteNote');
  const available=type==='android';
  if(name)name.textContent=names[type]||names.other;
  if(comp)comp.textContent=available?'✓ DISPONIBLE':'PRÓXIMAMENTE';
  if(inst)inst.textContent=type==='ios'?'ALTERNATIVA WEB':'PRÓXIMAMENTE';
  if(br)br.textContent=type==='android'?'APK':'PRÓXIMAMENTE';
  if(mark)mark.textContent=available?'✓':'…';
  if(mode)mode.textContent=available?'ANDROID READY':'COMING SOON';
  const icons={android:'◆',ios:'●',windows:'▦',mac:'◌',other:'◉'};if(icon)icon.textContent=icons[type]||icons.other;
  $$('[data-platform]').forEach(x=>x.classList.toggle('active',x.dataset.platform===type));
  if(note)note.textContent=type==='android'?'Android: APK disponible para la primera etapa.':type==='ios'?'iPhone/iPad: web app instalable desde Safari, sin App Store.':type==='windows'?'Windows: próximamente.':'Mac: próximamente.';
 };
 const detect=()=>{const ua=navigator.userAgent||'',p=navigator.platform||'';const ios=/iPhone|iPad|iPod/i.test(ua)||(/Mac/i.test(p)&&navigator.maxTouchPoints>1);if(/Android/i.test(ua))return'android';if(ios)return'ios';if(/Win/i.test(p)||/Windows/i.test(ua))return'windows';if(/Mac/i.test(p)||/Macintosh/i.test(ua))return'mac';return'other'};
 $('#deviceVerifyTrigger')?.addEventListener('click',()=>{const type=detect();setStatus(type);document.querySelector('#device-check')?.scrollIntoView({behavior:'smooth',block:'center'});});
 // Keep the public installer status honest: Android is the only official download route for now.
 setStatus('android');
 const qr=$('#installQR');if(qr){const u=new URL(location.href);u.hash='download';u.searchParams.set('qr','1');qr.src='https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data='+encodeURIComponent(u.toString())}
 $('#copyInstallLink')?.addEventListener('click',async()=>{try{const u=new URL(location.href);u.hash='download';u.searchParams.set('qr','1');await navigator.clipboard.writeText(u.toString());$('#copyInstallStatus').textContent=' Enlace copiado.'}catch{if($('#copyInstallStatus'))$('#copyInstallStatus').textContent=' Copia la dirección del navegador.'}});
})();

/* V17 UPDATE NOTICE + LEGACY MODE */
(function(){
 const APP_VERSION=20;
 const banner=$('#updateBanner'), title=$('#updateTitle'), txt=$('#updateText'), now=$('#updateNow'), later=$('#updateLater');
 const legacy=$('#legacyBanner'), legacyClose=$('#legacyClose');
 const showUpdate=(version,data={})=>{if(!banner||version<=APP_VERSION)return;const official=Boolean(data.officialApp);title.textContent=official?'MUSCLEUP YA ESTÁ DISPONIBLE.':`MuscleUp ${version} ya está disponible.`;txt.textContent=official?(data.message||'La app oficial ya está disponible. Abre la nueva versión desde aquí.'):(data.message||'Hay una actualización con mejoras de rendimiento, compatibilidad y experiencia de voz.');banner.classList.add('show');banner.setAttribute('aria-hidden','false')};
 const dismiss=()=>{banner?.classList.remove('show');banner?.setAttribute('aria-hidden','true')};
 later?.addEventListener('click',dismiss);
 now?.addEventListener('click',()=>{try{localStorage.setItem('muscleup-update-seen',String(APP_VERSION+1))}catch{};dismiss();location.reload()});
 const seen=Number(localStorage.getItem('muscleup-update-seen')||0);
 const params=new URLSearchParams(location.search); const forced=Number(params.get('update')||0);
 if(forced>APP_VERSION)showUpdate(forced,{message:'Actualización de prueba disponible.'});
 fetch('update.json',{cache:'no-store'}).then(r=>r.ok?r.json():null).then(d=>{if(d?.version&&Number(d.version)>APP_VERSION&&Number(d.version)>seen)showUpdate(Number(d.version),d)}).catch(()=>{});
 if(document.body.classList.contains('device-low')){setTimeout(()=>{legacy?.classList.add('show');legacy?.setAttribute('aria-hidden','false')},900)}
 legacyClose?.addEventListener('click',()=>{legacy.classList.remove('show');legacy.setAttribute('aria-hidden','true')});
})();


/* V21 language coverage for installer + AI controls */
(()=>{
 const packs={
  es:{device:'MuscleUp ya puede vivir en tu iPhone.<br><em>Como una web app.</em>',intro:'En iPhone puedes añadir MuscleUp a la pantalla de inicio desde Safari. Al abrirlo desde el icono, la landing desaparece y entra directamente la experiencia de app. Windows y Mac quedan para una siguiente etapa.',android:'ANDROID · DISPONIBLE',ios:'IPHONE / IPAD · WEB APP',win:'WINDOWS · PRÓXIMAMENTE',mac:'MAC · PRÓXIMAMENTE',verify:'Verificar dispositivo',windows:'Próximamente.',iphone:'Alternativa sin App Store.',jarvis:'♂ HOMBRE',siri:'♀ MUJER',loq:'LOQUENDO',talk:'PULSAR Y HABLAR'},
  en:{device:'MuscleUp can already live on your iPhone.<br><em>As a web app.</em>',intro:'On iPhone, add MuscleUp to the Home Screen from Safari. When opened from its icon, the landing page disappears and the app experience opens directly. Windows and Mac come later.',android:'ANDROID · AVAILABLE',ios:'IPHONE / IPAD · WEB APP',win:'WINDOWS · COMING SOON',mac:'MAC · COMING SOON',verify:'Verify device',windows:'Coming soon.',iphone:'Alternative without App Store.',jarvis:'♂ MALE',siri:'♀ FEMALE',loq:'LOQUENDO',talk:'PRESS TO SPEAK'},
  ru:{device:'MuscleUp уже может жить на iPhone.<br><em>Как веб-приложение.</em>',intro:'На iPhone добавь MuscleUp на экран «Домой» через Safari. При запуске с иконки лендинг скрывается и открывается интерфейс приложения. Windows и Mac появятся позже.',android:'ANDROID · ДОСТУПНО',ios:'IPHONE / IPAD · WEB APP',win:'WINDOWS · СКОРО',mac:'MAC · СКОРО',verify:'Проверить устройство',windows:'Скоро.',iphone:'Альтернатива без App Store.',jarvis:'♂ МУЖСКОЙ',siri:'♀ ЖЕНСКИЙ',loq:'LOQUENDO',talk:'НАЖМИ И ГОВОРИ'}
 };
 const apply=()=>{const l=document.body.dataset.lang||'es',t=packs[l]||packs.es;setText($('#deviceCheckTitle'),t.device);setText($('#deviceCheckIntro'),t.intro);const ps=$$('.device-platforms span');if(ps[0])ps[0].textContent=t.android;if(ps[1])ps[1].textContent=t.ios;if(ps[2])ps[2].textContent=t.win;if(ps[3])ps[3].textContent=t.mac;setText($('#deviceVerifyTrigger'),t.verify);setText($('#voiceMale'),t.jarvis);setText($('#voiceFemale'),t.siri);setText($('#voiceLoquendo'),t.loq);const tc=$('#aiTalkCore b');if(tc)tc.textContent=t.talk;};
 document.querySelectorAll('#langMenu button[data-lang]').forEach(b=>b.addEventListener('click',()=>setTimeout(apply,40)));apply();
})();

/* V26 — unified iPhone PWA experience + real AI adapter.
   The public landing page stays untouched. The iPhone app only opens when
   Safari launches the site as a Home Screen web app (standalone display mode).
*/
(()=>{
 const ua=navigator.userAgent||'';
 const ios=/iPhone|iPad|iPod/i.test(ua)||(/Macintosh/i.test(ua)&&navigator.maxTouchPoints>1);
 if(!ios)return;
 document.body.classList.add('ios-device');
 const app=document.querySelector('#iosOnlyApp');
 if(!app)return;
 const $i=s=>document.querySelector(s), $$i=s=>[...document.querySelectorAll(s)];
 const standalone=window.navigator.standalone===true||window.matchMedia('(display-mode: standalone)').matches;
 const open=()=>{document.body.classList.add('ios-app-open');app.setAttribute('aria-hidden','false');updateClock();loadState();};
 if(standalone)open();

 // Keep the landing page completely intact when the user is browsing normally.
 const screens=$$i('.ios-screen'),tabs=$$i('.ios-tabbar button');
 const showScreen=id=>{screens.forEach(x=>x.classList.toggle('active',x.dataset.iosScreen===id));tabs.forEach(x=>x.classList.toggle('active',x.dataset.iosTab===id));$i('.ios-app-main')?.scrollTo({top:0,behavior:'smooth'});};
 tabs.forEach(b=>b.addEventListener('click',()=>showScreen(b.dataset.iosTab)));
 $$i('[data-ios-action]').forEach(b=>b.addEventListener('click',()=>{const a=b.dataset.iosAction;if(a==='train')showScreen('train');else if(a==='health')showScreen('health');else if(a==='office')showScreen('office');else if(a==='quick'){localStorage.setItem('muscleup-ios-quick','1');showScreen('train');$i('#iosWorkoutTitle').textContent='Express · 20 min';$i('#iosWorkoutDesc').textContent='Cuerpo completo · mínimo efectivo';$i('#iosAdaptiveText').textContent='Activé una sesión de 20 min porque hoy vas con prisa.';}}));

 function updateClock(){const d=new Date(),el=$i('#iosClock');if(el)el.textContent=d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}).replace(/^0/,'');}
 setInterval(updateClock,30000);
 function loadState(){try{const n=localStorage.getItem('muscleup-app-name');if(n&&$i('#iosGreeting'))$i('#iosGreeting').textContent=`Buenos días, ${n}.`;const feel=localStorage.getItem('muscleup-ios-feel');if(feel)$i('#iosContextLine').textContent=`Hoy te sientes ${feel.toLowerCase()}. MuscleUp ajustará el día a partir de eso.`;}catch{}}
 $i('#iosProfile')?.addEventListener('click',()=>{const current=localStorage.getItem('muscleup-app-name')||'';const n=window.prompt('¿Cómo quieres que te llame MuscleUp?',current);if(n!==null){const clean=n.trim().slice(0,40)||'atleta';localStorage.setItem('muscleup-app-name',clean);if($i('#iosGreeting'))$i('#iosGreeting').textContent=`Buenos días, ${clean}.`;}});
 $i('#iosQuickCheck')?.addEventListener('click',()=>{$i('#iosCheckinSheet')?.classList.add('show');$i('#iosCheckinSheet')?.setAttribute('aria-hidden','false')});
 $i('#iosSheetClose')?.addEventListener('click',()=>{$i('#iosCheckinSheet')?.classList.remove('show');$i('#iosCheckinSheet')?.setAttribute('aria-hidden','true')});
 $$i('.ios-time-options button,.ios-energy-options button').forEach(b=>b.addEventListener('click',()=>{b.parentElement.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active')}));
 $$i('[data-feel]').forEach(b=>b.addEventListener('click',()=>{ $$i('[data-feel]').forEach(x=>x.classList.remove('active'));b.classList.add('active');localStorage.setItem('muscleup-ios-feel',b.dataset.feel);$i('#iosContextLine').textContent=`Hoy te sientes ${b.dataset.feel}. MuscleUp ajustará el día a partir de eso.`;if(b.dataset.feel==='agotado'){$i('#iosReadiness').textContent='51';$i('#iosReadinessReason').textContent='Baja intensidad recomendada. Recuperar también es progreso.'}else if(b.dataset.feel==='fuerte'){$i('#iosReadiness').textContent='91';$i('#iosReadinessReason').textContent='Buen momento para una sesión exigente.'}}));
 $i('#iosApplyCheckin')?.addEventListener('click',()=>{const t=$i('.ios-time-options .active')?.dataset.time||'45 min',e=$i('.ios-energy-options .active')?.dataset.energy||'Normal';$i('#ctxTime').textContent=t;$i('#ctxEnergy').textContent=e;if(t==='15 min'){$i('#iosWorkoutTitle').textContent='Express · 15 min';$i('#iosWorkoutDesc').textContent='Mínimo efectivo · cuerpo completo'}else if(t==='30 min'){$i('#iosWorkoutTitle').textContent='Fuerza · 28 min';$i('#iosWorkoutDesc').textContent='Prioridad muscular · sin relleno'}if(e==='Baja'){$i('#iosReadiness').textContent='54';$i('#iosReadinessReason').textContent='Hoy conviene bajar carga y conservar energía.'}if(e==='Alta'){$i('#iosReadiness').textContent='92';$i('#iosReadinessReason').textContent='Puedes apretar un poco más si la técnica sigue limpia.'}$i('#iosCheckinSheet')?.classList.remove('show');showScreen('home')});
 $i('#iosStartWorkout')?.addEventListener('click',()=>{localStorage.setItem('muscleup-ios-workout-start',String(Date.now()));$i('#iosStartWorkout').innerHTML='SESIÓN ACTIVA <span>●</span>';$i('#iosCoachText').textContent='Sesión iniciada. Yo vigilo el contexto; tú concéntrate en moverte bien.'});
 $i('#iosChangeWorkout')?.addEventListener('click',()=>{$i('#iosAdaptiveText').textContent='Dime qué equipo tienes y cuánto tiempo queda. La sesión se reconstruye.';$i('#iosAdaptiveGo').click()});
 $i('#iosAdaptiveGo')?.addEventListener('click',()=>showScreen('train'));
 let sit=42*60+18;setInterval(()=>{sit++;const m=String(Math.floor(sit/60)).padStart(2,'0'),s=String(sit%60).padStart(2,'0');if($i('#iosSitTime'))$i('#iosSitTime').textContent=`${m}:${s}`},1000);
 $i('#iosOfficeStart')?.addEventListener('click',()=>{$i('#iosOfficeStart').textContent='PAUSA ACTIVA · 03:00';$i('#iosOfficeStart').disabled=true;let left=180;const tm=setInterval(()=>{left--;const m=String(left/60|0).padStart(2,'0'),s=String(left%60).padStart(2,'0');$i('#iosOfficeStart').textContent=`PAUSA ACTIVA · ${m}:${s}`;if(left<=0){clearInterval(tm);$i('#iosOfficeStart').textContent='PAUSA COMPLETADA';$i('#iosOfficeStart').disabled=false}},1000)});

 // --- MuscleUp AI ---------------------------------------------------------
 const input=$i('#iosAiInput'),send=$i('#iosAiSend'),mic=$i('#iosAiMic'),mute=$i('#iosAiMute'),chat=$i('#iosAiChat'),orb=$i('#iosAiOrb'),status=$i('#iosAiStatus'),profileName=$i('#iosAiProfileName'),cloud=$i('#iosAiCloudState');
 let recognition=null,listening=false,pressTimer=null,voiceEnabled=true,currentProfile=localStorage.getItem('muscleup-voice-profile')||'jarvis',voices=[];
 const profiles={
  jarvis:{label:'JARVIS · HOMBRE',lang:'es-MX',rate:.82,pitch:.70,tts:'onyx',style:'asistente masculino cinematográfico, grave, sereno, preciso, con pausas cortas y tono tecnológico'},
  siri:{label:'SIRI-STYLE · MUJER',lang:'es-MX',rate:.96,pitch:1.04,tts:'nova',style:'asistente femenina muy clara, natural, cálida, concisa y elegante'},
  loquendo:{label:'LOQUENDO-STYLE',lang:'es-MX',rate:.88,pitch:.74,tts:'onyx',style:'voz masculina sintética y marcada, grave, articulación precisa, estilo TTS clásico'},
  calm:{label:'HOMBRE · CALMA',lang:'es-MX',rate:.74,pitch:.84,tts:'sage',style:'voz masculina calmada, pausada y tranquilizadora'},
  energy:{label:'MUJER · ENERGÍA',lang:'es-MX',rate:1.08,pitch:1.10,tts:'coral',style:'voz femenina enérgica, motivadora y cercana'},
  coach:{label:'COACH · FIRME',lang:'es-MX',rate:.98,pitch:.64,tts:'echo',style:'coach firme, directo, seguro y breve'}
 };
 const clean=t=>(t||'').replace(/[*_#`]/g,'').replace(/https?:\/\/\S+/g,'').replace(/\s+/g,' ').trim();
 const setStatus=t=>{if(status)status.textContent=t};
 const setCloud=t=>{if(cloud)cloud.textContent=t};
 const add=(text,who='ai',persist=true)=>{if(!chat)return;const m=document.createElement('div');m.className='ios-ai-msg '+who;m.textContent=text;chat.appendChild(m);while(chat.children.length>20)chat.removeChild(chat.firstElementChild);chat.scrollTop=chat.scrollHeight;if(persist)saveHistory()};
 function saveHistory(){try{const rows=[...chat.querySelectorAll('.ios-ai-msg')].map(x=>({who:x.classList.contains('user')?'user':'ai',text:x.textContent}));localStorage.setItem('muscleup-ios-chat',JSON.stringify(rows.slice(-20)))}catch{}}
 function loadHistory(){try{const rows=JSON.parse(localStorage.getItem('muscleup-ios-chat')||'[]');if(!rows.length)return;chat.innerHTML='';rows.forEach(r=>add(r.text,r.who,false));}catch{}}
 loadHistory();
 const loadVoices=()=>{voices='speechSynthesis' in window?(speechSynthesis.getVoices()||[]):[]};loadVoices();window.speechSynthesis?.addEventListener?.('voiceschanged',loadVoices);
 const pickVoice=()=>{const p=profiles[currentProfile],es=voices.filter(v=>/^es(-|_)/i.test(v.lang));const preferred=currentProfile==='siri'?['Dalia','Paulina','Monica','Microsoft Dalia','Google español']:['Jorge','Alvaro','Pablo','Diego','Microsoft Jorge','Google español'];for(const n of preferred){const v=es.find(x=>x.name.toLowerCase().includes(n.toLowerCase()));if(v)return v}return es.find(v=>/^es-mx/i.test(v.lang))||es.find(v=>/^es/i.test(v.lang))||voices[0]||null};
 async function serverTTS(text){try{const r=await fetch('/api/muscleup-tts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text,profile:currentProfile,voice:profiles[currentProfile].tts})});if(!r.ok)return false;const blob=await r.blob(),url=URL.createObjectURL(blob),audio=new Audio(url);audio.onplay=()=>{orb?.classList.add('speaking');setStatus('MUSCLEUP ESTÁ HABLANDO')};audio.onended=()=>{orb?.classList.remove('speaking');setStatus('LISTO PARA ESCUCHAR');URL.revokeObjectURL(url)};audio.onerror=()=>{URL.revokeObjectURL(url);fallbackSpeak(text)};await audio.play();return true}catch{return false}}
 function fallbackSpeak(raw){const text=clean(raw);if(!voiceEnabled||!text||!('speechSynthesis'in window))return;speechSynthesis.cancel();const p=profiles[currentProfile],u=new SpeechSynthesisUtterance(text),v=pickVoice();if(v)u.voice=v;u.lang=p.lang;u.rate=p.rate;u.pitch=p.pitch;u.volume=1;u.onstart=()=>{orb?.classList.add('speaking');setStatus('MUSCLEUP ESTÁ HABLANDO')};u.onend=()=>{orb?.classList.remove('speaking');setStatus('LISTO PARA ESCUCHAR')};u.onerror=()=>{orb?.classList.remove('speaking');setStatus('TEXTO ACTIVO · VOZ NO DISPONIBLE')};speechSynthesis.speak(u)}
 async function speak(text){if(!voiceEnabled)return;speechSynthesis?.cancel?.();const ok=await serverTTS(clean(text));if(!ok)fallbackSpeak(text)}
 function localBrain(raw){const t=clean(raw).toLowerCase(),name=localStorage.getItem('muscleup-app-name')||'atleta';if(/\b(hola|hey|hello|buenas)\b/.test(t))return`Hola, ${name}. Estoy aquí. No adaptes tu vida a una rutina; adaptemos la recomendación a cómo estás hoy.`;if(/(cómo te llamas|como te llamas|quién eres|quien eres|qué eres)/.test(t))return'Soy MuscleUp AI. Conecto entrenamiento, recuperación, alimentación y vida real para ayudarte a decidir qué conviene hoy.';if(/(dorm[ií]|sueño|cansad|agotad|5 horas|poco)/.test(t))return'Entonces hoy no voy a fingir que estás al cien. Bajaría intensidad o volumen, mantendría el movimiento y priorizaría recuperación. Dormir poco cambia la decisión.';if(/(20 minutos|15 minutos|poco tiempo|prisa|rápido|express)/.test(t))return'Perfecto. Te propongo una sesión Express con el mínimo efectivo: pocos movimientos, descansos controlados y sin relleno.';if(/(comida|aliment|prote[ií]na|nutric)/.test(t))return'Antes de decirte qué comer, necesito objetivo, horarios y lo que tienes disponible. La mejor recomendación es la que puedes sostener.';if(/(oficina|sentad|sentado|trabajo|escritorio)/.test(t))return'Si llevas horas sentado, no esperaría al gimnasio. Haría micro-pausas de movimiento durante el día y ajustaría el entrenamiento según cómo llegues.';if(/(press|banca|estancad|progres|plateau)/.test(t))return'Si te estancaste en press banca, revisaría técnica, volumen efectivo, recuperación y progresión antes de añadir más series. También puedo comparar tu semana con las anteriores cuando conectemos tu historial.';if(/(progreso|semana|historial|racha|constancia)/.test(t))return'No quiero enseñarte solo números. Buscaría patrones: cuándo rindes mejor, qué pasa cuando duermes poco, cómo responde tu volumen y dónde conviene ajustar antes de perder constancia.';if(/(entren|rutina|gym|gimnasio|calistenia)/.test(t))return'Dime cuánto tiempo tienes, tu energía, qué equipo tienes y qué entrenaste recientemente. Con eso puedo construir una sesión útil en vez de repetirte una plantilla.';return'Te escucho. Dime qué quieres conseguir, cuánto tiempo tienes, cómo dormiste y qué hiciste recientemente. Con ese contexto puedo adaptar la respuesta a tu día.'}
 async function remoteBrain(text){const history=[...chat.querySelectorAll('.ios-ai-msg')].slice(-10).map(x=>({role:x.classList.contains('user')?'user':'assistant',content:x.textContent}));try{const r=await fetch('/api/muscleup-ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,profile:currentProfile,history,context:{name:localStorage.getItem('muscleup-app-name')||'atleta',feel:localStorage.getItem('muscleup-ios-feel')||'',time:$i('#ctxTime')?.textContent||'',energy:$i('#ctxEnergy')?.textContent||''}})});if(!r.ok)throw new Error('AI endpoint unavailable');const data=await r.json();if(!data.reply)throw new Error('No reply');setCloud('IA ONLINE');return clean(data.reply)}catch{setCloud('IA LOCAL');return localBrain(text)}}
 async function answer(text){const q=clean(text);if(!q)return;add(q,'user');setStatus('PENSANDO…');const a=await remoteBrain(q);add(a,'ai');await speak(a)}
 function start(){if(listening)return;const R=window.SpeechRecognition||window.webkitSpeechRecognition;if(!R){setStatus('DICTADO NO DISPONIBLE · ESCRIBE ABAJO');input?.focus();return}try{recognition=new R();recognition.lang=document.documentElement.lang==='en'?'en-US':'es-MX';recognition.continuous=false;recognition.interimResults=true;recognition.maxAlternatives=1;let finalText='';recognition.onstart=()=>{listening=true;orb?.classList.add('listening');setStatus('ESCUCHANDO · SUELTA PARA ENVIAR');if(mic)mic.textContent='● ESCUCHANDO…'};recognition.onresult=e=>{let s='';for(let i=e.resultIndex;i<e.results.length;i++)s+=e.results[i][0].transcript;if(e.results[e.results.length-1].isFinal)finalText=s;if(input)input.value=s};recognition.onerror=e=>{setStatus(e.error==='not-allowed'?'MICRÓFONO BLOQUEADO · PERMITE ACCESO':'NO DETECTÉ VOZ · INTENTA OTRA VEZ')};recognition.onend=()=>{listening=false;orb?.classList.remove('listening');if(mic)mic.textContent='● MANTÉN PARA HABLAR';if(finalText.trim()){const q=finalText.trim();if(input)input.value='';answer(q)}else setStatus('LISTO PARA ESCUCHAR')};recognition.start()}catch{setStatus('NO PUDE ABRIR EL MICRÓFONO · ESCRIBE ABAJO')}}
 function stop(){clearTimeout(pressTimer);if(recognition&&listening){try{recognition.stop()}catch{}}}
 const hold=e=>{e.preventDefault();mic?.setPointerCapture?.(e.pointerId);clearTimeout(pressTimer);pressTimer=setTimeout(start,70)};
 mic?.addEventListener('pointerdown',hold,{passive:false});['pointerup','pointercancel','lostpointercapture'].forEach(ev=>mic?.addEventListener(ev,e=>{e.preventDefault();stop()},{passive:false}));
 send?.addEventListener('click',()=>{const q=input?.value.trim();if(input)input.value='';answer(q)});input?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();const q=input.value.trim();input.value='';answer(q)}});
 mute?.addEventListener('click',()=>{voiceEnabled=!voiceEnabled;if(!voiceEnabled)speechSynthesis?.cancel?.();mute.textContent=voiceEnabled?'🔊 VOZ':'🔇 SOLO TEXTO';setStatus(voiceEnabled?'VOZ ACTIVA':'SOLO TEXTO')});
 $$('.ios-voice').forEach(b=>b.addEventListener('click',()=>{currentProfile=b.dataset.profile||'jarvis';localStorage.setItem('muscleup-voice-profile',currentProfile);$$i('.ios-voice').forEach(x=>x.classList.remove('active'));b.classList.add('active');if(profileName)profileName.textContent=profiles[currentProfile].label;speechSynthesis?.cancel?.();setStatus(profiles[currentProfile].label+' · LISTO');setTimeout(()=>speak('Esta es una prueba de mi voz. Estoy listo.'),120)}));
 $$i('[data-aiq]').forEach(b=>b.addEventListener('click',()=>answer(b.dataset.aiq)));
 const selected=$i(`.ios-voice[data-profile="${currentProfile}"]`)||$i('.ios-voice[data-profile="jarvis"]');selected?.classList.add('active');if(profileName)profileName.textContent=profiles[currentProfile]?.label||profiles.jarvis.label;
 window.MuscleUpIOSBridge={version:26,features:['adaptive-coach','context-checkin','office-mode','persistent-ai-chat','voice-profiles','server-ai-ready','server-tts-ready'],nativeOnly:['HealthKit','Live Activities','Apple Watch','Siri App Intents','background notifications']};
})();
