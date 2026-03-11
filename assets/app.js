(function(){
  const body=document.body;
  const lang=document.querySelector('.lang');
  const langBtn=document.querySelector('.lang-trigger');
  const burger=document.querySelector('.mobile-toggle');
  const drawer=document.querySelector('.mobile-drawer');
  const backdrop=document.querySelector('.backdrop');
  const closeBtn=document.querySelector('.drawer-close');
  const openModal=document.querySelectorAll('[data-open-privacy]');
  const modal=document.getElementById('privacy-modal');
  const modalClose=document.querySelectorAll('[data-close-modal]');
  const details=document.querySelectorAll('.faq-item');
  let lastFocus=null;

  if(lang && langBtn){
    langBtn.addEventListener('click',()=>lang.classList.toggle('open'));
    document.addEventListener('click',(e)=>{if(!lang.contains(e.target)) lang.classList.remove('open');});
  }

  function focusables(el){
    return [...el.querySelectorAll('a, button, input, summary')].filter(n=>!n.disabled);
  }
  function openDrawer(){
    lastFocus=document.activeElement;
    drawer.classList.add('open'); backdrop.classList.add('active');
    burger.setAttribute('aria-expanded','true'); drawer.setAttribute('aria-hidden','false');
    body.classList.add('body-lock');
    const f=focusables(drawer); if(f[0]) f[0].focus();
  }
  function closeDrawer(){
    drawer.classList.remove('open'); backdrop.classList.remove('active');
    burger.setAttribute('aria-expanded','false'); drawer.setAttribute('aria-hidden','true');
    body.classList.remove('body-lock');
    if(lastFocus) lastFocus.focus();
  }
  if(burger){ burger.addEventListener('click',openDrawer); }
  if(closeBtn){ closeBtn.addEventListener('click',closeDrawer); }
  if(backdrop){ backdrop.addEventListener('click',closeDrawer); }
  if(drawer){ drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeDrawer)); }

  document.addEventListener('keydown',(e)=>{
    if(e.key==='Escape'){ closeDrawer(); if(modal?.classList.contains('open')) closePrivacy(); }
    if(drawer?.classList.contains('open') && e.key==='Tab'){
      const f=focusables(drawer); if(!f.length) return;
      const first=f[0], last=f[f.length-1];
      if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
      if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
    }
  });

  details.forEach((item)=>item.addEventListener('toggle',()=>{if(item.open){details.forEach((o)=>{if(o!==item) o.open=false;});}}));

  function openPrivacy(){ modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); body.classList.add('body-lock'); }
  function closePrivacy(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); body.classList.remove('body-lock'); }
  openModal.forEach((b)=>b.addEventListener('click',(e)=>{e.preventDefault();openPrivacy();}));
  modalClose.forEach((b)=>b.addEventListener('click',closePrivacy));

  const observer=new IntersectionObserver((entries)=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('in');}),{threshold:.2});
  document.querySelectorAll('.card,.visual-card,.process-card').forEach(el=>observer.observe(el));
})();
