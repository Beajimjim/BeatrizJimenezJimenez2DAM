/**
 * jocarsa-floralwhite - Una biblioteca minimalista para crear diagramas de Sankey interactivos con SVG.
 * 
 * Autor: (Tu Nombre)
 * Licencia: MIT (o la licencia que prefieras)
 */

(function (global) {
  const JocarsaFloralwhite = {};

  /**
   * Crea un gráfico de Sankey.
   * @param {Object} config - Configuración del gráfico de Sankey
   * @param {string|HTMLElement} config.element - Selector o elemento DOM donde se creará el gráfico
   * @param {Object} config.data - Datos del Sankey con nodos y enlaces
   * @param {number} config.width - Ancho total del gráfico
   * @param {number} config.height - Altura total del gráfico
   * @param {number} [config.nodeWidth=20] - Ancho de cada nodo en el gráfico
   * @param {number} [config.nodePadding=10] - Espaciado vertical entre nodos
   */
  JocarsaFloralwhite.createSankeyChart = function(config) {
    const {
      element,
      data,
      width,
      height,
      nodeWidth = 20,
      nodePadding = 10
    } = config;

    // Resolver el elemento contenedor donde se insertará el gráfico
    let container;
    if (typeof element === 'string') {
      container = document.querySelector(element);
    } else {
      container = element;
    }

    // Si el contenedor no se encuentra, lanzar un error
    if (!container) {
      throw new Error("El elemento contenedor no se encontró.");
    }

    // Limpiar cualquier contenido previo en el contenedor
    container.innerHTML = '';

    // Crear el elemento SVG
    const svg = createSVGElement('svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.classList.add('jocarsa-floralwhite-svg');
    container.appendChild(svg);

    // Crear una sección <defs> para definir gradientes en los enlaces
    const defs = createSVGElement('defs');
    svg.appendChild(defs);

    // Preparar los nodos
    const nodes = data.nodes.map((d, i) => ({
      index: i,
      name: d.name || `Node ${i}`,
      color: d.color || getRandomColor(),
    }));

    // Crear un mapa de nombres a índices
    const nameToIndex = {};
    nodes.forEach((node, i) => {
      nameToIndex[node.name] = i;
    });

    // Preparar enlaces, mapeando "source"/"target" de nombres a índices si es necesario
    const links = data.links.map(link => {
      let sourceIndex, targetIndex;

      // Convertir el origen a índice si es una cadena
      if (typeof link.source === 'string') {
        sourceIndex = nameToIndex[link.source];
        if (sourceIndex === undefined) {
          throw new Error(`El nodo de origen "${link.source}" no se encontró.`);
        }
      } else {
        sourceIndex = link.source;
      }

      // Convertir el destino a índice si es una cadena
      if (typeof link.target === 'string') {
        targetIndex = nameToIndex[link.target];
        if (targetIndex === undefined) {
          throw new Error(`El nodo de destino "${link.target}" no se encontró.`);
        }
      } else {
        targetIndex = link.target;
      }

      return {
        source: sourceIndex,
        target: targetIndex,
        value: +link.value
      };
    });

    // Inicializar la información de los nodos
    nodes.forEach(n => {
      n.sourceLinks = [];
      n.targetLinks = [];
      n.valueIn = 0;
      n.valueOut = 0;
      n.linkOffsetOut = 0;
      n.linkOffsetIn = 0;
    });

    // Asociar enlaces con nodos
    links.forEach(link => {
      const s = nodes[link.source];
      const t = nodes[link.target];
      s.sourceLinks.push(link);
      t.targetLinks.push(link);
      s.valueOut += link.value;
      t.valueIn += link.value;
    });

    // Asignar una "columna" (posición x) a cada nodo
    const sourceNodes = nodes.filter(n => n.valueIn === 0);
    assignNodeLayers(nodes, sourceNodes);

    // Determinar el número total de capas
    const maxLayer = Math.max(...nodes.map(d => d.layer));
    const xScale = (width - nodeWidth) / maxLayer;

    // Calcular la posición x de cada nodo
    nodes.forEach(n => {
      n.x0 = n.layer * xScale;
      n.x1 = n.x0 + nodeWidth;
    });

    // Distribuir nodos verticalmente dentro de cada capa
    const layers = [];
    for (let i = 0; i <= maxLayer; i++) {
      layers[i] = [];
    }
    nodes.forEach(n => {
      layers[n.layer].push(n);
    });

    // Organizar los nodos dentro de cada capa
    layers.forEach(layerNodes => {
      distributeLayerNodes(layerNodes, height, nodePadding);
    });

    // Crear los enlaces como elementos SVG <path>
    links.forEach(link => {
      const source = nodes[link.source];
      const target = nodes[link.target];

      // Calcular la altura del enlace basado en la salida del nodo fuente
      const linkHeight = (link.value / source.valueOut) * (source.y1 - source.y0);

      // Calcular las posiciones iniciales y finales de los enlaces
      const sy0 = source.y0 + source.linkOffsetOut + linkHeight / 2;
      source.linkOffsetOut += linkHeight + nodePadding;

      const ty0 = target.y0 + target.linkOffsetIn + linkHeight / 2;
      target.linkOffsetIn += linkHeight + nodePadding;

      // Crear el camino del enlace
      const path = createSVGElement('path');
      path.setAttribute('class', 'jocarsa-floralwhite-link');
      path.setAttribute('d', sankeyLinkPath(source.x1, sy0, target.x0, ty0));
      path.setAttribute('stroke', source.color);
      path.setAttribute('stroke-width', linkHeight);
      path.setAttribute('fill', 'none');
      svg.appendChild(path);
    });

    // Crear los nodos como elementos SVG <g>
    nodes.forEach(node => {
      const g = createSVGElement('g');
      g.setAttribute('class', 'jocarsa-floralwhite-node');

      // Crear rectángulo para el nodo
      const rect = createSVGElement('rect');
      rect.setAttribute('x', node.x0);
      rect.setAttribute('y', node.y0);
      rect.setAttribute('width', nodeWidth);
      rect.setAttribute('height', node.y1 - node.y0);
      rect.setAttribute('fill', node.color);
      g.appendChild(rect);

      // Crear texto para el nodo
      const text = createSVGElement('text');
      text.setAttribute('x', node.x0 + nodeWidth / 2);
      text.setAttribute('y', node.y0 + (node.y1 - node.y0) / 2);
      text.setAttribute('dy', '0.35em');
      text.setAttribute('text-anchor', 'middle');
      text.textContent = node.name;
      g.appendChild(text);

      svg.appendChild(g);
    });
  };

  /**
   * Función auxiliar para crear un elemento SVG
   */
  function createSVGElement(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
  }

  /**
   * Función auxiliar para generar un color aleatorio
   */
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  /**
   * Función auxiliar para calcular la trayectoria de un enlace en el Sankey
   */
  function sankeyLinkPath(x0, y0, x1, y1) {
    return `M${x0},${y0} C${(x0 + x1) / 2},${y0} ${(x0 + x1) / 2},${y1} ${x1},${y1}`;
  }

  // Exportar la librería
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = JocarsaFloralwhite;
  } else {
    global.jocarsaFloralwhite = JocarsaFloralwhite;
  }

})(this);
