export function el<K extends keyof HTMLElementTagNameMap>(tag:K, className='', value=''):HTMLElementTagNameMap[K] {
 const node=document.createElement(tag);if(className)node.className=className;
 if(value)node.textContent=value;return node;
}
export function action(label:string,callback:()=>void,className='nova-button'):HTMLButtonElement {
 const button=el('button',className,label);button.type='button';button.addEventListener('click',callback);return button;
}
export function field(label:string,placeholder:string,onChange:(value:string)=>void):HTMLLabelElement{
 const wrapper=el('label','nova-field');wrapper.append(el('span','',label));
 const input=el('input','nova-input');input.type='search';input.placeholder=placeholder;input.autocomplete='off';
 input.addEventListener('input',()=>onChange(input.value));wrapper.append(input);return wrapper;
}
export function empty(message:string):HTMLElement {
 const node=el('div','nova-empty');node.append(el('div','nova-empty-icon','✧'),el('p','',message));return node;
}
export function shortText(value:string,length=58):string {return value.length>length?value.slice(0,length-1)+'…':value;}
export function clear(node:Element):void{node.replaceChildren();}
export function iconBadge(value:string,color='#8addff'):HTMLElement{
 const node=el('span','nova-icon',value);node.style.setProperty('--planet-tone',color);return node;
}
