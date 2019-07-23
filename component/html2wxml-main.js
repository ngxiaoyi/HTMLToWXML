/**
 * Project: HTMLToWXML
 * Description: 将HTML、Markdown转为微信小程序WXML 
 * Author: royslg
 * Organization: weshine (https://www.wshoto.com)
 */

// TODO, 挪到js组件文件中
function getNodes(data) {
  // 这里可以记录节点数，用来当做组件进度处理
  data.forEach(item => {
    if (item.tag !== '#text') {
      item.name = item.tag;
      item.attrs = item.attr;
      item.children = item.nodes && getNodes(item.nodes);
      delete item.type;
    } else {
      item.type = 'text';
    }
    delete item.tag;
    delete item.attr;
    delete item.nodes;
  })
  return data;
}

/**
 * 主函数入口区
 **/
function html2wxml(data, target, imagePadding) {
  let images = target.data.images || [];

  // console.log(data);
  data = {
    nodes: getNodes(data), // 获取节点针对原生组件rich-text的处理结果，进度条的第二步；
    images,
    view: {
      imagePadding: typeof imagePadding !== 'undefined' ? Number(imagePadding) : 0,
    }
  };
  console.log(data);
  target.setData(data); // setData处理结果，可以对应进度条第三部。
}

module.exports = {
  html2wxml: html2wxml
}