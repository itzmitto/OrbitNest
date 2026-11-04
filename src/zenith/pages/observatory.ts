import {setContent,stat} from '../ui/shell';
import {getTabs} from '../core/tabs';
import {formatHost,escapeHTML} from '../core/math';
import {groupDomainCounts} from '../core/scene';
import {uniqueDomains,windowsCount} from '../core/utils';
import {signals} from '../signals/registry';
export async function mountObservatory():Promise<()=>void>{
 const tabs=await getTabs(),systems=groupDomainCounts(tabs),metrics=signals.map(s=>({...s,reading:s.calculate(tabs)}));
 const target=setContent(`<div class="z-stats">${stat('Open tabs',tabs.length,'LIVE SNAPSHOT')}${stat('Domains',uniqueDomains(tabs),'STAR SYSTEMS')}${stat('Windows',windowsCount(tabs),'CONNECTED SPACES')}${stat('Pinned',tabs.filter(t=>t.pinned).length,'QUICK ACCESS')}</div>
 <div class="z-grid"><section class="z-card"><div class="z-card__title"><h2>DOMAIN ACTIVITY</h2><small>OPEN TAB DISTRIBUTION</small></div><div style="padding:16px 26px 28px"><canvas class="z-chart" id="z-observer-chart" role="img" aria-label="Bar chart of tab counts by domain"></canvas></div></section><section class="z-card"><div class="z-card__title"><h2>SPACE SIGNALS</h2><small>ANALYSIS IN REAL TIME</small></div><div class="z-list" id="z-signal-list"></div></section></div>
 <section class="z-card z-section"><div class="z-card__title"><h2>PLANETARY TELEMETRY</h2><small>LOCAL BROWSER METADATA</small></div><table class="z-table"><thead><tr><th>Domain</th><th>Tabs</th><th>Share</th></tr></thead><tbody>${systems.map(d=>`<tr><td>${escapeHTML(d.name)}</td><td>${d.count}</td><td>${tabs.length?Math.round(d.count/tabs.length*100):0}%</td></tr>`).join('')}</tbody></table></section>`);
 const list=target.querySelector<HTMLElement>('#z-signal-list')!;
 list.innerHTML=metrics.map(m=>`<article class="z-list-row"><span><strong>${escapeHTML(m.label)}</strong><small>${escapeHTML(m.reading.detail)}</small></span><strong>${m.reading.value}${escapeHTML(m.reading.unit)}</strong></article>`).join('');
 const canvas=target.querySelector<HTMLCanvasElement>('#z-observer-chart')!,ctx=canvas.getContext('2d');if(!ctx)return ()=>{};
 const draw=()=>{const rect=canvas.getBoundingClientRect(),dpr=Math.min(2,devicePixelRatio||1);canvas.width=Math.max(1,Math.round(rect.width*dpr));canvas.height=Math.max(1,Math.round(rect.height*dpr));
 ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,rect.width,rect.height);const top=systems.slice(0,8),max=top[0]?.count||1;
 top.forEach((d,i)=>{const y=i*(rect.height/8)+6,barWidth=(rect.width-120)*d.count/max;
 ctx.fillStyle='#b1c1e7';ctx.font='11px system-ui';ctx.fillText(d.name.slice(0,17),7,y+13);const gradient=ctx.createLinearGradient(110,y,110+barWidth,y);gradient.addColorStop(0,'#746bfa');gradient.addColorStop(1,'#60ddd1');ctx.fillStyle=gradient;ctx.fillRect(111,y,barWidth,16);ctx.fillStyle='#f6f8ff';ctx.fillText(String(d.count),115+barWidth,y+13);});};
 draw();const resize=new ResizeObserver(draw);resize.observe(canvas);return ()=>resize.disconnect();
}
