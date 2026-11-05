export interface SignalPoint {label:string;value:number;share:number;detail:string;rank:number;}
export type ChartStyle='bars'|'rings'|'donut';
/** Accessible HTML chart with real numeric data and no canvas animation requirement. */
export function createSignalChart(title:string,points:SignalPoint[],color:string,style:ChartStyle):HTMLElement{
 const section=document.createElement('section');section.className=`aether-signal-chart aether-signal-chart--${style}`;
 section.setAttribute('aria-label',title);section.append(make('h2',title));
 if(points.length===0){section.append(make('p','No matching planet signals for this view.'));return section;}
 const total=points.reduce((n,item)=>n+item.value,0),max=Math.max(1,...points.map(item=>item.value));
 const graph=document.createElement('div');graph.className='aether-signal-chart__items';
 for(const point of points.slice(0,12)){
  const row=document.createElement('div');row.className='aether-signal-chart__row';row.style.setProperty('--signal-color',color);
  row.setAttribute('aria-label',`${point.label}: ${point.value} signals`);
  const heading=document.createElement('div');heading.className='aether-signal-chart__heading';
  heading.append(make('span',point.label),make('strong',String(point.value)));row.append(heading);
  const track=document.createElement('div');track.className='aether-signal-chart__track';
  const fill=document.createElement('div');fill.className='aether-signal-chart__fill';
  fill.style.width=`${Math.max(2,point.value/max*100).toFixed(2)}%`;track.append(fill);row.append(track);
  row.append(make('small',point.detail));graph.append(row);
 }
 section.append(graph);const footer=make('p',`${total} signal${total===1?'':'s'} across ${points.length} categories.`);
 footer.className='aether-signal-chart__footer';section.append(footer);return section;
}
function make(tag:string,value:string):HTMLElement{const item=document.createElement(tag);item.textContent=value;return item;}
