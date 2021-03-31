/* 
实现了 jquery 基本的选择器方法
addClass
removeClass
eq
style
html
val
*/
class Niko {
  static getInstance(selector) {
    if (!Niko.instances) Niko.instances = {};
    if (!Niko.instances[selector])
      Niko.instances[selector] = new Niko(selector);
    return Niko.instances[selector];
  }

  static filter(arr, func) {
    const res = [];
    for (let item of arr) if (func(item)) res.push(item);
    return res;
  }

  static makeArray(nodeList) {
    const _this = this;
    nodeList.forEach((elem, index) => {
      _this[index] = elem;
    });
  }

  constructor(selector) {
    const _this = this;
    if (!selector) {
      _this.eles = [];
    } else {
      if (selector.nodeType === 1) {
        // dom 节点
        const fragment = document.createDocumentFragment();
        fragment.appendChild(selector);
        _this.eles = fragment.childNodes;
      } else {
        _this.eles = document.querySelectorAll(selector);
      }
    }
    _this.length = _this.eles.length;
    Niko.makeArray.call(_this, _this.eles);
  }
  eq(idx) {
    if (idx >= 0 && idx <= this.eles.length) {
      return new Niko(this.eles[idx]);
    }
    return new Niko();
  }

  hasClass(className) {
    let result = false;
    for (let item of this.eles) {
      const classArr = Niko.filter(item.className.split(" "), (cls) => !!cls);
      if (classArr.indexOf(className) > -1) {
        result = true;
        break;
      }
    }
    return result;
  }

  addClass(className) {
    for (let item of this.eles) {
      const classArr = Niko.filter(item.className.split(" "), (cls) => !!cls);
      classArr.push(className);
      item.className = classArr.join(" ");
    }
    return this;
  }

  removeClass(className) {
    for (let item of this.eles) {
      const classArr = item.className.split(" ");
      item.className = Niko.filter(classArr, (cls) => cls !== className).join(
        " "
      );
    }
    return this;
  }

  css(styleName, styStr) {
    for (let item of this.eles) {
      item.style[styleName] = styStr;
    }
    return this;
  }

  val(value) {
    if (this.eles.length === 0) {
      return this;
    }
    const inset = typeof value !== "undefined";
    if (inset) {
      for (let item of this.eles) {
        item.value = value;
      }
      return this;
    } else {
      return this.eles[0].value;
    }
  }

  html(dom) {
    if (this.eles.length === 0) {
      return;
    }
    const inset = typeof dom !== "undefined";
    if (inset) {
      for (let item of this.eles) {
        item.innerHTML = dom;
      }
      return this;
    } else {
      return this.eles[0].innerHTML;
    }
  }

  each(fn) {
    const _this = this;
    for (let i = 0, len = _this.eles.length; i < len; ++i) {
      const ele = _this.eles[i];
      fn.call(ele, ele, i);
    }
  }

  on(event, fn) {
    const _this = this;
    for (let i = 0, len = _this.eles.length; i < len; ++i) {
      const ele = _this.eles[i];
      ele.addEventListener(event, fn, false);
    }
  }
  off(event, fn) {
    const _this = this;
    for (let i = 0, len = _this.eles.length; i < len; ++i) {
      const ele = _this.eles[i];
      ele.removeEventListener(event, fn, false);
    }
  }
}
window.$ = (selector) => {
  return Niko.getInstance(selector);
};
