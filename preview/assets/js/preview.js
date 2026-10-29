'use strict';
(() => {
 const body=document.body, toggle=document.querySelector('[data-menu-toggle]'), nav=document.getElementById('mobile-nav'), bar=document.querySelector('.mobile-action'), header=document.querySelector('.site-header');
 const desktop=matchMedia('(min-width:1200px)');
 function setMenu(open,restore=false){if(!toggle||!nav)return;toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'닫기 ✕':'메뉴 ☰';nav.hidden=!open;body.classList.toggle('menu-open',open);if(open)nav.querySelector('a')?.focus();else if(restore)toggle.focus();}
 toggle?.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true',true));
 nav?.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false,true)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&body.classList.contains('menu-open')){setMenu(false,true);e.preventDefault();}else if(e.key==='Escape'){document.querySelectorAll('.desktop-nav details[open]').forEach(d=>{d.open=false;d.querySelector('summary').focus()})}});
 desktop.addEventListener('change',e=>{const inside=nav?.contains(document.activeElement);if(e.matches){setMenu(false);if(inside||document.activeElement===toggle)document.querySelector('.brand')?.focus()}});
 document.querySelectorAll('.desktop-nav details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('.desktop-nav details').forEach(other=>{if(other!==d)other.open=false})}));
 function sizes(){const fixed=bar&&getComputedStyle(bar).position==='fixed'&&getComputedStyle(bar).display!=='none';body.style.setProperty('--action-space',fixed?bar.getBoundingClientRect().height+'px':'0px');body.style.setProperty('--header-space',((header?.getBoundingClientRect().height||80)+16)+'px')}
 if(window.ResizeObserver){if(bar)new ResizeObserver(sizes).observe(bar);if(header)new ResizeObserver(sizes).observe(header)}window.addEventListener('resize',sizes);sizes();
 document.addEventListener('focusin',e=>{if(e.target.closest('[data-demo-form]')&&e.target.matches('input,textarea,select'))body.classList.add('input-active')});
 document.addEventListener('focusout',()=>setTimeout(()=>{if(!document.activeElement?.closest('[data-demo-form] input,[data-demo-form] textarea,[data-demo-form] select'))body.classList.remove('input-active')},0));
 const dialog=document.getElementById('image-dialog');let trigger=null, items=[], current=0;
 function showItem(){const item=items[current];if(!item)return;dialog.querySelector('[data-dialog-image]').src=item.dataset.placeholder;dialog.querySelector('[data-dialog-image]').alt=item.dataset.caption;dialog.querySelector('[data-dialog-caption]').textContent=item.dataset.caption;dialog.querySelector('[data-dialog-source]').textContent='원본 참조: '+item.dataset.source;dialog.querySelector('[data-dialog-count]').textContent=(current+1)+' / '+items.length+' · 임시 이미지';dialog.querySelector('[data-gallery-prev]').disabled=items.length<2;dialog.querySelector('[data-gallery-next]').disabled=items.length<2;}
 document.querySelectorAll('[data-gallery-open]').forEach(btn=>btn.addEventListener('click',()=>{trigger=btn;items=Array.from(document.querySelectorAll('[data-gallery-open]'));current=items.indexOf(btn);showItem();dialog.showModal();body.classList.add('modal-open');dialog.querySelector('[data-dialog-close]').focus()}));
 function restoreGalleryFocus(){body.classList.remove('modal-open');trigger?.focus()}
 function closeDialog(){dialog.close();restoreGalleryFocus()}
 dialog?.querySelector('[data-dialog-close]').addEventListener('click',closeDialog);
 dialog?.addEventListener('cancel',event=>{event.preventDefault();closeDialog()});
 dialog?.querySelector('[data-gallery-prev]').addEventListener('click',()=>{current=(current-1+items.length)%items.length;showItem()});
 dialog?.querySelector('[data-gallery-next]').addEventListener('click',()=>{current=(current+1)%items.length;showItem()});
 dialog?.addEventListener('close',restoreGalleryFocus);
 dialog?.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){current=(current+1)%items.length;showItem()}if(e.key==='ArrowLeft'){current=(current-1+items.length)%items.length;showItem()}if(e.key==='Tab'){const els=Array.from(dialog.querySelectorAll('button:not(:disabled),a[href]'));const first=els[0],last=els[els.length-1];if(e.shiftKey&&document.activeElement===first){last.focus();e.preventDefault()}if(!e.shiftKey&&document.activeElement===last){first.focus();e.preventDefault()}}});
 document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));let visible=0;document.querySelectorAll('[data-page-card]').forEach(card=>{card.hidden=btn.dataset.filter!=='all'&&card.dataset.group!==btn.dataset.filter;if(!card.hidden)visible++});const status=document.querySelector('[data-filter-status]');if(status)status.textContent=visible+'개 화면 표시'}));
 const checks=Array.from(document.querySelectorAll('[data-approval]'));checks.forEach(c=>c.addEventListener('change',()=>{document.querySelector('[data-approval-status]').textContent=checks.filter(x=>x.checked).length+' / 11 검토 표시 · 승인으로 저장되지 않습니다.'}));
 document.querySelectorAll('[data-copy]').forEach(btn=>btn.addEventListener('click',async()=>{const target=document.getElementById(btn.dataset.copy),status=document.getElementById(btn.dataset.copyStatus);const value=target.value||target.textContent;try{await navigator.clipboard.writeText(value);status.textContent='복사했습니다. 주문 접수나 발송은 이루어지지 않았습니다.'}catch{status.textContent='자동 복사를 사용할 수 없습니다. 아래 텍스트를 직접 선택해 복사해 주세요.';if(target.select){target.focus();target.select()}}}));
 const form=document.querySelector('[data-demo-form]');
 if(form){const status=form.querySelector('[data-form-status]');const fields=Array.from(form.querySelectorAll('[data-demo-field]'));const file=form.querySelector('input[type=file]');
 const notice=(kind,text)=>{status.className='form-status '+kind;status.textContent=text;status.focus()};
 form.querySelector('[data-check-form]').addEventListener('click',()=>{let first=null;fields.forEach(field=>{const good=field.value.trim()!==''&&field.checkValidity();field.setAttribute('aria-invalid',String(!good));const err=document.getElementById(field.getAttribute('aria-describedby'));err.hidden=good;if(!good&&!first)first=field});let fileBad=false;if(file.files.length){const picked=file.files[0];fileBad=!/\.jpe?g$/i.test(picked.name);form.querySelector('[data-file-status]').textContent=fileBad?'모의 검사: jpg/jpeg 파일을 선택해 주세요. 실제 제한은 미확인입니다.':'선택 파일: '+picked.name+' · 업로드하지 않습니다.'}if(first||fileBad){notice('error','모의 오류: 입력 항목을 확인해 주세요. 아무 내용도 전송되지 않았습니다.');if(first)first.focus()}else{notice('success','모의 입력 확인 완료. 문의가 접수된 것이 아니며 파일·입력 내용을 전송하거나 저장하지 않았습니다.')}});
 form.querySelector('[data-demo-failure]').addEventListener('click',()=>notice('error','전송 실패 화면 예시입니다. 실제 네트워크 요청은 없었습니다. 입력을 유지하고 이메일 대안을 안내하는 시안입니다.'));
 form.querySelector('[data-demo-success]').addEventListener('click',()=>notice('success','접수 완료 안내의 모의 상태입니다. 실제 문의는 접수되지 않았습니다. 운영 결과 문구와 응답 시간은 확인이 필요합니다.'));
 form.querySelector('[data-clear-form]').addEventListener('click',()=>{form.querySelectorAll('input,textarea').forEach(el=>{el.value='';el.removeAttribute('aria-invalid')});form.querySelectorAll('.field-error').forEach(el=>el.hidden=true);form.querySelector('[data-file-status]').textContent='파일을 선택해도 업로드하지 않습니다.';notice('','입력을 지웠습니다. 저장된 정보는 없습니다.');fields[0]?.focus()});
 file.addEventListener('change',()=>{form.querySelector('[data-file-status]').textContent=file.files.length?'선택 파일: '+file.files[0].name+' · 파일 내용은 읽거나 전송하지 않습니다.':'파일을 선택해도 업로드하지 않습니다.'});
 }
 document.querySelectorAll('[data-no-send]').forEach(btn=>btn.addEventListener('click',()=>{const id=btn.getAttribute('aria-controls');const target=document.getElementById(id);if(target){target.hidden=false;target.focus()}}));
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{const id=decodeURIComponent(a.hash.slice(1));const el=document.getElementById(id);if(el){if(!el.hasAttribute('tabindex'))el.tabIndex=-1;setTimeout(()=>el.focus({preventScroll:true}),0)}}));
 body.dataset.previewReady='true';
})();

