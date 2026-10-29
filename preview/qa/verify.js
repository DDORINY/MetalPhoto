'use strict';
(async()=>{
 const output=document.getElementById('results'),frame=document.getElementById('frame');
 const results=[];let errors=[];
 const check=(ok,label,detail='')=>results.push({pass:!!ok,label,detail});
 const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 async function load(path,width){frame.style.width=width+'px';await new Promise((resolve,reject)=>{frame.onload=resolve;frame.onerror=reject;frame.src=path});await pause(120);return frame.contentDocument;}
 try{
  for(const width of [390,1280]){
   for(let id=1;id<=20;id++){
    const nn=String(id).padStart(2,'0'),doc=await load('../pages/'+nn+'-page.html',width),win=frame.contentWindow;
    win.addEventListener('error',e=>errors.push(nn+': '+e.message));
    check(doc.body.dataset.previewReady==='true',width+' P'+nn+' script ready');
    check(doc.querySelectorAll('h1').length===1,width+' P'+nn+' single H1');
    check(Array.from(doc.images).every(im=>im.complete&&im.naturalWidth>0),width+' P'+nn+' local images');
    check(doc.documentElement.scrollWidth<=win.innerWidth+2,width+' P'+nn+' no horizontal overflow','scroll='+doc.documentElement.scrollWidth+' viewport='+win.innerWidth);
    check(parseFloat(win.getComputedStyle(doc.body).fontSize)>=18,width+' P'+nn+' body font >=18px');
    const toggle=doc.querySelector('[data-menu-toggle]'),nav=doc.getElementById('mobile-nav');
    if(width===390){toggle.click();check(!nav.hidden&&toggle.getAttribute('aria-expanded')==='true',width+' P'+nn+' menu open');check(doc.activeElement===nav.querySelector('a'),width+' P'+nn+' menu focus');doc.dispatchEvent(new win.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));check(nav.hidden&&doc.activeElement===toggle,width+' P'+nn+' Escape closes/focus returns');}
    const gallery=doc.querySelector('[data-gallery-open]');
    if(gallery){gallery.click();const dialog=doc.getElementById('image-dialog');check(dialog.open&&dialog.contains(doc.activeElement),width+' P'+nn+' dialog open/focus');const previous=dialog.querySelector('[data-dialog-count]').textContent;dialog.querySelector('[data-gallery-next]').click();check(dialog.querySelector('[data-dialog-count]').textContent!==previous||doc.querySelectorAll('[data-gallery-open]').length===1,width+' P'+nn+' gallery next');dialog.querySelector('[data-dialog-close]').click();await pause(30);check(!dialog.open&&doc.activeElement===gallery,width+' P'+nn+' dialog close/focus returns');}
    if(id===19){doc.querySelector('[data-no-send]').click();check(!doc.getElementById('mail-demo').hidden,width+' P19 non-sending order step');}
    if(id===20){const status=doc.querySelector('[data-form-status]');doc.querySelector('[data-check-form]').click();check(status.textContent.includes('모의 오류'),width+' P20 empty input error');for(const [selector,value]of [['#demo-name','테스트'],['#demo-phone','01000000000'],['#demo-email','test@example.invalid'],['#demo-message','전송되지 않는 테스트입니다.']])doc.querySelector(selector).value=value;doc.querySelector('[data-check-form]').click();check(status.textContent.includes('모의 입력 확인 완료'),width+' P20 mock input success');doc.querySelector('[data-demo-failure]').click();check(status.textContent.includes('전송 실패 화면 예시'),width+' P20 mock failure');doc.querySelector('[data-clear-form]').click();check(!doc.querySelector('#demo-name').value&&!doc.querySelector('#demo-message').value,width+' P20 clear memory inputs');check(!doc.querySelector('form'),width+' P20 no submitting form');}
   }
  }
  const hub=await load('../index.html',390);check(hub.querySelectorAll('[data-page-card]').length===20,'hub has 20 pages');hub.querySelector('[data-filter="memorial"]').click();check(Array.from(hub.querySelectorAll('[data-page-card]')).filter(c=>!c.hidden).length===7,'hub memorial filter 7');hub.querySelector('[data-approval]').click();check(hub.querySelector('[data-approval-status]').textContent.startsWith('1 / 11'),'hub review indicator (not approval)');
  const p=await load('../pages/06-page.html',320);check(p.documentElement.scrollWidth<=frame.contentWindow.innerWidth+2,'320 P06 no horizontal overflow');
  frame.style.width='780px';await pause(80);p.documentElement.style.fontSize='200%';await pause(80);check(p.documentElement.scrollWidth<=frame.contentWindow.innerWidth+2,'P06 root font 200% reflow at 780px (not browser zoom)');
 }catch(error){errors.push(error.stack||String(error));}
 const failed=results.filter(r=>!r.pass);output.textContent=JSON.stringify({state:'COMPLETE',total:results.length,passed:results.length-failed.length,failed,errors,results},null,2);document.body.dataset.qaDone='true';
})();
