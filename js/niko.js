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

  constructor(selector) {
    this.ele = document.querySelectorAll(selector);
  }

  addClass(className) {
    for (let item of this.ele) {
      const classArr = Niko.filter(item.className.split(" "), (cls) => !!cls);
      classArr.push(className);
      item.className = classArr.join(" ");
    }
    return this;
  }

  removeClass(className) {
    for (let item of this.ele) {
      const classArr = item.className.split(" ");
      item.className = Niko.filter(classArr, (cls) => cls !== className).join(
        " "
      );
    }
    return this;
  }

  eq(idx) {
    if (idx >= 0 && idx <= this.ele.length) {
      return this.ele[idx];
    }
    return new Error("No this element");
  }

  style(styleName, styStr) {
    for (let item of this.ele) {
      item.style[styleName] = styStr;
    }
    return this;
  }
}
window.$ = (selector) => {
  return Niko.getInstance(selector);
};
