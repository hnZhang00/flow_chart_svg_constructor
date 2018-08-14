import Data from './data';
import _ from './lodash';
import './style.less';

let Main = {
	init() {
    this.zoom = 0.8;
    this.floors = 1;
    this.ctxWidth = 625;
    this.ctxHeight = 625;
    this.childShapes = Data.shapes;
    this.nodesMap = {};
    this.startNode = {};

    this.commonWidth = 120;
    this.commonHeight = 40;
    this.commonWidth_mini = 40;
    this.commonSpace = 40;

    this.render();
	},

  render() {
    this.nodesMap = _.mapKeys(this.childShapes, 'resourceId');
    let node = _.filter(this.childShapes, (shape, index) => (shape.stencil.id === 'StartNoneEvent'))[0];
    this.startNode = {
      type: 'circle',
      id: node.resourceId,
      name: node.properties.name,
      out: _.map(node.outgoing, (out) => this.nodesMap[out.resourceId]),
      isStartNode: true,
      parent: []
    };
    this.handleNodeItem(this.startNode);
    this.handleNodeLine(this.startNode);
    console.log(this.startNode)
    document.getElementById('flow_chart-ctx').innerHTML = this.renderNodeHtml(this.startNode);
  },

  renderNodeHtml(node) {
    node.childrenNodeHtml = _.map(node.children, child => {
      child.childrenNodeHtml = this.renderNodeHtml(child);
      return child.childrenNodeHtml;
    }).join('');

    let horizonInLinesHtml = _.map(node.inLines, (horizonInLine) => {
    	if (node.isStartNode)
    		return ``;
    	if (horizonInLine.left)
    		return `<div class="item-line horizon" style="width: ${horizonInLine.width}; left: ${horizonInLine.left}"></div>`;
    	return `<div class="item-line horizon" style="width: ${horizonInLine.width}; right: ${horizonInLine.right}"></div>`;
    }).join('');

    let inLineHtml = !node.isStartNode ? `<div class="item-line in"></div>` : ``;

    let outLineHtml = node.out && node.out.length ? `<div class="item-line out"></div>` : ``;

    return `<div class="item" style="width: ${node.width}px;">
		  <div class="item-node ${node.type}">
		    ${horizonInLinesHtml}
		    ${inLineHtml}
		    <div class="item-node-text" style="-webkit-box-orient: vertical;">${node.name}</div>
		    ${outLineHtml}
		  </div>
	    <div class="item-children">${node.childrenNodeHtml}</div>
		</div>`;
  },

  handleNodeItem(node) {
    node.width = (node.out && node.out.length) ? 0 : node.type != 'circle' ? this.commonWidth : this.commonWidth_mini;
    node.children = [];
    _.forEach(node.out, (child, index) => {
      let childNode = {
        type: child.stencil.id != 'EndNoneEvent' ? 'block' : 'circle',
        id: child.resourceId,
        name: child.properties.name,
        parent: node.parent.concat([node.id])
      };
      this.floors = this.floors < childNode.parent.length ? childNode.parent.length : this.floors;
      childNode.out = _.map(child.outgoing, childOut => {
        let thisOut = _.cloneDeep(this.nodesMap[childOut.resourceId]);
        if(childNode.parent.indexOf(childOut.resourceId) != -1)
          thisOut.outgoing = [];
        return thisOut;
      });
      childNode.width = this.handleNodeItem(childNode);
      childNode.width = childNode.width > this.commonWidth ? childNode.width : node.out.length > 1 ? childNode.width : this.commonWidth;
      node.width += ((index ? this.commonSpace : 0) + childNode.width);
      node.children.push(childNode);
    });
    return node.width;
  },

  handleNodeLine(node) {
    _.forEach(node.children, (child, index) => {
      child.currentParentWidth = node.width;
      let childrenLength = node.children.length;
      if (childrenLength > 1) {
        let i = 0, nodeLeftWidth = 0;
        while (i < index) {
          nodeLeftWidth += (node.children[i].width+this.commonSpace);
          i++;
        }
        nodeLeftWidth += child.width/2;
        let inWidth = nodeLeftWidth - child.currentParentWidth/2;
        let inLine = { width: Math.abs(inWidth)+'px' };
        if (inWidth <= 0) {
          inLine.left = '50%';
        } else {
          inLine.right = '50%';
        }
        child.inLines = [inLine];
      }
      this.handleNodeLine(child);
    });
  }
};

Main.init();