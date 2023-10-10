import { apiInitializer } from "discourse/lib/api";
import loadScript from "discourse/lib/load-script";
import I18n from "I18n";

async function applyDelete(element) {
  const delete = element.querySelectorAll("del");
  if (!delete.length) {
    return;
  }
}

export default apiInitializer("0.11.1", (api) => {
  const { iconNode } = require("discourse-common/lib/icon-library");
  let icon = iconNode("highlighter");
  const currentLocale = I18n.currentLocale();
  // I18n.translations[currentLocale].js.delete_button_title = I18n.t(themePrefix("composer_delete_button_title"));
  // I18n.translations[currentLocale].js.composer.delete_button_text = I18n.t(themePrefix("composer_delete_button_text"));
  I18n.translations[currentLocale].js.delete_button_title = "Delete Text";
  I18n.translations[currentLocale].js.composer.this = "this";
  // I18n.translations[currentLocale].js.composer.delete_button_text = "Delete Text";

  api.modifyClass("controller:composer", {
    pluginId: "delete",
    actions: {
      deleteButton() {
        this.get("toolbarEvent").applySurround("\n" + `<del>` + "\n</del>\n");
      },
    },
  });

  // add button to the toolbar
  api.onToolbarCreate((toolbar) => {
    toolbar.addButton({
      id: "composer_delete_button",
      group: "extras",
      icon: "highlighter",
      shortcut: "D",
      preventFocus: true,
      trimLeading: true,
      title: "delete_button_title",
      // perform: e => e.applySurround('<span>[wrap=delete]', '[/wrap]</span>', 'this')
      perform: (e) => e.applySurround("<del>", "</del>", "this"),
    });
  });

  api.decorateCookedElement(
    async (elem, helper) => {
      const id = helper ? `post_${helper.getModel().id}` : "composer";
      applyDelete(elem, id);
    },
    { id: "wrap-delete" }
  );
});
