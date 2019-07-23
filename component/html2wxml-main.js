/**
 * Project: HTMLToWXML
 * Description: 将HTML、Markdown转为微信小程序WXML 
 * Author: royslg
 * Organization: weshine (https://www.wshoto.com)
 */

function getNodes(data) {
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
    nodes: getNodes(data),
    images,
    view: {
      imagePadding: typeof imagePadding !== 'undefined' ? Number(imagePadding) : 0,
    }
  };
  console.log(data);
  target.setData(data);
}

module.exports = {
  html2wxml: html2wxml
}