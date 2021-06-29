window.onload = function () {
    var regtel = /^1[3|4|5|7|8]\d{9}$/; // 手机号码的正则表达式
    var regqq = /^[1-9]\d{4,}$/;
    var regname = /^[\u4e00-\u9fa5]{0,}$/;
    var regmsg = /^\d{6}$/;
    var regpwd = /^[a-zA-Z0-9_-]{6,16}$/;

    var tel = document.querySelector("#tel");
    var qq = document.querySelector("#qq");
    var name = document.querySelector('#name');
    var msg = document.querySelector('#mas');
    var pwd = document.querySelector('#pwd');
    var surepwd = document.querySelector('#surepwd');
    var inps = document.querySelectorAll('.inp');
    var index;

    regexp(tel, regtel);  //手机号码
    regexp(qq, regqq);  //qq号码
    regexp(name, regname);  //昵称
    regexp(msg, regmsg);  //短信验证
    regexp(pwd, regpwd);  //密码框

    // 表单验证的函数
    function regexp(ele, reg) {
        ele.onblur = function () {
            if (reg.test(this.value)) {
                // console.log('正确的');
                this.nextElementSibling.className = "success";
                this.nextElementSibling.innerHTML =
                    '<i class="success_icon"></i> 恭喜您输入正确';
            } else {
                this.nextElementSibling.className = "error";
                this.nextElementSibling.innerHTML =
                    '<i class="error_icon"></i> 格式不正确，请从新输入';
            }
            this.style.border = '1px solid #ccc';
        }
    }

    // 确认密码的验证函数
    surepwd.onblur = function () {
        if (this.value == pwd.value) {
            this.nextElementSibling.className = "success";
            this.nextElementSibling.innerHTML =
                '<i class="success_icon"></i> 恭喜您输入正确';
        } else {
            this.nextElementSibling.className = "error";
            this.nextElementSibling.innerHTML =
                '<i class="error_icon"></i> 格式不正确，请从新输入';
        }
        this.style.border = '1px solid #ccc';

    }

    for (var i = 0; i < inps.length; i++) {
        index = i;
        inps[index].onfocus = function () {
            this.style.border = '1px solid #000';
        }
    }


};
