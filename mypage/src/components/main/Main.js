import React from 'react';
import './Main.css';
import './../menu/Menu';
import Menu from './../menu/Menu';
import {Route} from './../menu/Router';
import Home from '../home/Home';
import Portfolio from './../portfolio/Portfolio';
import About from './../about/About';
import Resume from './../resume/Resume';
import Contact from './../contact/Contact';


// пример передачи компонента в props
class Route1 extends  React.Component{
    render(){
        // посмотрим пропсы
        console.log(this.props );
        const {component,render}=this.props;
        if(component){
            // вытащим компонент из props
            const {component}=this.props;
            // и создадим этот компонент 
            return React.createElement(component);
        };

        if(render){
            return render();
        }
        
    }
}



const Main =()=>{

   
    return( 
        <div className='main'>

            <Menu/>
            

            {/* <Route1 exact path='/' component={Home}/>
            <Route1 exact path='/' component={Portfolio}/> */}
            {/* <Route exact path='/' component={Resume}/> */}
            {/* <Route exact path='/' component={About}/> */}
            {/* <Route exact path='/' component={Contact}/> */}
            {/* <Route1 exact path='/re' render={()=><p>Сделано в кузнице</p>}/> */}



            {/* exact - проверяет полное совпадение пути  path */}
            <Route exact path='/' component={Home}/>
            <Route path='/portfolio' component={Portfolio}/>
            <Route exact path='/resume' component={Resume}/>
            <Route exact path='/about' component={About}/>
            <Route exact path='/contact' component={Contact}/>
            <Route exact path='/re' render={()=><p>Сделано в кузнице</p>}/>
            
            
        </div>
    )
       
    
}

export default Main;