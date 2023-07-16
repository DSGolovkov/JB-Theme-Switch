if (figma.editorType === "figma") {

  switchTheme();

  function switchTheme() {
    findInstances(figma.currentPage.selection);
    figma.closePlugin();
  }

  // @ts-ignore
  function findInstances(selObjects) {
    for (let i = 0; i < selObjects.length; i++) {
      if (selObjects[i].type === 'FRAME' || selObjects[i].type === 'GROUP' || selObjects[i].type === 'SECTION') {
        let innerObjects = selObjects[i].children;
        findInstances(innerObjects);
      } else if (selObjects[i].type === 'INSTANCE') {
        objectSwitchTheme(selObjects[i]);
      }
    }
  }


  // @ts-ignore
  function objectSwitchTheme(selInstance) {
    let main = selInstance.mainComponent;
    if (main.name.toLowerCase().includes('theme')) {
      let isDark = main.name.toLowerCase().includes('dark');
      for (let i = 0; i < main.parent.children.length; i++) {

        let from = isDark? 'dark' : 'light';
        let to = isDark? 'light' : 'dark';

        // @ts-ignore
        let forChange = main.parent.findChildren(n => n.name.toLowerCase() === main.name.toLowerCase().replace(from, to))[0];
        selInstance.swapComponent(forChange);
      }
    }
  }
}