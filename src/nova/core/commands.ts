export interface NovaCommand {id:string;label:string;description:string;keywords:string[];shortcut?:string}
export const COMMANDS:NovaCommand[]=[
 {id:'universe',label:'Return to 3D universe',description:'Explore the live planetary scene',keywords:['galaxy','camera','planets','three dimensional'],shortcut:'G'},
 {id:'systems',label:'Explore star systems',description:'Find domains and their connections',keywords:['domains','atlas','collections'],shortcut:'S'},
 {id:'sessions',label:'Open the session vault',description:'Save or restore a browsing constellation',keywords:['restore','backup','archive'],shortcut:'V'},
 {id:'duplicates',label:'Review duplicate tabs',description:'Safely inspect repeated web addresses',keywords:['clean','deduplicate','repeat'],shortcut:'D'},
 {id:'focus',label:'Start a focus mission',description:'Find noisy tabs and prioritize important worlds',keywords:['mute','work','attention'],shortcut:'F'},
 {id:'insights',label:'Open observatory insights',description:'See domain distribution and window telemetry',keywords:['analytics','metrics','charts'],shortcut:'O'},
 {id:'settings',label:'Change Nova appearance',description:'Customize color and accessibility options',keywords:['theme','motion','preferences'],shortcut:'P'},
];
export function commandScore(command:NovaCommand,raw:string):number{
 const query=raw.trim().toLowerCase();if(!query)return 1;
 const label=command.label.toLowerCase();if(label===query)return 20;
 if(label.startsWith(query))return 14;if(label.includes(query))return 10;
 if(command.keywords.some(keyword=>keyword.startsWith(query)))return 8;
 if(command.keywords.some(keyword=>keyword.includes(query)))return 5;
 if(command.description.toLowerCase().includes(query))return 3;
 return 0;
}
export function findCommands(query:string,limit=8):NovaCommand[]{
 return COMMANDS.map(command=>({command,score:commandScore(command,query)}))
  .filter(item=>item.score>0).sort((a,b)=>b.score-a.score||a.command.label.localeCompare(b.command.label))
  .slice(0,limit).map(item=>item.command);
}
