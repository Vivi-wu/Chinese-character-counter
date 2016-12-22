/* 中文全角标点符号
 * \uff01 叹号，\uff1f 问号
 * \uff08 括号，\uff09 反括号
 * \uff0c 逗号， \uff0e 句号
 * \uff1a 冒号， \uff1b 分号
 * \u3001 顿号
 */
function textLimit(options) {
    var defaultAtrributes = {
        triggerEle: '#inputMsg',
        limit: 140,
        total: '#total',
        nbOfText: 0
    };
    $.extend(this, defaultAtrributes, options)
    this.triggerEle = $(this.triggerEle)
    this.total = $(this.total)
    this.$element = $('.limit-input-msg')
    this._init()
}

textLimit.prototype = {
    _init: function () {
        var _this = this;

        this.total.text(this.limit)

        this.on = this._switchThis(this.$element.on, this.$element)
        this.trigger = this._switchThis(this.$element.trigger, this.$element)

        this.triggerEle.on('change, input', this._switchThis(this._handler, this))
    },
    _switchThis: function (fn, obj) {
        return function () {
            fn.apply(obj, arguments)
        }
    },
    _count: function () {
        var str = this.triggerEle.val(),
            len = str.length, i = 0, 
            cn = 0, notCn = 0
        
        for (; i < len; i ++) {
            if (/[\u4e00-\u9fa5\uff01\uff1f\uff08\uff09\uff0c\uff0e\uff1a\uff1b\u3001]/.test(str.charAt(i))) {
                cn ++
            } else {
                notCn ++
            }
        }
        return cn + Math.ceil( notCn / 2 )
    },
    _handler: function() {
        this.nbOfText = this._count()
        this.trigger('finishCount')
    }
};

$(function(){
  var t = new textLimit(),
  $already = $('#already'),
  $txtAlready = $already.children('mark'),
  $remain = $('#remain'),
  $txtRemain = $remain.children('mark')

  $already.hide()
  $remain.hide()

  t.on('finishCount', function(){
    if (t.nbOfText) {
        $txtAlready.text(t.nbOfText)
        $already.show()
        $txtRemain.text(t.limit - t.nbOfText)
        $remain.show()
    } else {
        $txtAlready.text('')
        $already.hide()
        $txtRemain.text('')
        $remain.hide()
    }
  })
})
