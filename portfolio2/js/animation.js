{
    const body = document.body;
    const docEl = document.documentElement;

    const MathUtils = {
        lineEq: (y2, y1, x2, x1, currentVal) => {
            // y = mx + b 
            var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
            return m * currentVal + b;
        },
        lerp: (a, b, n) =>  (1 - n) * a + n * b,
        distance: (x1, x2, y1, y2) => {
            var a = x1 - x2;
            var b = y1 - y2;
            return Math.hypot(a,b);
        }
    };

    let winsize;
    const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
    calcWinsize();
    window.addEventListener('resize', calcWinsize);

    const getMousePos = (ev) => {
        let posx = 0;
        let posy = 0;
        if (!ev) ev = window.event;
        if (ev.pageX || ev.pageY) {
            posx = ev.pageX;
            posy = ev.pageY;
        }
        else if (ev.clientX || ev.clientY) 	{
            posx = ev.clientX + body.scrollLeft + docEl.scrollLeft;
            posy = ev.clientY + body.scrollTop + docEl.scrollTop;
        }
        return {x: posx, y: posy};
    }

    let mousePos = {x: winsize.width/2, y: winsize.height/2};
    window.addEventListener('mousemove', ev => mousePos = getMousePos(ev));

    const links = document.querySelector('.category_link');
    const images = [...document.querySelectorAll('.content__img')];
    const shadows = [...document.querySelectorAll('.content__shadow')];
    const imgs = shadows.concat(images);
    const imgsTotal = imgs.length;
    let imgTranslations = [...new Array(imgsTotal)].map(() => ({x: 0, y: 0}));

    const elem = document.querySelector('.content__text');
    const textEl = elem.querySelector('span.content__text-inner');
    
    const loadWork = () => {

    }

    const createBlotterText = () => {
        let lastMousePosition = {x: winsize.width/2, y: winsize.height/2};
        
        const render = () => {
            const docScrolls = {left : body.scrollLeft + docEl.scrollLeft, top : body.scrollTop + docEl.scrollTop};
            const relmousepos = {x : mousePos.x - docScrolls.left, y : mousePos.y - docScrolls.top };
            const mouseDistance = MathUtils.distance(lastMousePosition.x, relmousepos.x, lastMousePosition.y, relmousepos.y);
            for (let i = 0; i <= imgsTotal - 1; ++i) {
                imgTranslations[i].x = MathUtils.lerp(imgTranslations[i].x, MathUtils.lineEq(40, -40, winsize.width, 0, relmousepos.x), i === imgsTotal - 1 ? 0.15 : 0.03*i + 0.03);
                imgTranslations[i].y = MathUtils.lerp(imgTranslations[i].y, MathUtils.lineEq(40, -40, winsize.height, 0, relmousepos.y), i === imgsTotal - 1 ? 0.15 : 0.03*i + 0.03);
                imgs[i].style.transform = `translateX(${(imgTranslations[i].x)}px) translateY(${imgTranslations[i].y}px)`;
            };
    
            lastMousePosition = {x: relmousepos.x, y: relmousepos.y};
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    };

    WebFont.load({
        google: {
            families: ['Space+Mono']
        },
        active: () => createBlotterText()
    });

    // Preload all the images in the page.
    imagesLoaded(document.querySelectorAll('.content__img'), {background: true}, () => body.classList.remove('loading'));
}