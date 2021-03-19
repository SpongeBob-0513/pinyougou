window.addEventListener('load', function() {
    // alert(1);
    var button_left = document.querySelector('.focus .button_left');
    var button_right = document.querySelector('.focus .button_right');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 鼠标经过就显示隐藏的左右按钮
    focus.addEventListener('mouseenter', function() {
        button_left.style.display = 'block';
        button_right.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function() {
        button_left.style.display = 'none';
        button_right.style.display = 'none';
        timer = setInterval(function() {
            button_right.click();
        }, 2000);
    })
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.promo_nav');
    // console.log(ul.children.length);
    // 通过图片的的数目生成相同数目的小圆圈
    for (i = 0; i < ul.children.length; i++) {
        // 创建 li (小圆圈)
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号，通过自定义属性来做
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function() {
            //排他思想
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'first';
            var index = this.getAttribute('index');
            num = index; // 当点击了按钮，需要把 li 的索引号给 num;
            circle = index; // 同理，circle 值也应该跟着变化
            // console.log(focusWidth);
            // console.log(index);
            animate(ul, -index * focusWidth)
        })
    }
    ol.children[0].className = 'first';

    // 克隆第一个 图片
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 点击右侧按钮，图片滚动一张
    var num = 0;
    var circle = 0;
    // 节流阀
    var flag = true;
    button_right.addEventListener('click', function() {
        if (flag) {
            flag = false;
            // 如果走到了最后复制的一张图片，ul 要快速复原 left 为 0
            if (num == ol.children.length) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            animate(ul, -num * focusWidth, function() {
                flag = true; // 通过回调函数打开节流阀
            });
            // 小圆圈也根据派他思想变化
            circleChange();
        }
    })

    // 点击左侧按钮
    button_left.addEventListener('click', function() {
        if (flag) {
            flag = false;
            // 如果走到了最后复制的一张图片，ul 要快速复原 left 为 0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            // 小圆圈也根据派他思想变化
            circleChange();
        }
    })

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'first';
    }

    // 自动播放轮播图
    var timer = setInterval(function() {
        button_right.click();
    }, 2000);
})