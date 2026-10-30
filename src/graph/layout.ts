import type { TabRecord } from '../domain/tab';
import type { PlanetPoint } from './draw';
export function layoutPlanets(tabs: TabRecord[], width: number, height: number): PlanetPoint[] {
  const columns=Math.max(1,Math.ceil(Math.sqrt(tabs.length*width/Math.max(height,1))));
  const rows=Math.max(1,Math.ceil(tabs.length/columns));
  const cellX=width/(columns+1),cellY=height/(rows+1);
  return tabs.map((tab,index)=>{
    const col=index%columns,row=Math.floor(index/columns);
    const jitter=Math.sin(tab.id*53.19)*Math.min(cellX,cellY)*.09;
    return {id:tab.id,tab,x:Math.max(25,Math.min(width-25,(col+1)*cellX+jitter)),y:Math.max(25,Math.min(height-25,(row+1)*cellY-jitter)),r:Math.max(10,Math.min(23,Math.min(cellX,cellY)*.26))};
  });
}
