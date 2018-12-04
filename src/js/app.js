;(function(){
    console.log('app loaded....')
    let els = document.getElementsByTagName('p');
    // HTMLCollection cannot used forEach directly so need to used one of this code
    // for iteration
    // 1 - ES6 Array.from
    console.log('ES6 Array.from.');
    let elements = Array.from(els);
    elements.forEach(el => { 
        console.log(el); 
        el.innerText = 'new text';
    });
    // 2 - Normal for loop.
    console.log('Normal for loop.');
    for (let i = 0; i < els.length; i++) {
        let el = els[i];
        console.log(el);
        el.innerText = 'new text';
    }
})();