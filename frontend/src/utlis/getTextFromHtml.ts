export default function getText(html:string){
    const document = new DOMParser().parseFromString(html,'text/html');
    return document.body.textContent ;
  }