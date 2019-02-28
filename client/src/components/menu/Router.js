import React, {Component} from 'react';
// зачем мы его подключали ?
import PropTypes from 'prop-types';


let instances=[]; //массив экземпляров Rout

// создаем 2 функции:
// берем компонент и пушим его в массив instances
 const register=comp=>instances.push(comp);

 //удаляем компонент из массива
 const unregister=comp=>instances.splice(instances.indexOf(comp),1)  



// отображенее компонента по условию
const matchPath=(pathname, options)=>{

    const {exact=false, path}=options;

    // если path не совпадает..то возвращаем такой обьет
    if(!path){
        return{
            path:null,
            url:pathname,
            isExact:true,
        }

    }

    
    /*
        метод exec() выподняет поиск сопоставления регулярного выражения 
        в указанной строке. Возвращает массив с результатами или null
    */ 
    const match=new RegExp(`^${path}`).exec(pathname);

    // проверяем что вернул match
    if(!match){
        return null;
    }

    const url = match[0];
    const isExact=pathname===url;

    // проверяем что вернул isExact
    if(exact && !isExact){
        return null;
    }

    return {
        path,
        url,
        isExact
    }
}





/*
    когда мы захотим обновть наши  Rout нам надо буюет пробедаться по всем етим 
    компонентам (в массиве )и на каждом из них візвать forceUpdate 
    Для этого создаем массив instances
*/ 
export class Route extends Component{

    // обрабатываем событие листание истории в браузере 
    componentWillMount(){
        window.addEventListener('popstate', this.popHandle);
        register(this);
    }

    componentWillUnmount(){
        window.removeEventListener('popstate', this.popHandle);
        unregister(this);
    }

    // что бы не потерять контекст this
    popHandle=()=>{
        // this ссылается на наш компонент Route
        this.forceUpdate();
    }
      

    render(){

        
        // отображение компонента по условию
        const {path, exact, component, render}=this.props;

        // контролирует совпадения (возвращает true | false)

        const match=matchPath(window.location.pathname, {path,exact});

        // eсли возращается match=null  то ..
        if(!match){
            return null;
        }

        if(component) return React.createElement(component, {match});

        if(render) return render({match});

        return null;
    }
};

//  добавим свойства компронента
Route.propTypes={
    path:PropTypes.string,
    exact:PropTypes.bool,
    component:PropTypes.func,
    render:PropTypes.func
}

                // добавляет страницу в историю браузера (ход состояния, название страницы, путь)
const historyPush=path=>{
    window.history.pushState({}, null,path);
                // контекст для forceUpdete сохраняется блвгодоря тому что мы передаем в функцию register наш компонент 
                // вместе с контекстом 
    instances.forEach(instance=>instance.forceUpdate());
}


// заменяет сьраницу (ход состояния, название страницы, путь)
const historyReplace=path=>{
    window.history.replaceState({},null, path);
    instances.forEach(instance=>instance.forceUpdate());
}

export class Link extends Component{

    constructor(props){
        super(props)

        this.PropTypes={
            to:PropTypes.string.isRequired,
            replace:PropTypes.bool
        }
    }

    

    clickHandler=event=>{
        const {replace, to}=this.props;
        event.preventDefault();

        replace ? historyReplace(to):historyPush(to);
    }

    render(){
        const {to, children}=this.props;

        return(
            <a href={to} onClick={this.clickHandler}>{children}</a>
        )
    }
}

